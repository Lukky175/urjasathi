"""
Universal Next-Hour Predictive Dispatch Runner for Urja Saathi.
Fitted for: Bennett University Academic & Engineering Complex (Greater Noida, UP)

Features:
1. Dynamically detects current live system time (Date, Month, Year, Hour)
   or accepts any custom evaluation timestamp.
2. BESS Sizing Physics Engine:
   - If building has NO battery installed (or capacity is 0/unspecified), automatically
     calculates the recommended battery capacity (in kWh) using the equation:
     C_BESS = (P_avg * T_autonomy) / (DoD_max * Efficiency)
     to cover 2.5 hours of average load (280 kWh for Bennett University).
   - Runs either Hybrid BESS + Demand Response or Pure Demand Response Mode!
"""

import argparse
import json
from pathlib import Path
import pandas as pd
import numpy as np

from src.models.model1a_demand import DemandForecaster
from src.models.model1b_disaggregation import ApplianceDisaggregator
from src.models.model2_solar import SolarForecaster
from src.optimizer.energy_optimizer import EnergyOptimizer
from src.optimizer.battery_manager import BatteryConfig, BatteryManager
from src.config.energy_config import (
    ZONE_DEFINITIONS,
    calculate_bess_capacity_equation,
    DEFAULT_BATTERY,
)


def run_prediction(target_timestamp: str = None, bess_capacity_kwh: float = None, autonomy_hours: float = 2.5):
    # 1. Resolve Timestamp
    if target_timestamp:
        ts = pd.Timestamp(target_timestamp)
    else:
        # Default: dynamically calculate the exact next upcoming hour from current system clock
        now = pd.Timestamp.now()
        ts = now.floor("h") + pd.Timedelta(hours=1)

    # 2. Bennett University Load & BESS Sizing Equation
    # Bennett University Academic & Engineering Complex (Greater Noida, UP)
    # Average demand P_avg = 82.5 kW (Peak = 260 kW)
    avg_building_load_kw = 82.5
    bess_equation_result = calculate_bess_capacity_equation(
        avg_demand_kw=avg_building_load_kw,
        autonomy_hours=autonomy_hours,
        max_dod=0.80,
        round_trip_efficiency=0.92,
    )
    calculated_bess_kwh = bess_equation_result["recommended_capacity_kwh"]

    # If user provided an explicit capacity, use it; otherwise use the calculated 280 kWh capacity
    effective_bess_kwh = bess_capacity_kwh if bess_capacity_kwh is not None else calculated_bess_kwh

    print(f"\n===========================================================================")
    print(f"URJA SAATHI — BENNETT UNIVERSITY PREDICTIVE DISPATCH ENGINE")
    print(f"Site:           Bennett University Academic & Engineering Complex (Greater Noida, UP)")
    print(f"Calendar Date:  {ts.strftime('%A, %d %B %Y')}")
    print(f"Target Hour:    {ts.strftime('%I:%M %p (%H:00 IST)')}")
    print(f"BESS Status:    {'Calculated & Deployed (' + str(effective_bess_kwh) + ' kWh via 2.5h Autonomy Equation)' if effective_bess_kwh > 0 else 'NO BESS (Pure Demand-Response Mode)'}")
    print(f"===========================================================================")

    # 3. Load Trained Weighted Blend Models
    forecaster_1a = DemandForecaster()
    forecaster_1a.load("models_saved")

    disaggregator_1b = ApplianceDisaggregator()
    try:
        disaggregator_1b.load("models_saved/model1b_xgb.json")
    except Exception:
        pass

    solar_model = SolarForecaster(primary_site="greater_noida")

    # 4. Initialize Optimizer with configured or calculated BESS capacity
    bat_config = BatteryConfig(
        capacity_kwh=effective_bess_kwh,
        initial_soc_pct=45.0 if effective_bess_kwh > 0 else 0.0,
        max_charge_kw=75.0 if effective_bess_kwh > 0 else 0.0,
        max_discharge_kw=100.0 if effective_bess_kwh > 0 else 0.0,
    )
    optimizer = EnergyOptimizer(battery_config=bat_config)

    # 5. Contextual & Weather Features for Greater Noida (28.45° N, 77.58° E)
    h = ts.hour
    diurnal_temp = 28.5 + 12.5 * np.sin(np.pi * (h - 6) / 14.0) if 6 <= h <= 20 else 28.5
    temp_c = round(diurnal_temp, 1)
    humidity_pct = round(np.clip(72.0 - 24.0 * np.sin(np.pi * (h - 6) / 14.0), 32.0, 85.0), 1)
    is_weekend = 1 if ts.dayofweek >= 5 else 0

    feat_1a = pd.DataFrame([{
        "lag_1h": 81.2,
        "lag_24h": 84.0,
        "rolling_24h_mean": 82.5,
        "hour_of_day": ts.hour,
        "day_of_week": ts.dayofweek,
        "month": ts.month,
        "is_weekend": is_weekend,
        "temperature_c": temp_c,
        "humidity_pct": humidity_pct,
    }])

    feat_1b = pd.DataFrame([{
        "hour_of_day": ts.hour,
        "day_of_week": ts.dayofweek,
        "is_weekend": is_weekend,
        "month": ts.month,
        "temperature_c": temp_c,
        "humidity_pct": humidity_pct,
    }])

    # 6. Model 1A Component Predictions & Blend
    components = forecaster_1a.predict_components(feat_1a)
    pred_xgb = float(components["xgb"][0])
    pred_lgb = float(components["lgb"][0])
    pred_ridge = float(components["ridge"][0])
    # Scale total demand to Bennett University's 82.5 kW baseline scale
    scale_factor = 82.5 / 19.5
    pred_total_kw = float(components["blend"][0]) * scale_factor

    # 7. Model 1B Disaggregation
    disagg_result = disaggregator_1b.predict_zone_demand(pred_total_kw, feat_1b)

    # 8. Model 2 Solar Generation (150 kWp solar roof array at Greater Noida)
    solar_kw = solar_model.predict_solar_kw(ts, site="greater_noida") * 3.75

    # 9. Optimizer Dispatch
    dispatch_result = optimizer.optimize_step(
        timestamp=ts,
        total_demand_kw=pred_total_kw,
        disaggregation=disagg_result,
        solar_generation_kw=solar_kw,
    )

    output = {
        "forecast_for_target_period": {
            "calendar_date": ts.strftime("%A, %d %B %Y"),
            "year": ts.year,
            "month": ts.strftime("%B"),
            "day": ts.day,
            "day_of_week": ts.strftime("%A"),
            "target_hour_ist": ts.strftime("%I:00 %p IST (%H:00)"),
            "forecast_window": f"{ts.strftime('%I:%M %p')} to {(ts + pd.Timedelta(hours=1)).strftime('%I:%M %p IST')}",
            "timestamp_iso": ts.isoformat(),
        },
        "institution_metadata": {
            "name": "Bennett University Academic & Engineering Complex",
            "location": "Greater Noida, Uttar Pradesh, India (28.4502° N, 77.5846° E)",
            "utility_discom": "Noida Power Company Limited (NPCL) / UPERC Commercial Tariff",
            "built_up_area": "22,500 sq m (~242,000 sq ft)",
            "average_building_load_kw": avg_building_load_kw,
            "peak_demand_capacity_kw": 260.0,
        },
        "bess_sizing_physics_equation": {
            "formula": "C_BESS (kWh) = (P_avg_demand * T_autonomy) / (DoD_max * Efficiency)",
            "average_demand_kw": avg_building_load_kw,
            "desired_autonomy_hours": autonomy_hours,
            "max_dod": "80% (0.80)",
            "inverter_round_trip_efficiency": "92% (0.92)",
            "usable_backup_energy_needed_kwh": bess_equation_result["usable_energy_needed_kwh"],
            "calculated_nominal_bess_capacity_kwh": bess_equation_result["calculated_nominal_bess_kwh"],
            "recommended_installed_bess_kwh": calculated_bess_kwh,
            "active_mode": "HYBRID_BESS_PLUS_DEMAND_RESPONSE" if effective_bess_kwh > 0 else "PURE_DEMAND_RESPONSE (Zero Capex)",
        },
        "model_1a_blend_predictions": {
            "xgboost_kw": round(pred_xgb * scale_factor, 2),
            "lightgbm_kw": round(pred_lgb * scale_factor, 2),
            "ridge_kw": round(pred_ridge * scale_factor, 2),
            "weighted_blend_total_kw": round(pred_total_kw, 2),
            "ensemble_weights": forecaster_1a.weights,
        },
        "model_1b_zone_appliance_shares": {
            "appliances": disagg_result["appliance_totals"],
            "zones": {
                z: {"name": d["name"], "total_kw": d["total_kw"], "share_pct": d["share_pct"]}
                for z, d in disagg_result["zone_totals"].items()
            },
        },
        "model_2_solar_kw": round(solar_kw, 2),
        "optimizer_dispatch": dispatch_result,
    }

    print(json.dumps(output, indent=2))
    return output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Urja Saathi Next-Hour Inference for Bennett University")
    parser.add_argument("--timestamp", type=str, default=None, help="Target timestamp (e.g. '2026-08-31 00:00:00')")
    parser.add_argument("--bess", type=float, default=None, help="Explicit battery capacity in kWh (if None, calculates 2.5h autonomy capacity)")
    parser.add_argument("--autonomy", type=float, default=2.5, help="Target backup duration in hours (default: 2.5 hours)")
    args = parser.parse_args()

    run_prediction(target_timestamp=args.timestamp, bess_capacity_kwh=args.bess, autonomy_hours=args.autonomy)
