from fastapi import APIRouter
from datetime import datetime, timedelta
from app.schemas.energy_flow import EnergyFlowResponse, EnergyFlowPoint
from app.services.forecaster import predict_demand, predict_solar
from app.services.optimizer import run_pulp_optimization
from app.services.schemas import Model1AFeatures

router = APIRouter(prefix="/energy-flow", tags=["Energy Flow"])

def _default_demand_features(now: datetime) -> Model1AFeatures:
    return Model1AFeatures(
        hour=float(now.hour), day_of_week=float(now.weekday()), month=float(now.month),
        is_weekend=1.0 if now.weekday() >= 5 else 0.0, temperature_c=28.0,
        relative_humidity=55.0, occupancy=0.7, lag_demand_1h=35.0, lag_demand_24h=35.0,
    )

@router.get("", response_model=EnergyFlowResponse)
def get_energy_flow(horizon: int = 24):
    now = datetime.now()
    demand = predict_demand(_default_demand_features(now))
    solar = predict_solar(timestamp=now)
    result = run_pulp_optimization(demand, solar)
    points = [
        EnergyFlowPoint(
            timestamp=now + timedelta(hours=i),
            solar_to_building=flow.solar_to_load_kw,
            solar_to_battery=flow.solar_to_battery_kw,
            solar_to_grid=flow.solar_to_grid_kw,
            battery_to_building=flow.battery_to_load_kw,
            grid_to_building=flow.grid_to_load_kw,
        )
        for i, flow in enumerate(result.hourly_flows[:horizon])
    ]
    return EnergyFlowResponse(building_id="BLDG-001", horizon_hours=len(points), flow=points)
