from typing import Any, Dict

from fastapi import APIRouter, Depends

from app.db.mongo import dashboard_collection
from app.schemas.table_data import DashboardTableDataResponse
from app.services.dependencies import get_current_user

router = APIRouter(prefix="/table-data", tags=["Table Data"])

_FIELD_ALIASES = {
    # Main Dashboard Metrics
    "current_consumption": ("current_consumption", "current_consumetion", "consumption"),
    "solar_generation": ("solar_generation", "solar_genetarion", "generation"),
    "battery_level": ("battery_level", "battery_percentage", "soc"),
    "today_saving": ("today_saving", "today_savings", "daily_saving", "daily_savings"),
    "energy_flow": ("energy_flow", "enery_flow", "live_flow"),
    "renewable_implant": ("renewable_implant", "renewable_imnplant", "renewable_impact", "renewable_contribution"),

    # Consumption Page Metrics
    "forecasted_total_24h": ("forecasted_total_24h", "forecasted_total", "total_24h_consumption", "consumption_24h"),
    "average_load": ("average_load", "avg_load", "average_demand"),
    "peak_demand": ("peak_demand", "peak_load", "max_demand"),
    "peak_hour": ("peak_hour", "peak_demand_hour", "peak_time"),
    "hourly_consumption_chart": ("hourly_consumption_chart", "consumption_chart", "hourly_load_chart", "hourly_consumption"),

    # Generation Page Metrics
    "next_24h_generation": ("next_24h_generation", "generation_24h", "forecasted_generation_24h", "total_24h_generation"),
    "peak_generation": ("peak_generation", "max_generation", "peak_solar"),
    "solar_utilization": ("solar_utilization", "utilization", "solar_utilization_pct"),
    "upcoming_generation_table": ("upcoming_generation_table", "generation_table", "solar_forecast_table"),

    # Battery Page Metrics
    "battery_health": ("battery_health", "health", "battery_health_pct"),
    "available_capacity": ("available_capacity", "capacity", "usable_capacity"),
    "current_activity": ("current_activity", "battery_activity", "activity"),
    "estimated_backup": ("estimated_backup", "backup_hours", "backup_estimate", "backup"),
    "battery_activity_chart": ("battery_activity_chart", "battery_chart", "charge_discharge_chart"),

    # Cost & Savings Page Metrics
    "estimated_monthly_bill": ("estimated_monthly_bill", "monthly_bill", "bill_estimate", "bill"),
    "solar_savings": ("solar_savings", "solar_saving", "savings_solar"),
    "battery_savings": ("battery_savings", "battery_saving", "savings_battery"),
    "total_savings": ("total_savings", "total_saving", "savings_total", "monthly_savings"),
    "cost_trend_chart": ("cost_trend_chart", "cost_chart", "monthly_cost_trend", "cost_history"),
}


def get_default_dashboard_payload(customer_id: str) -> Dict[str, Any]:
    """
    Returns a complete zeroed-out dictionary whenever a customer document
    is not found in MongoDB or when individual fields are missing.
    """
    return {
        "customer_id": customer_id,
        "current_consumption": 0.0,
        "solar_generation": 0.0,
        "battery_level": 0.0,
        "today_saving": 0.0,
        "energy_flow": {
            "solar": 0.0,
            "grid": 0.0,
            "battery": 0.0,
            "building": 0.0,
        },
        "renewable_implant": 0.0,
        "forecasted_total_24h": 0.0,
        "average_load": 0.0,
        "peak_demand": 0.0,
        "peak_hour": "N/A",
        "hourly_consumption_chart": [],
        "next_24h_generation": 0.0,
        "peak_generation": 0.0,
        "solar_utilization": 0.0,
        "upcoming_generation_table": [],
        "battery_health": "N/A",
        "available_capacity": "0 / 0 kWh",
        "current_activity": "Idle",
        "estimated_backup": "0 hrs",
        "battery_activity_chart": [],
        "estimated_monthly_bill": "₹0",
        "solar_savings": "₹0",
        "battery_savings": "₹0",
        "total_savings": "₹0",
        "cost_trend_chart": [],
    }


def _pick(doc: dict, *keys):
    for key in keys:
        if key in doc and doc[key] is not None:
            return doc[key]
    return None


@router.get("", response_model=DashboardTableDataResponse)
async def get_dashboard_table_data(current_user: dict = Depends(get_current_user)):
    customer_id = current_user.get("customer_id", "N/A")
    doc = await dashboard_collection.find_one(
        {"customer_id": customer_id},
        sort=[("_id", -1)],
    )

    defaults = get_default_dashboard_payload(customer_id)

    if doc is None:
        # Never raise 404 for valid authenticated users with no data yet
        return DashboardTableDataResponse(**defaults)

    # Build payload merging document values with safe default fallbacks
    payload = {}
    for field, aliases in _FIELD_ALIASES.items():
        val = _pick(doc, *aliases)
        payload[field] = val if val is not None else defaults.get(field)

    return DashboardTableDataResponse(
        customer_id=doc.get("customer_id", customer_id),
        **payload,
    )
