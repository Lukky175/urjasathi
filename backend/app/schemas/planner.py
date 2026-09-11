from typing import List, Optional
from pydantic import BaseModel, Field


class PlannerScenarioRequest(BaseModel):
    city: str = Field(default="Delhi", description="City location name (e.g. Delhi, Greater Noida)")
    solar_generation: float = Field(default=8.5, description="Average daily solar generation in kWh/day or array kWp")
    energy_consumption: float = Field(default=12.4, description="Average daily electricity consumption in kWh/day")
    battery_capacity_kwh: Optional[float] = Field(default=280.0, description="Battery capacity in kWh")


class HourlyPoint(BaseModel):
    hour: int
    demand_kw: float
    solar_kw: float
    battery_discharge_kw: float
    grid_import_kw: float
    battery_soc_pct: float


class PlannerScenarioResponse(BaseModel):
    city: str
    daily_solar_kwh: float
    daily_consumption_kwh: float
    monthly_savings_inr: float
    savings_pct: float
    grid_reduction_pct: float
    peak_demand_shaved_kw: float
    co2_abated_kg_daily: float
    co2_abated_tonnes_monthly: float
    battery_buffer_kwh: float
    battery_soc_min_pct: float = 20.0
    battery_soc_max_pct: float = 80.0
    hourly_profile: List[HourlyPoint] = []
