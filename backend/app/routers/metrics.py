from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.schemas.metrics import MetricsComparisonResponse
from app.services.dispatch import get_hourly_dispatch
from app.services.dependencies import get_current_user

router = APIRouter(prefix="/metrics", tags=["Metrics"])


class HourlyCostPoint(BaseModel):
    timestamp: datetime
    baseline_cost_inr: float
    optimized_cost_inr: float
    savings_inr: float


class CostBreakdownResponse(BaseModel):
    period_start: str
    period_end: str
    breakdown: list[HourlyCostPoint]


@router.get("/comparison", response_model=MetricsComparisonResponse)
def get_metrics_comparison(horizon: int = 24, current_user: dict = Depends(get_current_user)):
    now = datetime.now()
    is_bennett = current_user.get("email") == "admin@bennett.edu.in"
    if not is_bennett:
        return MetricsComparisonResponse(
            period_start=now.strftime("%Y-%m-%d"),
            period_end=(now + timedelta(hours=horizon)).strftime("%Y-%m-%d"),
            grid_reduction_pct=0.0,
            cost_reduction_pct=0.0,
            solar_utilization_pct=0.0,
            peak_grid_demand_reduction_kw=0.0,
            baseline_cost=0.0,
            optimized_cost=0.0,
        )

    dispatch = get_hourly_dispatch(horizon, now)

    optimized_cost = sum(
        d.get("grid_import_cost", {}).get("total_cost_inr", 0.0) - d.get("grid_export_profit", {}).get("total_profit_earned_inr", 0.0)
        for d in dispatch
    )
    baseline_cost = sum(
        d["import_rate_inr_kwh"] * max(0.0, d["total_demand_kw"] - d["solar_generation_kw"]) for d in dispatch
    )
    total_solar = sum(d["solar_generation_kw"] for d in dispatch) or 1.0
    solar_wasted = sum(d.get("grid_export_profit", {}).get("power_exported_kw", 0.0) if d["net_power_kw"] > 0 else 0.0 for d in dispatch)
    solar_utilization_pct = max(0.0, 100.0 - (solar_wasted / total_solar * 100.0))

    grid_baseline_kwh = sum(max(0.0, d["total_demand_kw"] - d["solar_generation_kw"]) for d in dispatch)
    grid_optimized_kwh = sum(d.get("grid_import_cost", {}).get("import_kw", 0.0) for d in dispatch)
    grid_reduction_pct = ((grid_baseline_kwh - grid_optimized_kwh) / grid_baseline_kwh * 100.0) if grid_baseline_kwh > 0 else 0.0

    cost_reduction_pct = ((baseline_cost - optimized_cost) / baseline_cost * 100.0) if baseline_cost > 0 else 0.0
    peak_baseline = max((d["total_demand_kw"] for d in dispatch), default=0.0)
    peak_optimized = max((d["total_demand_kw"] - d.get("battery_action", {}).get("power_delivered_kw", 0.0) for d in dispatch), default=0.0)

    return MetricsComparisonResponse(
        period_start=now.strftime("%Y-%m-%d"),
        period_end=(now + timedelta(hours=horizon)).strftime("%Y-%m-%d"),
        grid_reduction_pct=round(grid_reduction_pct, 2),
        cost_reduction_pct=round(cost_reduction_pct, 2),
        solar_utilization_pct=round(solar_utilization_pct, 2),
        peak_grid_demand_reduction_kw=round(peak_baseline - peak_optimized, 2),
        baseline_cost=round(baseline_cost, 2),
        optimized_cost=round(optimized_cost, 2),
    )


@router.get("/cost-breakdown", response_model=CostBreakdownResponse)
def get_cost_breakdown(horizon: int = 24, current_user: dict = Depends(get_current_user)):
    now = datetime.now()
    is_bennett = current_user.get("email") == "admin@bennett.edu.in"
    if not is_bennett:
        breakdown = [
            HourlyCostPoint(
                timestamp=now + timedelta(hours=i),
                baseline_cost_inr=0.0,
                optimized_cost_inr=0.0,
                savings_inr=0.0,
            ) for i in range(horizon)
        ]
        return CostBreakdownResponse(
            period_start=now.strftime("%Y-%m-%d"),
            period_end=(now + timedelta(hours=horizon)).strftime("%Y-%m-%d"),
            breakdown=breakdown,
        )

    dispatch = get_hourly_dispatch(horizon, now)

    breakdown = []
    for i, d in enumerate(dispatch):
        baseline_cost = d["import_rate_inr_kwh"] * max(0.0, d["total_demand_kw"] - d["solar_generation_kw"])
        optimized_cost = (
            d.get("grid_import_cost", {}).get("total_cost_inr", 0.0)
            - d.get("grid_export_profit", {}).get("total_profit_earned_inr", 0.0)
        )
        breakdown.append(HourlyCostPoint(
            timestamp=now + timedelta(hours=i),
            baseline_cost_inr=round(baseline_cost, 2),
            optimized_cost_inr=round(optimized_cost, 2),
            savings_inr=round(baseline_cost - optimized_cost, 2),
        ))

    return CostBreakdownResponse(
        period_start=now.strftime("%Y-%m-%d"),
        period_end=(now + timedelta(hours=horizon)).strftime("%Y-%m-%d"),
        breakdown=breakdown,
    )