from fastapi import APIRouter, Depends, HTTPException

from app.db.mongo import dashboard_collection
from app.schemas.table_data import DashboardTableDataResponse
from app.services.dependencies import get_current_user

router = APIRouter(prefix="/table-data", tags=["Table Data"])

_FIELD_ALIASES = {
    "current_consumption": ("current_consumption", "current_consumetion"),
    "solar_generation": ("solar_generation", "solar_genetarion"),
    "battery_level": ("battery_level",),
    "today_saving": ("today_saving", "today_savings"),
    "energy_flow": ("energy_flow", "enery_flow"),
    "renewable_implant": ("renewable_implant", "renewable_imnplant", "renewable_impact"),
}


def _pick(doc: dict, *keys):
    for key in keys:
        if key in doc and doc[key] is not None:
            return doc[key]
    return None


@router.get("", response_model=DashboardTableDataResponse)
async def get_dashboard_table_data(current_user: dict = Depends(get_current_user)):
    customer_id = current_user["customer_id"]
    doc = await dashboard_collection.find_one(
        {"customer_id": customer_id},
        sort=[("_id", -1)],
    )
    if doc is None:
        raise HTTPException(status_code=404, detail="Dashboard data not found")

    payload = {
        field: _pick(doc, *aliases)
        for field, aliases in _FIELD_ALIASES.items()
    }
    missing = [field for field, value in payload.items() if value is None]
    if missing:
        raise HTTPException(
            status_code=404,
            detail=f"Dashboard data missing fields: {', '.join(missing)}",
        )

    return DashboardTableDataResponse(
        customer_id=doc.get("customer_id", customer_id),
        **payload,
    )
