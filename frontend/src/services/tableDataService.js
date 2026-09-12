/**
 * ============================================================================
 * File        : tableDataService.js
 * Project     : UrjaSathi
 *
 * Description :
 * Service for fetching authenticated per-user dynamic dashboard data from:
 *   GET /table-data
 *
 * Token is automatically injected by api.js (Bearer header from localStorage/sessionStorage).
 *
 * Response fields:
 * - customer_id: string
 * - current_consumption, solar_generation, battery_level, today_saving: number
 * - energy_flow: { solar, grid, battery, building }
 * - renewable_implant: number
 * - forecasted_total_24h, average_load, peak_demand: number | string
 * - peak_hour: string
 * - hourly_consumption_chart: Array<{ hour, value }>
 * - next_24h_generation, peak_generation, solar_utilization: number | string
 * - upcoming_generation_table: Array<{ hour, solar_output, building_demand, solar_coverage }>
 * - battery_health, available_capacity, current_activity, estimated_backup: string
 * - battery_activity_chart: Array<{ time, value, type }>
 * - estimated_monthly_bill, solar_savings, battery_savings, total_savings: string | number
 * - cost_trend_chart: Array<{ month, cost }>
 * ============================================================================
 */

import api from "./api";

/**
 * Fetch the latest dynamic dashboard snapshot for the authenticated user.
 */
export function getDashboardTableData(options = {}) {
    return api.get("/table-data", options);
}

const tableDataService = {
    get: getDashboardTableData,
};

export default tableDataService;
