"""Baseline vs optimizer KPI comparison."""

from __future__ import annotations

from dataclasses import asdict

import pandas as pd

from backend.app.core.config import PERCENT_SCALE
from backend.app.services.schemas import MetricsComparison, OptimizationResult


def reduction_pct(baseline_value: float, optimized_value: float) -> float:
    """Percent reduction of ``optimized_value`` relative to ``baseline_value``."""
    if baseline_value == 0:
        return 0.0
    return ((baseline_value - optimized_value) / baseline_value) * PERCENT_SCALE


def _peak_grid_kw(result: OptimizationResult) -> float:
    if not result.hourly_flows:
        return 0.0
    frame = pd.DataFrame([asdict(flow) for flow in result.hourly_flows])
    return float(frame["grid_to_load_kw"].max())


def compare_performance(
    baseline_result: OptimizationResult,
    opt_result: OptimizationResult,
) -> MetricsComparison:
    """Compare heuristic baseline vs AI optimizer on cost, grid, solar, and peak demand."""
    return MetricsComparison(
        baseline_cost_inr=float(baseline_result.total_cost_inr),
        optimized_cost_inr=float(opt_result.total_cost_inr),
        cost_reduction_pct=reduction_pct(
            baseline_result.total_cost_inr, opt_result.total_cost_inr
        ),
        grid_reduction_pct=reduction_pct(
            baseline_result.total_grid_kwh, opt_result.total_grid_kwh
        ),
        solar_utilization_pct=float(opt_result.solar_utilization_pct),
        peak_demand_reduction_pct=reduction_pct(
            _peak_grid_kw(baseline_result), _peak_grid_kw(opt_result)
        ),
    )
