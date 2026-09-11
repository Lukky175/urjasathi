"""
============================================================================
File        : seed_dashboard_data.py
Project     : UrjaSathi
Description :
Database seed script to populate realistic energy telemetry and analytics
data into MongoDB `dashboard_collection` for a test user.

Target User :
- customer_id: "2e132144-a02b-4566-8d34-57705bb9c350"
- email      : "user@example.com"
- location   : "Greater Noida"
============================================================================
"""

import sys
import certifi
from pymongo import MongoClient

from app.config import settings


def get_mock_dashboard_document(customer_id: str, email: str = "user@example.com", location: str = "Greater Noida") -> dict:
    """
    Constructs a complete, realistic mock document matching an urban
    commercial/residential facility in Greater Noida.
    """

    # 1. 24-Hour Hourly Consumption Profile (kW)
    hourly_consumption_chart = [
        {"hour": "12 AM", "value": 195.2},
        {"hour": "1 AM", "value": 188.0},
        {"hour": "2 AM", "value": 182.4},
        {"hour": "3 AM", "value": 180.1},
        {"hour": "4 AM", "value": 185.3},
        {"hour": "5 AM", "value": 198.6},
        {"hour": "6 AM", "value": 215.0},
        {"hour": "7 AM", "value": 228.4},
        {"hour": "8 AM", "value": 242.1},
        {"hour": "9 AM", "value": 258.9},
        {"hour": "10 AM", "value": 268.4},
        {"hour": "11 AM", "value": 272.5},
        {"hour": "12 PM", "value": 275.0},
        {"hour": "1 PM", "value": 271.8},
        {"hour": "2 PM", "value": 276.4},
        {"hour": "3 PM", "value": 279.8},
        {"hour": "4 PM", "value": 283.4},  # Peak Hour
        {"hour": "5 PM", "value": 278.2},
        {"hour": "6 PM", "value": 269.5},
        {"hour": "7 PM", "value": 261.8},  # Current consumption
        {"hour": "8 PM", "value": 254.2},
        {"hour": "9 PM", "value": 240.1},
        {"hour": "10 PM", "value": 224.5},
        {"hour": "11 PM", "value": 208.3},
    ]

    # 2. 24-Hour Upcoming Generation Table
    upcoming_generation_table = [
        {"hour": "12 AM", "solar_output": "0.0 kW", "building_demand": "195.2 kW", "solar_coverage": "0%"},
        {"hour": "1 AM", "solar_output": "0.0 kW", "building_demand": "188.0 kW", "solar_coverage": "0%"},
        {"hour": "2 AM", "solar_output": "0.0 kW", "building_demand": "182.4 kW", "solar_coverage": "0%"},
        {"hour": "3 AM", "solar_output": "0.0 kW", "building_demand": "180.1 kW", "solar_coverage": "0%"},
        {"hour": "4 AM", "solar_output": "0.0 kW", "building_demand": "185.3 kW", "solar_coverage": "0%"},
        {"hour": "5 AM", "solar_output": "0.0 kW", "building_demand": "198.6 kW", "solar_coverage": "0%"},
        {"hour": "6 AM", "solar_output": "8.5 kW", "building_demand": "215.0 kW", "solar_coverage": "4%"},
        {"hour": "7 AM", "solar_output": "22.4 kW", "building_demand": "228.4 kW", "solar_coverage": "10%"},
        {"hour": "8 AM", "solar_output": "48.2 kW", "building_demand": "242.1 kW", "solar_coverage": "20%"},
        {"hour": "9 AM", "solar_output": "72.6 kW", "building_demand": "258.9 kW", "solar_coverage": "28%"},
        {"hour": "10 AM", "solar_output": "88.1 kW", "building_demand": "268.4 kW", "solar_coverage": "33%"},
        {"hour": "11 AM", "solar_output": "93.4 kW", "building_demand": "272.5 kW", "solar_coverage": "34%"},
        {"hour": "12 PM", "solar_output": "95.82 kW", "building_demand": "275.0 kW", "solar_coverage": "35%"}, # Peak generation
        {"hour": "1 PM", "solar_output": "94.5 kW", "building_demand": "271.8 kW", "solar_coverage": "35%"},
        {"hour": "2 PM", "solar_output": "89.2 kW", "building_demand": "276.4 kW", "solar_coverage": "32%"},
        {"hour": "3 PM", "solar_output": "76.4 kW", "building_demand": "279.8 kW", "solar_coverage": "27%"},
        {"hour": "4 PM", "solar_output": "51.3 kW", "building_demand": "283.4 kW", "solar_coverage": "18%"},
        {"hour": "5 PM", "solar_output": "24.8 kW", "building_demand": "278.2 kW", "solar_coverage": "9%"},
        {"hour": "6 PM", "solar_output": "6.2 kW", "building_demand": "269.5 kW", "solar_coverage": "2%"},
        {"hour": "7 PM", "solar_output": "0.0 kW", "building_demand": "261.8 kW", "solar_coverage": "0%"},
        {"hour": "8 PM", "solar_output": "0.0 kW", "building_demand": "254.2 kW", "solar_coverage": "0%"},
        {"hour": "9 PM", "solar_output": "0.0 kW", "building_demand": "240.1 kW", "solar_coverage": "0%"},
        {"hour": "10 PM", "solar_output": "0.0 kW", "building_demand": "224.5 kW", "solar_coverage": "0%"},
        {"hour": "11 PM", "solar_output": "0.0 kW", "building_demand": "208.3 kW", "solar_coverage": "0%"},
    ]

    # 3. Battery Activity Chart
    battery_activity_chart = [
        {"time": "06 AM", "value": 1.2, "type": "charge"},
        {"time": "08 AM", "value": 1.8, "type": "charge"},
        {"time": "10 AM", "value": 2.4, "type": "charge"},
        {"time": "12 PM", "value": 1.4, "type": "charge"},
        {"time": "02 PM", "value": 0.8, "type": "discharge"},
        {"time": "04 PM", "value": 1.1, "type": "discharge"},
        {"time": "06 PM", "value": 2.1, "type": "discharge"},
        {"time": "08 PM", "value": 1.7, "type": "discharge"},
    ]

    # 4. Monthly Cost Trend Chart
    cost_trend_chart = [
        {"month": "Mar", "cost": 2180},
        {"month": "Apr", "cost": 1960},
        {"month": "May", "cost": 1820},
        {"month": "Jun", "cost": 1640},
        {"month": "Jul", "cost": 1550},
        {"month": "Aug", "cost": 1510},
    ]

    return {
        "customer_id": customer_id,
        "email": email,
        "location": location,

        # Main Dashboard Metrics
        "current_consumption": 261.8,
        "solar_generation": 95.8,
        "battery_level": 85.0,
        "today_saving": 692.0,
        "energy_flow": {
            "solar": 95.8,
            "grid": 164.3,
            "battery": 1.7,
            "building": 261.8,
        },
        "renewable_implant": 38.0,

        # Consumption Page Metrics
        "forecasted_total_24h": 6085.0,
        "average_load": 253.5,
        "peak_demand": 283.4,
        "peak_hour": "4 PM",
        "hourly_consumption_chart": hourly_consumption_chart,

        # Generation Page Metrics
        "next_24h_generation": 659.7,
        "peak_generation": 95.82,
        "solar_utilization": 94.5,
        "upcoming_generation_table": upcoming_generation_table,

        # Battery & Storage Page Metrics
        "battery_health": "94%",
        "available_capacity": "180 / 200 kWh",
        "current_activity": "1.7 kW Discharging",
        "estimated_backup": "4.6 hrs",
        "battery_activity_chart": battery_activity_chart,

        # Cost & Savings Page Metrics
        "estimated_monthly_bill": "₹1,510",
        "solar_savings": "₹620",
        "battery_savings": "₹340",
        "total_savings": "₹960",
        "cost_trend_chart": cost_trend_chart,
    }


def seed_database():
    target_customer_id = "2e132144-a02b-4566-8d34-57705bb9c350"
    target_email = "user@example.com"
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
