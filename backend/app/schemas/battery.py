from pydantic import BaseModel

class BatteryStatusResponse(BaseModel):
    battery_id: str
    soc_percent: float
    capacity_kwh: float
    max_charge_rate_kw: float
    max_discharge_rate_kw: float
    health_percent: float
