from fastapi import APIRouter
from datetime import datetime
from app.schemas.battery import BatteryStatusResponse
from app.services.dispatch import get_hourly_dispatch

router = APIRouter(prefix="/battery", tags=["Battery"])

@router.get("/status", response_model=BatteryStatusResponse)
def get_battery_status():
    dispatch = get_hourly_dispatch(1, datetime.now())
    status = dispatch[0]["battery_status"]
    return BatteryStatusResponse(
        battery_id="BATT-BENNETT-001",
        soc_percent=status.get("soc_pct", 50.0),
        capacity_kwh=status.get("capacity_kwh", 100.0),
        max_charge_rate_kw=status.get("max_charge_kw", 75.0),
        max_discharge_rate_kw=status.get("max_discharge_kw", 100.0),
        health_percent=94.0,
    )
