from fastapi import APIRouter
from app.schemas.metrics import MetricsComparisonResponse

router = APIRouter(prefix="/metrics", tags=["Metrics"])

@router.get("/comparison", response_model=MetricsComparisonResponse)
def get_metrics_comparison():
    return MetricsComparisonResponse(
        period_start="2026-08-23",
        period_end="2026-08-30",
        grid_reduction_pct=32.5,
        cost_reduction_pct=27.8,
        solar_utilization_pct=88.0,
        peak_grid_demand_reduction_kw=12.4,
        baseline_cost=4500.0,
        optimized_cost=3249.0,
    )
