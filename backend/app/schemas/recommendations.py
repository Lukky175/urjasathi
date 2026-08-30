from pydantic import BaseModel

class RecommendationItem(BaseModel):
    category: str
    message: str
    severity: str

class RecommendationsResponse(BaseModel):
    building_id: str
    recommendations: list[RecommendationItem]
