from fastapi import APIRouter
from datetime import datetime, timedelta
from app.schemas.forecast import DemandForecastResponse, SolarForecastResponse, ForecastPoint
from app.services.dispatch import get_hourly_dispatch

router = APIRouter(prefix="/forecast", tags=["Forecast"])

@router.get("/demand", response_model=DemandForecastResponse)
def get_demand_forecast(horizon: int = 24):
    now = datetime.now()
    dispatch = get_hourly_dispatch(horizon, now)
    points = [ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=d["total_demand_kw"]) for i, d in enumerate(dispatch)]
    return DemandForecastResponse(building_id="BENNETT-001", horizon_hours=len(points), forecast=points)

@router.get("/solar", response_model=SolarForecastResponse)
def get_solar_forecast(horizon: int = 24):
    now = datetime.now()
    dispatch = get_hourly_dispatch(horizon, now)
    points = [ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=d["solar_generation_kw"]) for i, d in enumerate(dispatch)]
    return SolarForecastResponse(location="Greater Noida", horizon_hours=len(points), forecast=points)
