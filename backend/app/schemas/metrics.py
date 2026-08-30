from pydantic import BaseModel

class MetricsComparisonResponse(BaseModel):
    period_start: str
    period_end: str
    grid_reduction_pct: float
    cost_reduction_pct: float
    solar_utilization_pct: float
    peak_grid_demand_reduction_kw: float
    baseline_cost: float
    optimized_cost: float