"""Demand (XGBoost 1A/1B) and solar (PVWatts/NSRDB) inference with profile fallbacks."""

from __future__ import annotations

import json
import tempfile
from pathlib import Path
from typing import Any, Sequence

import numpy as np
import pandas as pd

from backend.app.core.config import (
    DEFAULT_CAPACITY_SCALE,
    DEFAULT_PV_CAPACITY_KWP,
    DEFAULT_SITE,
    FALLBACK_AC_SHARE,
    FALLBACK_LIGHT_SHARE,
    FALLBACK_PLUG_SHARE,
    HORIZON_STEPS,
    HOURS_IN_DAY,
    MODEL_1A_FEATURES,
    MODEL_1A_PATH,
    MODEL_1B_AC_BOOSTER_INDICES,
    MODEL_1B_FEATURES,
    MODEL_1B_LIGHT_BOOSTER_INDICES,
    MODEL_1B_OTHER_BOOSTER_INDICES,
    MODEL_1B_PATH,
    MODEL_1B_PLUG_BOOSTER_INDICES,
    SOLAR_DATA_PATH,
    SOLAR_FALLBACK_SUNRISE_HOUR,
    SOLAR_FALLBACK_SUNSET_HOUR,
    TIME_STEP_HOURS,
    WATTS_PER_KILOWATT,
)
from backend.app.services.schemas import (
    DemandForecastOutput,
    features_to_frame,
    values_for_horizon,
)

try:
    import xgboost as xgb
except ImportError:  # pragma: no cover - optional until artifacts are present
    xgb = None

_HOUR_COLUMNS: tuple[str, ...] = ("hour", "hour_of_day", "Hour")
_DEMAND_VALUE_COLUMNS: tuple[str, ...] = (
    "demand_kw",
    "demand",
    "load_kw",
    "load",
    "total_kw",
    "lag_demand_24h",
    "lag_demand_1h",
)
_SOLAR_KW_COLUMNS: tuple[str, ...] = (
    "ac_kw",
    "solar_kw",
    "p_ac_kw",
    "ac",
    "generation_kw",
)
_SOLAR_W_COLUMNS: tuple[str, ...] = (
    "ac_w",
    "ac_system_output_w",
    "AC System Output (W)",
)
_TIMESTAMP_COLUMNS: tuple[str, ...] = ("timestamp", "datetime", "time", "date")

_cache: dict[str, Any] = {}


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def _resolve_path(path_str: str) -> Path:
    path = Path(path_str)
    if path.is_file():
        return path
    return _repo_root() / path_str


def _solar_path_for_site(site: str) -> str:
    if site == DEFAULT_SITE:
        return SOLAR_DATA_PATH
    return SOLAR_DATA_PATH.replace(DEFAULT_SITE, site)


def _align_columns(frame: pd.DataFrame, feature_names: Sequence[str]) -> pd.DataFrame:
    aligned = frame.reindex(columns=list(feature_names))
    numeric = frame.select_dtypes(include="number")
    fills = numeric.reindex(columns=list(feature_names)).mean()
    return aligned.fillna(fills).fillna(0.0).astype(float)


def _expand_to_horizon(frame: pd.DataFrame) -> pd.DataFrame:
    if frame.empty:
        return frame
    if len(frame) >= HORIZON_STEPS:
        return frame.iloc[:HORIZON_STEPS].copy()
    base = frame.iloc[[0]]
    expanded = pd.concat([base] * HORIZON_STEPS, ignore_index=True)
    if "hour" in expanded.columns:
        raw_hour = pd.to_numeric(expanded.loc[0, "hour"], errors="coerce")
        start_hour = int(0 if pd.isna(raw_hour) else raw_hour) % HOURS_IN_DAY
        expanded["hour"] = (start_hour + np.arange(HORIZON_STEPS)) % HOURS_IN_DAY
    return expanded


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


def _fallback_category_output(total_demand: Sequence[float]) -> DemandForecastOutput:
    totals = np.maximum(values_for_horizon(total_demand), 0.0)
    return DemandForecastOutput(
        total_demand_kw=totals.tolist(),
        ac_kw=(totals * FALLBACK_AC_SHARE).tolist(),
        lights_kw=(totals * FALLBACK_LIGHT_SHARE).tolist(),
        plugs_kw=(totals * FALLBACK_PLUG_SHARE).tolist(),
    )


def _fallback_solar_profile(start: pd.Timestamp, capacity_scale: float) -> list[float]:
    hours = (start.hour + np.arange(HORIZON_STEPS) * TIME_STEP_HOURS) % HOURS_IN_DAY
    daylight = SOLAR_FALLBACK_SUNSET_HOUR - SOLAR_FALLBACK_SUNRISE_HOUR
    if daylight <= 0:
        return np.zeros(HORIZON_STEPS, dtype=float).tolist()
    phase = (hours - SOLAR_FALLBACK_SUNRISE_HOUR) / daylight
    shape = np.sin(np.pi * np.clip(phase, 0.0, 1.0))
    peak_kw = DEFAULT_PV_CAPACITY_KWP * capacity_scale
    return (np.clip(shape, 0.0, None) * peak_kw).tolist()


def _load_single_booster(path: Path) -> Any | None:
    if xgb is None:
        return None
    try:
        regressor = xgb.XGBRegressor()
        regressor.load_model(str(path))
        return ("regressor", regressor)
    except Exception:
        try:
            booster = xgb.Booster()
            booster.load_model(str(path))
            return ("booster", booster)
        except Exception:
            return None


def _booster_from_payload(payload: Any) -> Any | None:
    if xgb is None:
        return None
    tmp_path = None
    try:
        raw = payload if isinstance(payload, str) else json.dumps(payload)
        with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False, encoding="utf-8") as handle:
            handle.write(raw)
            tmp_path = Path(handle.name)
        booster = xgb.Booster()
        booster.load_model(str(tmp_path))
        return booster
    except Exception:
        return None
    finally:
        if tmp_path is not None:
            tmp_path.unlink(missing_ok=True)


def _load_model_1a() -> Any | None:
    cache_key = "model_1a"
    if cache_key in _cache:
        return _cache[cache_key]
    path = _resolve_path(MODEL_1A_PATH)
    if not path.is_file():
        return None
    loaded = _load_single_booster(path)
    if loaded is not None:
        _cache[cache_key] = loaded
    return loaded


def _load_model_1b() -> list[tuple[str, Any]] | None:
    cache_key = "model_1b"
    if cache_key in _cache:
        return _cache[cache_key]
    path = _resolve_path(MODEL_1B_PATH)
    if not path.is_file() or xgb is None:
        return None
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        loaded = _load_single_booster(path)
        if loaded is None:
            return None
        bundle = [("booster_0", loaded[1])]
        _cache[cache_key] = bundle
        return bundle

    named: list[tuple[str, Any]] = []
    if isinstance(payload, dict) and "learner" in payload:
        loaded = _load_single_booster(path)
        if loaded is None:
            return None
        named = [("booster_0", loaded[1])]
    elif isinstance(payload, dict):
        items = payload.get("boosters", payload)
        if isinstance(items, dict):
            iterable = items.items()
        elif isinstance(items, list):
            iterable = ((f"booster_{idx}", spec) for idx, spec in enumerate(items))
        else:
            iterable = ()
        for key, spec in iterable:
            if key in {"config", "meta", "features", "feature_names"}:
                continue
            booster = _booster_from_payload(spec)
            if booster is not None:
                named.append((str(key), booster))
    elif isinstance(payload, list):
        for idx, spec in enumerate(payload):
            booster = _booster_from_payload(spec)
            if booster is not None:
                named.append((f"booster_{idx}", booster))

    if not named:
        return None
    _cache[cache_key] = named
    return named


def _predict_estimator(estimator: Any, frame: pd.DataFrame, feature_names: Sequence[str]) -> np.ndarray | None:
    aligned = _align_columns(frame, feature_names)
    if aligned.empty:
        return None
    try:
        kind, model = estimator if isinstance(estimator, tuple) else ("booster", estimator)
        if kind == "regressor":
            prediction = np.asarray(model.predict(aligned), dtype=float).reshape(-1)
        else:
            dmatrix = xgb.DMatrix(aligned.to_numpy(dtype=float), feature_names=list(feature_names))
            prediction = np.asarray(model.predict(dmatrix), dtype=float).reshape(-1)
        return prediction
    except Exception:
        return None


def _category_from_booster_name(name: str) -> str:
    key = name.lower()
    if "light" in key:
        return "lights"
    if "plug" in key or "equip" in key:
        return "plugs"
    if "ac" in key or "hvac" in key or "cool" in key:
        return "ac"
    return "index"


def _aggregate_shape(raw: np.ndarray, booster_names: Sequence[str]) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    n_steps, n_boosters = raw.shape
    named_groups = [_category_from_booster_name(name) for name in booster_names]
    use_names = any(group != "index" for group in named_groups)

    if use_names:
        ac = np.zeros(n_steps)
        lights = np.zeros(n_steps)
        plugs = np.zeros(n_steps)
        other = np.zeros(n_steps)
        for idx, group in enumerate(named_groups):
            column = np.clip(raw[:, idx], 0.0, None)
            if group == "ac":
                ac += column
            elif group == "lights":
                lights += column
            elif group == "plugs":
                plugs += column
            else:
                other += column
        plugs += other
        return ac, lights, plugs

    def _sum_indices(indices: Sequence[int]) -> np.ndarray:
        valid = [idx for idx in indices if 0 <= idx < n_boosters]
        if not valid:
            return np.zeros(n_steps)
        return np.clip(raw[:, valid], 0.0, None).sum(axis=1)

    ac = _sum_indices(MODEL_1B_AC_BOOSTER_INDICES)
    lights = _sum_indices(MODEL_1B_LIGHT_BOOSTER_INDICES)
    plugs = _sum_indices(MODEL_1B_PLUG_BOOSTER_INDICES) + _sum_indices(MODEL_1B_OTHER_BOOSTER_INDICES)
    return ac, lights, plugs


def _load_solar_frame(site: str) -> pd.DataFrame | None:
    cache_key = f"solar::{site}"
    if cache_key in _cache:
        return _cache[cache_key]
    path = _resolve_path(_solar_path_for_site(site))
    if not path.is_file():
        return None
    try:
        frame = pd.read_csv(path)
    except Exception:
        return None

    stamp_col = next((name for name in _TIMESTAMP_COLUMNS if name in frame.columns), None)
    if stamp_col is not None:
        frame[stamp_col] = pd.to_datetime(frame[stamp_col], errors="coerce")
        frame = frame.dropna(subset=[stamp_col]).set_index(stamp_col)
    else:
        date_parts = {"Year", "Month", "Day", "Hour"}
        if date_parts.issubset(set(frame.columns)):
            frame.index = pd.to_datetime(frame[["Year", "Month", "Day", "Hour"]], errors="coerce")
            frame = frame[~frame.index.isna()]
        else:
            return None

    frame = frame.sort_index()
    kw_col = next((name for name in _SOLAR_KW_COLUMNS if name in frame.columns), None)
    watt_col = next((name for name in _SOLAR_W_COLUMNS if name in frame.columns), None)
    if kw_col is not None:
        frame["solar_kw"] = pd.to_numeric(frame[kw_col], errors="coerce")
    elif watt_col is not None:
        frame["solar_kw"] = pd.to_numeric(frame[watt_col], errors="coerce") / WATTS_PER_KILOWATT
    else:
        numeric = frame.select_dtypes(include="number")
        if numeric.empty:
            return None
        frame["solar_kw"] = pd.to_numeric(numeric.iloc[:, -1], errors="coerce")

    frame["solar_kw"] = frame["solar_kw"].fillna(0.0)
    _cache[cache_key] = frame
    return frame


def predict_total_demand(input_df: pd.DataFrame | Sequence[Any] | dict[str, Any] | None = None) -> list[float]:
    """Model 1A: 24-hour total demand forecast (kW) from nine numerical features."""
    frame = features_to_frame(input_df)
    expanded = _expand_to_horizon(frame)
    model = _load_model_1a()
    if model is not None and not expanded.empty:
        prediction = _predict_estimator(model, expanded, MODEL_1A_FEATURES)
        if prediction is not None:
            return np.maximum(values_for_horizon(prediction), 0.0).tolist()
    return _hourly_baseline_vector(frame if not frame.empty else None, _DEMAND_VALUE_COLUMNS)


def disaggregate_demand(
    context_df: pd.DataFrame | Sequence[Any] | dict[str, Any] | None,
    total_demand_array: Sequence[float],
) -> DemandForecastOutput:
    """Model 1B: map total kW magnitude onto AC, lighting, and plug shapes."""
    totals = np.maximum(values_for_horizon(total_demand_array), 0.0)
    frame = _expand_to_horizon(features_to_frame(context_df))
    bundle = _load_model_1b()
    if bundle is None or frame.empty:
        return _fallback_category_output(totals)

    columns: list[np.ndarray] = []
    names: list[str] = []
    for name, booster in bundle:
        prediction = _predict_estimator(booster, frame, MODEL_1B_FEATURES)
        if prediction is None:
            return _fallback_category_output(totals)
        columns.append(values_for_horizon(prediction))
        names.append(name)

    raw = np.column_stack(columns)
    ac_shape, light_shape, plug_shape = _aggregate_shape(raw, names)
    denom = ac_shape + light_shape + plug_shape
    safe_denom = np.where(denom > 0, denom, 1.0)
    ac_kw = np.where(denom > 0, totals * ac_shape / safe_denom, totals * FALLBACK_AC_SHARE)
    lights_kw = np.where(denom > 0, totals * light_shape / safe_denom, totals * FALLBACK_LIGHT_SHARE)
    plugs_kw = np.where(denom > 0, totals * plug_shape / safe_denom, totals * FALLBACK_PLUG_SHARE)
    return DemandForecastOutput(
        total_demand_kw=totals.tolist(),
        ac_kw=ac_kw.tolist(),
        lights_kw=lights_kw.tolist(),
        plugs_kw=plugs_kw.tolist(),
    )


def predict_solar_kw(
    timestamp: pd.Timestamp | str | None = None,
    site: str = DEFAULT_SITE,
    capacity_scale: float = DEFAULT_CAPACITY_SCALE,
) -> list[float]:
    """Model 2: 24-hour PVWatts/NSRDB solar yield (kW) starting at ``timestamp``."""
    start = pd.Timestamp(timestamp) if timestamp is not None else pd.Timestamp.now()
    solar = _load_solar_frame(site)
    if solar is None or solar.empty:
        return _fallback_solar_profile(start, capacity_scale)

    horizon_index = pd.date_range(
        start=start,
        periods=HORIZON_STEPS,
        freq=pd.Timedelta(hours=TIME_STEP_HOURS),
    )
    lookup = (
        solar.assign(doy=solar.index.dayofyear, hod=solar.index.hour)
        .groupby(["doy", "hod"], sort=True)["solar_kw"]
        .mean()
    )
    target = pd.MultiIndex.from_arrays([horizon_index.dayofyear, horizon_index.hour])
    values = lookup.reindex(target).to_numpy(dtype=float)
    if np.isnan(values).any():
        values = pd.Series(values).interpolate(limit_direction="both").fillna(0.0).to_numpy()
    return np.maximum(values * capacity_scale, 0.0).tolist()


def predict_demand(input_df: pd.DataFrame | Sequence[Any] | dict[str, Any] | None = None) -> list[float]:
    """PRD-compatible wrapper around Model 1A total demand."""
    return predict_total_demand(input_df)


def predict_solar(
    input_df: pd.DataFrame | None = None,
    timestamp: pd.Timestamp | str | None = None,
    site: str = DEFAULT_SITE,
    capacity_scale: float = DEFAULT_CAPACITY_SCALE,
) -> list[float]:
    """PRD-compatible wrapper around the PVWatts time-series engine."""
    start = timestamp
    if start is None and input_df is not None and not input_df.empty:
        if isinstance(input_df.index, pd.DatetimeIndex):
            start = input_df.index[0]
        else:
            stamp_col = next((name for name in _TIMESTAMP_COLUMNS if name in input_df.columns), None)
            if stamp_col is not None:
                start = pd.to_datetime(input_df[stamp_col], errors="coerce").dropna()
                start = start.iloc[0] if not start.empty else None
    return predict_solar_kw(start, site=site, capacity_scale=capacity_scale)
