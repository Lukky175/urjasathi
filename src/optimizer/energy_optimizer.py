"""
Intuitive Energy Optimizer for Urja Saathi.

Couples Model 1A (Demand Magnitude), Model 1B (Zone x Appliance Disaggregation),
and Model 2 (Solar Generation) with BESS and Indian Commercial Tariffs.
Produces:
- Smart battery charging vs. grid export arbitrage for maximum revenue (INR per Watt/kWh)
- Zone-specific and appliance-specific demand limiting recommendations during peak deficit
- Quantified energy savings percentage (%) and financial savings reports.
"""

from dataclasses import dataclass
from typing import Dict, List, Optional, Any
try:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore
except ImportError:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore


from src.config.energy_config import (
    DEFAULT_TARIFF,
    DEFAULT_BATTERY,
    ZONE_DEFINITIONS,
    IndianTariffConfig,
    BatteryConfig,
)
from src.optimizer.tariff_manager import TariffManager
from src.optimizer.battery_manager import BatteryManager


@dataclass
class DemandResponseAction:
    """Actionable recommendation for a specific zone and appliance."""
    zone_id: str
    zone_name: str
    appliance: str
    action_title: str
    action_description: str
    power_reduction_kw: float
    hourly_savings_inr: float
    comfort_impact: str  # 'LOW', 'MEDIUM', 'HIGH'
    time_window: str


class EnergyOptimizer:
    """
    Multi-objective energy management engine.
    Balances battery health, solar self-consumption, grid export profits,
    and granular zone-level demand limiting.
    """

    def __init__(
        self,
        tariff_config: IndianTariffConfig = DEFAULT_TARIFF,
        battery_config: BatteryConfig = DEFAULT_BATTERY,
    ):
        self.tariff = TariffManager(tariff_config)
        self.battery = BatteryManager(battery_config)

    def optimize_step(
        self,
        timestamp: pd.Timestamp,
        total_demand_kw: float,
        disaggregation: Dict[str, Any],
        solar_generation_kw: float,
        target_reserve_soc_pct: Optional[float] = None,
    ) -> Dict[str, Any]:
        """
        Evaluate single-hour energy balance, perform intuitive battery/grid arbitrage,
        and generate zone-level demand limiting recommendations if in deficit.
        """
        hour = timestamp.hour
        import_rate = self.tariff.get_import_rate(hour)
        export_rate = self.tariff.get_export_rate()
        tariff_regime = self.tariff.config.get_tariff_type(hour)
        target_soc = target_reserve_soc_pct or self.battery.smart_target_soc

        net_power_kw = solar_generation_kw - total_demand_kw  # > 0: Surplus, < 0: Deficit
        current_battery_status = self.battery.get_status_display()

        # Output containers
        battery_action = {}
        grid_export_profit = {}
        grid_import_cost = {}
        recommendations: List[DemandResponseAction] = []
        arbitrage_reasoning = ""

        # -------------------------------------------------------------
        # CASE 1: SOLAR SURPLUS (Generation > Demand)
        # Intuitive decision: Don't blindly charge 100% to battery!
        # Smartly charge up to target_soc for upcoming peak, export rest for profit.
        # -------------------------------------------------------------
        if net_power_kw > 0:
            surplus_kw = net_power_kw
            current_soc = self.battery.soc_pct

            # Calculate energy needed to reach smart target SoC (e.g. 50-60%)
            if current_soc < target_soc:
                kwh_needed_to_target = ((target_soc - current_soc) / 100.0) * self.battery.capacity_kwh
                # Factor in charging efficiency
                kw_needed_to_target = kwh_needed_to_target / max(self.battery.efficiency, 0.1)

                # Charge with portion of surplus up to inverter max
                charge_power_kw = min(surplus_kw, kw_needed_to_target, self.battery.max_charge_kw)
                charge_result = self.battery.charge(charge_power_kw, duration_hours=1.0)
                battery_action = {
                    "mode": "CHARGING_TO_TARGET",
                    **charge_result,
                    "target_soc_pct": target_soc,
                }

                # Remaining surplus is exported to grid for revenue
                remaining_surplus_kw = max(0.0, surplus_kw - charge_result["power_charged_kw"])
            else:
                # Battery already at or above target SoC: export 100% of surplus to grid!
                battery_action = {
                    "mode": "IDLE_SUFFICIENT_SOC",
                    "power_charged_kw": 0.0,
                    "current_soc_pct": round(current_soc, 1),
                    "target_soc_pct": target_soc,
                    "note": f"Battery SoC ({current_soc:.1f}%) satisfies upcoming peak demand buffer.",
                }
                remaining_surplus_kw = surplus_kw

            # Export calculation
            if remaining_surplus_kw > 0:
                grid_export_profit = self.tariff.calculate_export_profit(remaining_surplus_kw, duration_hours=1.0)
                arbitrage_reasoning = (
                    f"Surplus of {surplus_kw:.2f} kW detected. "
                    f"Charged battery to {self.battery.soc_pct:.1f}% to guarantee peak resilience, "
                    f"and exported remaining {remaining_surplus_kw:.2f} kW to the grid, "
                    f"earning ₹{grid_export_profit['total_profit_earned_inr']:.2f} profit "
                    f"(at ₹{export_rate:.2f}/kWh | ₹{self.tariff.get_export_rate_per_watt_hour():.5f}/Wh)."
                )
            else:
                arbitrage_reasoning = (
                    f"Full surplus of {surplus_kw:.2f} kW directed to battery to reach target reserve."
                )

        # -------------------------------------------------------------
        # CASE 2: DEFICIT (Demand > Generation)
        # Discharge battery to shave peak tariff, generate zone/appliance load limits.
        # -------------------------------------------------------------
        else:
            deficit_kw = abs(net_power_kw)
            is_peak = hour in self.tariff.config.peak_hours

            # If during Peak hours, discharge battery to avoid expensive import (₹10.63/kWh)
            if is_peak and self.battery.available_discharge_energy_kwh > 0.5:
                discharge_result = self.battery.discharge(deficit_kw, duration_hours=1.0)
                battery_action = {
                    "mode": "DISCHARGING_PEAK_SHAVING",
                    **discharge_result,
                }
                unmet_deficit_kw = max(0.0, deficit_kw - discharge_result["power_delivered_kw"])
                peak_savings = self.tariff.calculate_peak_shaving_savings(
                    discharge_result["power_delivered_kw"], hour, 1.0
                )
                arbitrage_reasoning = (
                    f"Peak tariff window ({tariff_regime}). Discharged battery by "
                    f"{discharge_result['power_delivered_kw']:.2f} kW, saving ₹{peak_savings:.2f} "
                    f"in avoided peak grid charges. Remaining grid import: {unmet_deficit_kw:.2f} kW."
                )
            else:
                battery_action = {
                    "mode": "STANDBY_OR_RESERVE",
                    "power_delivered_kw": 0.0,
                    "current_soc_pct": round(self.battery.soc_pct, 1),
                }
                unmet_deficit_kw = deficit_kw
                arbitrage_reasoning = (
                    f"Net deficit of {deficit_kw:.2f} kW under {tariff_regime}. "
                    f"Battery held at reserve ({self.battery.soc_pct:.1f}%)."
                )

            # Calculate grid import cost for remaining deficit
            grid_import_cost = self.tariff.calculate_import_cost(unmet_deficit_kw, hour, duration_hours=1.0)

            # Generate Granular Zone & Appliance Demand Limiting Recommendations
            recommendations = self._generate_demand_limiting_recommendations(
                hour=hour,
                unmet_deficit_kw=unmet_deficit_kw,
                disaggregation=disaggregation,
                import_rate=import_rate,
            )

        # -------------------------------------------------------------
        # Energy Savings Calculation & Daily Impact
        # -------------------------------------------------------------
        total_recommended_reduction_kw = sum(r.power_reduction_kw for r in recommendations)
        total_recommended_savings_inr = sum(r.hourly_savings_inr for r in recommendations)

        # Energy saved percentage
        baseline_kw = total_demand_kw
        optimized_kw = max(0.0, total_demand_kw - total_recommended_reduction_kw)
        energy_saved_pct = (total_recommended_reduction_kw / max(baseline_kw, 1e-3)) * 100.0 if baseline_kw > 0 else 0.0

        daily_callout = ""
        if total_recommended_reduction_kw > 0:
            daily_callout = (
                f"Implementing these zone and appliance recommendations will save "
                f"{energy_saved_pct:.1f}% energy during this hour (reducing demand by "
                f"{total_recommended_reduction_kw:.2f} kW and saving ₹{total_recommended_savings_inr:.2f}/hr "
                f"on peak commercial tariffs)!"
            )

        return {
            "timestamp": str(timestamp),
            "hour": hour,
            "tariff_regime": tariff_regime,
            "import_rate_inr_kwh": import_rate,
            "export_rate_inr_kwh": export_rate,
            "total_demand_kw": round(total_demand_kw, 2),
            "solar_generation_kw": round(solar_generation_kw, 2),
            "net_power_kw": round(net_power_kw, 2),
            "battery_status": self.battery.get_status_display(),
            "battery_action": battery_action,
            "grid_export_profit": grid_export_profit,
            "grid_import_cost": grid_import_cost,
            "arbitrage_reasoning": arbitrage_reasoning,
            "recommendations": [
                {
                    "zone_id": r.zone_id,
                    "zone_name": r.zone_name,
                    "appliance": r.appliance.upper(),
                    "action_title": r.action_title,
                    "description": r.action_description,
                    "reduction_kw": round(r.power_reduction_kw, 2),
                    "savings_inr_per_hr": round(r.hourly_savings_inr, 2),
                    "carbon_avoided_kg_per_hr": round(r.power_reduction_kw * 0.716, 3),
                    "comfort_impact": r.comfort_impact,
                    "time_window": r.time_window,
                }
                for r in recommendations
            ],
            "savings_summary": {
                "baseline_demand_kw": round(baseline_kw, 2),
                "optimized_demand_kw": round(optimized_kw, 2),
                "total_reduction_kw": round(total_recommended_reduction_kw, 2),
                "energy_saved_pct": round(energy_saved_pct, 1),
                "total_savings_inr_hr": round(total_recommended_savings_inr, 2),
                "carbon_emissions_avoided_kg": round(total_recommended_reduction_kw * 1.0 * 0.716, 3),
                "environmental_metrics": {
                    "carbon_avoided_kg": round(total_recommended_reduction_kw * 1.0 * 0.716, 3),
                    "coal_burn_avoided_kg": round(total_recommended_reduction_kw * 1.0 * 0.45, 3),
                    "mature_tree_seedling_days": round((total_recommended_reduction_kw * 1.0 * 0.716) / (22.0 / 365.0), 1),
                    "grid_emission_standard": "CEA Baseline v19 (0.716 kg CO2e / kWh)",
                },
                "executive_callout": daily_callout,
            },
        }


    def _generate_demand_limiting_recommendations(
        self,
        hour: int,
        unmet_deficit_kw: float,
        disaggregation: Dict[str, Any],
        import_rate: float,
    ) -> List[DemandResponseAction]:
        """Generate specific zone-and-appliance-based curtailment recommendations."""
        actions: List[DemandResponseAction] = []
        ch = disaggregation.get("channel_details", {})
        time_win = f"{hour:02d}:00 - {hour+2:02d}:00"

        # Action 1: Zone 2 AC (Open Workstations / Computer Hall - 14 AC units)
        z2_ac_kw = ch.get("z2_ac", {}).get("demand_kw", 0.0)
        if z2_ac_kw > 3.0:
            reduction_kw = z2_ac_kw * 0.28  # Setback / cycle 4 out of 14 units
            savings_inr = reduction_kw * import_rate
            actions.append(DemandResponseAction(
                zone_id="z2",
                zone_name=ZONE_DEFINITIONS["z2"]["name"],
                appliance="Air Conditioning",
                action_title="Zone 2 Modular AC Cycling (+2°C Setback)",
                action_description=(
                    f"Set back thermostat from 22°C to 24°C and duty-cycle 4 of the 14 AC units in open office hall. "
                    f"Reduces cooling draw from {z2_ac_kw:.1f} kW to {z2_ac_kw - reduction_kw:.1f} kW."
                ),
                power_reduction_kw=reduction_kw,
                hourly_savings_inr=savings_inr,
                comfort_impact="LOW",
                time_window=time_win,
            ))

        # Action 2: Zone 1 & 4 AC (Offices & Seminar Rooms)
        z1_ac_kw = ch.get("z1_ac", {}).get("demand_kw", 0.0)
        z4_ac_kw = ch.get("z4_ac", {}).get("demand_kw", 0.0)
        other_ac_kw = z1_ac_kw + z4_ac_kw
        if other_ac_kw > 1.5:
            reduction_kw = other_ac_kw * 0.20
            savings_inr = reduction_kw * import_rate
            actions.append(DemandResponseAction(
                zone_id="z1_z4",
                zone_name="Zone 1 (Offices) & Zone 4 (Seminar Rooms)",
                appliance="Air Conditioning",
                action_title="Pre-Cooling Setback for Conference & Executive Rooms",
                action_description=(
                    f"Raise temperature setpoint by +1.5°C in unoccupied meeting rooms and seminar spaces. "
                    f"Trims load by {reduction_kw:.2f} kW without disrupting core office tasks."
                ),
                power_reduction_kw=reduction_kw,
                hourly_savings_inr=savings_inr,
                comfort_impact="LOW",
                time_window=time_win,
            ))

        # Action 3: Perimeter Lighting Dimming (Daylight Harvesting)
        z1_light_kw = ch.get("z1_light", {}).get("demand_kw", 0.0)
        z4_light_kw = ch.get("z4_light", {}).get("demand_kw", 0.0)
        peri_light_kw = z1_light_kw + z4_light_kw
        if peri_light_kw > 0.4 and (10 <= hour <= 17):
            reduction_kw = peri_light_kw * 0.30
            savings_inr = reduction_kw * import_rate
            actions.append(DemandResponseAction(
                zone_id="z1_z4",
                zone_name="Zone 1 & 4 Perimeter Facades",
                appliance="Lighting",
                action_title="Daylight Harvesting Dimming (25% Reduction)",
                action_description=(
                    f"Dim perimeter corridor and window-adjacent fixtures by 25%, taking advantage of abundant natural sunlight."
                ),
                power_reduction_kw=reduction_kw,
                hourly_savings_inr=savings_inr,
                comfort_impact="LOW",
                time_window=time_win,
            ))

        # Action 4: Standby Plug Load Shedding
        total_plug_kw = sum(ch.get(k, {}).get("demand_kw", 0.0) for k in ["z1_plug", "z2_plug", "z3_plug", "z4_plug"])
        if total_plug_kw > 1.0:
            reduction_kw = total_plug_kw * 0.25
            savings_inr = reduction_kw * import_rate
            actions.append(DemandResponseAction(
                zone_id="campus_wide",
                zone_name="Campus-Wide Zones (Z1-Z4)",
                appliance="Plug Loads",
                action_title="Non-Essential Standby Power Shedding",
                action_description=(
                    f"Deactivate water heaters, idle printers, and non-critical laboratory displays. "
                    f"Saves {reduction_kw:.2f} kW with zero productivity impact."
                ),
                power_reduction_kw=reduction_kw,
                hourly_savings_inr=savings_inr,
                comfort_impact="LOW",
                time_window=time_win,
            ))

        return actions

    def simulate_24h_cycle(
        self,
        date_str: str,
        forecaster_1a,
        disaggregator_1b,
        solar_model,
        weather_hourly: Optional[Dict[int, Dict[str, float]]] = None,
    ) -> Dict[str, Any]:
        """
        Simulate a continuous 24-hour energy dispatch cycle (00:00 to 23:00).
        Tracks dynamic battery SoC trajectory, grid imports, solar exports,
        zone-level demand response, and computes total daily energy saved (%).
        """
        results_hourly = []
        base_date = pd.Timestamp(date_str).normalize()

        cumulative_baseline_kwh = 0.0
        cumulative_optimized_kwh = 0.0
        cumulative_curtailed_kwh = 0.0
        cumulative_import_cost_inr = 0.0
        cumulative_export_profit_inr = 0.0
        cumulative_bill_saved_inr = 0.0

        # Run 24 consecutive hours
        recent_load = 18.0  # seed load
        for h in range(24):
            ts = base_date + pd.Timedelta(hours=h)

            # Weather for this hour
            if weather_hourly and h in weather_hourly:
                temp_c = weather_hourly[h].get("temp_c", 35.0)
                rh_pct = weather_hourly[h].get("rh_pct", 35.0)
            else:
                # Diurnal profile for summer Delhi
                temp_c = 28.0 + 12.0 * np.sin(np.pi * (h - 6) / 14.0) if 6 <= h <= 20 else 28.0
                rh_pct = 60.0 - 25.0 * np.sin(np.pi * (h - 6) / 14.0) if 6 <= h <= 20 else 60.0

            feat_1a = pd.DataFrame([{
                "lag_1h": recent_load,
                "lag_24h": recent_load * 0.95,
                "rolling_24h_mean": 18.5,
                "hour_of_day": h,
                "day_of_week": ts.dayofweek,
                "month": ts.month,
                "is_weekend": 1 if ts.dayofweek >= 5 else 0,
                "temperature_c": temp_c,
                "humidity_pct": rh_pct,
            }])

            feat_1b = pd.DataFrame([{
                "hour_of_day": h,
                "day_of_week": ts.dayofweek,
                "is_weekend": 1 if ts.dayofweek >= 5 else 0,
                "month": ts.month,
                "temperature_c": temp_c,
                "humidity_pct": rh_pct,
            }])

            pred_demand = float(forecaster_1a.predict(feat_1a)[0])
            pred_disagg = disaggregator_1b.predict_zone_demand(pred_demand, feat_1b)
            solar_kw = solar_model.predict_solar_kw(ts, site="delhi")

            step_res = self.optimize_step(
                timestamp=ts,
                total_demand_kw=pred_demand,
                disaggregation=pred_disagg,
                solar_generation_kw=solar_kw,
            )

            results_hourly.append(step_res)
            recent_load = pred_demand

            # Accumulate metrics
            baseline_h = step_res["total_demand_kw"]
            curtailed_h = step_res["savings_summary"]["total_reduction_kw"]
            opt_h = step_res["savings_summary"]["optimized_demand_kw"]

            cumulative_baseline_kwh += baseline_h
            cumulative_curtailed_kwh += curtailed_h
            cumulative_optimized_kwh += opt_h

            if step_res.get("grid_import_cost"):
                cumulative_import_cost_inr += step_res["grid_import_cost"].get("total_cost_inr", 0.0)
            if step_res.get("grid_export_profit"):
                cumulative_export_profit_inr += step_res["grid_export_profit"].get("total_profit_earned_inr", 0.0)

            cumulative_bill_saved_inr += step_res["savings_summary"].get("total_savings_inr_hr", 0.0)

        # Compute Daily Summary
        daily_energy_saved_pct = (
            (cumulative_curtailed_kwh / max(cumulative_baseline_kwh, 1e-3)) * 100.0
            if cumulative_baseline_kwh > 0 else 0.0
        )
        net_electricity_cost_inr = cumulative_import_cost_inr - cumulative_export_profit_inr

        daily_executive_callout = (
            f"By implementing the recommended zone-level schedules and BESS arbitrage today, "
            f"you saved {daily_energy_saved_pct:.1f}% energy ({cumulative_curtailed_kwh:.1f} kWh curtailed), "
            f"earned ₹{cumulative_export_profit_inr:.2f} in solar feed-in revenue, and slashed "
            f"₹{cumulative_bill_saved_inr:.2f} in peak grid electricity charges!"
        )

        return {
            "date": str(base_date.date()),
            "hourly_timeline": results_hourly,
            "daily_summary": {
                "baseline_energy_consumed_kwh": round(cumulative_baseline_kwh, 1),
                "optimized_energy_consumed_kwh": round(cumulative_optimized_kwh, 1),
                "total_energy_saved_kwh": round(cumulative_curtailed_kwh, 1),
                "daily_energy_saved_pct": round(daily_energy_saved_pct, 1),
                "gross_grid_import_cost_inr": round(cumulative_import_cost_inr, 2),
                "total_solar_export_revenue_inr": round(cumulative_export_profit_inr, 2),
                "net_energy_bill_inr": round(net_electricity_cost_inr, 2),
                "total_peak_bill_saved_inr": round(cumulative_bill_saved_inr, 2),
                "executive_callout": daily_executive_callout,
            },
        }

