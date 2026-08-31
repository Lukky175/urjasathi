"""Battery state-of-charge tracking with power and energy bounds."""

from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np

from backend.app.core.config import (
    BATTERY_DEFAULT_CAPACITY,
    BATTERY_EFFICIENCY,
    BATTERY_INITIAL_SOC,
    BATTERY_MAX_CHARGE_KW,
    BATTERY_MAX_DISCHARGE_KW,
    BATTERY_MAX_SOC,
    BATTERY_MIN_SOC,
    PERCENT_SCALE,
)


@dataclass
class BatteryState:
    """SOC tracker in kWh and percent, with charge/discharge limits and round-trip η."""

    capacity_kwh: float = BATTERY_DEFAULT_CAPACITY
    max_charge_kw: float = BATTERY_MAX_CHARGE_KW
    max_discharge_kw: float = BATTERY_MAX_DISCHARGE_KW
    efficiency: float = BATTERY_EFFICIENCY
    min_soc: float = BATTERY_MIN_SOC
    max_soc: float = BATTERY_MAX_SOC
    soc_kwh: float = field(default_factory=lambda: BATTERY_INITIAL_SOC * BATTERY_DEFAULT_CAPACITY)

    @property
    def min_energy_kwh(self) -> float:
        return self.min_soc * self.capacity_kwh

    @property
    def max_energy_kwh(self) -> float:
        return self.max_soc * self.capacity_kwh

    @property
    def soc_percent(self) -> float:
        if self.capacity_kwh <= 0:
            return 0.0
        return (self.soc_kwh / self.capacity_kwh) * PERCENT_SCALE

    def apply_flow(
        self,
        charge_kw: float,
        discharge_kw: float,
        time_step_hours: float,
    ) -> tuple[float, float]:
        """Apply charge/discharge power for one step; clip to power and SOC bounds.

        Charge increases stored energy by ``charge_kw * η * dt``.
        Discharge decreases stored energy by ``discharge_kw / η * dt``.
        SOC is kept between ``BATTERY_MIN_SOC`` and ``BATTERY_MAX_SOC`` of capacity.
        """
        if time_step_hours <= 0:
            return 0.0, 0.0

        charge_kw = float(np.clip(charge_kw, 0.0, self.max_charge_kw))
        discharge_kw = float(np.clip(discharge_kw, 0.0, self.max_discharge_kw))

        charge_headroom_kwh = (self.max_energy_kwh - self.soc_kwh) / self.efficiency
        discharge_headroom_kwh = (self.soc_kwh - self.min_energy_kwh) * self.efficiency

        charge_kw = min(charge_kw, max(charge_headroom_kwh / time_step_hours, 0.0))
        discharge_kw = min(discharge_kw, max(discharge_headroom_kwh / time_step_hours, 0.0))

        self.soc_kwh = (
            self.soc_kwh
            + charge_kw * self.efficiency * time_step_hours
            - discharge_kw / self.efficiency * time_step_hours
        )
        self.soc_kwh = float(np.clip(self.soc_kwh, self.min_energy_kwh, self.max_energy_kwh))
        return charge_kw, discharge_kw


Battery = BatteryState
