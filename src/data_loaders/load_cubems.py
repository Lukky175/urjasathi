"""
CU-BEMS Sub-metering Data Loader & Multi-Zone Disaggregation Pipeline for Model 1B.

Parses multi-zone high-resolution commercial building sub-metering data from CU-BEMS
(Floor 2), downsamples to 1-hour intervals, extracts 10 granular Zone x Appliance
channels, and derives normalized shares summing to 1.0 per timestep.
"""

from pathlib import Path
from typing import List, Optional, Union
try:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore
except ImportError:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore


from .common_schema import add_calendar_features
from src.config.energy_config import ZONE_APPLIANCE_CHANNELS, DATA_PATHS
from src.utils.synthetic_fallback import generate_synthetic_cubems_floor2


def load_cubems_data(
    raw_path: Union[str, Path] = DATA_PATHS["raw_cubems_floor2"],
    processed_out: Optional[Union[str, Path]] = DATA_PATHS["processed_model1b"],
    use_synthetic_if_missing: bool = True,
) -> pd.DataFrame:
    """
    Ingest CU-BEMS floor data, aggregate across the 10 Zone x Appliance channels,
    resample to hourly means, compute simplex-normalized shares, and save processed features.
    """
    raw_file = Path(raw_path)
    if not raw_file.exists():
        alternatives = [
            Path("data/cubems_2019floor2.csv"),
            Path("data/2019Floor2.csv"),
            Path("data/raw/2019Floor2.csv"),
        ]
        found = False
        for alt in alternatives:
            if alt.exists():
                raw_file = alt
                found = True
                break

        if not found:
            if use_synthetic_if_missing:
                print(f"[Warning] CU-BEMS Floor 2 not found at {raw_path}. Generating synthetic fallback...")
                generate_synthetic_cubems_floor2(out_path=raw_path)
                raw_file = Path(raw_path)
            else:
                raise FileNotFoundError(f"CU-BEMS raw file not found: {raw_path}")

    print(f"[CU-BEMS Loader] Reading multi-zone floor data from {raw_file}...")
    df_raw = pd.read_csv(raw_file)

    # Date column standardization
    date_col = df_raw.columns[0]
    df_raw[date_col] = pd.to_datetime(df_raw[date_col], errors="coerce")
    df_raw = df_raw.dropna(subset=[date_col]).sort_values(date_col).set_index(date_col)

    # Extract the 10 Zone x Appliance load channels
    cols = df_raw.columns
    z2_ac_cols = [c for c in cols if c.startswith("z2_AC")]

    channels = {
        "z1_ac": df_raw["z1_AC1(kW)"] if "z1_AC1(kW)" in cols else pd.Series(0.0, index=df_raw.index),
        "z1_light": df_raw["z1_Light(kW)"] if "z1_Light(kW)" in cols else pd.Series(0.0, index=df_raw.index),
        "z1_plug": df_raw["z1_Plug(kW)"] if "z1_Plug(kW)" in cols else pd.Series(0.0, index=df_raw.index),
        "z2_ac": df_raw[z2_ac_cols].sum(axis=1) if z2_ac_cols else pd.Series(0.0, index=df_raw.index),
        "z2_light": df_raw["z2_Light(kW)"] if "z2_Light(kW)" in cols else pd.Series(0.0, index=df_raw.index),
        "z2_plug": df_raw["z2_Plug(kW)"] if "z2_Plug(kW)" in cols else pd.Series(0.0, index=df_raw.index),
        "z3_light": df_raw["z3_Light(kW)"] if "z3_Light(kW)" in cols else pd.Series(0.0, index=df_raw.index),
        "z3_plug": df_raw["z3_Plug(kW)"] if "z3_Plug(kW)" in cols else pd.Series(0.0, index=df_raw.index),
        "z4_ac": df_raw["z4_AC1(kW)"] if "z4_AC1(kW)" in cols else pd.Series(0.0, index=df_raw.index),
        "z4_light": df_raw["z4_Light(kW)"] if "z4_Light(kW)" in cols else pd.Series(0.0, index=df_raw.index),
        "z4_plug": df_raw["z4_Plug(kW)"] if "z4_Plug(kW)" in cols else pd.Series(0.0, index=df_raw.index),
    }

    df_channels = pd.DataFrame(channels, index=df_raw.index)

    # Ambient indoor sensors
    temp_cols = [c for c in cols if "degC" in c]
    rh_cols = [c for c in cols if "RH%" in c]
    if temp_cols:
        df_channels["temperature_c"] = df_raw[temp_cols].mean(axis=1)
    if rh_cols:
        df_channels["humidity_pct"] = df_raw[rh_cols].mean(axis=1)

    # Downsample to 1-hour means
    df_hourly = df_channels.resample("1h").mean().reset_index()
    df_hourly.rename(columns={date_col: "timestamp"}, inplace=True)

    # Interpolate missing values
    for ch in ZONE_APPLIANCE_CHANNELS:
        df_hourly[ch] = df_hourly[ch].interpolate().bfill().ffill().clip(lower=0.0)

    if "temperature_c" in df_hourly.columns:
        df_hourly["temperature_c"] = df_hourly["temperature_c"].interpolate().bfill().ffill()
    else:
        df_hourly["temperature_c"] = 26.0

    if "humidity_pct" in df_hourly.columns:
        df_hourly["humidity_pct"] = df_hourly["humidity_pct"].interpolate().bfill().ffill()
    else:
        df_hourly["humidity_pct"] = 55.0

    # Total load across all 10 channels
    df_hourly["total_kw"] = df_hourly[ZONE_APPLIANCE_CHANNELS].sum(axis=1)
    total_safe = np.maximum(df_hourly["total_kw"].values, 1e-4)

    # Compute normalized shares for all 10 channels
    share_cols = [f"share_{ch}" for ch in ZONE_APPLIANCE_CHANNELS]
    for ch in ZONE_APPLIANCE_CHANNELS:
        df_hourly[f"share_{ch}"] = df_hourly[ch] / total_safe

    # Exact simplex normalization: guarantee sum(shares) = 1.0 per row
    row_sum = df_hourly[share_cols].sum(axis=1).values[:, np.newaxis]
    df_hourly[share_cols] = df_hourly[share_cols].values / row_sum

    # Also compute aggregate appliance shares (ac, light, plug) for quick high-level analytics
    df_hourly["share_ac"] = df_hourly["share_z1_ac"] + df_hourly["share_z2_ac"] + df_hourly["share_z4_ac"]
    df_hourly["share_light"] = (
        df_hourly["share_z1_light"] + df_hourly["share_z2_light"] +
        df_hourly["share_z3_light"] + df_hourly["share_z4_light"]
    )
    df_hourly["share_plug"] = (
        df_hourly["share_z1_plug"] + df_hourly["share_z2_plug"] +
        df_hourly["share_z3_plug"] + df_hourly["share_z4_plug"]
    )

    # Aggregate zone shares
    df_hourly["share_z1"] = df_hourly["share_z1_ac"] + df_hourly["share_z1_light"] + df_hourly["share_z1_plug"]
    df_hourly["share_z2"] = df_hourly["share_z2_ac"] + df_hourly["share_z2_light"] + df_hourly["share_z2_plug"]
    df_hourly["share_z3"] = df_hourly["share_z3_light"] + df_hourly["share_z3_plug"]
    df_hourly["share_z4"] = df_hourly["share_z4_ac"] + df_hourly["share_z4_light"] + df_hourly["share_z4_plug"]

    # Temporal features
    df_hourly = add_calendar_features(df_hourly, timestamp_col="timestamp")
    df_hourly["month"] = df_hourly["timestamp"].dt.month
    df_hourly["source"] = "CU-BEMS"
    df_hourly["building_id"] = "CU_BEMS_Floor2"

    if processed_out:
        out_file = Path(processed_out)
        out_file.parent.mkdir(parents=True, exist_ok=True)
        df_hourly.to_csv(out_file, index=False)
        print(f"[CU-BEMS Loader] Saved 10-channel processed training data -> {out_file} ({len(df_hourly)} rows)")

    return df_hourly
