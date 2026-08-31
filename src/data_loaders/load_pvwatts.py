"""
PVWatts Solar Generation Data Loader for Model 2.

Reads NREL PVWatts v8 NSRDB hourly generation output for Delhi and Greater Noida,
normalizes power to kW, extracts irradiance and thermal features, and produces
standardized solar profiles for Model 2.
"""

from pathlib import Path
from typing import Dict, Optional, Union
try:
    import pandas as pd  # type: ignore
except ImportError:
    import pandas as pd  # type: ignore


from .common_schema import add_calendar_features


def _locate_solar_file(filename: str) -> Path:
    """Find solar file across possible directories (data/raw/, root, data/)."""
    candidates = [
        Path("data/raw") / filename,
        Path(filename),
        Path("data") / filename,
    ]
    for p in candidates:
        if p.exists():
            return p
    raise FileNotFoundError(f"Solar file '{filename}' not found in candidates: {candidates}")


def load_pvwatts_data(
    site: str = "delhi",
    file_path: Optional[Union[str, Path]] = None,
    processed_out: Optional[Union[str, Path]] = "data/processed/model2_train.csv",
) -> pd.DataFrame:
    """
    Load PVWatts hourly solar dataset for a specific site (delhi or greater_noida).
    Converts ac_power_w to value_kw (kW) and structures for Model 2.
    """
    site_key = site.lower().replace(" ", "_")
    target_name = f"solar_{site_key}.csv"

    if file_path is not None:
        target_path = Path(file_path)
    else:
        target_path = _locate_solar_file(target_name)

    print(f"[PVWatts Loader] Reading solar profile from {target_path}...")
    df = pd.read_csv(target_path)

    # Standardize timestamp
    df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")
    df = df.dropna(subset=["timestamp"]).sort_values("timestamp")

    # Power in kW
    df["value_kw"] = df["ac_power_w"] / 1000.0
    df["dc_power_kw"] = df["dc_power_w"] / 1000.0

    # Common schema attributes
    df["source"] = "PVWatts"
    df["building_id"] = f"Solar_{site_key.title()}"
    df["zone_id"] = None
    df["appliance_type"] = "solar"
    df["temperature_c"] = df["ambient_temp_c"]
    df["humidity_pct"] = None  # Not provided in PVWatts basic output

    # Calendar features
    df = add_calendar_features(df, timestamp_col="timestamp")
    df["month"] = df["timestamp"].dt.month

    if processed_out:
        out_file = Path(processed_out)
        out_file.parent.mkdir(parents=True, exist_ok=True)
        df.to_csv(out_file, index=False)
        print(f"[PVWatts Loader] Saved processed solar profile -> {out_file} ({len(df)} rows)")

    return df


def load_all_sites() -> Dict[str, pd.DataFrame]:
    """Load both Delhi and Greater Noida solar profiles."""
    return {
        "delhi": load_pvwatts_data("delhi", processed_out=None),
        "greater_noida": load_pvwatts_data("greater_noida", processed_out=None),
    }
