from fastapi import APIRouter, Depends
from datetime import datetime, timedelta
from app.schemas.forecast import DemandForecastResponse, SolarForecastResponse, ForecastPoint
from app.services.dispatch import get_hourly_dispatch
from app.services.dependencies import get_current_user

router = APIRouter(prefix="/forecast", tags=["Forecast"])

@router.get("/demand", response_model=DemandForecastResponse)
def get_demand_forecast(horizon: int = 24, current_user: dict = Depends(get_current_user)):
    now = datetime.now()
    is_bennett = current_user.get("email") == "admin@bennett.edu.in"
    if is_bennett:
        dispatch = get_hourly_dispatch(horizon, now)
        points = [ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=d["total_demand_kw"]) for i, d in enumerate(dispatch)]
    else:
        points = [ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=0.0) for i in range(horizon)]
    return DemandForecastResponse(building_id=current_user.get("customer_id", "USER-001"), horizon_hours=len(points), forecast=points)

@router.get("/solar", response_model=SolarForecastResponse)
def get_solar_forecast(horizon: int = 24, current_user: dict = Depends(get_current_user)):
    now = datetime.now()
    is_bennett = current_user.get("email") == "admin@bennett.edu.in"
    if is_bennett:
        dispatch = get_hourly_dispatch(horizon, now)
        points = [ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=d["solar_generation_kw"]) for i, d in enumerate(dispatch)]
        loc = "Greater Noida"
    else:
        points = [ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=0.0) for i in range(horizon)]
        loc = current_user.get("location", "Not specified")
    return SolarForecastResponse(location=loc, horizon_hours=len(points), forecast=points)

