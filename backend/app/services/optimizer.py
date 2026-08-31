"""PuLP linear program for cost-minimizing energy dispatch over the forecast horizon."""

from __future__ import annotations

from typing import Sequence

import numpy as np
import pulp

from backend.app.core.config import (
    BATTERY_DEFAULT_CAPACITY,
    BATTERY_EFFICIENCY,
    BATTERY_INITIAL_SOC,
    BATTERY_MAX_CHARGE_KW,
    BATTERY_MAX_DISCHARGE_KW,
    BATTERY_MAX_SOC,
    BATTERY_MIN_SOC,
    HORIZON_STEPS,
    HOURS_IN_DAY,
    PERCENT_SCALE,
    SOLVER_TIME_LIMIT_SECONDS,
    TIME_STEP_HOURS,
)
from backend.app.services.schemas import (
    HourlyEnergyFlow,
    OptimizationResult,
    build_optimization_result,
    values_for_horizon,
)
from backend.app.services.tariff import feed_in_rate_vector, tou_rate_vector


def _non_negative_horizon(values: Sequence[float]) -> np.ndarray:
    return np.maximum(values_for_horizon(values), 0.0)


def _pulp_float(variable: pulp.LpVariable) -> float:
    value = pulp.value(variable)
    return float(value) if value is not None else 0.0


def run_pulp_optimization(
    demand_list: Sequence[float],
    solar_list: Sequence[float],
) -> OptimizationResult:
    """Minimize grid cost minus feed-in revenue subject to load, solar, and SOC constraints."""
    demand = _non_negative_horizon(demand_list)
    solar = _non_negative_horizon(solar_list)
    tariffs = tou_rate_vector()
    feed_in = feed_in_rate_vector()

    steps = range(HORIZON_STEPS)
    eta = BATTERY_EFFICIENCY
    dt = TIME_STEP_HOURS
    capacity = BATTERY_DEFAULT_CAPACITY
    min_energy = BATTERY_MIN_SOC * capacity
    max_energy = BATTERY_MAX_SOC * capacity
    initial_soc = BATTERY_INITIAL_SOC * capacity

    problem = pulp.LpProblem("cu_bems_cost_min", pulp.LpMinimize)

    grid_to_load = pulp.LpVariable.dicts("grid_to_load", steps, lowBound=0)
    solar_to_load = pulp.LpVariable.dicts("solar_to_load", steps, lowBound=0)
    solar_to_battery = pulp.LpVariable.dicts("solar_to_battery", steps, lowBound=0)
    solar_to_grid = pulp.LpVariable.dicts("solar_to_grid", steps, lowBound=0)
    battery_to_load = pulp.LpVariable.dicts("battery_to_load", steps, lowBound=0)
    soc = pulp.LpVariable.dicts("soc", steps, lowBound=min_energy, upBound=max_energy)

    problem += pulp.lpSum(
        (grid_to_load[t] * tariffs[t] - solar_to_grid[t] * feed_in[t]) * dt for t in steps
    )

    for t in steps:
        problem += (
            solar_to_load[t] + battery_to_load[t] + grid_to_load[t] == float(demand[t]),
            f"load_balance_{t}",
        )
        problem += (
            solar_to_load[t] + solar_to_battery[t] + solar_to_grid[t] <= float(solar[t]),
            f"solar_balance_{t}",
        )
        problem += solar_to_battery[t] <= BATTERY_MAX_CHARGE_KW, f"charge_limit_{t}"
        problem += battery_to_load[t] <= BATTERY_MAX_DISCHARGE_KW, f"discharge_limit_{t}"

        previous_soc = initial_soc if t == 0 else soc[t - 1]
        problem += (
            soc[t]
            == previous_soc
            + solar_to_battery[t] * eta * dt
            - battery_to_load[t] / eta * dt,
            f"soc_continuity_{t}",
        )

    solver = pulp.PULP_CBC_CMD(msg=False, timeLimit=SOLVER_TIME_LIMIT_SECONDS)
    problem.solve(solver)

    flows: list[HourlyEnergyFlow] = []
    grid_kw = np.zeros(HORIZON_STEPS)
    export_kw = np.zeros(HORIZON_STEPS)
    for t in steps:
        grid_kw[t] = _pulp_float(grid_to_load[t])
        export_kw[t] = _pulp_float(solar_to_grid[t])
        soc_kwh = _pulp_float(soc[t])
        flows.append(
            HourlyEnergyFlow(
                timestamp=f"{int(t % HOURS_IN_DAY):02d}:00",
                demand_kw=float(demand[t]),
                solar_gen_kw=float(solar[t]),
                grid_to_load_kw=grid_kw[t],
                solar_to_load_kw=_pulp_float(solar_to_load[t]),
                solar_to_battery_kw=_pulp_float(solar_to_battery[t]),
                solar_to_grid_kw=export_kw[t],
                battery_to_load_kw=_pulp_float(battery_to_load[t]),
                battery_soc_kwh=soc_kwh,
                battery_soc_percent=(soc_kwh / capacity) * PERCENT_SCALE if capacity else 0.0,
                tariff_rate=float(tariffs[t]),
            )
        )

    total_cost_inr = float(np.sum((grid_kw * tariffs - export_kw * feed_in) * dt))
    return build_optimization_result(flows, total_cost_inr)
