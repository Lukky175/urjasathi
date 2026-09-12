from fastapi import APIRouter, Depends
from datetime import datetime, timedelta
from app.schemas.energy_flow import EnergyFlowResponse, EnergyFlowPoint
from app.services.dispatch import get_hourly_dispatch, derive_flows
from app.services.dependencies import get_current_user

router = APIRouter(prefix="/energy-flow", tags=["Energy Flow"])

@router.get("", response_model=EnergyFlowResponse)
def get_energy_flow(horizon: int = 24, current_user: dict = Depends(get_current_user)):
    now = datetime.now()
    is_bennett = current_user.get("email") == "admin@bennett.edu.in"
    points = []
    if is_bennett:
        dispatch = get_hourly_dispatch(horizon, now)
        for i, d in enumerate(dispatch):
            flows = derive_flows(d)
            points.append(EnergyFlowPoint(timestamp=now + timedelta(hours=i), **flows))
    else:
        for i in range(horizon):
            points.append(EnergyFlowPoint(
                timestamp=now + timedelta(hours=i),
                solar_to_building=0.0,
                solar_to_battery=0.0,
                solar_to_grid=0.0,
                battery_to_building=0.0,
                grid_to_building=0.0,
            ))
    return EnergyFlowResponse(building_id=current_user.get("customer_id", "USER-001"), horizon_hours=len(points), flow=points)

