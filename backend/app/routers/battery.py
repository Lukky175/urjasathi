from fastapi import APIRouter
from app.schemas.battery import BatteryStatusResponse

router = APIRouter(prefix="/battery", tags=["Battery"])

@router.get("/status", response_model=BatteryStatusResponse)
def get_battery_status():
    return BatteryStatusResponse(
        battery_id="BATT-001",
        soc_percent=67.0,
        capacity_kwh=100.0,
        max_charge_rate_kw=20.0,
        max_discharge_rate_kw=20.0,
        health_percent=95.0,
    )
