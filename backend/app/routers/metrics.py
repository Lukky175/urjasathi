from fastapi import APIRouter
from datetime import datetime, timedelta
from app.schemas.metrics import MetricsComparisonResponse
from app.services.forecaster import predict_demand, predict_solar
from app.services.optimizer import run_pulp_optimization
from app.services.baseline import run_baseline_allocation
from app.services.metrics import compare_performance
from app.services.schemas import Model1AFeatures

router = APIRouter(prefix="/metrics", tags=["Metrics"])

def _default_demand_features(now: datetime) -> Model1AFeatures:
    return Model1AFeatures(
        hour=float(now.hour), day_of_week=float(now.weekday()), month=float(now.month),
        is_weekend=1.0 if now.weekday() >= 5 else 0.0, temperature_c=28.0,
        relative_humidity=55.0, occupancy=0.7, lag_demand_1h=35.0, lag_demand_24h=35.0,
    )

@router.get("/comparison", response_model=MetricsComparisonResponse)
def get_metrics_comparison():
    now = datetime.now()
    demand = predict_demand(_default_demand_features(now))
    solar = predict_solar(timestamp=now)
    baseline_result = run_baseline_allocation(demand, solar)
    optimized_result = run_pulp_optimization(demand, solar)
    comparison = compare_performance(baseline_result, optimized_result)
    return MetricsComparisonResponse(
        period_start=now.strftime("%Y-%m-%d"),
        period_end=(now + timedelta(hours=24)).strftime("%Y-%m-%d"),
        grid_reduction_pct=comparison.grid_reduction_pct,
        cost_reduction_pct=comparison.cost_reduction_pct,
        solar_utilization_pct=comparison.solar_utilization_pct,
        peak_grid_demand_reduction_kw=comparison.peak_demand_reduction_pct,
        baseline_cost=comparison.baseline_cost_inr,
        optimized_cost=comparison.optimized_cost_inr,
    )
