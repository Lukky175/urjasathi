"""
Master Training & Intuitive Energy Optimization Pipeline for Urja Saathi.

Orchestrates:
1. Ingestion of I-BLEND, CU-BEMS (10-channel Zone x Appliance), and PVWatts solar data.
2. Optimal XGBoost training for Model 1A (Total Demand) and Model 1B (Multi-Zone Disaggregation).
3. Physics-based Solar Forecaster (Model 2) query initialization.
4. Automated feeding into the Intuitive Energy Optimizer:
   - Scenario A: Solar Surplus Arbitrage (BESS smart target charge + Grid export profits in INR).
   - Scenario B: Peak Deficit Demand-Response (BESS peak shaving + Zone 2 AC and appliance curtailment).
5. Daily Energy Savings (%) and financial impact reporting.
"""

import json
from pathlib import Path
try:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore
except ImportError:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore


from src.data_loaders.load_iblend import load_iblend_data
from src.data_loaders.load_cubems import load_cubems_data
from src.data_loaders.load_pvwatts import load_pvwatts_data
from src.models.model1a_demand import DemandForecaster, train_model1a
from src.models.model1b_disaggregation import ApplianceDisaggregator, train_model1b
from src.models.model2_solar import SolarForecaster
from src.optimizer.energy_optimizer import EnergyOptimizer
from src.config.energy_config import DATA_PATHS, ZONE_DEFINITIONS


def print_section_header(title: str):
    print("\n" + "=" * 80)
    print(f"   {title}")
    print("=" * 80)


def run_pipeline():
    print_section_header("URJA SAATHI - AI-POWERED RENEWABLE ENERGY & DEMAND OPTIMIZER")
    print(" Architecture: Decoupled 2-Stage Forecaster (1A/1B) + Physics Solar (2) + BESS/ToD Optimizer")

    # -------------------------------------------------------------
    # Step 1: Ingest & Preprocess Data
    # -------------------------------------------------------------
    print("\n[Pipeline Step 1/5] Ingesting & Preprocessing Multi-Zone Datasets...")
    df_1a = load_iblend_data(
        raw_path=DATA_PATHS["raw_iblend"],
        weather_path=DATA_PATHS["raw_weather"],
        processed_out=DATA_PATHS["processed_model1a"],
    )

    df_1b = load_cubems_data(
        raw_path=DATA_PATHS["raw_cubems_floor2"],
        processed_out=DATA_PATHS["processed_model1b"],
    )

    df_solar = load_pvwatts_data(
        site="delhi",
        processed_out=DATA_PATHS["processed_model2"],
    )

    # -------------------------------------------------------------
    # Step 2: Train Model 1A (Optimal XGBoost)
    # -------------------------------------------------------------
    print("\n[Pipeline Step 2/5] Training Model 1A (Total Demand Forecaster)...")
    forecaster_1a, metrics_1a = train_model1a(
        df_1a,
        train_split=0.70,
        val_split=0.10,
        model_save_path=DATA_PATHS["model1a_saved"],
        metadata_save_path=DATA_PATHS["scaler_metadata"],
    )

    # -------------------------------------------------------------
    # Step 3: Train Model 1B (Optimal XGBoost 10-Channel Disaggregation)
    # -------------------------------------------------------------
    print("\n[Pipeline Step 3/5] Training Model 1B (10-Channel Multi-Zone Disaggregator)...")
    disaggregator_1b, metrics_1b = train_model1b(
        df_1b,
        train_split=0.70,
        val_split=0.10,
        model_save_path=DATA_PATHS["model1b_saved"],
        metadata_save_path=DATA_PATHS["scaler_metadata"],
    )

    # -------------------------------------------------------------
    # Step 4: Model 2 Solar Forecaster
    # -------------------------------------------------------------
    print("\n[Pipeline Step 4/5] Initializing Model 2 (Solar Forecaster)...")
    solar_model = SolarForecaster(primary_site="delhi")
    stats_delhi = solar_model.get_solar_stats("delhi")
    stats_noida = solar_model.get_solar_stats("greater_noida")
    print(f"  Delhi Solar Yield:         {stats_delhi['annual_yield_kWh']} kWh/yr (Peak: {stats_delhi['peak_output_kW']} kW, CF: {stats_delhi['capacity_factor_pct']}%)")
    print(f"  Greater Noida Solar Yield: {stats_noida['annual_yield_kWh']} kWh/yr (Peak: {stats_noida['peak_output_kW']} kW, CF: {stats_noida['capacity_factor_pct']}%)")

    # -------------------------------------------------------------
    # Step 5: Energy Optimizer Execution
    # -------------------------------------------------------------
    print("\n[Pipeline Step 5/5] Executing Intuitive Energy Optimizer...")
    optimizer = EnergyOptimizer()

    # =====================================================================
    # SCENARIO A: Midday Peak Solar Surplus (12:00 PM)
    # Demonstrates: Charge battery to smart target (50%) + Export rest to grid
    # =====================================================================
    ts_surplus = pd.Timestamp("2023-05-15 12:00:00")
    feat_1a_surplus = pd.DataFrame([{
        "lag_1h": 12.5, "lag_24h": 12.0, "rolling_24h_mean": 12.0,
        "hour_of_day": ts_surplus.hour, "day_of_week": ts_surplus.dayofweek,
        "month": ts_surplus.month, "is_weekend": 0,
        "temperature_c": 36.0, "humidity_pct": 38.0,
    }])
    feat_1b_surplus = pd.DataFrame([{
        "hour_of_day": ts_surplus.hour, "day_of_week": ts_surplus.dayofweek,
        "is_weekend": 0, "month": ts_surplus.month,
        "temperature_c": 36.0, "humidity_pct": 38.0,
    }])

    pred_demand_surplus = float(forecaster_1a.predict(feat_1a_surplus)[0])
    pred_disagg_surplus = disaggregator_1b.predict_zone_demand(pred_demand_surplus, feat_1b_surplus)
    # Peak solar generation for 40kW rooftop system at noon
    solar_kw_surplus = solar_model.predict_solar_kw(ts_surplus, site="delhi")

    # Set initial SoC to 40% so optimizer charges to 50% target and exports remainder to grid
    optimizer.battery.soc_pct = 40.0
    result_surplus = optimizer.optimize_step(
        timestamp=ts_surplus,
        total_demand_kw=pred_demand_surplus,
        disaggregation=pred_disagg_surplus,
        solar_generation_kw=solar_kw_surplus,
        target_reserve_soc_pct=50.0,  # Target buffer for upcoming peak
    )

    print_section_header(f"SCENARIO A: SOLAR SURPLUS ARBITRAGE ({ts_surplus})")
    print(f"Tariff Regime:              {result_surplus['tariff_regime']}")
    print(f"Campus Total Demand (1A):   {result_surplus['total_demand_kw']} kW")
    print(f"Solar Generation (2):       {result_surplus['solar_generation_kw']} kW")
    print(f"Net Power Surplus:          {result_surplus['net_power_kw']} kW")
    b_stat = result_surplus["battery_status"]
    print(f"Battery Status:             {b_stat['soc_bar']} ({b_stat['current_energy_kwh']} / {b_stat['capacity_kwh']} kWh)")
    print(f"Intuitive Action:           {result_surplus['arbitrage_reasoning']}")

    if result_surplus["grid_export_profit"]:
        exp = result_surplus["grid_export_profit"]
        print("-" * 80)
        print(f"  -> Power Sent to Grid:    {exp['surplus_exported_kw']} kW ({exp['surplus_exported_wh']} Wh)")
        print(f"  -> Indian Feed-in Tariff: ₹{exp['feed_in_rate_per_kwh_inr']}/kWh (₹{exp['feed_in_rate_per_wh_inr']:.5f}/Wh)")
        print(f"  -> Net Profit Generated:  ₹{exp['total_profit_earned_inr']} / hr")

    # =====================================================================
    # SCENARIO B: Peak Afternoon Deficit (15:00 PM)
    # Tests battery peak shaving + zone-specific demand limiting recommendations
    # =====================================================================
    ts_deficit = pd.Timestamp("2023-05-15 15:00:00")
    feat_1a_deficit = pd.DataFrame([{
        "lag_1h": 26.0, "lag_24h": 25.5, "rolling_24h_mean": 18.0,
        "hour_of_day": ts_deficit.hour, "day_of_week": ts_deficit.dayofweek,
        "month": ts_deficit.month, "is_weekend": 0,
        "temperature_c": 39.5, "humidity_pct": 30.0,
    }])
    feat_1b_deficit = pd.DataFrame([{
        "hour_of_day": ts_deficit.hour, "day_of_week": ts_deficit.dayofweek,
        "is_weekend": 0, "month": ts_deficit.month,
        "temperature_c": 39.5, "humidity_pct": 30.0,
    }])

    pred_demand_deficit = float(forecaster_1a.predict(feat_1a_deficit)[0])
    pred_disagg_deficit = disaggregator_1b.predict_zone_demand(pred_demand_deficit, feat_1b_deficit)
    solar_kw_deficit = solar_model.predict_solar_kw(ts_deficit, site="delhi")

    result_deficit = optimizer.optimize_step(
        timestamp=ts_deficit,
        total_demand_kw=pred_demand_deficit,
        disaggregation=pred_disagg_deficit,
        solar_generation_kw=solar_kw_deficit,
    )

    print_section_header(f"SCENARIO B: PEAK DEFICIT & ZONE-LEVEL LOAD LIMITING ({ts_deficit})")
    print(f"Tariff Regime:              {result_deficit['tariff_regime']}")
    print(f"Campus Total Demand (1A):   {result_deficit['total_demand_kw']} kW")
    print(f"Solar Generation (2):       {result_deficit['solar_generation_kw']} kW")
    print(f"Net Power Deficit:          {abs(result_deficit['net_power_kw'])} kW")
    b_stat2 = result_deficit["battery_status"]
    print(f"Battery Status:             {b_stat2['soc_bar']} ({b_stat2['current_energy_kwh']} / {b_stat2['capacity_kwh']} kWh)")
    print(f"BESS Peak Shaving Action:   {result_deficit['arbitrage_reasoning']}")

    # Display Zone Breakdown
    print("\n" + "-" * 80)
    print("SIMULATED INDIAN BUILDING MULTI-ZONE DISAGGREGATION (MODEL 1B):")
    print("-" * 80)
    print(f"{'Zone Name':<38} | {'Load (kW)':>10} | {'Share (%)':>10} | {'Dominant Appliance':<15}")
    print("-" * 80)
    for z_id, z_data in pred_disagg_deficit["zone_totals"].items():
        dom_app = max(z_data["breakdown"].items(), key=lambda x: x[1])[0].upper()
        print(f"{z_data['name']:<38} | {z_data['total_kw']:>10.2f} | {z_data['share_pct']:>9.1f}% | {dom_app:<15}")

    # Display Zone & Appliance Demand Limiting Actions
    print("\n" + "-" * 80)
    print("ZONE & APPLIANCE-SPECIFIC LOAD LIMITING RECOMMENDATIONS:")
    print("-" * 80)
    print(f"{'Target Zone':<25} | {'Appliance':<12} | {'Action':<22} | {'Shed (kW)':>9} | {'Savings (₹/hr)':>14}")
    print("-" * 80)
    for rec in result_deficit["recommendations"]:
        print(f"{rec['zone_id'].upper():<25} | {rec['appliance']:<12} | {rec['action_title'][:22]:<22} | {rec['reduction_kw']:>9.2f} | ₹{rec['savings_inr_per_hr']:>12.2f}")

    # Executive Daily Energy Savings Summary Callout
    sav = result_deficit["savings_summary"]
    print("\n" + "=" * 80)
    print("   PEAK-HOUR DEMAND RESPONSE SAVINGS")
    print("=" * 80)
    print(f"• Baseline Campus Peak Load:  {sav['baseline_demand_kw']} kW")
    print(f"• Optimized Demand with DR:   {sav['optimized_demand_kw']} kW")
    print(f"• Peak Load Curtailed:        {sav['total_reduction_kw']} kW")
    print(f"• Hourly Energy Saved:        {sav['energy_saved_pct']}% reduction!")
    print(f"• Hourly Peak Cost Savings:   ₹{sav['total_savings_inr_hr']} / hr")
    print(f"\n📢 Hourly Insight: {sav['executive_callout']}")
    print("=" * 80)

    # =====================================================================
    # FULL 24-HOUR CONTINUOUS DISPATCH & DAILY ENERGY SAVINGS SIMULATION
    # =====================================================================
    print_section_header("FULL 24-HOUR CONTINUOUS DISPATCH & DAILY ENERGY SAVINGS REPORT")
    print("Simulating Full 24-Hour Cycle (00:00 to 23:00) on May 15 (Summer Weekday in Delhi)...")

    optimizer_24h = EnergyOptimizer()
    sim_24h = optimizer_24h.simulate_24h_cycle(
        date_str="2023-05-15",
        forecaster_1a=forecaster_1a,
        disaggregator_1b=disaggregator_1b,
        solar_model=solar_model,
    )

    print("\n" + "-" * 95)
    print(f"{'Hour':<6} | {'Demand (kW)':>11} | {'Solar (kW)':>10} | {'Battery SoC':>13} | {'Dispatch / Action':<28} | {'Curtailed':>10}")
    print("-" * 95)
    for res in sim_24h["hourly_timeline"]:
        h_str = f"{res['hour']:02d}:00"
        dem = f"{res['total_demand_kw']:.1f} kW"
        sol = f"{res['solar_generation_kw']:.1f} kW"
        soc = f"{res['battery_status']['soc_pct']:.1f}%"
        curt = f"{res['savings_summary']['total_reduction_kw']:.1f} kW" if res['savings_summary']['total_reduction_kw'] > 0 else "-"
        
        # Brief dispatch label
        if res["net_power_kw"] > 0:
            if res.get("grid_export_profit"):
                action = f"Chg BESS + Export {res['grid_export_profit']['surplus_exported_kw']:.1f}kW"
            else:
                action = f"Charging BESS ({res['net_power_kw']:.1f}kW)"
        else:
            if res["battery_action"].get("power_delivered_kw", 0) > 0:
                action = f"BESS Peak Shave ({res['battery_action']['power_delivered_kw']:.1f}kW)"
            else:
                action = f"Grid Draw ({abs(res['net_power_kw']):.1f}kW)"
                
        print(f"{h_str:<6} | {dem:>11} | {sol:>10} | {soc:>13} | {action:<28} | {curt:>10}")

    d_sum = sim_24h["daily_summary"]
    print("\n" + "=" * 80)
    print("   DAILY CAMPUS ENERGY & FINANCIAL LEDGER")
    print("=" * 80)
    print(f"• Baseline Campus Daily Energy:  {d_sum['baseline_energy_consumed_kwh']} kWh")
    print(f"• Optimized Campus Daily Energy: {d_sum['optimized_energy_consumed_kwh']} kWh")
    print(f"• Total Daily Energy Curtailed:  {d_sum['total_energy_saved_kwh']} kWh")
    print(f"• TOTAL DAILY ENERGY SAVED:      {d_sum['daily_energy_saved_pct']}% reduction!")
    print(f"• Total Solar Export Revenue:    ₹{d_sum['total_solar_export_revenue_inr']}")
    print(f"• Total Peak Tariff Saved:       ₹{d_sum['total_peak_bill_saved_inr']}")
    print(f"• Net Electricity Bill Today:    ₹{d_sum['net_energy_bill_inr']}")
    print("-" * 80)
    print(f"📢 DAILY CALLOUT: {d_sum['executive_callout']}")
    print("=" * 80)

    print("\nTraining, evaluation, and 24h continuous optimization executed successfully!")
    return {
        "metrics_1a": metrics_1a,
        "metrics_1b": metrics_1b,
        "scenario_surplus": result_surplus,
        "scenario_deficit": result_deficit,
        "daily_simulation": sim_24h,
    }


if __name__ == "__main__":
    run_pipeline()
