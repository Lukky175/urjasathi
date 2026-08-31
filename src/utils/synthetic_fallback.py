"""
Synthetic Fallback Data Generator for Urja Saathi.

Provides realistic fallback data generation if raw files (I-BLEND, CU-BEMS, or PVWatts)
are missing or corrupted, adhering strictly to the published raw schemas.
"""

from pathlib import Path
from typing import Union, Optional, Any

try:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore
except ImportError:
    import numpy as np  # type: ignore
    import pandas as pd  # type: ignore



def generate_synthetic_iblend(
    out_path: Union[str, Path] = "data/raw/iblend_academic.csv",
    start_date: str = "2018-01-01",
    days: int = 90,
) -> pd.DataFrame:
    """
    Generate realistic synthetic I-BLEND Academic Building data matching:
    ["timestamp", "power", "current", "voltage", "frequency", "power_factor"]
    where timestamp is Unix epoch in seconds and power is in Watts.
    """
    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    timestamps = pd.date_range(start=start_date, periods=days * 24 * 60, freq="1min")
    unix_ts = (timestamps.astype("int64") // 10**9).values
    hours = timestamps.hour.values
    days_of_week = timestamps.dayofweek.values
    is_weekend = (days_of_week >= 5).astype(float)

    # Base diurnal profile: academic building peaks 9am-6pm, drops at night & weekends
    base_kw = 12.0 + 35.0 * np.exp(-((hours - 14) ** 2) / 20.0)
    weekend_factor = 1.0 - 0.45 * is_weekend
    noise = np.random.normal(1.0, 0.08, size=len(timestamps))
    power_kw = np.maximum(base_kw * weekend_factor * noise, 5.0)
    power_w = power_kw * 1000.0

    voltage = np.random.normal(240.0, 2.5, size=len(timestamps))
    frequency = np.random.normal(50.0, 0.05, size=len(timestamps))
    power_factor = np.clip(np.random.normal(0.92, 0.03, size=len(timestamps)), 0.80, 0.99)
    current = power_w / (voltage * power_factor)

    df = pd.DataFrame({
        "timestamp": unix_ts,
        "power": np.round(power_w, 2),
        "current": np.round(current, 3),
        "voltage": np.round(voltage, 2),
        "frequency": np.round(frequency, 3),
        "power_factor": np.round(power_factor, 4),
    })

    df.to_csv(out_path, index=False)
    print(f"[Synthetic] Generated fallback I-BLEND dataset -> {out_path} ({len(df)} rows)")
    return df


def generate_synthetic_cubems_floor2(
    out_path: Union[str, Path] = "data/raw/cubems_2019floor2.csv",
    start_date: str = "2019-01-01",
    days: int = 90,
) -> pd.DataFrame:
    """
    Generate synthetic CU-BEMS Floor 2 data with AC, lighting, plug loads,
    and indoor sensor metrics across multiple zones.
    """
    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    timestamps = pd.date_range(start=start_date, periods=days * 24 * 60, freq="1min")
    hours = timestamps.hour.values
    is_weekend = (timestamps.dayofweek >= 5).astype(float)
    n = len(timestamps)

    # Base shapes for AC, Light, and Plug
    # AC: High during warm daytime hours
    ac_diurnal = np.maximum(0.0, np.sin(np.pi * (hours - 7) / 13)) * (1.0 - 0.7 * is_weekend)
    # Lighting: Core work hours 8-19
    light_diurnal = np.where((hours >= 8) & (hours <= 19), 1.0, 0.1) * (1.0 - 0.6 * is_weekend)
    # Plug loads: Base load + office usage
    plug_diurnal = (0.3 + 0.7 * np.where((hours >= 9) & (hours <= 18), 1.0, 0.2)) * (1.0 - 0.5 * is_weekend)

    data = {"Date": timestamps.strftime("%Y-%m-%d %H:%M:%S")}

    # Zone 1
    data["z1_AC1(kW)"] = np.round(np.maximum(0.0, 4.0 * ac_diurnal * np.random.normal(1.0, 0.1, n)), 3)
    data["z1_Light(kW)"] = np.round(np.maximum(0.05, 1.8 * light_diurnal * np.random.normal(1.0, 0.05, n)), 3)
    data["z1_Plug(kW)"] = np.round(np.maximum(0.1, 2.2 * plug_diurnal * np.random.normal(1.0, 0.08, n)), 3)
    data["z1_S1(degC)"] = np.round(25.0 + 3.0 * np.sin(np.pi * (hours - 8) / 12) + np.random.normal(0, 0.4, n), 2)
    data["z1_S1(RH%)"] = np.round(60.0 - 15.0 * np.sin(np.pi * (hours - 8) / 12) + np.random.normal(0, 1.0, n), 2)
    data["z1_S1(lux)"] = np.round(np.maximum(0.0, 450 * light_diurnal + np.random.normal(0, 20, n)), 1)

    # Zone 2 (Large open office with multiple AC units)
    for ac_idx in range(1, 15):
        data[f"z2_AC{ac_idx}(kW)"] = np.round(np.maximum(0.0, 2.5 * ac_diurnal * np.random.normal(1.0, 0.15, n)), 3)
    data["z2_Light(kW)"] = np.round(np.maximum(0.1, 3.5 * light_diurnal * np.random.normal(1.0, 0.05, n)), 3)
    data["z2_Plug(kW)"] = np.round(np.maximum(0.2, 5.0 * plug_diurnal * np.random.normal(1.0, 0.08, n)), 3)
    data["z2_S1(degC)"] = np.round(24.5 + 2.5 * np.sin(np.pi * (hours - 8) / 12) + np.random.normal(0, 0.3, n), 2)
    data["z2_S1(RH%)"] = np.round(58.0 - 12.0 * np.sin(np.pi * (hours - 8) / 12) + np.random.normal(0, 0.8, n), 2)
    data["z2_S1(lux)"] = np.round(np.maximum(0.0, 500 * light_diurnal + np.random.normal(0, 15, n)), 1)

    # Zone 3 & 4
    data["z3_Light(kW)"] = np.round(np.maximum(0.05, 1.2 * light_diurnal * np.random.normal(1.0, 0.05, n)), 3)
    data["z3_Plug(kW)"] = np.round(np.maximum(0.1, 1.5 * plug_diurnal * np.random.normal(1.0, 0.08, n)), 3)
    data["z3_S1(degC)"] = np.round(25.0 + 2.0 * np.sin(np.pi * (hours - 8) / 12), 2)
    data["z3_S1(RH%)"] = np.round(62.0 - 10.0 * np.sin(np.pi * (hours - 8) / 12), 2)
    data["z3_S1(lux)"] = np.round(np.maximum(0.0, 300 * light_diurnal), 1)

    data["z4_AC1(kW)"] = np.round(np.maximum(0.0, 3.2 * ac_diurnal * np.random.normal(1.0, 0.12, n)), 3)
    data["z4_Light(kW)"] = np.round(np.maximum(0.05, 1.5 * light_diurnal * np.random.normal(1.0, 0.05, n)), 3)
    data["z4_Plug(kW)"] = np.round(np.maximum(0.1, 2.0 * plug_diurnal * np.random.normal(1.0, 0.08, n)), 3)
    data["z4_S1(degC)"] = np.round(25.2 + 2.2 * np.sin(np.pi * (hours - 8) / 12), 2)
    data["z4_S1(RH%)"] = np.round(61.0 - 11.0 * np.sin(np.pi * (hours - 8) / 12), 2)
    data["z4_S1(lux)"] = np.round(np.maximum(0.0, 350 * light_diurnal), 1)

    df = pd.DataFrame(data)
    df.to_csv(out_path, index=False)
    print(f"[Synthetic] Generated fallback CU-BEMS dataset -> {out_path} ({len(df)} rows)")
    return df
