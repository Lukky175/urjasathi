"""
Indian Commercial Electricity Tariff & Profit Manager for Urja Saathi.

Calculates instantaneous grid import costs, Time-of-Day (ToD) peak/off-peak rates,
and solar feed-in / export revenues based on Delhi / NCR commercial electricity regulations.
"""

from typing import Dict, Union
import pandas as pd

from src.config.energy_config import IndianTariffConfig, DEFAULT_TARIFF


class TariffManager:
    """Calculates dynamic import costs, export profits, and peak shaving savings in INR."""

    def __init__(self, config: IndianTariffConfig = DEFAULT_TARIFF):
        self.config = config

    def get_import_rate(self, hour: int) -> float:
        """Return grid electricity purchase price in INR/kWh for the specified hour."""
        return self.config.get_rate(hour)

    def get_export_rate(self) -> float:
        """Return grid feed-in tariff (APPC) in INR/kWh."""
        return self.config.solar_feed_in_tariff_inr

    def get_export_rate_per_watt_hour(self) -> float:
        """Return grid feed-in tariff in INR per Watt-hour."""
        return self.config.solar_export_rate_per_wh_inr

    def calculate_export_profit(self, surplus_kw: float, duration_hours: float = 1.0) -> Dict[str, float]:
        """
        Calculate financial profit in INR for sending a given amount of surplus power to the grid.
        Calculates both per-kWh and per-Watt rates.
        """
        surplus_kwh = max(0.0, surplus_kw * duration_hours)
        surplus_wh = surplus_kwh * 1000.0

        rate_kwh = self.get_export_rate()
        rate_wh = self.get_export_rate_per_watt_hour()
        total_profit_inr = surplus_kwh * rate_kwh

        return {
            "surplus_exported_kw": round(surplus_kw, 2),
            "surplus_exported_kwh": round(surplus_kwh, 2),
            "surplus_exported_wh": round(surplus_wh, 1),
            "feed_in_rate_per_kwh_inr": round(rate_kwh, 2),
            "feed_in_rate_per_wh_inr": round(rate_wh, 5),
            "total_profit_earned_inr": round(total_profit_inr, 2),
        }

    def calculate_import_cost(self, import_kw: float, hour: int, duration_hours: float = 1.0) -> Dict[str, float]:
        """Calculate grid import cost in INR based on ToD slab."""
        import_kwh = max(0.0, import_kw * duration_hours)
        rate_kwh = self.get_import_rate(hour)
        cost_inr = import_kwh * rate_kwh

        return {
            "import_kw": round(import_kw, 2),
            "import_kwh": round(import_kwh, 2),
            "tariff_rate_inr_kwh": round(rate_kwh, 2),
            "tariff_slab": self.config.get_tariff_type(hour),
            "total_cost_inr": round(cost_inr, 2),
        }

    def calculate_peak_shaving_savings(
        self,
        shaved_kw: float,
        hour: int,
        duration_hours: float = 1.0,
    ) -> float:
        """Calculate bill savings (INR) achieved by reducing grid draw during a given hour."""
        rate = self.get_import_rate(hour)
        return float(shaved_kw * duration_hours * rate)
