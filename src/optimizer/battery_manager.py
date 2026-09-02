"""
Battery Energy Storage System (BESS) Manager for Urja Saathi.

Manages live battery state of charge (SoC %), charge/discharge limits,
efficiency losses, headroom tracking, and visual capacity reporting.
"""

from typing import Dict, Any
from src.config.energy_config import BatteryConfig, DEFAULT_BATTERY


class BatteryManager:
    """Tracks and regulates battery storage state, safety limits, and power flows."""

    def __init__(self, config: BatteryConfig = DEFAULT_BATTERY):
        self.capacity_kwh = config.capacity_kwh
        self.soc_pct = float(config.initial_soc_pct)
        self.min_soc_pct = config.min_soc_pct
        self.max_soc_pct = config.max_soc_pct
        self.max_charge_kw = config.max_charge_kw
        self.max_discharge_kw = config.max_discharge_kw
        self.efficiency = config.round_trip_efficiency
        self.smart_target_soc = config.smart_target_soc_pct

    @property
    def current_energy_kwh(self) -> float:
        """Current stored energy in kWh."""
        if self.capacity_kwh <= 0:
            return 0.0
        return (self.soc_pct / 100.0) * self.capacity_kwh

    @property
    def max_usable_kwh(self) -> float:
        """Maximum allowable energy before overcharging."""
        if self.capacity_kwh <= 0:
            return 0.0
        return (self.max_soc_pct / 100.0) * self.capacity_kwh

    @property
    def min_reserve_kwh(self) -> float:
        """Minimum reserved energy to protect battery longevity."""
        if self.capacity_kwh <= 0:
            return 0.0
        return (self.min_soc_pct / 100.0) * self.capacity_kwh

    @property
    def available_charge_headroom_kwh(self) -> float:
        """Energy headroom in kWh that can still be absorbed."""
        if self.capacity_kwh <= 0:
            return 0.0
        return max(0.0, self.max_usable_kwh - self.current_energy_kwh)

    @property
    def available_discharge_energy_kwh(self) -> float:
        """Dischargeable energy in kWh before hitting reserve threshold."""
        if self.capacity_kwh <= 0:
            return 0.0
        return max(0.0, self.current_energy_kwh - self.min_reserve_kwh)

    def charge(self, power_kw: float, duration_hours: float = 1.0) -> Dict[str, float]:
        """
        Charge the battery with specified power, respecting max charge rate,
        usable capacity headroom, and one-way charge efficiency.
        """
        if self.capacity_kwh <= 0:
            return {
                "power_charged_kw": 0.0,
                "energy_stored_kwh": 0.0,
                "new_soc_pct": 0.0,
                "current_energy_kwh": 0.0,
            }
        # Limit to inverter max charge rate
        charge_power = min(power_kw, self.max_charge_kw)
        requested_kwh = charge_power * duration_hours
        effective_kwh = requested_kwh * self.efficiency

        actual_stored_kwh = min(effective_kwh, self.available_charge_headroom_kwh)
        actual_charge_kw = (actual_stored_kwh / self.efficiency) / duration_hours if duration_hours > 0 else 0.0

        # Update SoC
        new_energy_kwh = self.current_energy_kwh + actual_stored_kwh
        self.soc_pct = min(self.max_soc_pct, (new_energy_kwh / max(self.capacity_kwh, 1e-4)) * 100.0)

        return {
            "power_charged_kw": round(actual_charge_kw, 2),
            "energy_stored_kwh": round(actual_stored_kwh, 2),
            "new_soc_pct": round(self.soc_pct, 1),
            "current_energy_kwh": round(self.current_energy_kwh, 2),
        }

    def discharge(self, requested_power_kw: float, duration_hours: float = 1.0) -> Dict[str, float]:
        """
        Discharge battery to meet demand, respecting max discharge rate
        and minimum reserve margins.
        """
        if self.capacity_kwh <= 0 or self.available_discharge_energy_kwh <= 0:
            return {
                "power_delivered_kw": 0.0,
                "energy_delivered_kwh": 0.0,
                "new_soc_pct": 0.0,
                "current_energy_kwh": 0.0,
            }
        allowable_discharge_kw = min(requested_power_kw, self.max_discharge_kw)
        max_deliverable_kwh = self.available_discharge_energy_kwh * self.efficiency
        requested_kwh = allowable_discharge_kw * duration_hours

        delivered_kwh = min(requested_kwh, max_deliverable_kwh)
        delivered_kw = delivered_kwh / duration_hours if duration_hours > 0 else 0.0

        # Internal battery energy drained
        internal_drain_kwh = delivered_kwh / self.efficiency if self.efficiency > 0 else delivered_kwh
        new_energy_kwh = max(self.min_reserve_kwh, self.current_energy_kwh - internal_drain_kwh)
        self.soc_pct = max(self.min_soc_pct, (new_energy_kwh / max(self.capacity_kwh, 1e-4)) * 100.0)

        return {
            "power_delivered_kw": round(delivered_kw, 2),
            "energy_delivered_kwh": round(delivered_kwh, 2),
            "new_soc_pct": round(self.soc_pct, 1),
            "current_energy_kwh": round(self.current_energy_kwh, 2),
        }

    def get_status_display(self) -> Dict[str, Any]:
        """Return formatted battery status, progress bar, and health metrics."""
        if self.capacity_kwh <= 0:
            return {
                "capacity_kwh": 0.0,
                "current_energy_kwh": 0.0,
                "soc_pct": 0.0,
                "soc_bar": "[NO BATTERY INSTALLED]",
                "min_reserve_kwh": 0.0,
                "max_usable_kwh": 0.0,
                "available_headroom_kwh": 0.0,
                "available_discharge_kwh": 0.0,
                "max_charge_rate_kw": 0.0,
                "max_discharge_rate_kw": 0.0,
                "status": "NO_BESS_DEPLOYED (Pure Demand-Response Mode)",
            }
        bar_length = 20
        filled = int((self.soc_pct / 100.0) * bar_length)
        bar = "█" * filled + "░" * (bar_length - filled)

        return {
            "capacity_kwh": round(self.capacity_kwh, 1),
            "current_energy_kwh": round(self.current_energy_kwh, 2),
            "soc_pct": round(self.soc_pct, 1),
            "soc_bar": f"[{bar}] {self.soc_pct:.1f}%",
            "min_reserve_kwh": round(self.min_reserve_kwh, 1),
            "max_usable_kwh": round(self.max_usable_kwh, 1),
            "available_headroom_kwh": round(self.available_charge_headroom_kwh, 2),
            "available_discharge_kwh": round(self.available_discharge_energy_kwh, 2),
            "max_charge_rate_kw": self.max_charge_kw,
            "max_discharge_rate_kw": self.max_discharge_kw,
            "status": "HEALTHY",
        }

