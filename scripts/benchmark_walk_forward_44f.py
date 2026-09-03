"""
Comprehensive Feature Engineering & 5-Fold Expanding-Window Walk-Forward Cross-Validation
Benchmark for Urja Saathi Model 1A.

Features:
- 44 Progressive Features (Calendar, 1h-168h lags, rolling stats, degree hours, heat index, solar flags)
- 5-Fold Expanding-Window Walk-Forward Cross-Validation (Chronological, Zero Leakage)
- Baseline Persistence comparison (1h Naive & 168h Seasonal Naive)
"""

from pathlib import Path
import pandas as pd
import numpy as np
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from sklearn.ensemble import RandomForestRegressor, HistGradientBoostingRegressor
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
import xgboost as xgb
import lightgbm as lgb


def build_44_features(df_raw: pd.DataFrame) -> Tuple[pd.DataFrame, list]:
    df = df_raw.copy()
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df = df.sort_values('timestamp').reset_index(drop=True)

    # Stage A: Time / Calendar & Cyclical Trigo encodings (12 features)
    df['hour'] = df['timestamp'].dt.hour
    df['day_of_week'] = df['timestamp'].dt.dayofweek
    df['day_of_year'] = df['timestamp'].dt.dayofyear
    df['month'] = df['timestamp'].dt.month
    df['week_of_year'] = df['timestamp'].dt.isocalendar().week.astype(int)
    df['is_weekend'] = (df['day_of_week'] >= 5).astype(int)

    df['sin_hour'] = np.sin(2 * np.pi * df['hour'] / 24.0)
    df['cos_hour'] = np.cos(2 * np.pi * df['hour'] / 24.0)
    df['sin_dow'] = np.sin(2 * np.pi * df['day_of_week'] / 7.0)
    df['cos_dow'] = np.cos(2 * np.pi * df['day_of_week'] / 7.0)
    df['sin_month'] = np.sin(2 * np.pi * df['month'] / 12.0)
    df['cos_month'] = np.cos(2 * np.pi * df['month'] / 12.0)

    # Stage B: Multi-Horizon Autoregressive Lags (10 features)
    df['lag_1h'] = df['value_kw'].shift(1)
    df['lag_2h'] = df['value_kw'].shift(2)
    df['lag_3h'] = df['value_kw'].shift(3)
    df['lag_4h'] = df['value_kw'].shift(4)
    df['lag_6h'] = df['value_kw'].shift(6)
    df['lag_12h'] = df['value_kw'].shift(12)
    df['lag_24h'] = df['value_kw'].shift(24)
    df['lag_48h'] = df['value_kw'].shift(48)
    df['lag_72h'] = df['value_kw'].shift(72)
    df['lag_168h'] = df['value_kw'].shift(168)  # exactly 1 week ago

    # Stage C: Rolling Statistics & Volatility (8 features)
    df['rolling_3h_mean'] = df['value_kw'].rolling(3).mean()
    df['rolling_6h_mean'] = df['value_kw'].rolling(6).mean()
    df['rolling_12h_mean'] = df['value_kw'].rolling(12).mean()
    df['rolling_24h_mean'] = df['value_kw'].rolling(24).mean()
    df['rolling_168h_mean'] = df['value_kw'].rolling(168).mean()

    df['rolling_6h_std'] = df['value_kw'].rolling(6).std().fillna(0)
    df['rolling_24h_std'] = df['value_kw'].rolling(24).std().fillna(0)
    df['rolling_168h_std'] = df['value_kw'].rolling(168).std().fillna(0)

    # Momentum & Velocity Signals (4 features)
    df['diff_1h'] = df['value_kw'] - df['lag_1h']
    df['diff_24h'] = df['value_kw'] - df['lag_24h']
    df['diff_168h'] = df['value_kw'] - df['lag_168h']
    df['ratio_lag_24h'] = df['value_kw'] / np.maximum(df['lag_24h'], 0.1)

    # Stage D: Meteorological & Thermodynamic Features (7 features)
    temp = df['temperature_c']
    rh = df['humidity_pct']
    df['cooling_degree_hours'] = np.maximum(0.0, temp - 18.0)
    # Steadman Heat Index
    df['heat_index'] = -8.784 + 1.611 * temp + 2.338 * rh - 0.146 * temp * rh / 10.0 + 0.0123 * (temp**2)
    df['temp_rolling_6h_mean'] = temp.rolling(6).mean()
    df['temp_diff_24h'] = temp - temp.shift(24)
    df['cooling_load_proxy'] = df['cooling_degree_hours'] * (1 - df['is_weekend'] * 0.4)

    # Stage E: Solar Awareness Proxy (3 features)
    df['is_solar_hour'] = ((df['hour'] >= 7) & (df['hour'] <= 17)).astype(int)
    df['solar_proxy_ghi'] = np.where(df['is_solar_hour'] == 1, np.sin(np.pi * (df['hour'] - 6) / 12.0) * 800.0, 0.0)
    df['solar_rolling_3h_proxy'] = df['solar_proxy_ghi'].rolling(3).mean()

    # Target: value_kw at t+1
    df['target_next_kw'] = df['value_kw'].shift(-1)

    feature_cols = [
        'hour', 'day_of_week', 'day_of_year', 'month', 'week_of_year', 'is_weekend',
        'sin_hour', 'cos_hour', 'sin_dow', 'cos_dow', 'sin_month', 'cos_month',
        'lag_1h', 'lag_2h', 'lag_3h', 'lag_4h', 'lag_6h', 'lag_12h', 'lag_24h', 'lag_48h', 'lag_72h', 'lag_168h',
        'rolling_3h_mean', 'rolling_6h_mean', 'rolling_12h_mean', 'rolling_24h_mean', 'rolling_168h_mean',
        'rolling_6h_std', 'rolling_24h_std', 'rolling_168h_std',
        'diff_1h', 'diff_24h', 'diff_168h', 'ratio_lag_24h',
        'temperature_c', 'humidity_pct', 'cooling_degree_hours', 'heat_index',
        'temp_rolling_6h_mean', 'temp_diff_24h', 'cooling_load_proxy',
        'is_solar_hour', 'solar_proxy_ghi', 'solar_rolling_3h_proxy'
    ]

    # Clean rows with complete feature history
    df_clean = df.dropna(subset=feature_cols + ['target_next_kw']).reset_index(drop=True)


    return df_clean, feature_cols


def run_benchmark():
    raw_path = "data/processed/model1a_train.csv"
    df_raw = pd.read_csv(raw_path)
    df_clean, feature_cols = build_44_features(df_raw)

    print("=" * 85)
    print(f"URJA SAATHI — 44-FEATURE & 5-FOLD EXPANDING WALK-FORWARD CROSS-VALIDATION")
    print(f"Total Features: {len(feature_cols)} | Total Clean Hourly Records: {len(df_clean):,}")
    print("=" * 85)

    n = len(df_clean)
    fold_size = int(n * 0.10)  # 10% out-of-sample test per fold
    min_train = int(n * 0.50)  # start with 50% history

    fold_metrics = []
    baseline_1h_metrics = []
    baseline_168h_metrics = []

    for k in range(5):
        train_end = min_train + k * fold_size
        test_end = min_train + (k + 1) * fold_size
        train_data = df_clean.iloc[:train_end]
        test_data = df_clean.iloc[train_end:test_end]

        X_tr, y_tr = train_data[feature_cols], train_data['target_next_kw']
        X_te, y_te = test_data[feature_cols], test_data['target_next_kw']

        # 1. XGBoost
        m_xgb = xgb.XGBRegressor(
            n_estimators=350, learning_rate=0.04, max_depth=6,
            subsample=0.85, colsample_bytree=0.85, random_state=42, n_jobs=-1
        )
        m_xgb.fit(X_tr, y_tr)
        p_xgb = np.maximum(m_xgb.predict(X_te), 0.0)

        # 2. LightGBM
        m_lgb = lgb.LGBMRegressor(
            n_estimators=350, learning_rate=0.04, max_depth=6,
            num_leaves=31, subsample=0.85, colsample_bytree=0.85,
            random_state=42, verbose=-1, n_jobs=-1
        )
        m_lgb.fit(X_tr, y_tr)
        p_lgb = np.maximum(m_lgb.predict(X_te), 0.0)

        # 3. Ridge Regression with StandardScaler
        m_ridge = make_pipeline(StandardScaler(), Ridge(alpha=10.0))
        m_ridge.fit(X_tr, y_tr)
        p_ridge = np.maximum(m_ridge.predict(X_te), 0.0)

        # Production Weighted Blend
        p_ens = 0.50 * p_xgb + 0.35 * p_lgb + 0.15 * p_ridge

        # Metrics for Ensemble
        r2 = float(r2_score(y_te, p_ens))
        rmse = float(np.sqrt(mean_squared_error(y_te, p_ens)))
        mae = float(mean_absolute_error(y_te, p_ens))
        mape = float(np.mean(np.abs((y_te - p_ens) / np.maximum(y_te, 0.1))) * 100)
        cv_rmse = float((rmse / np.mean(y_te)) * 100)

        # Baselines
        # 1-hour naive persistence: pred(t+1) = value_kw(t)
        p_base_1h = test_data['value_kw'].values
        rmse_b1 = float(np.sqrt(mean_squared_error(y_te, p_base_1h)))
        mae_b1 = float(mean_absolute_error(y_te, p_base_1h))
        r2_b1 = float(r2_score(y_te, p_base_1h))

        # 168-hour seasonal naive: pred(t+1) = lag_168h(t+1)
        p_base_168h = test_data['lag_168h'].values
        rmse_b168 = float(np.sqrt(mean_squared_error(y_te, p_base_168h)))
        mae_b168 = float(mean_absolute_error(y_te, p_base_168h))
        r2_b168 = float(r2_score(y_te, p_base_168h))

        fold_metrics.append({
            'fold': k + 1, 'n_test': len(test_data),
            'r2': r2, 'rmse': rmse, 'mae': mae, 'mape': mape, 'cv_rmse': cv_rmse
        })
        baseline_1h_metrics.append({'r2': r2_b1, 'rmse': rmse_b1, 'mae': mae_b1})
        baseline_168h_metrics.append({'r2': r2_b168, 'rmse': rmse_b168, 'mae': mae_b168})

        test_start = str(test_data['timestamp'].iloc[0].date())
        test_end_d = str(test_data['timestamp'].iloc[-1].date())
        print(f"Fold {k+1} ({test_start} to {test_end_d} | {len(test_data):,} hrs): "
              f"R² = {r2:.4f} | RMSE = {rmse:.3f} kW | MAE = {mae:.3f} kW | MAPE = {mape:.2f}% | CV(RMSE) = {cv_rmse:.2f}%")

    df_m = pd.DataFrame(fold_metrics)
    df_b1 = pd.DataFrame(baseline_1h_metrics)
    df_b168 = pd.DataFrame(baseline_168h_metrics)

    print("-" * 85)
    print("5-FOLD WALK-FORWARD CROSS-VALIDATION SUMMARY:")
    print(f"  • Ensemble Mean R²:      {df_m['r2'].mean():.4f} ± {df_m['r2'].std():.4f}")
    print(f"  • Ensemble Mean RMSE:    {df_m['rmse'].mean():.3f} ± {df_m['rmse'].std():.3f} kW")
    print(f"  • Ensemble Mean MAE:     {df_m['mae'].mean():.3f} ± {df_m['mae'].std():.3f} kW")
    print(f"  • Ensemble Mean MAPE:    {df_m['mape'].mean():.2f} ± {df_m['mape'].std():.2f} %")
    print(f"  • Ensemble Mean CV(RMSE): {df_m['cv_rmse'].mean():.2f} %")
    print(f"  • Naive 1h Baseline:     RMSE = {df_b1['rmse'].mean():.3f} kW | R² = {df_b1['r2'].mean():.4f}")
    print(f"  • Seasonal 168h Baseline: RMSE = {df_b168['rmse'].mean():.3f} kW | R² = {df_b168['r2'].mean():.4f}")
    print(f"  • Relative Error Cut:    +{((df_b1['rmse'].mean() - df_m['rmse'].mean()) / df_b1['rmse'].mean()) * 100:.2f}% vs Persistence")
    print("-" * 85)

    return df_m, feature_cols


if __name__ == "__main__":
    from typing import Tuple
    run_benchmark()
