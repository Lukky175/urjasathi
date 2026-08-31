"""Category-level z-score and static-threshold anomaly detection."""

from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd
from scipy.stats import zscore

from backend.app.core.config import (
    ANOMALY_AC_KW_THRESHOLD,
    ANOMALY_LIGHT_KW_THRESHOLD,
    ANOMALY_PLUG_KW_THRESHOLD,
    ANOMALY_ZSCORE_ALERT,
    ANOMALY_ZSCORE_WARNING,
    HOURS_IN_DAY,
)

_CATEGORY_SPEC: dict[str, tuple[tuple[str, ...], float]] = {
    "AC": (("ac_kw", "ac", "hvac", "hvac_kw", "cooling_kw"), ANOMALY_AC_KW_THRESHOLD),
    "Light": (("light_kw", "light", "lighting", "lighting_kw"), ANOMALY_LIGHT_KW_THRESHOLD),
    "Plug": (("plug_kw", "plug", "plugs", "plug_load_kw", "equipment_kw"), ANOMALY_PLUG_KW_THRESHOLD),
}


def _resolve_column(frame: pd.DataFrame, aliases: tuple[str, ...]) -> str | None:
    lowered = {str(name).lower(): str(name) for name in frame.columns}
    for alias in aliases:
        if alias in lowered:
            return lowered[alias]
    return None


def _timestamps(frame: pd.DataFrame) -> pd.Series:
    if "timestamp" in frame.columns:
        return frame["timestamp"].astype(str)
    for column in ("hour", "hour_of_day", "Hour"):
        if column in frame.columns:
            hours = (pd.to_numeric(frame[column], errors="coerce") % HOURS_IN_DAY).fillna(0).astype(int)
            return hours.astype(str).str.zfill(2) + ":00"
    if isinstance(frame.index, pd.DatetimeIndex):
        return pd.Series(frame.index.strftime("%H:%M"), index=frame.index)
    clock = np.arange(len(frame)) % HOURS_IN_DAY
    return pd.Series(pd.Index(clock).astype(str).str.zfill(2) + ":00", index=frame.index)


def _zscores(values: pd.Series) -> pd.Series:
    numeric = pd.to_numeric(values, errors="coerce").to_numpy(dtype=float)
    spread = np.nanstd(numeric)
    if numeric.size == 0 or not np.isfinite(spread) or spread == 0:
        return pd.Series(np.zeros(len(values)), index=values.index, dtype=float)
    scores = zscore(numeric, nan_policy="omit", ddof=0)
    return pd.Series(np.nan_to_num(scores, nan=0.0), index=values.index)


def detect_category_anomalies(category_df: pd.DataFrame | None) -> list[dict[str, Any]]:
    """Flag AC, Light, and Plug loads that exceed z-score or static kW thresholds."""
    if category_df is None or category_df.empty:
        return []

    timestamps = _timestamps(category_df)
    flags: list[dict[str, Any]] = []

    for category, (aliases, threshold_kw) in _CATEGORY_SPEC.items():
        column = _resolve_column(category_df, aliases)
        if column is None:
            continue
        load_kw = pd.to_numeric(category_df[column], errors="coerce")
        scores = _zscores(load_kw)
        abs_scores = scores.abs()
        flagged = (abs_scores >= ANOMALY_ZSCORE_WARNING) | (load_kw >= threshold_kw)
        if not flagged.any():
            continue
        severity = np.where(abs_scores >= ANOMALY_ZSCORE_ALERT, "ALERT", "WARNING")
        detected = pd.DataFrame(
            {
                "timestamp": timestamps,
                "category": category,
                "value_kw": load_kw,
                "zscore": scores,
                "threshold_kw": threshold_kw,
                "exceeds_threshold": load_kw >= threshold_kw,
                "severity": severity,
            }
        )
        flags.extend(detected.loc[flagged].to_dict(orient="records"))

    return flags
