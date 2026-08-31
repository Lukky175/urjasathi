from fastapi import APIRouter
from datetime import datetime
from app.schemas.recommendations import RecommendationsResponse, RecommendationItem
from app.services.forecaster import predict_demand, predict_solar
from app.services.optimizer import run_pulp_optimization
from app.services.recommendations import generate_recommendations

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

@router.get("", response_model=RecommendationsResponse)
def get_recommendations():
    demand = predict_demand()
    solar = predict_solar(timestamp=datetime.now())
    result = run_pulp_optimization(demand, solar)
    recs = generate_recommendations(result)
    items = [RecommendationItem(category=r.category, message=r.message, severity=r.severity.lower()) for r in recs]
    return RecommendationsResponse(building_id="BLDG-001", recommendations=items)
