"""
I-BLEND Academic Building Data Loader & Feature Pipeline for Model 1A.

Parses 1-minute Academic Building energy meter data, resamples to hourly mean kW,
enriches with temporal and autoregressive lag features, aligns weather data,
and prepares the training dataset for Model 1A (Total Demand Forecaster).
"""

from pathlib import Path
from typing import Optional, Union
try:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore
except ImportError:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore


from .common_schema import add_calendar_features, validate_canonical_df
from src.utils.synthetic_fallback import generate_synthetic_iblend


def load_iblend_data(
    raw_path: Union[str, Path] = "data/raw/iblend_academic.csv",
    weather_path: Optional[Union[str, Path]] = "data/raw/iiitd_weather.csv",
    processed_out: Optional[Union[str, Path]] = "data/processed/model1a_train.csv",
    use_synthetic_if_missing: bool = True,
) -> pd.DataFrame:
    """
    Load raw I-BLEND Academic Building CSV, downsample to hourly mean kW,
    compute autoregressive features (lag_1h, lag_24h, rolling_24h_mean),
    and align temperature/humidity.
    """
    raw_file = Path(raw_path)
    if not raw_file.exists():
        # Check alternative common locations
        alternatives = [
            Path("data/iblend_academic.csv"),
            Path("data/acad_build_mains.csv"),
            Path("data/raw/acad_build_mains.csv"),
        ]
        found = False
        for alt in alternatives:
            if alt.exists():
                raw_file = alt
                found = True
                break

        if not found:
            if use_synthetic_if_missing:
                print(f"[Warning] I-BLEND raw file not found at {raw_path}. Generating synthetic fallback...")
                generate_synthetic_iblend(out_path=raw_path)
                raw_file = Path(raw_path)
            else:
                raise FileNotFoundError(f"I-BLEND raw file not found: {raw_path}")

    print(f"[I-BLEND Loader] Ingesting raw data from {raw_file}...")
    # I-BLEND contains: timestamp (unix or datetime), power (Watts), current, voltage, frequency, power_factor
    df_raw = pd.read_csv(raw_file)

    # Standardize timestamp
    if np.issubdtype(df_raw["timestamp"].dtype, np.number):
        df_raw["timestamp"] = pd.to_datetime(df_raw["timestamp"], unit="s")
    else:
        df_raw["timestamp"] = pd.to_datetime(df_raw["timestamp"], errors="coerce")

    df_raw = df_raw.dropna(subset=["timestamp", "power"]).sort_values("timestamp")
    df_raw["power"] = pd.to_numeric(df_raw["power"], errors="coerce")
    df_raw = df_raw.dropna(subset=["power"])

    # Downsample 1-minute data to 1-hour intervals: mean power in kW (Watts / 1000.0)
    df_raw.set_index("timestamp", inplace=True)
    df_hourly = df_raw["power"].resample("1h").mean().to_frame(name="value_kw")
    df_hourly["value_kw"] = df_hourly["value_kw"] / 1000.0

    # Fill small gaps via linear interpolation, then forward/backward fill
    df_hourly["value_kw"] = df_hourly["value_kw"].interpolate(method="time").bfill().ffill()
    df_hourly.reset_index(inplace=True)

    # Standard metadata columns
    df_hourly["source"] = "I-BLEND"
    df_hourly["building_id"] = "IIITD_Academic"
    df_hourly["zone_id"] = None
    df_hourly["appliance_type"] = "total"

    # Add calendar features: hour_of_day, day_of_week, is_weekend
    df_hourly = add_calendar_features(df_hourly, timestamp_col="timestamp")
    df_hourly["month"] = df_hourly["timestamp"].dt.month

    # Weather integration
    temp_c = None
    humid_pct = None
    if weather_path and Path(weather_path).exists():
        try:
            df_w = pd.read_csv(weather_path)
            time_col = df_w.columns[0]
            df_w[time_col] = pd.to_datetime(df_w[time_col], errors="coerce")
            df_w = df_w.dropna(subset=[time_col]).sort_values(time_col).set_index(time_col)

            # Prioritize IIITD station, fallback to Airport
            t_col = "IIITD_temperature" if "IIITD_temperature" in df_w.columns else "Airport_temperature"
            h_col = "IIITD_Humidity" if "IIITD_Humidity" in df_w.columns else "Airport_Humidity"

            w_hourly = df_w[[t_col, h_col]].resample("1h").mean()
            w_hourly.rename(columns={t_col: "temperature_c", h_col: "humidity_pct"}, inplace=True)
            w_hourly.reset_index(inplace=True)

            merged = pd.merge_asof(
                df_hourly.sort_values("timestamp"),
                w_hourly.sort_values(time_col),
                left_on="timestamp",
                right_on=time_col,
                direction="nearest",
                tolerance=pd.Timedelta("2h")
            )
            df_hourly["temperature_c"] = merged["temperature_c"]
            df_hourly["humidity_pct"] = merged["humidity_pct"]
        except Exception as e:
            print(f"[I-BLEND Loader] Weather merge note: {e}")

    # Fallback for missing temperature/humidity using Delhi diurnal/seasonal approximation
    if "temperature_c" not in df_hourly.columns or df_hourly["temperature_c"].isna().all():
        # Typical Delhi climate curve: peak in summer (May-June), cold in winter (Jan)
        # Diurnal range ~10 degC
        m = df_hourly["month"]
        h = df_hourly["hour_of_day"]
        base_t = 15.0 + 17.0 * np.sin(np.pi * (m - 1) / 10.0)
        diurnal_t = 4.5 * np.sin(np.pi * (h - 8) / 12.0)
        df_hourly["temperature_c"] = np.round(base_t + diurnal_t, 1)

    if "humidity_pct" not in df_hourly.columns or df_hourly["humidity_pct"].isna().all():
        m = df_hourly["month"]
        h = df_hourly["hour_of_day"]
        base_h = 50.0 + 25.0 * np.sin(np.pi * (m - 4) / 6.0)
        diurnal_h = -15.0 * np.sin(np.pi * (h - 8) / 12.0)
        df_hourly["humidity_pct"] = np.clip(np.round(base_h + diurnal_h, 1), 20.0, 95.0)

    # Impute any remaining NaNs
    df_hourly["temperature_c"] = df_hourly["temperature_c"].interpolate().bfill().ffill()
    df_hourly["humidity_pct"] = df_hourly["humidity_pct"].interpolate().bfill().ffill()

    # Autoregressive Lag Features for Model 1A
    df_hourly["lag_1h"] = df_hourly["value_kw"].shift(1)
    df_hourly["lag_24h"] = df_hourly["value_kw"].shift(24)
    df_hourly["rolling_24h_mean"] = df_hourly["value_kw"].rolling(window=24, min_periods=1).mean()

    # Target: Next hour demand value_kw(t+1)
    df_hourly["target_next_kw"] = df_hourly["value_kw"].shift(-1)

    # Drop edge rows where lags/target are undefined
    df_clean = df_hourly.dropna(subset=["lag_1h", "lag_24h", "target_next_kw"]).copy()

    validate_canonical_df(df_clean, strict=False)

    if processed_out:
        out_file = Path(processed_out)
        out_file.parent.mkdir(parents=True, exist_ok=True)
        df_clean.to_csv(out_file, index=False)
        print(f"[I-BLEND Loader] Saved processed training data -> {out_file} ({len(df_clean)} rows)")

    return df_clean
