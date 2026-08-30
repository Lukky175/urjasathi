"""Rule-based Solar → Load → Battery → Grid allocator for baseline comparison."""

from __future__ import annotations

from typing import Sequence

import numpy as np

from backend.app.core.config import HORIZON_STEPS, HOURS_IN_DAY, TIME_STEP_HOURS
from backend.app.services.battery import BatteryState
from backend.app.services.schemas import (
    HourlyEnergyFlow,
    OptimizationResult,
    build_optimization_result,
    values_for_horizon,
)
from backend.app.services.tariff import feed_in_rate_vector, tou_rate_vector


def _non_negative_horizon(values: Sequence[float]) -> np.ndarray:
    return np.maximum(values_for_horizon(values), 0.0)


def run_baseline_allocation(
    demand_list: Sequence[float],
    solar_list: Sequence[float],
) -> OptimizationResult:
    """Allocate energy with the greedy heuristic over ``HORIZON_STEPS``."""
    demand = _non_negative_horizon(demand_list)
    solar = _non_negative_horizon(solar_list)
    tariffs = tou_rate_vector()
    feed_in = feed_in_rate_vector()

    solar_to_load = np.minimum(solar, demand)
    residual_solar = solar - solar_to_load
    unmet_load = demand - solar_to_load

    battery = BatteryState()
    flows: list[HourlyEnergyFlow] = []
    charge_kw = np.zeros(HORIZON_STEPS)
    discharge_kw = np.zeros(HORIZON_STEPS)
    export_kw = np.zeros(HORIZON_STEPS)
    grid_kw = np.zeros(HORIZON_STEPS)

    for step in range(HORIZON_STEPS):
        applied_charge, applied_discharge = battery.apply_flow(
            float(residual_solar[step]),
            float(unmet_load[step]),
            TIME_STEP_HOURS,
        )
        charge_kw[step] = applied_charge
        discharge_kw[step] = applied_discharge
        export_kw[step] = residual_solar[step] - applied_charge
        grid_kw[step] = unmet_load[step] - applied_discharge
        flows.append(
            HourlyEnergyFlow(
                timestamp=f"{int(step % HOURS_IN_DAY):02d}:00",
                demand_kw=float(demand[step]),
                solar_gen_kw=float(solar[step]),
                grid_to_load_kw=float(grid_kw[step]),
                solar_to_load_kw=float(solar_to_load[step]),
                solar_to_battery_kw=float(charge_kw[step]),
                solar_to_grid_kw=float(export_kw[step]),
                battery_to_load_kw=float(discharge_kw[step]),
                battery_soc_kwh=float(battery.soc_kwh),
                battery_soc_percent=float(battery.soc_percent),
                tariff_rate=float(tariffs[step]),
            )
        )

    total_cost_inr = float(
        np.sum((grid_kw * tariffs - export_kw * feed_in) * TIME_STEP_HOURS)
    )
    return build_optimization_result(flows, total_cost_inr)
