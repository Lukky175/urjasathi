from fastapi import APIRouter
from datetime import datetime, timedelta
from app.schemas.forecast import DemandForecastResponse, SolarForecastResponse, ForecastPoint
from app.services.forecaster import predict_demand, predict_solar
from app.services.schemas import Model1AFeatures

router = APIRouter(prefix="/forecast", tags=["Forecast"])

def _default_demand_features(now: datetime) -> Model1AFeatures:
    return Model1AFeatures(
        hour=float(now.hour),
        day_of_week=float(now.weekday()),
        month=float(now.month),
        is_weekend=1.0 if now.weekday() >= 5 else 0.0,
        temperature_c=28.0,
        relative_humidity=55.0,
        occupancy=0.7,
        lag_demand_1h=35.0,
        lag_demand_24h=35.0,
    )

@router.get("/demand", response_model=DemandForecastResponse)
def get_demand_forecast(horizon: int = 24):
    now = datetime.now()
    features = _default_demand_features(now)
    values = predict_demand(features)
    points = [ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=values[i]) for i in range(min(horizon, len(values)))]
    return DemandForecastResponse(building_id="BLDG-001", horizon_hours=len(points), forecast=points)

@router.get("/solar", response_model=SolarForecastResponse)
def get_solar_forecast(horizon: int = 24):
    now = datetime.now()
    values = predict_solar(timestamp=now)
    points = [ForecastPoint(timestamp=now + timedelta(hours=i), value_kw=values[i]) for i in range(min(horizon, len(values)))]
    return SolarForecastResponse(location="Delhi", horizon_hours=len(points), forecast=points)
