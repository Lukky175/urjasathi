from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class DashboardTableDataResponse(BaseModel):
    current_consumption: float
    solar_generation: float
    battery_level: float
    today_saving: float
    energy_flow: Any
    renewable_implant: float
    customer_id: str | None = None

    model_config = ConfigDict(extra="ignore")
