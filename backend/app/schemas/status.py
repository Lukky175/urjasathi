from pydantic import BaseModel
from datetime import datetime

class CurrentStatusResponse(BaseModel):
    timestamp: datetime
    current_demand_kw: float
    current_solar_kw: float
    battery_soc_percent: float
    grid_draw_kw: float
