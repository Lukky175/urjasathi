"""
============================================================================
File        : seed_dashboard_data.py
Project     : UrjaSathi
Description :
Database seed script to populate realistic energy telemetry and analytics
data into MongoDB `dashboard_collection` for a test user.

Target User :
- customer_id: "aad6c6ed-0733-4f17-8fca-f58063e7e165"
- email      : "admin@bennett.edu.in"
- location   : "Greater Noida"
============================================================================
"""

"""
command to run the file

cd /Users/apple/Documents/SIH/backend
.venv/bin/python seed_dashboard_data.py

"""

import sys
import certifi
from pymongo import MongoClient

from app.config import settings


def get_mock_dashboard_document(customer_id: str, email: str = "admin@bennett.edu.in", location: str = "Greater Noida") -> dict:
    """
    Constructs a complete, realistic mock document matching an urban
    commercial/residential facility in Greater Noida based on Urja Saathi
    dispatch and optimization data.
    """

    # 1. 24-Hour Consumption Chart (11:00 AM to 10:00 AM sequence)
    hourly_consumption_chart = [
        {"hour": "11 AM", "value": 105.0},
        {"hour": "12 PM", "value": 118.0},
        {"hour": "1 PM",  "value": 124.0},
        {"hour": "2 PM",  "value": 128.0},  # Peak Hour
        {"hour": "3 PM",  "value": 115.0},
        {"hour": "4 PM",  "value": 95.0},
        {"hour": "5 PM",  "value": 78.0},
        {"hour": "6 PM",  "value": 65.0},
        {"hour": "7 PM",  "value": 58.0},
        {"hour": "8 PM",  "value": 52.0},
        {"hour": "9 PM",  "value": 48.0},
        {"hour": "10 PM", "value": 46.0},
        {"hour": "11 PM", "value": 44.0},
        {"hour": "12 AM", "value": 42.0},
        {"hour": "1 AM",  "value": 42.0},
        {"hour": "2 AM",  "value": 41.5},
        {"hour": "3 AM",  "value": 41.0},
        {"hour": "4 AM",  "value": 41.0},
        {"hour": "5 AM",  "value": 43.0},
        {"hour": "6 AM",  "value": 46.0},
        {"hour": "7 AM",  "value": 55.0},
        {"hour": "8 AM",  "value": 68.0},
        {"hour": "9 AM",  "value": 82.0},
        {"hour": "10 AM", "value": 96.0},
    ]

    # 2. 24-Hour Upcoming Generation Table
    upcoming_generation_table = [
        {"hour": "11 AM", "solar_output": "31.5 kW", "building_demand": "105.0 kW", "solar_coverage": "30.0%"},
        {"hour": "12 PM", "solar_output": "34.2 kW", "building_demand": "118.0 kW", "solar_coverage": "29.0%"},
        {"hour": "1 PM",  "solar_output": "32.8 kW", "building_demand": "124.0 kW", "solar_coverage": "26.5%"},
        {"hour": "2 PM",  "solar_output": "28.5 kW", "building_demand": "128.0 kW", "solar_coverage": "22.3%"},
        {"hour": "3 PM",  "solar_output": "21.0 kW", "building_demand": "115.0 kW", "solar_coverage": "18.3%"},
        {"hour": "4 PM",  "solar_output": "12.5 kW", "building_demand": "95.0 kW",  "solar_coverage": "13.2%"},
        {"hour": "5 PM",  "solar_output": "3.5 kW",  "building_demand": "78.0 kW",  "solar_coverage": "4.5%"},
        {"hour": "6 PM",  "solar_output": "0.0 kW",  "building_demand": "65.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "7 PM",  "solar_output": "0.0 kW",  "building_demand": "58.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "8 PM",  "solar_output": "0.0 kW",  "building_demand": "52.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "9 PM",  "solar_output": "0.0 kW",  "building_demand": "48.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "10 PM", "solar_output": "0.0 kW",  "building_demand": "46.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "11 PM", "solar_output": "0.0 kW",  "building_demand": "44.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "12 AM", "solar_output": "0.0 kW",  "building_demand": "42.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "1 AM",  "solar_output": "0.0 kW",  "building_demand": "42.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "2 AM",  "solar_output": "0.0 kW",  "building_demand": "41.5 kW",  "solar_coverage": "0.0%"},
        {"hour": "3 AM",  "solar_output": "0.0 kW",  "building_demand": "41.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "4 AM",  "solar_output": "0.0 kW",  "building_demand": "41.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "5 AM",  "solar_output": "0.0 kW",  "building_demand": "43.0 kW",  "solar_coverage": "0.0%"},
        {"hour": "6 AM",  "solar_output": "0.5 kW",  "building_demand": "46.0 kW",  "solar_coverage": "1.1%"},
        {"hour": "7 AM",  "solar_output": "3.8 kW",  "building_demand": "55.0 kW",  "solar_coverage": "6.9%"},
        {"hour": "8 AM",  "solar_output": "11.2 kW", "building_demand": "68.0 kW",  "solar_coverage": "16.5%"},
        {"hour": "9 AM",  "solar_output": "20.4 kW", "building_demand": "82.0 kW",  "solar_coverage": "24.9%"},
        {"hour": "10 AM", "solar_output": "27.6 kW", "building_demand": "96.0 kW",  "solar_coverage": "28.8%"},
    ]

    # 3. 24-Hour Battery Activity Chart (covering all hours aligned with sequence)
    battery_activity_chart = [
        {"time": "11 AM", "value": 0.0,  "type": "idle"},
        {"time": "12 PM", "value": 0.0,  "type": "idle"},
        {"time": "01 PM", "value": 30.0, "type": "discharge"},
        {"time": "02 PM", "value": 40.0, "type": "discharge"},
        {"time": "03 PM", "value": 15.0, "type": "discharge"},
        {"time": "04 PM", "value": 0.0,  "type": "idle"},
        {"time": "05 PM", "value": 0.0,  "type": "idle"},
        {"time": "06 PM", "value": 0.0,  "type": "idle"},
        {"time": "07 PM", "value": 0.0,  "type": "idle"},
        {"time": "08 PM", "value": 0.0,  "type": "idle"},
        {"time": "09 PM", "value": 0.0,  "type": "idle"},
        {"time": "10 PM", "value": 0.0,  "type": "idle"},
        {"time": "11 PM", "value": 0.0,  "type": "idle"},
        {"time": "12 AM", "value": 20.0, "type": "charge"},
        {"time": "01 AM", "value": 25.0, "type": "charge"},
        {"time": "02 AM", "value": 30.0, "type": "charge"},
        {"time": "03 AM", "value": 30.0, "type": "charge"},
        {"time": "04 AM", "value": 10.0, "type": "charge"},
        {"time": "05 AM", "value": 0.0,  "type": "idle"},
        {"time": "06 AM", "value": 0.0,  "type": "idle"},
        {"time": "07 AM", "value": 0.0,  "type": "idle"},
        {"time": "08 AM", "value": 0.0,  "type": "idle"},
        {"time": "09 AM", "value": 0.0,  "type": "idle"},
        {"time": "10 AM", "value": 0.0,  "type": "idle"},
    ]

    # 4. Monthly Cost Trend Chart
    cost_trend_chart = [
        {"month": "Mar", "cost": 18200},
        {"month": "Apr", "cost": 16800},
        {"month": "May", "cost": 15900},
        {"month": "Jun", "cost": 14860},
        {"month": "Jul", "cost": 14100},
        {"month": "Aug", "cost": 13472},
    ]

    return {
        "customer_id": customer_id,
        "email": email,
        "location": location,

        # Main Dashboard Metrics (Snapshot taken at 14:00 Peak Demand)
        "current_consumption": 128.0,
        "solar_generation": 28.5,
        "battery_level": 20.0,
        "today_saving": 1388.0,
        "energy_flow": {
            "solar": 28.5,
            "grid": 59.5,
            "battery": 40.0,
            "building": 128.0,
        },
        "renewable_implant": 22.3,

        # Consumption Page Metrics
        "forecasted_total_24h": 1718.5,
        "average_load": 71.6,
        "peak_demand": 128.0,
        "peak_hour": "2 PM",
        "hourly_consumption_chart": hourly_consumption_chart,

        # Generation Page Metrics
        "next_24h_generation": 170.8,
        "peak_generation": 34.2,
        "solar_utilization": 100.0,
        "upcoming_generation_table": upcoming_generation_table,

        # Battery & Storage Page Metrics
        "battery_health": "96%",
        "available_capacity": "40 / 200 kWh",
        "current_activity": "40.0 kW Discharging",
        "estimated_backup": "1.0 hrs",
        "battery_activity_chart": battery_activity_chart,

        # Cost & Savings Page Metrics
        "estimated_monthly_bill": "₹13,472 / day",
        "solar_savings": "₹820",
        "battery_savings": "₹568",
        "total_savings": "₹1,388",
        "cost_trend_chart": cost_trend_chart,
    }


def seed_database():
    target_customer_id = "aad6c6ed-0733-4f17-8fca-f58063e7e165"
    target_email = "admin@bennett.edu.in"
    target_location = "Greater Noida"

    print(f"Connecting to MongoDB database '{settings.mongo_db_name}'...")
    try:
        client = MongoClient(settings.mongo_url, tlsCAFile=certifi.where())
        db = client[settings.mongo_db_name]
        dashboard_collection = db["dashboard_data"]

        doc = get_mock_dashboard_document(
            customer_id=target_customer_id,
            email=target_email,
            location=target_location,
        )

        # Upsert document by customer_id
        result = dashboard_collection.update_one(
            {"customer_id": target_customer_id},
            {"$set": doc},
            upsert=True,
        )

        if result.matched_count > 0:
            print(f" Successfully updated existing dashboard telemetry document for customer_id: '{target_customer_id}'.")
        else:
            print(f" Successfully inserted new dashboard telemetry document for customer_id: '{target_customer_id}' (upserted_id: {result.upserted_id}).")

        # Verify insertion
        verified_doc = dashboard_collection.find_one({"customer_id": target_customer_id})
        if verified_doc:
            print(f" Verification passed! Document in MongoDB contains {len(verified_doc)} fields.")
            print(f"   - Current Consumption: {verified_doc.get('current_consumption')} kW")
            print(f"   - Solar Generation   : {verified_doc.get('solar_generation')} kW")
            print(f"   - Battery Level      : {verified_doc.get('battery_level')}%")
            print(f"   - Today's Savings    : ₹{verified_doc.get('today_saving')}")
            print(f"   - Peak Demand        : {verified_doc.get('peak_demand')} kW at {verified_doc.get('peak_hour')}")
            print(f"   - Monthly Bill       : {verified_doc.get('estimated_monthly_bill')}")
            print(f"   - 24h Hourly Points  : {len(verified_doc.get('hourly_consumption_chart', []))} entries")
            print(f"   - Upcoming Gen Rows  : {len(verified_doc.get('upcoming_generation_table', []))} entries")
        else:
            print("❌ Warning: Verification find_one returned None.")

        client.close()
        print("Database connection closed cleanly.")

    except Exception as e:
        print(f"❌ Error seeding MongoDB dashboard data: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    seed_database()