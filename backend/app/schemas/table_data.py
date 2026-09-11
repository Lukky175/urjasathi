from typing import Any, Dict, List, Optional, Union

from pydantic import BaseModel, ConfigDict, Field


class DashboardTableDataResponse(BaseModel):
    customer_id: Optional[str] = "N/A"

    # Main Dashboard Metrics
    current_consumption: Optional[float] = 0.0
    solar_generation: Optional[float] = 0.0
    battery_level: Optional[float] = 0.0
    today_saving: Optional[float] = 0.0
    energy_flow: Optional[Union[Dict[str, Any], Any]] = Field(
        default_factory=lambda: {
            "solar": 0.0,
            "grid": 0.0,
            "battery": 0.0,
            "building": 0.0,
        }
    )
    renewable_implant: Optional[float] = 0.0

    # Consumption Page Metrics
    forecasted_total_24h: Optional[Union[float, str]] = 0.0
    average_load: Optional[Union[float, str]] = 0.0
    peak_demand: Optional[Union[float, str]] = 0.0
    peak_hour: Optional[str] = "N/A"
    hourly_consumption_chart: Optional[List[Any]] = Field(default_factory=list)

    # Generation Page Metrics
    next_24h_generation: Optional[Union[float, str]] = 0.0
    peak_generation: Optional[Union[float, str]] = 0.0
    solar_utilization: Optional[Union[float, str]] = 0.0
    upcoming_generation_table: Optional[List[Any]] = Field(default_factory=list)

    # Battery Page Metrics
    battery_health: Optional[Union[str, float]] = "N/A"
    available_capacity: Optional[str] = "0 / 0 kWh"
    current_activity: Optional[str] = "Idle"
    estimated_backup: Optional[str] = "0 hrs"
    battery_activity_chart: Optional[List[Any]] = Field(default_factory=list)

    # Cost & Savings Page Metrics
    estimated_monthly_bill: Optional[Union[str, float]] = "₹0"
    solar_savings: Optional[Union[str, float]] = "₹0"
    battery_savings: Optional[Union[str, float]] = "₹0"
    total_savings: Optional[Union[str, float]] = "₹0"
    cost_trend_chart: Optional[List[Any]] = Field(default_factory=list)

    model_config = ConfigDict(extra="ignore")
