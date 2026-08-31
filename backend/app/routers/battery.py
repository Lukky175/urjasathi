from fastapi import APIRouter
from datetime import datetime
from app.schemas.battery import BatteryStatusResponse
from app.services.forecaster import predict_demand, predict_solar
from app.services.optimizer import run_pulp_optimization
from app.services.schemas import Model1AFeatures
from app.core.config import BATTERY_DEFAULT_CAPACITY, BATTERY_MAX_CHARGE_KW, BATTERY_MAX_DISCHARGE_KW

router = APIRouter(prefix="/battery", tags=["Battery"])

def _default_demand_features(now: datetime) -> Model1AFeatures:
    return Model1AFeatures(
        hour=float(now.hour), day_of_week=float(now.weekday()), month=float(now.month),
        is_weekend=1.0 if now.weekday() >= 5 else 0.0, temperature_c=28.0,
        relative_humidity=55.0, occupancy=0.7, lag_demand_1h=35.0, lag_demand_24h=35.0,
    )

@router.get("/status", response_model=BatteryStatusResponse)
def get_battery_status():
    now = datetime.now()
    demand = predict_demand(_default_demand_features(now))
    solar = predict_solar(timestamp=now)
    result = run_pulp_optimization(demand, solar)
    latest = result.hourly_flows[0] if result.hourly_flows else None

    return BatteryStatusResponse(
        battery_id="BATT-001",
        soc_percent=latest.battery_soc_percent if latest else 50.0,
        capacity_kwh=BATTERY_DEFAULT_CAPACITY,
        max_charge_rate_kw=BATTERY_MAX_CHARGE_KW,
        max_discharge_rate_kw=BATTERY_MAX_DISCHARGE_KW,
        health_percent=95.0,
    )
