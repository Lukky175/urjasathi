"""Demand and solar inference wrappers with joblib/pickle load and hourly fallback."""

from __future__ import annotations

import pickle
from pathlib import Path
from typing import Sequence

import joblib
import numpy as np
import pandas as pd

from backend.app.core.config import (
    DEMAND_MODEL_PATH,
    HORIZON_STEPS,
    HOURS_IN_DAY,
    SOLAR_MODEL_PATH,
)
from backend.app.services.schemas import values_for_horizon

_DEMAND_VALUE_COLUMNS: tuple[str, ...] = (
    "demand_kw",
    "demand",
    "load_kw",
    "load",
    "total_kw",
)
_SOLAR_VALUE_COLUMNS: tuple[str, ...] = (
    "solar_kw",
    "solar_gen_kw",
    "solar",
    "generation_kw",
    "ac",
    "ac_hourly",
)
_HOUR_COLUMNS: tuple[str, ...] = ("hour", "hour_of_day", "Hour")

_model_cache: dict[str, object] = {}


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def _resolve_model_path(path_str: str) -> Path:
    path = Path(path_str)
    if path.is_file():
        return path
    return _repo_root() / path_str


def _load_model(path_str: str) -> object | None:
    if path_str in _model_cache:
        return _model_cache[path_str]
    path = _resolve_model_path(path_str)
    if not path.is_file():
        return None
    try:
        model = joblib.load(path)
    except Exception:
        try:
            with path.open("rb") as handle:
                model = pickle.load(handle)
        except Exception:
            return None
    _model_cache[path_str] = model
    return model


def _feature_names(model: object) -> Sequence[str] | None:
    names = getattr(model, "feature_names_in_", None)
    if names is not None:
        return list(names)
    named_steps = getattr(model, "named_steps", None)
    if not named_steps:
        return None
    for step in named_steps.values():
        names = getattr(step, "feature_names_in_", None)
        if names is not None:
            return list(names)
    return None


def _align_features(input_df: pd.DataFrame, model: object) -> pd.DataFrame:
    names = _feature_names(model)
    numeric = input_df.select_dtypes(include="number")
    if names is None:
        return numeric
    aligned = input_df.reindex(columns=list(names))
    fills = numeric.reindex(columns=list(names)).mean()
    return aligned.fillna(fills).fillna(0.0)


def _extract_hour_index(input_df: pd.DataFrame) -> pd.Series | None:
    for column in _HOUR_COLUMNS:
        if column in input_df.columns:
            hours = pd.to_numeric(input_df[column], errors="coerce") % HOURS_IN_DAY
            return hours.astype("Int64")
    if isinstance(input_df.index, pd.DatetimeIndex):
        return pd.Series(input_df.index.hour, index=input_df.index)
    datetime_cols = input_df.select_dtypes(include=["datetime64[ns]", "datetimetz"]).columns
    if len(datetime_cols):
        return pd.to_datetime(input_df[datetime_cols[0]]).dt.hour
    return None


def _hourly_baseline_vector(input_df: pd.DataFrame | None, candidates: tuple[str, ...]) -> list[float]:
    if input_df is None or input_df.empty:
        return np.zeros(HORIZON_STEPS, dtype=float).tolist()

    value_col = next((name for name in candidates if name in input_df.columns), None)
    if value_col is None:
        numeric = input_df.select_dtypes(include="number")
        if numeric.empty:
            return np.zeros(HORIZON_STEPS, dtype=float).tolist()
        value_col = str(numeric.columns[0])

    series = pd.to_numeric(input_df[value_col], errors="coerce")
    hours = _extract_hour_index(input_df)
    if hours is None:
        return values_for_horizon(series.to_numpy()).tolist()

    profile = series.groupby(hours).mean()
    profile = profile.reindex(range(HOURS_IN_DAY)).ffill().bfill().fillna(0.0)
    clock = np.arange(HORIZON_STEPS) % HOURS_IN_DAY
    return profile.to_numpy(dtype=float)[clock].tolist()


def _predict_with_model(model: object, input_df: pd.DataFrame) -> list[float] | None:
    try:
        features = _align_features(input_df, model)
        if features.empty:
            return None
        prediction = np.asarray(model.predict(features), dtype=float).reshape(-1)
        return values_for_horizon(prediction).tolist()
    except Exception:
        return None


def predict_demand(input_df: pd.DataFrame | None = None) -> list[float]:
    """Return a ``HORIZON_STEPS`` demand forecast (kW)."""
    frame = pd.DataFrame() if input_df is None else input_df
    model = _load_model(DEMAND_MODEL_PATH)
    if model is not None and not frame.empty:
        predicted = _predict_with_model(model, frame)
        if predicted is not None:
            return predicted
    return _hourly_baseline_vector(frame if not frame.empty else input_df, _DEMAND_VALUE_COLUMNS)


def predict_solar(input_df: pd.DataFrame | None = None) -> list[float]:
    """Return a ``HORIZON_STEPS`` solar forecast (kW)."""
    frame = pd.DataFrame() if input_df is None else input_df
    model = _load_model(SOLAR_MODEL_PATH)
    if model is not None and not frame.empty:
        predicted = _predict_with_model(model, frame)
        if predicted is not None:
            return predicted
    return _hourly_baseline_vector(frame if not frame.empty else input_df, _SOLAR_VALUE_COLUMNS)
