from fastapi import APIRouter
from datetime import datetime, timedelta
from app.schemas.energy_flow import EnergyFlowResponse, EnergyFlowPoint

router = APIRouter(prefix="/energy-flow", tags=["Energy Flow"])

@router.get("", response_model=EnergyFlowResponse)
def get_energy_flow(horizon: int = 24):
    now = datetime.now()
    points = [
        EnergyFlowPoint(
            timestamp=now + timedelta(hours=i),
            solar_to_building=10.0,
            solar_to_battery=5.0,
            solar_to_grid=1.0,
            battery_to_building=3.0,
            grid_to_building=8.0,
        )
        for i in range(horizon)
    ]
    return EnergyFlowResponse(building_id="BLDG-001", horizon_hours=horizon, flow=points)
