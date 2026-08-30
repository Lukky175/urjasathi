from fastapi import APIRouter
from datetime import datetime, timedelta
from app.schemas.forecast import DemandForecastResponse, SolarForecastResponse, ForecastPoint

router = APIRouter(prefix="/forecast", tags=["Forecast"])

@router.get("/demand", response_model=DemandForecastResponse)
def get_demand_forecast(horizon: int = 24):
    now = datetime.now()
    points = [
        ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=40 + (i % 6) * 3)
        for i in range(horizon)
    ]
    return DemandForecastResponse(building_id="BLDG-001", horizon_hours=horizon, forecast=points)

@router.get("/solar", response_model=SolarForecastResponse)
def get_solar_forecast(horizon: int = 24):
    now = datetime.now()
    points = [
        ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=max(0, 20 - abs(i - 12) * 2))
        for i in range(horizon)
    ]
    return SolarForecastResponse(location="Greater Noida", horizon_hours=horizon, forecast=points)
