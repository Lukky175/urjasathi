"""
Monthly Energy Savings & Expenditure Analytics Generator for Urja Saathi.

Simulates a continuous 30-day operating month for an Indian commercial campus:
- Computes daily and hourly energy consumption (baseline vs. optimized)
- Tracks BESS state of charge, solar utilization, and grid export revenue
- Disaggregates zone-level and appliance-level curtailments
- Calculates financial expenditures, savings in INR, and energy reduction percentages (%)
- Exports frontend-ready JSON and CSV datasets for tab-based visualization.
"""

from pathlib import Path
from typing import Dict, List, Optional, Any
import json

try:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore
except ImportError:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore


from src.config.energy_config import DATA_PATHS, ZONE_DEFINITIONS
from src.models.model1a_demand import DemandForecaster
from src.models.model1b_disaggregation import ApplianceDisaggregator
from src.models.model2_solar import SolarForecaster
from src.optimizer.energy_optimizer import EnergyOptimizer


def generate_monthly_extrapolation(
    start_date: str = "2023-05-01",
    num_days: int = 30,
    forecaster_1a: Optional[DemandForecaster] = None,
    disaggregator_1b: Optional[ApplianceDisaggregator] = None,
    solar_model: Optional[SolarForecaster] = None,
    output_json_path: str = "data/processed/monthly_savings_analytics.json",
    output_csv_path: str = "data/processed/monthly_savings_analytics.csv",
) -> Dict[str, Any]:
    """
    Simulate a 30-day continuous period and generate complete daily and monthly
    analytics suitable for frontend tab display.
    """
    # Load models if not provided
    if forecaster_1a is None:
        forecaster_1a = DemandForecaster()
        forecaster_1a.load(DATA_PATHS["model1a_saved"])

    if disaggregator_1b is None:
        disaggregator_1b = ApplianceDisaggregator()
        disaggregator_1b.load(DATA_PATHS["model1b_saved"])

    if solar_model is None:
        solar_model = SolarForecaster(primary_site="delhi")

    optimizer = EnergyOptimizer()
    base_ts = pd.Timestamp(start_date).normalize()

    daily_records = []
    hourly_records_compact = []

    total_baseline_energy_kwh = 0.0
    total_optimized_energy_kwh = 0.0
    total_curtailed_energy_kwh = 0.0
    total_solar_generated_kwh = 0.0
    total_gross_bill_inr = 0.0
    total_net_bill_inr = 0.0
    total_bill_savings_inr = 0.0
    total_export_revenue_inr = 0.0

    zone_cumulative_savings_kwh = {z: 0.0 for z in ZONE_DEFINITIONS}
    appliance_cumulative_savings_kwh = {"ac": 0.0, "light": 0.0, "plug": 0.0}

    print(f"[Monthly Analytics] Simulating {num_days}-day period starting from {base_ts.date()}...")

    # Realistic temperature fluctuations over 30 days in North India summer
    np.random.seed(42)
    daily_temp_offsets = np.random.normal(0.0, 2.0, size=num_days)
    daily_solar_weather_factors = np.clip(np.random.normal(1.0, 0.08, size=num_days), 0.75, 1.05)

    recent_demand = 18.5  # initial rolling seed

    for day_idx in range(num_days):
        current_date = base_ts + pd.Timedelta(days=day_idx)
        date_str = str(current_date.date())
        is_weekend = 1 if current_date.dayofweek >= 5 else 0
        day_name = current_date.strftime("%A")
        t_offset = daily_temp_offsets[day_idx]
        solar_factor = daily_solar_weather_factors[day_idx]

        day_baseline_kwh = 0.0
        day_optimized_kwh = 0.0
        day_curtailed_kwh = 0.0
        day_solar_kwh = 0.0
        day_gross_cost_inr = 0.0
        day_net_cost_inr = 0.0
        day_bill_saved_inr = 0.0
        day_export_revenue_inr = 0.0
        day_peak_curtailed_kw = 0.0

        day_zone_savings = {z: 0.0 for z in ZONE_DEFINITIONS}
        day_appliance_savings = {"ac": 0.0, "light": 0.0, "plug": 0.0}

        for h in range(24):
            hour_ts = current_date + pd.Timedelta(hours=h)

            # Realistic diurnal summer temperatures in Delhi (high: ~38-42°C, low: ~26-28°C)
            diurnal_temp = 28.0 + 12.5 * np.sin(np.pi * (h - 6) / 14.0) if 6 <= h <= 20 else 28.0
            temp_c = round(diurnal_temp + t_offset, 1)
            rh_pct = round(np.clip(55.0 - 25.0 * np.sin(np.pi * (h - 6) / 14.0), 20.0, 85.0), 1)

            # Feature frames for Models 1A & 1B
            feat_1a = pd.DataFrame([{
                "lag_1h": recent_demand,
                "lag_24h": recent_demand * (0.85 if is_weekend else 1.0),
                "rolling_24h_mean": 18.0 * (0.80 if is_weekend else 1.0),
                "hour_of_day": h,
                "day_of_week": current_date.dayofweek,
                "month": current_date.month,
                "is_weekend": is_weekend,
                "temperature_c": temp_c,
                "humidity_pct": rh_pct,
            }])

            feat_1b = pd.DataFrame([{
                "hour_of_day": h,
                "day_of_week": current_date.dayofweek,
                "is_weekend": is_weekend,
                "month": current_date.month,
                "temperature_c": temp_c,
                "humidity_pct": rh_pct,
            }])

            pred_total_kw = float(forecaster_1a.predict(feat_1a)[0])
            # Commercial buildings operate at reduced baseline during weekends
            if is_weekend:
                pred_total_kw *= 0.65

            pred_disagg = disaggregator_1b.predict_zone_demand(pred_total_kw, feat_1b)
            raw_solar_kw = solar_model.predict_solar_kw(hour_ts, site="delhi")
            actual_solar_kw = round(raw_solar_kw * solar_factor, 2)

            step_res = optimizer.optimize_step(
                timestamp=hour_ts,
                total_demand_kw=pred_total_kw,
                disaggregation=pred_disagg,
                solar_generation_kw=actual_solar_kw,
            )

            recent_demand = pred_total_kw

            # Track metrics
            b_kw = step_res["total_demand_kw"]
            c_kw = step_res["savings_summary"]["total_reduction_kw"]
            o_kw = step_res["savings_summary"]["optimized_demand_kw"]
            s_kw = step_res["solar_generation_kw"]

            day_baseline_kwh += b_kw
            day_optimized_kwh += o_kw
            day_curtailed_kwh += c_kw
            day_solar_kwh += s_kw
            day_peak_curtailed_kw = max(day_peak_curtailed_kw, c_kw)

            # Financial tracking
            # Gross cost: what the building would have paid for baseline demand from grid without solar or DR
            hour_rate = step_res["import_rate_inr_kwh"]
            gross_cost_h = b_kw * hour_rate
            day_gross_cost_inr += gross_cost_h

            # Optimized net cost
            net_import_cost_h = step_res["grid_import_cost"].get("total_cost_inr", 0.0) if step_res.get("grid_import_cost") else 0.0
            export_profit_h = step_res["grid_export_profit"].get("total_profit_earned_inr", 0.0) if step_res.get("grid_export_profit") else 0.0
            day_net_cost_inr += (net_import_cost_h - export_profit_h)
            day_export_revenue_inr += export_profit_h

            savings_h = step_res["savings_summary"]["total_savings_inr_hr"]
            # Add battery peak shaving value
            if step_res["battery_action"].get("power_delivered_kw", 0) > 0:
                savings_h += step_res["battery_action"]["power_delivered_kw"] * hour_rate
            day_bill_saved_inr += savings_h

            # Attribute zone & appliance savings
            for rec in step_res["recommendations"]:
                z_id = rec["zone_id"]
                red_kw = rec["reduction_kw"]
                app = rec["appliance"].lower()
                if "ac" in app or "air" in app:
                    day_appliance_savings["ac"] += red_kw
                elif "light" in app:
                    day_appliance_savings["light"] += red_kw
                else:
                    day_appliance_savings["plug"] += red_kw

                if z_id in day_zone_savings:
                    day_zone_savings[z_id] += red_kw
                elif "z1" in z_id:
                    day_zone_savings["z1"] += red_kw * 0.5
                    day_zone_savings["z4"] += red_kw * 0.5
                else:
                    for z in day_zone_savings:
                        day_zone_savings[z] += red_kw / len(day_zone_savings)

        # End of day calculations
        day_energy_saved_pct = (day_curtailed_kwh / max(day_baseline_kwh, 1e-3)) * 100.0
        day_cost_saved_pct = ((day_gross_cost_inr - day_net_cost_inr) / max(day_gross_cost_inr, 1e-3)) * 100.0

        daily_record = {
            "date": date_str,
            "day_of_week": day_name,
            "is_weekend": bool(is_weekend),
            "baseline_energy_kwh": round(day_baseline_kwh, 1),
            "optimized_energy_kwh": round(day_optimized_kwh, 1),
            "energy_saved_kwh": round(day_curtailed_kwh, 1),
            "energy_saved_pct": round(day_energy_saved_pct, 1),
            "solar_generated_kwh": round(day_solar_kwh, 1),
            "peak_demand_shaved_kw": round(day_peak_curtailed_kw, 2),
            "gross_electricity_cost_inr": round(day_gross_cost_inr, 2),
            "optimized_net_bill_inr": round(max(0.0, day_net_cost_inr), 2),
            "bill_savings_inr": round(max(0.0, day_gross_cost_inr - day_net_cost_inr), 2),
            "bill_saved_pct": round(max(0.0, day_cost_saved_pct), 1),
            "solar_export_revenue_inr": round(day_export_revenue_inr, 2),
            "carbon_emissions_avoided_kg": round(day_curtailed_kwh * 0.716, 2),
            "zone_curtailment_kwh": {k: round(v, 1) for k, v in day_zone_savings.items()},
            "appliance_curtailment_kwh": {k: round(v, 1) for k, v in day_appliance_savings.items()},
        }
        daily_records.append(daily_record)

        # Accumulate monthly totals
        total_baseline_energy_kwh += day_baseline_kwh
        total_optimized_energy_kwh += day_optimized_kwh
        total_curtailed_energy_kwh += day_curtailed_kwh
        total_solar_generated_kwh += day_solar_kwh
        total_gross_bill_inr += day_gross_cost_inr
        total_net_bill_inr += max(0.0, day_net_cost_inr)
        total_bill_savings_inr += max(0.0, day_gross_cost_inr - day_net_cost_inr)
        total_export_revenue_inr += day_export_revenue_inr

        for z in zone_cumulative_savings_kwh:
            zone_cumulative_savings_kwh[z] += day_zone_savings[z]
        for a in appliance_cumulative_savings_kwh:
            appliance_cumulative_savings_kwh[a] += day_appliance_savings[a]

    # Overall Monthly Statistics
    monthly_energy_saved_pct = (total_curtailed_energy_kwh / max(total_baseline_energy_kwh, 1e-3)) * 100.0
    monthly_bill_saved_pct = (total_bill_savings_inr / max(total_gross_bill_inr, 1e-3)) * 100.0
    solar_self_consumption_pct = min(100.0, (total_solar_generated_kwh / max(total_baseline_energy_kwh, 1e-3)) * 100.0)

    # Carbon Abatement (CEA Indian Grid Standard v19: 0.716 kg CO2e / kWh)
    total_carbon_avoided_kg = round(total_curtailed_energy_kwh * 0.716, 1)
    total_carbon_avoided_tonnes = round(total_carbon_avoided_kg / 1000.0, 2)
    mature_trees_equiv = int(round(total_carbon_avoided_kg / 22.0))

    # Find highest savings day
    best_day = max(daily_records, key=lambda x: x["bill_savings_inr"])

    monthly_summary = {
        "period": f"{start_date} to {date_str} ({num_days} Days)",
        "total_baseline_energy_kwh": round(total_baseline_energy_kwh, 1),
        "total_optimized_energy_kwh": round(total_optimized_energy_kwh, 1),
        "total_energy_saved_kwh": round(total_curtailed_energy_kwh, 1),
        "overall_energy_saved_pct": round(monthly_energy_saved_pct, 1),
        "total_solar_generated_kwh": round(total_solar_generated_kwh, 1),
        "solar_self_consumption_pct": round(solar_self_consumption_pct, 1),
        "total_carbon_emissions_avoided_kg": total_carbon_avoided_kg,
        "total_carbon_emissions_avoided_tonnes": total_carbon_avoided_tonnes,
        "mature_trees_equivalent": mature_trees_equiv,
        "grid_emission_factor_kg_per_kwh": 0.716,
        "grid_carbon_standard": "Central Electricity Authority (CEA) CO2 Baseline Database v19",
        "gross_bill_without_optimization_inr": round(total_gross_bill_inr, 2),
        "net_bill_with_urja_saathi_inr": round(total_net_bill_inr, 2),
        "total_money_saved_inr": round(total_bill_savings_inr, 2),
        "overall_bill_saved_pct": round(monthly_bill_saved_pct, 1),
        "total_solar_export_revenue_inr": round(total_export_revenue_inr, 2),

        "best_savings_day": {
            "date": best_day["date"],
            "day": best_day["day_of_week"],
            "money_saved_inr": best_day["bill_savings_inr"],
            "energy_saved_pct": best_day["energy_saved_pct"],
        },
        "zone_savings_distribution_kwh": {
            ZONE_DEFINITIONS[z]["name"]: round(zone_cumulative_savings_kwh[z], 1)
            for z in zone_cumulative_savings_kwh
        },
        "appliance_savings_distribution_kwh": {
            "Air Conditioning": round(appliance_cumulative_savings_kwh["ac"], 1),
            "Lighting": round(appliance_cumulative_savings_kwh["light"], 1),
            "Plug Loads": round(appliance_cumulative_savings_kwh["plug"], 1),
        },
        "executive_headline": (
            f"Over the past {num_days} days, Urja Saathi reduced campus energy consumption by "
            f"{monthly_energy_saved_pct:.1f}% (saving {total_curtailed_energy_kwh:,.1f} kWh) and "
            f"slashed electricity bills by {monthly_bill_saved_pct:.1f}% (saving ₹{total_bill_savings_inr:,.2f} "
            f"including ₹{total_export_revenue_inr:,.2f} in solar feed-in revenue)!"
        ),
    }

    # Save to JSON
    json_out = Path(output_json_path)
    json_out.parent.mkdir(parents=True, exist_ok=True)
    export_payload = {
        "monthly_summary": monthly_summary,
        "daily_time_series": daily_records,
    }
    with open(json_out, "w") as f:
        json.dump(export_payload, f, indent=2)
    print(f"[Monthly Analytics] Exported frontend JSON payload -> {json_out}")

    # Save to CSV
    csv_out = Path(output_csv_path)
    csv_out.parent.mkdir(parents=True, exist_ok=True)
    df_daily = pd.DataFrame(daily_records)
    # Flatten nested dictionaries for clean spreadsheet view
    for z in ZONE_DEFINITIONS:
        df_daily[f"curtailment_{z}_kwh"] = df_daily["zone_curtailment_kwh"].apply(lambda d: d.get(z, 0))
    for a in ["ac", "light", "plug"]:
        df_daily[f"curtailment_{a}_kwh"] = df_daily["appliance_curtailment_kwh"].apply(lambda d: d.get(a, 0))
    df_daily.drop(columns=["zone_curtailment_kwh", "appliance_curtailment_kwh"], inplace=True)
    df_daily.to_csv(csv_out, index=False)
    print(f"[Monthly Analytics] Exported daily time-series CSV -> {csv_out}")

    return export_payload


if __name__ == "__main__":
    generate_monthly_extrapolation()
