from fastapi import APIRouter
from datetime import datetime, timedelta
from app.schemas.simulate import SimulateRequest, SimulateResponse
from app.schemas.energy_flow import EnergyFlowResponse, EnergyFlowPoint
from app.schemas.metrics import MetricsComparisonResponse

router = APIRouter(prefix="/simulate", tags=["Simulate"])

@router.post("", response_model=SimulateResponse)
def run_simulation(request: SimulateRequest):
    now = datetime.now()
    points = [
        EnergyFlowPoint(
            timestamp=now + timedelta(hours=i),
            solar_to_building=10.0,
            solar_to_battery=request.battery_capacity_kwh * 0.05,
            solar_to_grid=1.0,
            battery_to_building=3.0,
            grid_to_building=8.0,
        )
        for i in range(request.horizon_hours)
    ]
    flow = EnergyFlowResponse(building_id="BLDG-001", horizon_hours=request.horizon_hours, flow=points)
    metrics = MetricsComparisonResponse(
        period_start=now.strftime("%Y-%m-%d"),
        period_end=(now + timedelta(hours=request.horizon_hours)).strftime("%Y-%m-%d"),
        grid_reduction_pct=30.0,
        cost_reduction_pct=25.0,
        solar_utilization_pct=85.0,
        peak_grid_demand_reduction_kw=10.0,
        baseline_cost=4500.0,
        optimized_cost=3375.0,
    )
    return SimulateResponse(energy_flow=flow, metrics=metrics)
