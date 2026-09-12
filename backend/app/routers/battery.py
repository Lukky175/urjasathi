from fastapi import APIRouter, Depends
from datetime import datetime
from app.schemas.battery import BatteryStatusResponse
from app.services.dispatch import get_hourly_dispatch
from app.services.dependencies import get_current_user

router = APIRouter(prefix="/battery", tags=["Battery"])

@router.get("/status", response_model=BatteryStatusResponse)
def get_battery_status(current_user: dict = Depends(get_current_user)):
    is_bennett = current_user.get("email") == "admin@bennett.edu.in"
    if is_bennett:
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
    else:
        return BatteryStatusResponse(
            battery_id=f"BATT-{current_user.get('customer_id', 'USER')[:8]}",
            soc_percent=0.0,
            capacity_kwh=0.0,
            max_charge_rate_kw=0.0,
            max_discharge_rate_kw=0.0,
            health_percent=0.0,
        )

