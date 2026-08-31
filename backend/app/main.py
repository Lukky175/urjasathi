from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import status, forecast, energy_flow, battery, recommendations, metrics, simulate, auth

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(status.router)
app.include_router(forecast.router)
app.include_router(energy_flow.router)
app.include_router(battery.router)
app.include_router(recommendations.router)
app.include_router(metrics.router)
app.include_router(simulate.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "app": settings.app_name}
