"""
Common Canonical Schema for Urja Saathi Data Ingestion.

Standardizes all ingested meter, weather, and solar data into a consistent
pandas DataFrame schema across all models (1A, 1B, 2).
"""

from typing import List, Optional
try:
    import pandas as pd  # type: ignore
except ImportError:
    import pandas as pd  # type: ignore


CANONICAL_COLUMNS: List[str] = [
    "timestamp",        # datetime64[ns], hourly, tz-naive
    "source",           # str: 'I-BLEND' | 'CU-BEMS' | 'PVWatts'
    "building_id",      # str: e.g. 'IIITD_Academic' or 'CU_BEMS_Fl2'
    "zone_id",          # str or None: e.g. 'z1', 'z2', or None for building-wide
    "appliance_type",   # str: 'total' | 'ac' | 'lighting' | 'plug'
    "value_kw",         # float: power in kW
    "temperature_c",    # float or NaN: ambient temperature in degC
    "humidity_pct",     # float or NaN: relative humidity %
    "hour_of_day",      # int: 0-23
    "day_of_week",      # int: 0-6 (Monday=0, Sunday=6)
    "is_weekend",       # int: 0 or 1
]


def add_calendar_features(df: pd.DataFrame, timestamp_col: str = "timestamp") -> pd.DataFrame:
    """Ensure timestamp is datetime and compute calendar features."""
    df[timestamp_col] = pd.to_datetime(df[timestamp_col], errors="coerce")
    if df[timestamp_col].dt.tz is not None:
        df[timestamp_col] = df[timestamp_col].dt.tz_localize(None)
    
    df["hour_of_day"] = df[timestamp_col].dt.hour
    df["day_of_week"] = df[timestamp_col].dt.dayofweek
    df["is_weekend"] = df["day_of_week"].apply(lambda d: 1 if d >= 5 else 0)
    return df


def validate_canonical_df(df: pd.DataFrame, strict: bool = True) -> bool:
    """Validate that DataFrame conforms to canonical schema."""
    missing = [c for c in CANONICAL_COLUMNS if c not in df.columns]
    if missing:
        msg = f"Canonical schema validation failed. Missing columns: {missing}"
        if strict:
            raise ValueError(msg)
        return False
    return True
