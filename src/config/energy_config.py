"""
Centralized Energy Configuration & Parameters for Urja Saathi.

Fitted for: Bennett University Academic & Engineering Complex (Greater Noida, UP)

Modularizes settings:
- Indian Commercial Electricity Tariffs (NPCL / UPERC ToD slabs & Feed-in rates)
- BESS Capacity Equation & Specifications (2-3 Hours Autonomy Coverage)
- Multi-Zone building definitions & appliance load channels
- Machine Learning hyperparameters for Model 1A and Model 1B
- Data filepaths and artifact locations
"""

from dataclasses import dataclass, field
from typing import Dict, List, Any


def calculate_bess_capacity_equation(
    avg_demand_kw: float,
    autonomy_hours: float = 2.5,
    max_dod: float = 0.80,
    round_trip_efficiency: float = 0.92,
) -> Dict[str, Any]:
    """
    First-Principles BESS Sizing Physics Equation for Commercial Buildings:
    
    Formula:
        C_BESS (kWh) = (P_avg_demand * T_autonomy) / (DoD_max * Efficiency)

    Where:
    - P_avg_demand: Average building electrical demand in kW
    - T_autonomy: Desired backup coverage duration in hours (typically 2.0 to 3.0 hours)
    - DoD_max: Maximum Depth of Discharge limit (0.80 = 80%, keeping 20% safety buffer)
    - Efficiency: Combined Inverter & Cell Round-Trip Efficiency (0.92 = 92%)
    """
    denom = max_dod * round_trip_efficiency
    usable_energy_needed_kwh = avg_demand_kw * autonomy_hours
    nominal_capacity_kwh = usable_energy_needed_kwh / denom if denom > 0 else usable_energy_needed_kwh

    return {
        "avg_demand_kw": round(avg_demand_kw, 2),
        "autonomy_hours": round(autonomy_hours, 1),
        "max_dod": max_dod,
        "round_trip_efficiency": round_trip_efficiency,
        "usable_energy_needed_kwh": round(usable_energy_needed_kwh, 2),
        "calculated_nominal_bess_kwh": round(nominal_capacity_kwh, 2),
        "recommended_capacity_kwh": round(np_round_five(nominal_capacity_kwh), 1),
    }


def np_round_five(val: float) -> float:
    """Round value to nearest 5 or 10 kWh standard pack size."""
    return round(val / 5.0) * 5.0


# =====================================================================
# 1. INDIAN COMMERCIAL ELECTRICITY TARIFFS (Time-of-Day / ToD Slabs)
# Fitted for NPCL (Noida Power Company Ltd) / UPERC Commercial Rate
# Bennett University Campus, Greater Noida, UP
# =====================================================================
@dataclass(frozen=True)
class IndianTariffConfig:
    # Base commercial tariff in INR per kWh
    base_commercial_rate_inr: float = 8.60

    # Peak hour surcharge (+25%)
    peak_surcharge_pct: float = 25.0
    peak_tariff_inr: float = 10.75  # 8.60 * 1.25

    # Solar / Off-peak rebate (-15%)
    offpeak_rebate_pct: float = 15.0
    offpeak_tariff_inr: float = 7.31  # 8.60 * 0.85

    # Solar Feed-in Tariff / APPC (Average Pooled Power Purchase Cost)
    solar_feed_in_tariff_inr: float = 4.25
    solar_export_rate_per_wh_inr: float = 4.25 / 1000.0  # 0.00425 INR/Wh

    # Time-of-Day (ToD) Hour definitions (0 to 23)
    peak_hours: List[int] = field(default_factory=lambda: [14, 15, 16, 22, 23, 0])
    solar_hours: List[int] = field(default_factory=lambda: [10, 11, 12, 13])

    def get_rate(self, hour: int) -> float:
        """Return instantaneous grid import tariff in INR/kWh for the given hour."""
        if hour in self.peak_hours:
            return self.peak_tariff_inr
        elif hour in self.solar_hours:
            return self.offpeak_tariff_inr
        else:
            return self.base_commercial_rate_inr

    def get_tariff_type(self, hour: int) -> str:
        """Return tariff regime label ('PEAK', 'OFF_PEAK_SOLAR', or 'NORMAL')."""
        if hour in self.peak_hours:
            return "PEAK (₹10.75/kWh)"
        elif hour in self.solar_hours:
            return "OFF_PEAK_SOLAR (₹7.31/kWh)"
        else:
            return "NORMAL (₹8.60/kWh)"


# =====================================================================
# 2. BATTERY ENERGY STORAGE SYSTEM (BESS) SPECIFICATIONS
# Bennett University Calculated BESS (covers 2.5 hours of 82.5 kW avg load)
# Equation: (82.5 kW * 2.5 h) / (0.80 * 0.92) = 280.2 kWh -> 280 kWh
# =====================================================================
@dataclass
class BatteryConfig:
    # Total nominal storage capacity in kWh (calculated via 2.5h autonomy equation)
    capacity_kwh: float = 280.0

    # Current initial State of Charge (SoC) in percent (0-100)
    initial_soc_pct: float = 45.0

    # Operational safety thresholds
    min_soc_pct: float = 20.0          # Minimum reserve to prevent deep discharge
    max_soc_pct: float = 95.0          # Maximum charge to prevent over-voltage

    # Inverter & C-rate power limits in kW
    max_charge_kw: float = 75.0        # Max charging power
    max_discharge_kw: float = 100.0    # Max discharging power for peak shaving

    # Round-trip efficiency (Coulombic * Inverter efficiency)
    round_trip_efficiency: float = 0.92

    # Battery target reserve for upcoming peak periods
    smart_target_soc_pct: float = 65.0


# Instantiate default singletons
DEFAULT_TARIFF = IndianTariffConfig()
DEFAULT_BATTERY = BatteryConfig()


# =====================================================================
# 3. MULTI-ZONE BUILDING SPECIFICATIONS & APPLIANCE DEFINITIONS
# Bennett University Academic & Engineering Complex
# =====================================================================
ZONE_DEFINITIONS: Dict[str, Dict[str, Any]] = {
    "z1": {
        "name": "Zone 1 (Executive Offices & Faculty Suites)",
        "area_sqm": 2200,
        "appliances": ["ac", "light", "plug"],
        "curtailment_flexibility": "MEDIUM",
        "description": "Executive offices & faculty cabins with VRF cooling and perimeter daylighting.",
    },
    "z2": {
        "name": "Zone 2 (Open Workstations, Computing & Robotics Labs)",
        "area_sqm": 12500,
        "appliances": ["ac", "light", "plug"],
        "curtailment_flexibility": "HIGH",
        "ac_units": 14,
        "description": "Large engineering open halls & computer labs with 14 modular AC compressors.",
    },
    "z3": {
        "name": "Zone 3 (Central Atrium & Academic Corridors)",
        "area_sqm": 3800,
        "appliances": ["light", "plug"],
        "curtailment_flexibility": "MEDIUM",
        "description": "Naturally ventilated circulation space with high-bay LED lighting and corridor plugs.",
    },
    "z4": {
        "name": "Zone 4 (Auditorium, Lecture Theatres & Seminar Halls)",
        "area_sqm": 4000,
        "appliances": ["ac", "light", "plug"],
        "curtailment_flexibility": "MEDIUM",
        "description": "Tiered lecture theatres & seminar halls. AC set back during non-lecture windows.",
    },
}

# The 10 canonical zone-appliance channels modeled by Model 1B
ZONE_APPLIANCE_CHANNELS: List[str] = [
    "z1_ac",
    "z1_light",
    "z1_plug",
    "z2_ac",
    "z2_light",
    "z2_plug",
    "z3_light",
    "z3_plug",
    "z4_ac",
    "z4_light",
    "z4_plug",
]


# =====================================================================
# 4. OPTIMAL XGBOOST HYPERPARAMETERS
# =====================================================================
XGB_PARAMS_1A: Dict[str, Any] = {
    "n_estimators": 500,
    "learning_rate": 0.03,
    "max_depth": 5,
    "subsample": 0.8,
    "colsample_bytree": 0.8,
    "objective": "reg:squarederror",
    "random_state": 42,
    "n_jobs": -1,
    "early_stopping_rounds": 30,
    "eval_metric": "rmse",
}

XGB_PARAMS_1B: Dict[str, Any] = {
    "n_estimators": 350,
    "learning_rate": 0.03,
    "max_depth": 4,
    "subsample": 0.85,
    "colsample_bytree": 0.85,
    "objective": "reg:squarederror",
    "random_state": 42,
    "n_jobs": -1,
    "early_stopping_rounds": 25,
    "eval_metric": "mae",
}


# =====================================================================
# 5. DATA & MODEL FILE PATHS
# =====================================================================
DATA_PATHS: Dict[str, str] = {
    "raw_iblend": "data/raw/iblend_academic.csv",
    "raw_weather": "data/raw/iiitd_weather.csv",
    "raw_cubems_floor2": "data/raw/cubems_2019floor2.csv",
    "raw_cubems_floor5": "data/raw/cubems_2019floor5.csv",
    "raw_solar_delhi": "data/raw/solar_delhi.csv",
    "raw_solar_greater_noida": "solar_greater_noida.csv",
    "processed_model1a": "data/processed/model1a_train.csv",
    "processed_model1b": "data/processed/model1b_train.csv",
    "processed_model2": "data/processed/model2_train.csv",
    "model1a_saved": "models_saved/model1a_xgb.json",
    "model1b_saved": "models_saved/model1b_xgb.json",
    "scaler_metadata": "models_saved/model_scaler_metadata.json",
    "monthly_analytics_json": "data/processed/monthly_savings_analytics.json",
    "monthly_analytics_csv": "data/processed/monthly_savings_analytics.csv",
}
