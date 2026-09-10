from fastapi import APIRouter
from datetime import datetime
from app.schemas.recommendations import RecommendationsResponse, RecommendationItem
from app.services.dispatch import get_hourly_dispatch

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

@router.get("", response_model=RecommendationsResponse)
def get_recommendations():
    dispatch = get_hourly_dispatch(6, datetime.now())
    items = []
    for d in dispatch:
        for r in d.get("recommendations", []):
            items.append(RecommendationItem(category=r["zone_name"], message=r["description"], severity=r["comfort_impact"].lower()))
    if not items:
        items.append(RecommendationItem(category="General", message="No urgent actions right now - system is balanced.", severity="low"))
    return RecommendationsResponse(building_id="BENNETT-001", recommendations=items[:10])
