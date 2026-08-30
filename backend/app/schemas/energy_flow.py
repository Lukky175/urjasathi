from pydantic import BaseModel
from datetime import datetime

class EnergyFlowPoint(BaseModel):
    timestamp: datetime
    solar_to_building: float
    solar_to_battery: float
    solar_to_grid: float
    battery_to_building: float
    grid_to_building: float

class EnergyFlowResponse(BaseModel):
    building_id: str
    horizon_hours: int
    flow: list[EnergyFlowPoint]