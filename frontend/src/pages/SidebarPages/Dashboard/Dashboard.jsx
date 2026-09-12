import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    BatteryCharging,
    IndianRupee,
    Leaf,
    SunMedium,
    Zap,
} from "lucide-react";

import DashboardPageHeader from "../../../components/dashboard/DashboardPageHeader";
import LineChart from "../../../components/charts/LineChart";
import BarChart from "../../../components/charts/BarChart";
import { useDashboardData } from "../../../hooks/useDashboardData";
import { useTableData } from "../../../hooks/useTableData";

function pctChange(current, previous) {
    if (previous === undefined || previous === null || previous === 0) return null;
    return ((current - previous) / Math.abs(previous)) * 100;
}

function formatHourLabel(isoString) {
    const date = new Date(isoString);
    return `${date.getHours().toString().padStart(2, "0")}:00`;
}

export default function Dashboard() {
    const { data, loading: forecastLoading, error } = useDashboardData({ horizon: 24 });
    const { tableData, loading: tableLoading } = useTableData();

    const demandPoints = data.demand?.forecast ?? [];
    const solarPoints = data.solar?.forecast ?? [];
    const flowPoints = data.energyFlow?.flow ?? [];
    const costPoints = data.costBreakdown?.breakdown ?? [];

    const currentDemandKw = tableData?.current_consumption ?? demandPoints[0]?.value_kw ?? 0.0;
    const nextDemandKw = demandPoints[1]?.value_kw ?? null;
    const demandTrend = pctChange(nextDemandKw, currentDemandKw);

    const currentSolarKw = tableData?.solar_generation ?? solarPoints[0]?.value_kw ?? 0.0;
    const nextSolarKw = solarPoints[1]?.value_kw ?? null;
    const solarTrend = pctChange(nextSolarKw, currentSolarKw);

    const socPercent = tableData?.battery_level ?? data.battery?.soc_percent ?? 0.0;
    const batteryHealth = tableData?.battery_health ?? (data.battery?.health_percent ? `${data.battery.health_percent}%` : "N/A");

    const totalSavingsInr =
        tableData?.today_saving != null
            ? Number(tableData.today_saving)
            : data.metrics != null
            ? data.metrics.baseline_cost - data.metrics.optimized_cost
            : 0;

    const totalDemandKwh = demandPoints.reduce((sum, p) => sum + p.value_kw, 0);
    const totalSolarToBuildingKwh = flowPoints.reduce((sum, p) => sum + p.solar_to_building, 0);
    const forecastRenewablePct =
        totalDemandKwh > 0 ? (totalSolarToBuildingKwh / totalDemandKwh) * 100 : 0;
    const renewableSharePct = tableData?.renewable_implant != null ? Number(tableData.renewable_implant) : forecastRenewablePct;

    const topRecommendation = data.recommendations?.recommendations?.[0] ?? null;

    // Generation vs Consumption Series: prioritize dynamic arrays from tableData when present
    let consumptionSeriesData = [];
    if (Array.isArray(tableData?.hourly_consumption_chart) && tableData.hourly_consumption_chart.length > 0) {
        consumptionSeriesData = tableData.hourly_consumption_chart.map((p, idx) => ({
            label: p.hour || p.time || p.label || `${idx}:00`,
            value: Number(typeof p === "object" ? p.value ?? p.consumption ?? 0 : p),
        }));
    } else if (demandPoints.length > 0) {
        consumptionSeriesData = demandPoints.map((p) => ({
            label: formatHourLabel(p.timestamp),
            value: p.value_kw,
        }));
    }

    let generationSeriesData = [];
    if (Array.isArray(tableData?.upcoming_generation_table) && tableData.upcoming_generation_table.length > 0) {
        generationSeriesData = tableData.upcoming_generation_table.map((p, idx) => {
            const rawSolar = typeof p.solar_output === "string" ? parseFloat(p.solar_output) : Number(p.solar_output || 0);
            return {
                label: p.hour || p.time || `${idx}:00`,
                value: isNaN(rawSolar) ? 0 : rawSolar,
            };
        });
    } else if (solarPoints.length > 0) {
        generationSeriesData = solarPoints.map((p) => ({
            label: formatHourLabel(p.timestamp),
            value: p.value_kw,
        }));
    }

    const generationVsConsumptionSeries = [
        {
            name: "Consumption",
            color: "#7c3aed",
            data: consumptionSeriesData,
        },
        {
            name: "Generation",
            color: "#f59e0b",
            data: generationSeriesData,
        },
    ];

    // Cost Savings Data: prioritize tableData.cost_trend_chart
    let costSavingsData = [];
    if (Array.isArray(tableData?.cost_trend_chart) && tableData.cost_trend_chart.length > 0) {
        costSavingsData = tableData.cost_trend_chart.map((p) => ({
            label: p.month || p.hour || p.time || p.label || "-",
            value: Number(p.cost ?? p.value ?? p.savings ?? 0),
        }));
    } else if (costPoints.length > 0) {
        costSavingsData = costPoints.map((p) => ({
            label: formatHourLabel(p.timestamp),
            value: p.savings_inr,
        }));
    }

    const isLoading = tableLoading && !tableData;

    const metrics = [
        {
            label: "Current Consumption",
            value: `${Number(currentDemandKw).toFixed(1)} kW`,
            description: "Real-time consumption draw",
            icon: Zap,
            trend: demandTrend !== null ? `${demandTrend >= 0 ? "+" : ""}${demandTrend.toFixed(1)}%` : "0.0%",
            trendLabel: "vs. next hour",
            trendUp: demandTrend !== null ? demandTrend >= 0 : null,
        },
        {
            label: "Solar Generation",
            value: `${Number(currentSolarKw).toFixed(1)} kW`,
            description: "Renewable solar generation",
            icon: SunMedium,
            trend: solarTrend !== null ? `${solarTrend >= 0 ? "+" : ""}${solarTrend.toFixed(1)}%` : "0.0%",
            trendLabel: "vs. next hour",
            trendUp: solarTrend !== null ? solarTrend >= 0 : null,
        },
        {
            label: "Battery Level",
            value: `${Math.round(Number(socPercent))}%`,
            description: "Available stored energy",
            icon: BatteryCharging,
            trend: batteryHealth !== "N/A" ? `${batteryHealth} health` : "Normal",
            trendLabel: "battery condition",
            trendUp: null,
        },
        {
            label: "Today's Savings",
            value: `₹${Math.round(totalSavingsInr).toLocaleString("en-IN")}`,
            description: "Estimated savings vs. baseline",
            icon: IndianRupee,
            trend: data.metrics ? `${data.metrics.cost_reduction_pct.toFixed(1)}%` : "Live",
            trendLabel: "cost reduction",
            trendUp: data.metrics ? data.metrics.cost_reduction_pct >= 0 : true,
        },
    ];

    return (
        <div>
            <DashboardPageHeader
                title="Energy Dashboard"
                description="Monitor your energy consumption, renewable generation, storage, and savings."
            />

            {/* Error banner */}
            {error && (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
                    Some live data could not be loaded. Showing partial results.
                </div>
            )}

            {/* Metric Cards */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-4">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                          <div
                              key={i}
                              className="rounded-2xl border border-border bg-surface p-5 shadow-sm animate-pulse"
                          >
                              <div className="flex items-start justify-between">
                                  <div className="space-y-2 flex-1">
                                      <div className="h-3 w-24 rounded bg-border" />
                                      <div className="h-7 w-16 rounded bg-border" />
                                  </div>
                                  <div className="h-10 w-10 rounded-xl bg-border" />
                              </div>
                              <div className="mt-2 h-3 w-32 rounded bg-border" />
                              <div className="mt-4 h-3 w-20 rounded bg-border" />
                          </div>
                      ))
                    : metrics.map((metric) => {
                          const Icon = metric.icon;
                          return (
                              <div
                                  key={metric.label}
                                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                              >
                                  <div className="flex items-start justify-between">
                                      <div>
                                          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                                              {metric.label}
                                          </p>
                                          <p className="mt-3 text-2xl font-bold tracking-tight text-text">
                                              {metric.value}
                                          </p>
                                      </div>
                                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                          <Icon className="h-5 w-5" />
                                      </div>
                                  </div>

                                  <p className="mt-2 text-xs text-text-secondary">{metric.description}</p>

                                  <div className="mt-4 flex items-center gap-2">
                                      {metric.trendUp === true && <ArrowUpRight className="h-4 w-4 text-primary" />}
                                      {metric.trendUp === false && <ArrowDownRight className="h-4 w-4 text-red-500" />}
                                      <span
                                          className={`text-xs font-semibold ${
                                              metric.trendUp === true
                                                  ? "text-primary"
                                                  : metric.trendUp === false
                                                  ? "text-red-500"
                                                  : "text-text-secondary"
                                          }`}
                                      >
                                          {metric.trend}
                                      </span>
                                      <span className="text-xs text-text-muted">{metric.trendLabel}</span>
                                  </div>
                              </div>
                          );
                      })}
            </section>

            {/* Live Energy Flow & Renewable Impact */}
            <section className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-text">Live Energy Flow</h2>
                            <p className="text-xs text-text-secondary">Current hour, solar to building demand</p>
                        </div>
                        <Activity className="h-5 w-5 text-primary" />
                    </div>

                    <div className="mt-8 grid grid-cols-3 items-center gap-3 text-center">
                        <div>
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <SunMedium className="h-6 w-6" />
                            </div>
                            <p className="mt-3 text-xs font-medium text-text">Solar</p>
                            <p className="mt-1 text-sm font-semibold text-text">
                                {`${Number(currentSolarKw).toFixed(1)} kW`}
                            </p>
                        </div>

                        <div className="text-2xl font-semibold text-primary">&#8594;</div>

                        <div>
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Zap className="h-6 w-6" />
                            </div>
                            <p className="mt-3 text-xs font-medium text-text">Home Load</p>
                            <p className="mt-1 text-sm font-semibold text-text">
                                {`${Number(currentDemandKw).toFixed(1)} kW`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Leaf className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-text">Renewable Impact</h2>
                            <p className="text-xs text-text-secondary">Today's clean-energy contribution</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-4xl font-bold tracking-tight text-text">
                            {`${Math.round(renewableSharePct)}%`}
                        </p>
                        <p className="mt-2 text-sm text-text-secondary">
                            of today's demand supplied directly by solar.
                        </p>
                    </div>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-primary/10">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${Math.min(Math.max(renewableSharePct, 0), 100)}%` }}
                        />
                    </div>
                </div>
            </section>

            {/* Charts */}
            <section className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-text">Generation vs. Consumption</h2>
                    <p className="text-xs text-text-secondary">Hourly load and generation (kW)</p>
                    {consumptionSeriesData.length === 0 && generationSeriesData.length === 0 ? (
                        <div className="flex h-64 items-center justify-center text-sm text-text-muted">
                            No hourly generation or consumption data recorded yet.
                        </div>
                    ) : (
                        <LineChart series={generationVsConsumptionSeries} unit=" kW" />
                    )}
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-text">Cost Savings</h2>
                    <p className="text-xs text-text-secondary">Estimated savings per hour/month vs. baseline (Rs.)</p>
                    {costSavingsData.length === 0 ? (
                        <div className="flex h-64 items-center justify-center text-sm text-text-muted">
                            No cost savings history recorded yet.
                        </div>
                    ) : (
                        <BarChart data={costSavingsData} unit=" Rs." />
                    )}
                </div>
            </section>

            <section className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Activity className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-text">System Status</h2>
                        <p className="text-xs text-text-secondary">
                            {topRecommendation
                                ? topRecommendation.message
                                : "Your energy system is operating normally."}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}