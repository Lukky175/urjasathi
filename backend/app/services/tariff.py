"""Time-of-Use and feed-in rate lookup for horizon step indices."""

from __future__ import annotations

import numpy as np

from backend.app.core.config import (
    FEED_IN_TARIFF_INR_PER_KWH,
    HORIZON_STEPS,
    HOURS_IN_DAY,
    TARIFF_BY_HOUR_INR,
)


def hour_of_day(step: int) -> int:
    """Map horizon step ``t`` to clock hour in ``[0, HOURS_IN_DAY)``."""
    return int(step % HOURS_IN_DAY)


def get_tou_rate(step: int) -> float:
    """Retail ToU price (INR/kWh) for horizon step ``t``."""
    return float(TARIFF_BY_HOUR_INR[hour_of_day(step)])


def get_feed_in_rate(step: int) -> float:
    """Export / feed-in price (INR/kWh) for horizon step ``t``."""
    return float(FEED_IN_TARIFF_INR_PER_KWH)


def tou_rate_vector(horizon_steps: int = HORIZON_STEPS) -> np.ndarray:
    """Vector of ToU rates for ``t in [0, horizon_steps)``."""
    clock_hours = np.arange(HOURS_IN_DAY, dtype=int)
    schedule = np.array([TARIFF_BY_HOUR_INR[int(hour)] for hour in clock_hours], dtype=float)
    return schedule[np.arange(horizon_steps) % HOURS_IN_DAY]


def feed_in_rate_vector(horizon_steps: int = HORIZON_STEPS) -> np.ndarray:
    """Vector of feed-in rates for ``t in [0, horizon_steps)``."""
    return np.full(horizon_steps, FEED_IN_TARIFF_INR_PER_KWH, dtype=float)


class TariffSchedule:
    """ToU + feed-in accessor used by the baseline allocator and PuLP objective."""

    def rate_inr_per_kwh(self, step: int) -> float:
        return get_tou_rate(step)

    def feed_in_inr_per_kwh(self, step: int) -> float:
        return get_feed_in_rate(step)
