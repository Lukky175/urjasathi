from pydantic import BaseModel
from app.schemas.metrics import MetricsComparisonResponse
from app.schemas.energy_flow import EnergyFlowResponse

class SimulateRequest(BaseModel):
    battery_capacity_kwh: float
    solar_capacity_kw: float
    tariff_type: str
    horizon_hours: int = 24

class SimulateResponse(BaseModel):
    energy_flow: EnergyFlowResponse
    metrics: MetricsComparisonResponse
