from pydantic import BaseModel
from datetime import datetime

class ForecastPoint(BaseModel):
    timestamp: datetime
    value_kw: float

class DemandForecastResponse(BaseModel):
    building_id: str
    horizon_hours: int
    forecast: list[ForecastPoint]

class SolarForecastResponse(BaseModel):
    location: str
    horizon_hours: int
    forecast: list[ForecastPoint]
