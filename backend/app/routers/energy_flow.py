from fastapi import APIRouter
from datetime import datetime, timedelta
from app.schemas.energy_flow import EnergyFlowResponse, EnergyFlowPoint
from app.services.dispatch import get_hourly_dispatch, derive_flows

router = APIRouter(prefix="/energy-flow", tags=["Energy Flow"])

@router.get("", response_model=EnergyFlowResponse)
def get_energy_flow(horizon: int = 24):
    now = datetime.now()
    dispatch = get_hourly_dispatch(horizon, now)
    points = []
    for i, d in enumerate(dispatch):
        flows = derive_flows(d)
        points.append(EnergyFlowPoint(timestamp=now + timedelta(hours=i), **flows))
    return EnergyFlowResponse(building_id="BENNETT-001", horizon_hours=len(points), flow=points)
