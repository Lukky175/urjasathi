"""User-facing recommendations from optimizer flows and anomaly flags."""

from __future__ import annotations

from dataclasses import asdict
from typing import Any, Sequence

import pandas as pd

from backend.app.core.config import (
    BATTERY_MAX_SOC,
    BATTERY_MIN_SOC,
    PERCENT_SCALE,
    TARIFF_PEAK_INR_PER_KWH,
)
from backend.app.services.schemas import OptimizationResult, Recommendation


def _flows_frame(opt_result: OptimizationResult) -> pd.DataFrame:
    if not opt_result.hourly_flows:
        return pd.DataFrame()
    return pd.DataFrame([asdict(flow) for flow in opt_result.hourly_flows])


def _recommendation_from_row(
    row: pd.Series,
    category: str,
    severity: str,
    message: str,
) -> Recommendation:
    return Recommendation(
        timestamp=str(row.get("timestamp", "")),
        category=category,
        severity=severity,
        message=message,
    )


def _solar_recommendations(flows: pd.DataFrame) -> list[Recommendation]:
    solar_mean = float(flows["solar_gen_kw"].mean())
    high_solar = flows["solar_gen_kw"] >= solar_mean
    export = flows.loc[high_solar & (flows["solar_to_grid_kw"] > 0)]
    if export.empty:
        return []
    row = flows.loc[export["solar_to_grid_kw"].idxmax()]
    return [
        _recommendation_from_row(
            row,
            "SOLAR",
            "INFO",
            (
                f"High solar ({row['solar_gen_kw']:.1f} kW) with "
                f"{row['solar_to_grid_kw']:.1f} kW exported; charge the battery "
                "to raise on-site self-consumption."
            ),
        )
    ]


def _peak_and_battery_recommendations(flows: pd.DataFrame) -> list[Recommendation]:
    recs: list[Recommendation] = []
    at_peak = flows["tariff_rate"] >= TARIFF_PEAK_INR_PER_KWH
    peak_grid = flows.loc[at_peak & (flows["grid_to_load_kw"] > 0)]
    if not peak_grid.empty:
        row = flows.loc[peak_grid["grid_to_load_kw"].idxmax()]
        recs.append(
            _recommendation_from_row(
                row,
                "BATTERY",
                "WARNING",
                (
                    f"Peak-tariff grid draw of {row['grid_to_load_kw']:.1f} kW; "
                    "shift load or discharge the battery to cut peak demand."
                ),
            )
        )

    charge_on_peak = flows.loc[at_peak & (flows["solar_to_battery_kw"] > 0)]
    if not charge_on_peak.empty:
        row = flows.loc[charge_on_peak["solar_to_battery_kw"].idxmax()]
        recs.append(
            _recommendation_from_row(
                row,
                "BATTERY",
                "INFO",
                (
                    f"Battery charging {row['solar_to_battery_kw']:.1f} kW during a peak-tariff "
                    "interval; prefer charging in off-peak or high-solar shoulder hours."
                ),
            )
        )

    discharge_headroom_pct = ((BATTERY_MIN_SOC + BATTERY_MAX_SOC) / 2) * PERCENT_SCALE
    unused_battery = flows.loc[
        at_peak
        & (flows["grid_to_load_kw"] > 0)
        & (flows["battery_to_load_kw"] <= 0)
        & (flows["battery_soc_percent"] >= discharge_headroom_pct)
    ]
    if not unused_battery.empty:
        row = flows.loc[unused_battery["grid_to_load_kw"].idxmax()]
        recs.append(
            _recommendation_from_row(
                row,
                "BATTERY",
                "WARNING",
                (
                    f"SOC is {row['battery_soc_percent']:.1f}% while grid still supplies "
                    f"{row['grid_to_load_kw']:.1f} kW on peak; discharge stored energy to the load."
                ),
            )
        )
    return recs


def _anomaly_recommendations(anomaly_flags: Sequence[dict[str, Any]]) -> list[Recommendation]:
    recs: list[Recommendation] = []
    for flag in anomaly_flags:
        severity = str(flag.get("severity", "WARNING"))
        if severity not in {"INFO", "WARNING", "ALERT"}:
            severity = "WARNING"
        category_name = str(flag.get("category", "load"))
        value_kw = float(flag.get("value_kw", 0.0))
        z_value = float(flag.get("zscore", 0.0))
        threshold_kw = float(flag.get("threshold_kw", 0.0))
        recs.append(
            Recommendation(
                timestamp=str(flag.get("timestamp", "")),
                category="ANOMALY",
                severity=severity,
                message=(
                    f"{category_name} load {value_kw:.1f} kW (z={z_value:.2f}) "
                    f"exceeded the {threshold_kw:.1f} kW category threshold."
                ),
            )
        )
    return recs


def generate_recommendations(
    opt_result: OptimizationResult,
    anomaly_flags: Sequence[dict[str, Any]] | None = None,
) -> list[Recommendation]:
    """Turn solver flows and category flags into actionable ``Recommendation`` objects."""
    recommendations: list[Recommendation] = []
    flows = _flows_frame(opt_result)
    if not flows.empty:
        recommendations.extend(_solar_recommendations(flows))
        recommendations.extend(_peak_and_battery_recommendations(flows))
    recommendations.extend(_anomaly_recommendations(anomaly_flags or []))
    return recommendations
