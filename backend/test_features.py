import asyncio
import sys
import unittest

sys.path.insert(0, "backend")

from app.routers.forecast import get_demand_forecast, get_solar_forecast
from app.routers.battery import get_battery_status
from app.routers.metrics import get_metrics_comparison
from app.routers.table_data import get_dashboard_table_data
from app.routers.planner import analyze_scenario
from app.schemas.planner import PlannerScenarioRequest

class TestUrjaSathiFeaturesDirect(unittest.TestCase):

    def setUp(self):
        self.bennett_user = {
            "customer_id": "aad6c6ed-0733-4f17-8fca-f58063e7e165",
            "email": "admin@bennett.edu.in",
            "full_name": "Bennett Admin",
            "location": "Greater Noida",
            "address": "Bennett University",
            "energy_generated": 0.0,
            "energy_consumed": 0.0,
        }

        self.normal_user = {
            "customer_id": "99999999-8888-7777-6666-555555555555",
            "email": "john.doe@gmail.com",
            "full_name": "John Doe",
            "location": "Delhi",
            "address": "Connaught Place",
            "energy_generated": 0.0,
            "energy_consumed": 0.0,
        }

    def test_scenario1_bennett_user_dashboard(self):
        """Test Scenario 1: Bennett User receives Bennett trained ML model & telemetry data"""
        demand_res = get_demand_forecast(horizon=24, current_user=self.bennett_user)
        self.assertTrue(any(p.value_kw > 0 for p in demand_res.forecast))

        solar_res = get_solar_forecast(horizon=24, current_user=self.bennett_user)
        self.assertTrue(any(p.value_kw > 0 for p in solar_res.forecast))

        battery_res = get_battery_status(current_user=self.bennett_user)
        self.assertGreater(battery_res.soc_percent, 0)

        table_res = asyncio.run(get_dashboard_table_data(current_user=self.bennett_user))
        self.assertGreater(table_res.current_consumption, 0)
        print("[PASS] Scenario 1 (Bennett User Dashboard Data) Passed!")
    def test_scenario2_normal_user_dashboard(self):
        """Test Scenario 2: Normal User receives 0 / default values without Bennett data leakage"""
        demand_res = get_demand_forecast(horizon=24, current_user=self.normal_user)
        self.assertTrue(all(p.value_kw == 0 for p in demand_res.forecast))

        solar_res = get_solar_forecast(horizon=24, current_user=self.normal_user)
        self.assertTrue(all(p.value_kw == 0 for p in solar_res.forecast))

        battery_res = get_battery_status(current_user=self.normal_user)
        self.assertEqual(battery_res.soc_percent, 0.0)

        metrics_res = get_metrics_comparison(horizon=24, current_user=self.normal_user)
        self.assertEqual(metrics_res.baseline_cost, 0.0)
        self.assertEqual(metrics_res.optimized_cost, 0.0)

        table_res = asyncio.run(get_dashboard_table_data(current_user=self.normal_user))
        self.assertEqual(table_res.current_consumption, 0.0)
        self.assertEqual(table_res.solar_generation, 0.0)
        self.assertEqual(table_res.today_saving, 0.0)
        print("[PASS] Scenario 2 (Normal User Zero Defaults) Passed!")

    def test_scenario3_urja_planner_all_cities(self):
        """Test Scenario 3: Urja Planner accepts 15 Indian cities & influences analysis"""
        cities = [
            "Delhi", "Greater Noida", "Noida", "Gurugram", "Mumbai",
            "Pune", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
            "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Bhopal"
        ]

        results = {}
        for city in cities:
            req = PlannerScenarioRequest(
                city=city,
                solar_generation=10.0,
                energy_consumption=15.0,
            )
            res = analyze_scenario(req)
            self.assertEqual(res.city, city)
            self.assertEqual(len(res.hourly_profile), 24)
            results[city] = res

        # Verify city selection influences predictions
        jaipur_peak = max(p.solar_kw for p in results["Jaipur"].hourly_profile)
        mumbai_peak = max(p.solar_kw for p in results["Mumbai"].hourly_profile)
        self.assertNotEqual(jaipur_peak, mumbai_peak)
        print("[PASS] Scenario 3 (Urja Planner 15 Cities End-to-End & City Influenced Output) Passed!")

if __name__ == "__main__":
    unittest.main()
