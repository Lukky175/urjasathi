"""Central non-sensitive operational defaults for Person A services.

Import these names from this module. Do not hardcode horizons, battery
limits, tariff hours/rates, or anomaly thresholds in service logic.
Sensitive credentials belong in ``.env`` (pydantic-settings / python-dotenv)
and must not be placed in this file.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field, computed_field


class Settings(BaseModel):
    """Non-sensitive operational settings for forecasting, battery, ToU, and anomalies."""

    model_config = ConfigDict(frozen=True, extra="forbid")

    # --- Forecast / optimization horizon ---
    HORIZON_STEPS: int = 24
    TIME_STEP_HOURS: float = 1.0
    HOURS_IN_DAY: int = 24
    PERCENT_SCALE: float = 100.0

    # --- Battery defaults (capacity kWh, power kW, SOC as fraction) ---
    BATTERY_DEFAULT_CAPACITY: float = 100.0
    BATTERY_MAX_CHARGE_KW: float = 50.0
    BATTERY_MAX_DISCHARGE_KW: float = 50.0
    BATTERY_EFFICIENCY: float = 0.90
    BATTERY_MIN_SOC: float = 0.20
    BATTERY_MAX_SOC: float = 0.90
    BATTERY_INITIAL_SOC: float = 0.50

    # --- Time-of-Use tariff (INR/kWh) and hour-of-day mappings (0–23) ---
    TARIFF_PEAK_INR_PER_KWH: float = 12.00
    TARIFF_SHOULDER_INR_PER_KWH: float = 8.00
    TARIFF_OFF_PEAK_INR_PER_KWH: float = 5.50
    FEED_IN_TARIFF_INR_PER_KWH: float = 3.50
    PEAK_HOURS: tuple[int, ...] = Field(default=(18, 19, 20, 21, 22))
    OFF_PEAK_HOURS: tuple[int, ...] = Field(default=(0, 1, 2, 3, 4, 5))

    # --- Anomaly detection ---
    ANOMALY_ZSCORE_WARNING: float = 2.5
    ANOMALY_ZSCORE_ALERT: float = 3.5
    ANOMALY_AC_KW_THRESHOLD: float = 80.0
    ANOMALY_LIGHT_KW_THRESHOLD: float = 25.0
    ANOMALY_PLUG_KW_THRESHOLD: float = 40.0

    # --- Solver / evaluation (non-secret operational bounds) ---
    SOLVER_TIME_LIMIT_SECONDS: float = 2.0
    TARGET_COST_REDUCTION_PCT: float = 15.0
    TARGET_PEAK_REDUCTION_PCT: float = 10.0

    # --- Model artifacts and site defaults ---
    MODEL_1A_PATH: str = "backend/app/models/model1a_xgb.json"
    MODEL_1B_PATH: str = "backend/app/models/model1b_xgb.json"
    SOLAR_DATA_PATH: str = "backend/app/models/solar_delhi.csv"
    DEFAULT_SITE: str = "delhi"
    DEFAULT_CAPACITY_SCALE: float = 1.0
    DEFAULT_PV_CAPACITY_KWP: float = 40.0
    WATTS_PER_KILOWATT: float = 1000.0
    MODEL_1B_BOOSTER_COUNT: int = 10
    MODEL_1A_FEATURES: tuple[str, ...] = Field(
        default=(
            "hour",
            "day_of_week",
            "month",
            "is_weekend",
            "temperature_c",
            "relative_humidity",
            "occupancy",
            "lag_demand_1h",
            "lag_demand_24h",
        )
    )
    MODEL_1B_FEATURES: tuple[str, ...] = Field(
        default=(
            "hour",
            "day_of_week",
            "is_weekend",
            "occupancy",
            "temperature_c",
            "month",
        )
    )
    MODEL_1B_AC_BOOSTER_INDICES: tuple[int, ...] = Field(default=(0, 1, 2))
    MODEL_1B_LIGHT_BOOSTER_INDICES: tuple[int, ...] = Field(default=(3, 4, 5))
    MODEL_1B_PLUG_BOOSTER_INDICES: tuple[int, ...] = Field(default=(6, 7, 8))
    MODEL_1B_OTHER_BOOSTER_INDICES: tuple[int, ...] = Field(default=(9,))
    FALLBACK_AC_SHARE: float = 0.50
    FALLBACK_LIGHT_SHARE: float = 0.20
    FALLBACK_PLUG_SHARE: float = 0.30
    SOLAR_FALLBACK_SUNRISE_HOUR: float = 6.0
    SOLAR_FALLBACK_SUNSET_HOUR: float = 18.0

    @computed_field  # type: ignore[prop-decorator]
    @property
    def TARIFF_BY_HOUR_INR(self) -> dict[int, float]:
        """Hour-of-day (0–23) → ToU rate (INR/kWh). Peak and off-peak override shoulder."""
        peak = set(self.PEAK_HOURS)
        off_peak = set(self.OFF_PEAK_HOURS)
        return {
            hour: (
                self.TARIFF_PEAK_INR_PER_KWH
                if hour in peak
                else self.TARIFF_OFF_PEAK_INR_PER_KWH
                if hour in off_peak
                else self.TARIFF_SHOULDER_INR_PER_KWH
            )
            for hour in range(self.HOURS_IN_DAY)
        }


settings = Settings()

HORIZON_STEPS = settings.HORIZON_STEPS
TIME_STEP_HOURS = settings.TIME_STEP_HOURS
HOURS_IN_DAY = settings.HOURS_IN_DAY
PERCENT_SCALE = settings.PERCENT_SCALE

BATTERY_DEFAULT_CAPACITY = settings.BATTERY_DEFAULT_CAPACITY
BATTERY_MAX_CHARGE_KW = settings.BATTERY_MAX_CHARGE_KW
BATTERY_MAX_DISCHARGE_KW = settings.BATTERY_MAX_DISCHARGE_KW
BATTERY_EFFICIENCY = settings.BATTERY_EFFICIENCY
BATTERY_MIN_SOC = settings.BATTERY_MIN_SOC
BATTERY_MAX_SOC = settings.BATTERY_MAX_SOC
BATTERY_INITIAL_SOC = settings.BATTERY_INITIAL_SOC

TARIFF_PEAK_INR_PER_KWH = settings.TARIFF_PEAK_INR_PER_KWH
TARIFF_SHOULDER_INR_PER_KWH = settings.TARIFF_SHOULDER_INR_PER_KWH
TARIFF_OFF_PEAK_INR_PER_KWH = settings.TARIFF_OFF_PEAK_INR_PER_KWH
FEED_IN_TARIFF_INR_PER_KWH = settings.FEED_IN_TARIFF_INR_PER_KWH
PEAK_HOURS = settings.PEAK_HOURS
OFF_PEAK_HOURS = settings.OFF_PEAK_HOURS
TARIFF_BY_HOUR_INR = settings.TARIFF_BY_HOUR_INR

ANOMALY_ZSCORE_WARNING = settings.ANOMALY_ZSCORE_WARNING
ANOMALY_ZSCORE_ALERT = settings.ANOMALY_ZSCORE_ALERT
ANOMALY_AC_KW_THRESHOLD = settings.ANOMALY_AC_KW_THRESHOLD
ANOMALY_LIGHT_KW_THRESHOLD = settings.ANOMALY_LIGHT_KW_THRESHOLD
ANOMALY_PLUG_KW_THRESHOLD = settings.ANOMALY_PLUG_KW_THRESHOLD

SOLVER_TIME_LIMIT_SECONDS = settings.SOLVER_TIME_LIMIT_SECONDS
TARGET_COST_REDUCTION_PCT = settings.TARGET_COST_REDUCTION_PCT
TARGET_PEAK_REDUCTION_PCT = settings.TARGET_PEAK_REDUCTION_PCT

DEMAND_MODEL_PATH = settings.MODEL_1A_PATH
SOLAR_MODEL_PATH = settings.SOLAR_DATA_PATH
MODEL_1A_PATH = settings.MODEL_1A_PATH
MODEL_1B_PATH = settings.MODEL_1B_PATH
SOLAR_DATA_PATH = settings.SOLAR_DATA_PATH
DEFAULT_SITE = settings.DEFAULT_SITE
DEFAULT_CAPACITY_SCALE = settings.DEFAULT_CAPACITY_SCALE
DEFAULT_PV_CAPACITY_KWP = settings.DEFAULT_PV_CAPACITY_KWP
WATTS_PER_KILOWATT = settings.WATTS_PER_KILOWATT
MODEL_1B_BOOSTER_COUNT = settings.MODEL_1B_BOOSTER_COUNT
MODEL_1A_FEATURES = settings.MODEL_1A_FEATURES
MODEL_1B_FEATURES = settings.MODEL_1B_FEATURES
MODEL_1B_AC_BOOSTER_INDICES = settings.MODEL_1B_AC_BOOSTER_INDICES
MODEL_1B_LIGHT_BOOSTER_INDICES = settings.MODEL_1B_LIGHT_BOOSTER_INDICES
MODEL_1B_PLUG_BOOSTER_INDICES = settings.MODEL_1B_PLUG_BOOSTER_INDICES
MODEL_1B_OTHER_BOOSTER_INDICES = settings.MODEL_1B_OTHER_BOOSTER_INDICES
FALLBACK_AC_SHARE = settings.FALLBACK_AC_SHARE
FALLBACK_LIGHT_SHARE = settings.FALLBACK_LIGHT_SHARE
FALLBACK_PLUG_SHARE = settings.FALLBACK_PLUG_SHARE
SOLAR_FALLBACK_SUNRISE_HOUR = settings.SOLAR_FALLBACK_SUNRISE_HOUR
SOLAR_FALLBACK_SUNSET_HOUR = settings.SOLAR_FALLBACK_SUNSET_HOUR
