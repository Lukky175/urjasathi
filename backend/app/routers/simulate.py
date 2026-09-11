from fastapi import APIRouter
from datetime import datetime, timedelta
from app.schemas.simulate import SimulateRequest, SimulateResponse
from app.schemas.energy_flow import EnergyFlowResponse, EnergyFlowPoint
from app.schemas.metrics import MetricsComparisonResponse
from app.services.forecaster import predict_demand, predict_solar
from app.services.optimizer import run_pulp_optimization
from app.services.baseline import run_baseline_allocation
from app.services.metrics import compare_performance
from app.services.schemas import Model1AFeatures

router = APIRouter(prefix="/simulate", tags=["Simulate"])

def _default_demand_features(now: datetime) -> Model1AFeatures:
    return Model1AFeatures(
        hour=float(now.hour), day_of_week=float(now.weekday()), month=float(now.month),
        is_weekend=1.0 if now.weekday() >= 5 else 0.0, temperature_c=28.0,
        relative_humidity=55.0, occupancy=0.7, lag_demand_1h=35.0, lag_demand_24h=35.0,
    )

@router.post("", response_model=SimulateResponse)
def run_simulation(request: SimulateRequest):
    now = datetime.now()
    demand = predict_demand(_default_demand_features(now))
    solar_raw = predict_solar(timestamp=now)
    scale = request.solar_capacity_kw / 40.0 if request.solar_capacity_kw else 1.0
    solar = [s * scale for s in solar_raw]

    baseline_result = run_baseline_allocation(demand, solar)
    optimized_result = run_pulp_optimization(demand, solar)
    comparison = compare_performance(baseline_result, optimized_result)

    points = [
        EnergyFlowPoint(
            timestamp=now + timedelta(hours=i),
            solar_to_building=flow.solar_to_load_kw,
            solar_to_battery=flow.solar_to_battery_kw,
            solar_to_grid=flow.solar_to_grid_kw,
            battery_to_building=flow.battery_to_load_kw,
            grid_to_building=flow.grid_to_load_kw,
        )
        for i, flow in enumerate(optimized_result.hourly_flows[:request.horizon_hours])
    ]
    flow_response = EnergyFlowResponse(building_id="BLDG-001", horizon_hours=len(points), flow=points)
    metrics_response = MetricsComparisonResponse(
        period_start=now.strftime("%Y-%m-%d"),
        period_end=(now + timedelta(hours=request.horizon_hours)).strftime("%Y-%m-%d"),
        grid_reduction_pct=comparison.grid_reduction_pct,
        cost_reduction_pct=comparison.cost_reduction_pct,
        solar_utilization_pct=comparison.solar_utilization_pct,
        peak_grid_demand_reduction_kw=comparison.peak_demand_reduction_pct,
        baseline_cost=comparison.baseline_cost_inr,
        optimized_cost=comparison.optimized_cost_inr,
    )
    return SimulateResponse(energy_flow=flow_response, metrics=metrics_response)
