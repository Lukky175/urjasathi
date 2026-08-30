from fastapi import APIRouter
from app.schemas.recommendations import RecommendationsResponse, RecommendationItem

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

@router.get("", response_model=RecommendationsResponse)
def get_recommendations():
    return RecommendationsResponse(
        building_id="BLDG-001",
        recommendations=[
            RecommendationItem(category="AC", message="AC load 23% above weekday average", severity="medium"),
            RecommendationItem(category="Lighting", message="Lighting left on outside occupancy hours", severity="low"),
        ],
    )
