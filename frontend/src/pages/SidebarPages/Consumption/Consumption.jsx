/**
 * ============================================================================
 * File        : Consumption.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Detailed energy-consumption monitoring page, driven dynamically by
 * per-user MongoDB table data and live 24-hour demand forecasts.
 * ============================================================================
 */

import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Clock3,
    Gauge,
    Info,
    Zap,
} from "lucide-react";

import BarChart from "../../../components/charts/BarChart";
import { useDashboardData } from "../../../hooks/useDashboardData";
import { useTableData } from "../../../hooks/useTableData";

const NOMINAL_MAX_LOAD_KW = 300;

function formatHourLabel(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHour} ${period}`;
}

export default function Consumption() {
    const { data, loading: forecastLoading, error } = useDashboardData({ horizon: 24 });
    const { tableData, loading: tableLoading } = useTableData();

    const forecast = data.demand?.forecast ?? [];

    const totalKwhFromForecast = forecast.reduce((sum, p) => sum + p.value_kw, 0);
    const averageKwFromForecast = forecast.length > 0 ? totalKwhFromForecast / forecast.length : 0;

    const peakPointFromForecast = forecast.reduce(
        (highest, p) => (p.value_kw > (highest?.value_kw ?? -Infinity) ? p : highest),
        null
    );

    // Primary source: tableData fields from MongoDB
    const currentKw =
        tableData?.current_consumption != null
            ? Number(tableData.current_consumption)
            : forecast[0]?.value_kw ?? 0.0;

    const totalKwh =
        tableData?.forecasted_total_24h != null && Number(tableData.forecasted_total_24h) > 0
            ? Number(tableData.forecasted_total_24h)
            : totalKwhFromForecast;

    const averageKw =
        tableData?.average_load != null && Number(tableData.average_load) > 0
            ? Number(tableData.average_load)
            : averageKwFromForecast;

    const peakDemandKw =
        tableData?.peak_demand != null && Number(tableData.peak_demand) > 0
            ? Number(tableData.peak_demand)
            : peakPointFromForecast?.value_kw ?? 0.0;

    const peakHourText =
        tableData?.peak_hour && tableData.peak_hour !== "N/A"
            ? tableData.peak_hour
            : peakPointFromForecast
            ? formatHourLabel(peakPointFromForecast.timestamp)
            : "N/A";

    const nextKw = forecast[1]?.value_kw ?? null;
    const currentVsAveragePct =
        averageKw > 0 ? ((currentKw - averageKw) / averageKw) * 100 : 0;

    // Dynamic Chart Data from tableData or forecast
    let chartData = [];
    if (Array.isArray(tableData?.hourly_consumption_chart) && tableData.hourly_consumption_chart.length > 0) {
        chartData = tableData.hourly_consumption_chart.map((p, idx) => ({
            label: typeof p === "object" ? (p.hour || p.time || p.label || `${idx}:00`) : `${idx}:00`,
            value: typeof p === "object" ? Number(p.value ?? p.consumption ?? p.load ?? 0) : Number(p || 0),
        }));
    } else if (forecast.length > 0) {
        chartData = forecast.map((p) => ({
            label: formatHourLabel(p.timestamp),
            value: p.value_kw,
        }));
    }

    const isLoading = tableLoading && !tableData;

    const stats = [
        {
            label: "Current Load",
            value: `${Number(currentKw).toFixed(1)}`,
            unit: "kW",
            description: nextKw !== null ? "Measured power load" : "Live draw",
            icon: Zap,
            trend: currentVsAveragePct < 0 ? "down" : "up",
            positive: currentVsAveragePct < 0,
            trendText:
                averageKw > 0
                    ? `${currentVsAveragePct >= 0 ? "+" : ""}${currentVsAveragePct.toFixed(0)}% vs. average`
                    : null,
        },
        {
            label: "24h Forecasted Total",
            value: `${Number(totalKwh).toFixed(0)}`,
            unit: "kWh",
            description: "Sum of next 24 hours",
            icon: Activity,
            trend: "stable",
            positive: true,
            trendText: null,
        },
        {
            label: "Average Load",
            value: `${Number(averageKw).toFixed(1)}`,
            unit: "kW",
            description: "Across the next 24 hours",
            icon: Gauge,
            trend: "stable",
            positive: true,
            trendText: null,
        },
        {
            label: "Peak Demand",
            value: `${Number(peakDemandKw).toFixed(1)}`,
            unit: "kW",
            description: peakHourText !== "N/A" ? `Peak hour: ${peakHourText}` : "Projected peak",
            icon: Clock3,
            trend: "up",
            positive: false,
            trendText: null,
        },
    ];

    return (
        <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-text-secondary">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>Energy Management</span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                        Energy Consumption
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                        Monitor your electricity usage, identify peak consumption periods,
                        and understand how energy is being consumed over the next 24 hours.
                    </p>
                </div>
            </div>

            {error && (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
                    Some live forecast data could not be loaded. Showing recorded snapshot results.
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                          <div
                              key={i}
                              className="rounded-2xl border border-border bg-surface p-5 shadow-sm animate-pulse"
                          >
                              <div className="flex items-start justify-between">
                                  <div className="h-10 w-10 rounded-xl bg-border" />
                              </div>
                              <div className="mt-5 space-y-2">
                                  <div className="h-4 w-24 rounded bg-border" />
                                  <div className="h-7 w-20 rounded bg-border" />
                                  <div className="h-3 w-32 rounded bg-border" />
                              </div>
                          </div>
                      ))
                    : stats.map((stat) => {
                          const Icon = stat.icon;
                          return (
                              <div
                                  key={stat.label}
                                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                              >
                                  <div className="flex items-start justify-between">
                                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                          <Icon className="h-5 w-5" />
                                      </div>

                                      {stat.trendText && (
                                          <div
                                              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                                                  stat.positive
                                                      ? "bg-emerald-500/10 text-emerald-600"
                                                      : "bg-amber-500/10 text-amber-600"
                                              }`}
                                          >
                                              {stat.trend === "down" ? (
                                                  <ArrowDownRight className="h-3.5 w-3.5" />
                                              ) : (
                                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                              )}
                                              {stat.trendText}
                                          </div>
                                      )}
                                  </div>

                                  <p className="mt-5 text-sm font-medium text-text-secondary">{stat.label}</p>

                                  <div className="mt-1 flex items-baseline gap-1">
                                      <span className="text-2xl font-bold text-text">
                                          {stat.value}
                                      </span>
                                      <span className="text-sm text-text-muted">{stat.unit}</span>
                                  </div>

                                  <p className="mt-2 text-xs text-text-muted">{stat.description}</p>
                              </div>
                          );
                      })}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
                <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-text">Consumption Forecast</h2>
                            <p className="mt-1 text-sm text-text-secondary">Hourly load profile</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-text">
                                {`${Number(totalKwh).toFixed(0)}`}
                                <span className="ml-1 text-sm font-medium text-text-muted">kWh</span>
                            </p>
                            <p className="text-xs text-text-muted">24-hour total</p>
                        </div>
                    </div>

                    {chartData.length === 0 ? (
                        <div className="flex h-64 items-center justify-center text-sm text-text-muted">
                            No hourly consumption data recorded yet.
                        </div>
                    ) : (
                        <BarChart data={chartData} unit=" kW" />
                    )}
                </section>

                <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-text">Peak Usage</h2>
                        <p className="mt-1 text-sm text-text-secondary">When your energy demand is highest</p>
                    </div>

                    <div className="mt-6 rounded-2xl bg-primary/5 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Clock3 className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-text-secondary">Peak hour</p>
                                <p className="text-xl font-bold text-text">
                                    {peakHourText}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-end justify-between">
                                <span className="text-sm text-text-secondary">Peak demand</span>
                                <span className="font-semibold text-text">
                                    {`${Number(peakDemandKw).toFixed(1)} kW`}
                                </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${Math.min(
                                            100,
                                            Math.max(0, (peakDemandKw / NOMINAL_MAX_LOAD_KW) * 100)
                                        )}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <p className="text-xs leading-5 text-text-secondary">
                            Shifting flexible loads such as washing machines, water heating, or EV
                            charging away from the peak hour above can help reduce demand and cost.
                        </p>
                    </div>
                </section>
            </div>

            <section className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                <div>
                    <h2 className="text-lg font-semibold text-text">Consumption Insights</h2>
                    <p className="mt-1 text-sm text-text-secondary">
                        Observations based on current and recorded profile
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-border bg-app-bg p-4">
                        <p className="text-xs font-medium text-text-muted">Load Status</p>
                        <p className="mt-1 text-sm font-semibold text-text">
                            {currentKw > averageKw ? "Above Daily Average" : "Within Normal Range"}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                            Current load is {Number(currentKw).toFixed(1)} kW compared to average of {Number(averageKw).toFixed(1)} kW.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-app-bg p-4">
                        <p className="text-xs font-medium text-text-muted">Peak Intensity</p>
                        <p className="mt-1 text-sm font-semibold text-text">
                            {peakHourText !== "N/A" ? `Concentrated at ${peakHourText}` : "Even Distribution"}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                            Maximum demand reaches {Number(peakDemandKw).toFixed(1)} kW.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-app-bg p-4">
                        <p className="text-xs font-medium text-text-muted">Grid Dependence</p>
                        <p className="mt-1 text-sm font-semibold text-text">
                            {totalKwh > 0 ? "Active Load Optimization" : "Standby"}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                            UrjaSathi automates battery and solar allocation to lower demand spikes.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}