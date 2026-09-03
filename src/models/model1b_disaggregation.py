"""
Model 1B: Multi-Zone Appliance Disaggregation Model (Shape).

Trained on CU-BEMS multi-zone sub-metering data.
Predicts 10 granular Zone x Appliance load shares:
    [z1_ac, z1_light, z1_plug, z2_ac, z2_light, z2_plug, z3_light, z3_plug, z4_ac, z4_light, z4_plug]
subject to the strict physics constraint: sum(shares) = 1.0, shares >= 0.

Multiplied by Model 1A Total Demand to produce simulated Indian building zone-level breakdown.
"""

import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Union
try:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore
    from sklearn.metrics import mean_absolute_error  # type: ignore
    import xgboost as xgb  # type: ignore
except ImportError:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore
    from sklearn.metrics import mean_absolute_error  # type: ignore
    import xgboost as xgb  # type: ignore


from src.config.energy_config import (
    XGB_PARAMS_1B,
    ZONE_APPLIANCE_CHANNELS,
    ZONE_DEFINITIONS,
    DATA_PATHS,
)


FEATURE_COLUMNS_1B: List[str] = [
    "hour_of_day",
    "day_of_week",
    "is_weekend",
    "month",
    "temperature_c",
    "humidity_pct",
]
TARGET_CHANNELS: List[str] = [f"share_{ch}" for ch in ZONE_APPLIANCE_CHANNELS]


def proportional_normalize(shares: np.ndarray, eps: float = 1e-6) -> np.ndarray:
    """Project predictions onto standard simplex: non-negative and sum=1.0 per row."""
    shares_clipped = np.maximum(shares, eps)
    row_sums = shares_clipped.sum(axis=1, keepdims=True)
    return shares_clipped / row_sums


def compute_kl_divergence(p_true: np.ndarray, q_pred: np.ndarray, eps: float = 1e-6) -> float:
    """Compute mean Kullback-Leibler divergence between share distributions."""
    p = np.clip(p_true, eps, 1.0)
    p = p / p.sum(axis=1, keepdims=True)
    q = np.clip(q_pred, eps, 1.0)
    q = q / q.sum(axis=1, keepdims=True)
    return float(np.mean(np.sum(p * np.log(p / q), axis=1)))


class ApplianceDisaggregator:
    """Multi-Zone Appliance Disaggregator using optimal XGBoost models."""

    def __init__(self, custom_params: Optional[Dict] = None):
        self.params = dict(XGB_PARAMS_1B)
        if custom_params:
            self.params.update(custom_params)

        self.models: Dict[str, xgb.XGBRegressor] = {
            target: xgb.XGBRegressor(**self.params) for target in TARGET_CHANNELS
        }
        self.is_fitted = False
        self.feature_names = FEATURE_COLUMNS_1B
        self.channel_names = ZONE_APPLIANCE_CHANNELS
        self.target_names = TARGET_CHANNELS

    def fit(
        self,
        X_train: pd.DataFrame,
        Y_train: pd.DataFrame,
        X_val: Optional[pd.DataFrame] = None,
        Y_val: Optional[pd.DataFrame] = None,
    ) -> "ApplianceDisaggregator":
        """Fit individual channel regressors with early stopping on validation split."""
        X_tr = X_train[self.feature_names]
        has_val = X_val is not None and Y_val is not None

        for target in self.target_names:
            if has_val:
                X_v = X_val[self.feature_names]
                self.models[target].fit(
                    X_tr,
                    Y_train[target],
                    eval_set=[(X_v, Y_val[target])],
                    verbose=False,
                )
            else:
                self.models[target].fit(X_tr, Y_train[target], verbose=False)

        self.is_fitted = True
        return self

    def predict_shares(self, X: pd.DataFrame) -> pd.DataFrame:
        """
        Predict simplex-normalized 10-channel shares.
        Guarantees exact sum = 1.000 for each row.
        """
        if not self.is_fitted:
            raise RuntimeError("Model 1B must be fitted before predict.")
        X_mat = X[self.feature_names]

        raw_matrix = np.column_stack([
            self.models[target].predict(X_mat) for target in self.target_names
        ])
        norm_matrix = proportional_normalize(raw_matrix)
        return pd.DataFrame(norm_matrix, columns=self.target_names, index=X.index)

    def predict_zone_demand(
        self,
        total_demand_kw: float,
        features: pd.DataFrame,
    ) -> Dict[str, Any]:
        """
        Coupled inference: Given total campus demand (kW) from Model 1A,
        simulate and disaggregate into all 10 Zone x Appliance kW loads,
        plus aggregated Zone totals and Appliance totals.
        """
        shares_df = self.predict_shares(features)
        shares = shares_df.iloc[0].to_dict()

        # Detailed 10-channel kW
        channel_kw = {}
        for ch in self.channel_names:
            share_val = float(shares[f"share_{ch}"])
            channel_kw[ch] = {
                "share_pct": round(share_val * 100.0, 2),
                "demand_kw": round(total_demand_kw * share_val, 2),
            }

        # Aggregated Appliance breakdown
        ac_kw = sum(channel_kw[ch]["demand_kw"] for ch in ["z1_ac", "z2_ac", "z4_ac"])
        light_kw = sum(channel_kw[ch]["demand_kw"] for ch in ["z1_light", "z2_light", "z3_light", "z4_light"])
        plug_kw = sum(channel_kw[ch]["demand_kw"] for ch in ["z1_plug", "z2_plug", "z3_plug", "z4_plug"])

        # Aggregated Zone breakdown
        zone_kw = {}
        for z_id, z_meta in ZONE_DEFINITIONS.items():
            z_channels = [ch for ch in self.channel_names if ch.startswith(z_id)]
            z_tot_kw = sum(channel_kw[ch]["demand_kw"] for ch in z_channels)
            z_tot_share = sum(channel_kw[ch]["share_pct"] for ch in z_channels)
            zone_kw[z_id] = {
                "name": z_meta["name"],
                "total_kw": round(z_tot_kw, 2),
                "share_pct": round(z_tot_share, 2),
                "flexibility": z_meta["curtailment_flexibility"],
                "breakdown": {
                    app: channel_kw[f"{z_id}_{app}"]["demand_kw"]
                    for app in z_meta["appliances"]
                },
            }

        return {
            "total_demand_kw": round(total_demand_kw, 2),
            "appliance_totals": {
                "ac_kw": round(ac_kw, 2),
                "ac_share_pct": round((ac_kw / max(total_demand_kw, 1e-3)) * 100.0, 1),
                "light_kw": round(light_kw, 2),
                "light_share_pct": round((light_kw / max(total_demand_kw, 1e-3)) * 100.0, 1),
                "plug_kw": round(plug_kw, 2),
                "plug_share_pct": round((plug_kw / max(total_demand_kw, 1e-3)) * 100.0, 1),
            },
            "zone_totals": zone_kw,
            "channel_details": channel_kw,
        }

    def evaluate(self, X_test: pd.DataFrame, Y_test: pd.DataFrame) -> Dict[str, float]:
        """Compute MAE across all 10 channels and overall KL-divergence."""
        y_pred_df = self.predict_shares(X_test)
        y_pred = y_pred_df.values
        y_true = Y_test[self.target_names].values

        channel_maes = {}
        for i, target in enumerate(self.target_names):
            ch_mae = float(mean_absolute_error(y_true[:, i], y_pred[:, i]))
            channel_maes[f"MAE_{target}"] = round(ch_mae, 4)

        overall_mae = float(np.mean([channel_maes[f"MAE_{t}"] for t in self.target_names]))
        kl_div = compute_kl_divergence(y_true, y_pred)

        metrics = {
            "MAE_overall": round(overall_mae, 4),
            "KL_Divergence": round(kl_div, 4),
            **channel_maes,
        }
        return metrics

    def save(self, model_path: Union[str, Path] = DATA_PATHS["model1b_saved"]):
        """Save model bundle to JSON."""
        out_path = Path(model_path)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        bundle = {}
        for target, model in self.models.items():
            booster = model.get_booster()
            bundle[target] = json.loads(booster.save_raw(raw_format="json").decode("utf-8"))

        with open(out_path, "w") as f:
            json.dump(bundle, f)
        print(f"[Model 1B] 10-channel bundle saved -> {out_path}")

    def load(self, model_path: Union[str, Path] = DATA_PATHS["model1b_saved"]):
        """Load model bundle from JSON."""
        in_path = Path(model_path)
        if not in_path.exists():
            raise FileNotFoundError(f"Model file not found: {in_path}")

        with open(in_path, "r") as f:
            bundle = json.load(f)

        for target in self.target_names:
            if target in bundle:
                raw_bytes = bytearray(json.dumps(bundle[target]).encode("utf-8"))
                booster = xgb.Booster()
                booster.load_model(raw_bytes)
                self.models[target]._Booster = booster

        self.is_fitted = True
        print(f"[Model 1B] Model loaded from {in_path}")


def train_model1b(
    df: pd.DataFrame,
    train_split: float = 0.70,
    val_split: float = 0.10,
    model_save_path: Union[str, Path] = DATA_PATHS["model1b_saved"],
    metadata_save_path: Union[str, Path] = DATA_PATHS["scaler_metadata"],
) -> Tuple[ApplianceDisaggregator, Dict[str, float]]:
    """
    Train Model 1B using optimal hyperparameters with early stopping across all 10 channels.
    """
    print("\n" + "=" * 65)
    print("Training Model 1B: Multi-Zone Disaggregation (Optimal XGBoost)")
    print("=" * 65)

    df_clean = df.dropna(subset=FEATURE_COLUMNS_1B + TARGET_CHANNELS).sort_values("timestamp")
    n_total = len(df_clean)
    n_train = int(n_total * train_split)
    n_val = int(n_total * (train_split + val_split))

    train_df = df_clean.iloc[:n_train]
    val_df = df_clean.iloc[n_train:n_val]
    test_df = df_clean.iloc[n_val:]

    print(f"Total: {n_total} hours | Train: {len(train_df)} | Val: {len(val_df)} | Test: {len(test_df)}")

    disaggregator = ApplianceDisaggregator()
    disaggregator.fit(
        train_df[FEATURE_COLUMNS_1B],
        train_df[TARGET_CHANNELS],
        val_df[FEATURE_COLUMNS_1B],
        val_df[TARGET_CHANNELS],
    )

    metrics = disaggregator.evaluate(test_df[FEATURE_COLUMNS_1B], test_df[TARGET_CHANNELS])
    print(f"Model 1B Evaluation (Test Set across 10 Channels):")
    print(f"  - Overall Share MAE: {metrics['MAE_overall']}")
    print(f"  - KL Divergence:     {metrics['KL_Divergence']}")
    print(f"  - Zone 2 AC MAE:     {metrics.get('MAE_share_z2_ac', 'N/A')}")
    print(f"  - Zone 1 AC MAE:     {metrics.get('MAE_share_z1_ac', 'N/A')}")

    disaggregator.save(model_save_path)

    # Update metadata
    meta_path = Path(metadata_save_path)
    meta_path.parent.mkdir(parents=True, exist_ok=True)
    meta = {}
    if meta_path.exists():
        try:
            with open(meta_path, "r") as f:
                meta = json.load(f)
        except Exception:
            meta = {}

    meta["model1b"] = {
        "features": FEATURE_COLUMNS_1B,
        "targets": TARGET_CHANNELS,
        "hyperparameters": disaggregator.params,
        "metrics": metrics,
        "n_train_samples": len(train_df),
        "n_test_samples": len(test_df),
    }

    with open(meta_path, "w") as f:
        json.dump(meta, f, indent=2)

    return disaggregator, metrics
