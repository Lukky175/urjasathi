"""
Model 2: Solar Forecaster & Generation Profile Integrator.

Parses and queries physics-based solar generation profiles derived from NREL PVWatts v8
NSRDB datasets for Delhi and Greater Noida. Provides seamless solar yield profiles
for optimizer ingestion and grid balance calculations.
"""

from pathlib import Path
from typing import Dict, List, Optional, Union
try:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore
except ImportError:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore


from src.data_loaders.load_pvwatts import load_pvwatts_data


class SolarForecaster:
    """Interface to query and model hourly solar PV yield profiles."""

    def __init__(self, primary_site: str = "delhi"):
        self.primary_site = primary_site.lower().replace(" ", "_")
        self.profiles: Dict[str, pd.DataFrame] = {}
        self._load_site(self.primary_site)

    def _load_site(self, site: str) -> pd.DataFrame:
        site_key = site.lower().replace(" ", "_")
        if site_key not in self.profiles:
            df = load_pvwatts_data(site=site_key, processed_out=None)
            # Create an hourly index for fast timestamp queries
            df["hour_idx"] = df["timestamp"].dt.dayofyear * 24 + df["timestamp"].dt.hour
            self.profiles[site_key] = df
        return self.profiles[site_key]

    def get_profile(self, site: Optional[str] = None) -> pd.DataFrame:
        """Retrieve full annual solar generation DataFrame for a given site."""
        site_key = (site or self.primary_site).lower().replace(" ", "_")
        return self._load_site(site_key)

    def predict_solar_kw(
        self,
        timestamp: Union[str, pd.Timestamp],
        site: Optional[str] = None,
        capacity_scale: float = 1.0,
    ) -> float:
        """
        Query expected solar output in kW for a given timestamp and site.
        Optionally scales by capacity_scale (e.g. 1.5 for 60kW if base is 40kW).
        """
        site_key = (site or self.primary_site).lower().replace(" ", "_")
        df = self._load_site(site_key)

        ts = pd.to_datetime(timestamp)
        # Look up by month, day, hour (TMY typical year match)
        matches = df[
            (df["timestamp"].dt.month == ts.month) &
            (df["timestamp"].dt.day == ts.day) &
            (df["timestamp"].dt.hour == ts.hour)
        ]

        if len(matches) > 0:
            base_kw = float(matches.iloc[0]["value_kw"])
        else:
            # Fallback by hour of day and month average
            hour_match = df[
                (df["timestamp"].dt.month == ts.month) &
                (df["timestamp"].dt.hour == ts.hour)
            ]
            base_kw = float(hour_match["value_kw"].mean()) if len(hour_match) > 0 else 0.0

        return max(0.0, base_kw * capacity_scale)

    def get_solar_stats(self, site: Optional[str] = None) -> Dict[str, float]:
        """Compute annual energy metrics and capacity factor for site."""
        site_key = (site or self.primary_site).lower().replace(" ", "_")
        df = self._load_site(site_key)

        annual_kwh = float(df["value_kw"].sum())
        peak_kw = float(df["value_kw"].max())
        mean_kw = float(df["value_kw"].mean())
        # Assuming 40 kW rated capacity
        capacity_factor_pct = float((mean_kw / 40.0) * 100.0)

        return {
            "site": site_key,
            "annual_yield_kWh": round(annual_kwh, 1),
            "peak_output_kW": round(peak_kw, 2),
            "mean_hourly_kW": round(mean_kw, 2),
            "capacity_factor_pct": round(capacity_factor_pct, 2),
            "total_hours": len(df),
        }
