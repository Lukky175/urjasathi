"""Plain Python dataclasses for Person A service inputs and outputs.

These types are the contract with Person B. They must not import FastAPI
or any HTTP layer.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import List, Sequence

import numpy as np
import pandas as pd

from backend.app.core.config import HORIZON_STEPS, PERCENT_SCALE, TIME_STEP_HOURS


@dataclass
class HourlyEnergyFlow:
    timestamp: str
    demand_kw: float
    solar_gen_kw: float
    grid_to_load_kw: float
    solar_to_load_kw: float
    solar_to_battery_kw: float
    solar_to_grid_kw: float
    battery_to_load_kw: float
    battery_soc_kwh: float
    battery_soc_percent: float
    tariff_rate: float


@dataclass
class OptimizationResult:
    horizon_hours: int
    total_cost_inr: float
    total_grid_kwh: float
    total_solar_kwh: float
    solar_utilization_pct: float
    hourly_flows: List[HourlyEnergyFlow]


@dataclass
class Recommendation:
    timestamp: str
    category: str  # "SOLAR", "BATTERY", "ANOMALY"
    severity: str  # "INFO", "WARNING", "ALERT"
    message: str


def values_for_horizon(values: Sequence[float]) -> np.ndarray:
    """Pad or trim a 1-D series to ``HORIZON_STEPS`` using the series mean as fill."""
    arr = np.asarray(values, dtype=float).reshape(-1)
    arr = np.nan_to_num(arr, nan=0.0, posinf=0.0, neginf=0.0)
    if arr.size >= HORIZON_STEPS:
        return arr[:HORIZON_STEPS]
    fill = float(arr.mean()) if arr.size else 0.0
    return np.pad(arr, (0, HORIZON_STEPS - arr.size), constant_values=fill)


def build_optimization_result(
    hourly_flows: List[HourlyEnergyFlow],
    total_cost_inr: float,
) -> OptimizationResult:
    """Aggregate hourly flows into the standard ``OptimizationResult`` contract."""
    frame = pd.DataFrame([asdict(flow) for flow in hourly_flows])
    energy_scale = TIME_STEP_HOURS
    total_grid_kwh = float(frame["grid_to_load_kw"].sum() * energy_scale)
    total_solar_kwh = float(frame["solar_gen_kw"].sum() * energy_scale)
    solar_used_kwh = float(
        (frame["solar_to_load_kw"] + frame["solar_to_battery_kw"]).sum() * energy_scale
    )
    solar_utilization_pct = (
        (solar_used_kwh / total_solar_kwh) * PERCENT_SCALE if total_solar_kwh else 0.0
    )
    return OptimizationResult(
        horizon_hours=int(HORIZON_STEPS * TIME_STEP_HOURS),
        total_cost_inr=float(total_cost_inr),
        total_grid_kwh=total_grid_kwh,
        total_solar_kwh=total_solar_kwh,
        solar_utilization_pct=solar_utilization_pct,
        hourly_flows=hourly_flows,
    )


@dataclass
class MetricsComparison:
    baseline_cost_inr: float
    optimized_cost_inr: float
    cost_reduction_pct: float
    grid_reduction_pct: float
    solar_utilization_pct: float
    peak_demand_reduction_pct: float
