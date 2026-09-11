from datetime import datetime
import pandas as pd
import numpy as np

from src.models.model1a_demand import DemandForecaster
from src.models.model1b_disaggregation import ApplianceDisaggregator
from src.models.model2_solar import SolarForecaster
from src.optimizer.energy_optimizer import EnergyOptimizer
from src.optimizer.battery_manager import BatteryConfig
from src.config.energy_config import calculate_bess_capacity_equation

_forecaster_1a = DemandForecaster()
_forecaster_1a.load("models_saved")

_disaggregator_1b = ApplianceDisaggregator()
try:
    _disaggregator_1b.load("models_saved/model1b_xgb.json")
except Exception:
    pass

_solar_model = SolarForecaster(primary_site="greater_noida")

_AVG_LOAD_KW = 82.5
_bess_result = calculate_bess_capacity_equation(
    avg_demand_kw=_AVG_LOAD_KW, autonomy_hours=2.5, max_dod=0.80, round_trip_efficiency=0.92
)
_BESS_KWH = _bess_result["recommended_capacity_kwh"]


def _build_optimizer():
    battery_config = BatteryConfig(
        capacity_kwh=_BESS_KWH, initial_soc_pct=45.0, max_charge_kw=75.0, max_discharge_kw=100.0,
    )
    return EnergyOptimizer(battery_config=battery_config)


def get_hourly_dispatch(horizon: int = 24, start: datetime = None):
    start = start or datetime.now()
    ts0 = pd.Timestamp(start).floor("h")
    optimizer = _build_optimizer()
    results = []

    for i in range(horizon):
        ts = ts0 + pd.Timedelta(hours=i)
        h = ts.hour
        diurnal_temp = 28.5 + 12.5 * np.sin(np.pi * (h - 6) / 14.0) if 6 <= h <= 20 else 28.5
        temp_c = round(diurnal_temp, 1)
        humidity_pct = round(np.clip(72.0 - 24.0 * np.sin(np.pi * (h - 6) / 14.0), 32.0, 85.0), 1)
        is_weekend = 1 if ts.dayofweek >= 5 else 0

        feat_1a = pd.DataFrame([{
            "lag_1h": 81.2, "lag_24h": 84.0, "rolling_24h_mean": 82.5,
            "hour_of_day": ts.hour, "day_of_week": ts.dayofweek, "month": ts.month,
            "is_weekend": is_weekend, "temperature_c": temp_c, "humidity_pct": humidity_pct,
        }])
        feat_1b = pd.DataFrame([{
            "hour_of_day": ts.hour, "day_of_week": ts.dayofweek, "is_weekend": is_weekend,
            "month": ts.month, "temperature_c": temp_c, "humidity_pct": humidity_pct,
        }])

        components = _forecaster_1a.predict_components(feat_1a)
        scale_factor = _AVG_LOAD_KW / 19.5
        pred_total_kw = float(components["blend"][0]) * scale_factor

        disagg_result = _disaggregator_1b.predict_zone_demand(pred_total_kw, feat_1b)
        solar_kw = _solar_model.predict_solar_kw(ts, site="greater_noida") * 3.75

        dispatch = optimizer.optimize_step(
            timestamp=ts, total_demand_kw=pred_total_kw,
            disaggregation=disagg_result, solar_generation_kw=solar_kw,
        )
        results.append(dispatch)

    return results


def derive_flows(d: dict) -> dict:
    demand = d["total_demand_kw"]
    solar = d["solar_generation_kw"]
    action = d.get("battery_action", {})
    mode = action.get("mode", "")

    if d["net_power_kw"] > 0:
        solar_to_building = min(solar, demand)
        battery_charge = action.get("power_charged_kw", 0.0)
        solar_to_battery = min(battery_charge, solar - solar_to_building)
        solar_to_grid = max(0.0, solar - solar_to_building - solar_to_battery)
        return {
            "solar_to_building": solar_to_building, "solar_to_battery": solar_to_battery,
            "solar_to_grid": solar_to_grid, "battery_to_building": 0.0, "grid_to_building": 0.0,
        }
    else:
        battery_discharge = action.get("power_delivered_kw", 0.0)
        grid_to_building = max(0.0, demand - solar - battery_discharge)
        return {
            "solar_to_building": solar, "solar_to_battery": 0.0, "solar_to_grid": 0.0,
            "battery_to_building": battery_discharge, "grid_to_building": grid_to_building,
        }

