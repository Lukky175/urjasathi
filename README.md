# Urja Saathi - AI-Powered Renewable Energy Management & Multi-Zone Demand Optimizer

Smart India Hackathon (SIH) 2026 AI-Powered Renewable Energy Management Platform.

---

## 1. Architecture Overview

Urja Saathi introduces a decoupled two-stage demand forecasting architecture combined with physics-based solar generation and an intuitive multi-objective energy optimizer:

1. **Model 1A (Total Demand Forecaster - Magnitude):**
   - Trained on the **I-BLEND** dataset (IIIT-Delhi Academic Building electrical mains meter, 38,496 hourly observations across ~4.4 years).
   - Optimized XGBoost parameters (`n_estimators=500, max_depth=5, learning_rate=0.03, early_stopping=30, eval_metric='rmse'`).
   - Achieves $R^2 = 0.7389$ and $\text{MAE} = 4.34\text{ kW}$.

2. **Model 1B (Multi-Zone Appliance Disaggregation - Shape):**
   - Trained on **CU-BEMS** multi-zone sub-metering (`2019Floor2.csv`).
   - Disaggregates into 10 granular Zone $\times$ Appliance channels:
     `z1_ac, z1_light, z1_plug, z2_ac, z2_light, z2_plug, z3_light, z3_plug, z4_ac, z4_light, z4_plug`.
   - Simplex normalization strictly enforces $\sum_{i=1}^{10} \text{share}_i = 1.0$.
   - Multiplied by Model 1A to simulate real Indian campus multi-zone energy draw.

3. **Model 2 (Physics-Based Solar Forecaster):**
   - Ingests NREL PVWatts v8 NSRDB hourly profiles for Delhi (57,234 kWh/yr) and Greater Noida (61,794 kWh/yr).
   - Translates solar irradiance and array physics into available generation ($kW$).

4. **Intuitive Energy Optimizer (`src/optimizer/`):**
   - **Dynamic Battery (BESS) Tracking**: Capacity (50 kWh), State of Charge (SoC %), max charge/discharge rates, and reserve margins.
   - **Smart Solar Arbitrage**: Doesn't blindly charge the battery to 100%! Charges up to an optimal target buffer (e.g. 50-60%) for upcoming peak resilience, and exports remaining surplus to the grid.
   - **Indian Commercial ToD Tariffs**: Peak surcharge (+25% $\rightarrow$ ₹10.63/kWh), solar rebate (-15% $\rightarrow$ ₹7.23/kWh), and Feed-in Tariff (APPC: ₹4.20/kWh | ₹0.0042/Wh).
   - **Zone-Level Demand Limiting**: Actionable curtailment for Zone 2 AC (14 units), Zone 1/4 AC, daylight harvesting dimming, and non-essential plug shedding.
   - **Energy Saved Callouts**: Computes exact percentage energy reductions (e.g. 24.8% reduction) and ₹ saved during peak hours.

---

## 2. Directory Structure

```text
Urja Saathi/
├── data/
│   ├── raw/
│   │   ├── iblend_academic.csv          # IIIT-Delhi Academic Building electrical mains (125 MB)
│   │   ├── iiitd_weather.csv            # IIIT-Delhi local ambient weather data
│   │   ├── cubems_2019floor2.csv        # CU-BEMS 10-channel multi-zone ground truth (91.3 MB)
│   │   ├── cubems_2019floor5.csv        # CU-BEMS Floor 5 submetering (72.0 MB)
│   │   ├── solar_delhi.csv              # 8,760 hourly PVWatts NSRDB records
│   │   └── solar_greater_noida.csv      # 8,760 hourly PVWatts NSRDB records
│   └── processed/
│       ├── model1a_train.csv
│       ├── model1b_train.csv
│       └── model2_train.csv
├── models_saved/
│   ├── model1a_xgb.json                 # Trained Model 1A artifact
│   ├── model1b_xgb.json                 # Trained Model 1B multi-channel bundle
│   └── scaler_metadata.json             # Feature names, metrics, hyperparameters
├── src/
│   ├── config/
│   │   ├── energy_config.py             # Centralized variables: Tariffs, BESS, Zones, ML params
│   │   └── building_config.json         # Campus metadata & tariff constants
│   ├── data_loaders/
│   │   ├── common_schema.py             # Canonical schema
│   │   ├── load_iblend.py               # Ingestion & lag engineering
│   │   ├── load_cubems.py               # 10-channel Zone x Appliance extraction
│   │   └── load_pvwatts.py              # PVWatts solar parser
│   ├── models/
│   │   ├── model1a_demand.py            # Total Demand Forecaster (Optimal XGBoost)
│   │   ├── model1b_disaggregation.py    # 10-Channel Multi-Zone Disaggregation
│   │   ├── model2_solar.py              # Solar Forecaster interface
│   │   └── train_all.py                 # Master runner & simulation scenarios
│   ├── optimizer/
│   │   ├── tariff_manager.py            # Indian commercial ToD tariffs & feed-in profit
│   │   ├── battery_manager.py           # BESS state, health & charge/discharge limits
│   │   └── energy_optimizer.py          # Intuitive arbitrage & zone demand limiting
│   └── utils/
│       └── synthetic_fallback.py
├── requirements.txt
└── README.md
```

---

## 3. Quick Start

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run Master Training & Optimization Pipeline
```bash
python -m src.models.train_all
```
