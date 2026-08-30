from fastapi import APIRouter
from datetime import datetime
from app.schemas.status import CurrentStatusResponse

router = APIRouter(prefix="/status", tags=["Status"])

@router.get("/current", response_model=CurrentStatusResponse)
def get_current_status():
    return CurrentStatusResponse(
        timestamp=datetime.now(),
        current_demand_kw=45.2,
        current_solar_kw=28.6,
        battery_soc_percent=67.0,
        grid_draw_kw=16.6,
    )
