/**
 * ============================================================================
 * File        : Generation.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Energy generation dashboard page, driven dynamically by per-user
 * MongoDB table data and live solar forecasts.
 * ============================================================================
 */

import {
    SunMedium,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    BatteryCharging,
    Gauge,
    Clock3,
} from "lucide-react";

import BarChart from "../../../components/charts/BarChart";
import { useDashboardData } from "../../../hooks/useDashboardData";
import { useTableData } from "../../../hooks/useTableData";

function formatHourLabel(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHour} ${period}`;
}

export default function Generation() {
    const { data, loading: forecastLoading, error } = useDashboardData({ horizon: 24 });
    const { tableData, loading: tableLoading } = useTableData();

    const solarPoints = data.solar?.forecast ?? [];
    const flowPoints = data.energyFlow?.flow ?? [];

    const totalGenerationKwhFromForecast = solarPoints.reduce((sum, p) => sum + p.value_kw, 0);

    const peakPointFromForecast = solarPoints.reduce(
        (highest, p) => (p.value_kw > (highest?.value_kw ?? -Infinity) ? p : highest),
        null
    );

    // Dynamic metrics prioritized from tableData
    const currentGenerationKw =
        tableData?.solar_generation != null
            ? Number(tableData.solar_generation)
            : solarPoints[0]?.value_kw ?? 0.0;

    const nextGenerationKw = solarPoints[1]?.value_kw ?? null;
    const isRising =
        nextGenerationKw !== null
            ? nextGenerationKw >= currentGenerationKw
            : true;

    const totalGenerationKwh =
        tableData?.next_24h_generation != null && Number(tableData.next_24h_generation) > 0
            ? Number(tableData.next_24h_generation)
            : totalGenerationKwhFromForecast;

    const peakGenerationKw =
        tableData?.peak_generation != null && Number(tableData.peak_generation) > 0
            ? Number(tableData.peak_generation)
            : peakPointFromForecast?.value_kw ?? 0.0;

    const solarUtilizationPct =
        tableData?.solar_utilization != null && Number(tableData.solar_utilization) > 0
            ? Number(tableData.solar_utilization)
            : data.metrics?.solar_utilization_pct ?? (totalGenerationKwh > 0 ? 100.0 : 0.0);

    const totalBatteryToBuildingKwh = flowPoints.reduce((sum, p) => sum + p.battery_to_building, 0);
    const sourceTotal = totalGenerationKwh + totalBatteryToBuildingKwh;
    const solarSharePct = sourceTotal > 0 ? (totalGenerationKwh / sourceTotal) * 100 : 0;
    const batterySharePct = sourceTotal > 0 ? (totalBatteryToBuildingKwh / sourceTotal) * 100 : 0;

    const sourceData = [
        {
            name: "Solar",
            value: `${Number(totalGenerationKwh).toFixed(1)} kWh`,
            percentage: Math.round(solarSharePct),
            icon: SunMedium,
            colorClass: "bg-solar",
            textClass: "text-solar",
        },
        {
            name: "Battery Discharge",
            value: `${Number(totalBatteryToBuildingKwh).toFixed(1)} kWh`,
            percentage: Math.round(batterySharePct),
            icon: BatteryCharging,
            colorClass: "bg-battery",
            textClass: "text-secondary",
        },
    ];

    const chartData = solarPoints.map((p) => ({
        label: formatHourLabel(p.timestamp),
        value: p.value_kw,
    }));

    // Dynamic Upcoming Generation table rows
    let upcomingRows = [];
    if (Array.isArray(tableData?.upcoming_generation_table) && tableData.upcoming_generation_table.length > 0) {
        upcomingRows = tableData.upcoming_generation_table.map((row) => {
            let cov = 0;
            if (typeof row.solar_coverage === "string") {
                cov = parseFloat(row.solar_coverage) || 0;
            } else if (typeof row.solar_coverage === "number") {
                cov = row.solar_coverage;
            }
            return {
                time: row.hour || row.time || "-",
                solar: typeof row.solar_output === "number" ? `${row.solar_output.toFixed(2)} kW` : (row.solar_output || "0 kW"),
                demand: typeof row.building_demand === "number" ? `${row.building_demand.toFixed(2)} kW` : (row.building_demand || "0 kW"),
                coveragePct: cov,
            };
        });
    } else {
        upcomingRows = solarPoints.slice(0, 6).map((p, index) => {
            const flow = flowPoints[index];
            const demandKw = flow ? flow.solar_to_building + flow.grid_to_building + flow.battery_to_building : null;
            return {
                time: formatHourLabel(p.timestamp),
                solar: `${p.value_kw.toFixed(2)} kW`,
                demand: demandKw !== null ? `${demandKw.toFixed(2)} kW` : "-",
                coveragePct:
                    demandKw !== null && demandKw > 0
                        ? Math.min(100, (p.value_kw / demandKw) * 100)
                        : 0,
            };
        });
    }

    const isLoading = tableLoading && !tableData;

    const summaryCards = [
        {
            title: "Current Generation",
            value: `${Number(currentGenerationKw).toFixed(2)} kW`,
            description: "Real-time generation",
            icon: SunMedium,
            iconClass: "text-solar",
            iconBg: "bg-solar/10",
            trendIcon: isRising ? TrendingUp : TrendingDown,
        },
        {
            title: "Next 24h Generation",
            value: `${Number(totalGenerationKwh).toFixed(1)} kWh`,
            description: "24h projected output",
            icon: Gauge,
            iconClass: "text-primary",
            iconBg: "bg-primary/10",
            trendIcon: null,
        },
        {
            title: "Peak Generation",
            value: `${Number(peakGenerationKw).toFixed(2)} kW`,
            description: peakPointFromForecast ? `Peak at ${formatHourLabel(peakPointFromForecast.timestamp)}` : "Maximum output",
            icon: Clock3,
            iconClass: "text-secondary",
            iconBg: "bg-secondary/10",
            trendIcon: null,
        },
        {
            title: "Solar Utilization",
            value: `${Number(solarUtilizationPct).toFixed(1)}%`,
            description: "Generated solar utilized",
            icon: BatteryCharging,
            iconClass: "text-action",
            iconBg: "bg-action/10",
            trendIcon: null,
        },
    ];

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-solar/10 text-solar">
                        <SunMedium className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                            Generation
                        </h1>
                        <p className="mt-1 text-sm text-text-secondary">
                            Monitor your renewable energy generation, forecasted over the next 24 hours.
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
                    Some live data could not be loaded. Showing recorded generation snapshot.
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
                    : summaryCards.map((card) => {
                          const Icon = card.icon;
                          const TrendIcon = card.trendIcon;
                          return (
                              <div
                                  key={card.title}
                                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                              >
                                  <div className="flex items-start justify-between">
                                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} ${card.iconClass}`}>
                                          <Icon className="h-5 w-5" />
                                      </div>
                                      {TrendIcon && (
                                          <TrendIcon className={`h-4 w-4 ${isRising ? "text-emerald-600" : "text-amber-600"}`} />
                                      )}
                                  </div>

                                  <p className="mt-5 text-sm font-medium text-text-secondary">{card.title}</p>

                                  <p className="mt-1 text-2xl font-bold text-text">
                                      {card.value}
                                  </p>

                                  <p className="mt-2 text-xs text-text-muted">{card.description}</p>
                              </div>
                          );
                      })}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
                <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-text">Generation Forecast</h2>
                            <p className="mt-1 text-sm text-text-secondary">Next 24 hours, hourly solar output</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-text">
                                {`${Number(totalGenerationKwh).toFixed(1)}`}
                                <span className="ml-1 text-sm font-medium text-text-muted">kWh</span>
                            </p>
                            <p className="text-xs text-text-muted">24-hour total</p>
                        </div>
                    </div>

                    {chartData.length === 0 ? (
                        <div className="flex h-64 items-center justify-center text-sm text-text-muted">
                            No solar forecast data available.
                        </div>
                    ) : (
                        <BarChart data={chartData} unit=" kW" />
                    )}
                </section>

                <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-text">Energy Source Mix</h2>
                        <p className="mt-1 text-sm text-text-secondary">
                            Solar generation vs. battery discharge, next 24 hours
                        </p>
                    </div>

                    <div className="mt-6 space-y-5">
                        {sourceData.map((source) => {
                            const Icon = source.icon;
                            return (
                                <div key={source.name}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Icon className={`h-4 w-4 ${source.textClass}`} />
                                            <span className="text-sm font-medium text-text">{source.name}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-text">{source.value}</span>
                                    </div>
                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">
                                        <div
                                            className={`h-full rounded-full ${source.colorClass}`}
                                            style={{ width: `${Math.min(100, Math.max(0, source.percentage))}%` }}
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-text-muted">{source.percentage}% of total</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                <div className="border-b border-border p-5 sm:p-6">
                    <h2 className="text-lg font-semibold text-text">Upcoming Generation</h2>
                    <p className="mt-1 text-sm text-text-secondary">Forecasted solar output for upcoming hours</p>
                </div>

                {upcomingRows.length === 0 ? (
                    <div className="p-8 text-center text-sm text-text-muted">
                        No upcoming generation schedule available.
                    </div>
                ) : (
                    <>
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-surface-soft">
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                                            Hour
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted">
                                            Solar Output
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted">
                                            Building Demand
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted">
                                            Solar Coverage
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingRows.map((row, idx) => (
                                        <tr
                                            key={`${row.time}-${idx}`}
                                            className="border-b border-border last:border-b-0 transition-colors duration-200 hover:bg-surface-soft"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-text">{row.time}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium text-solar">{row.solar}</td>
                                            <td className="px-6 py-4 text-right text-sm text-text-secondary">{row.demand}</td>
                                            <td className="px-6 py-4 text-right text-sm font-semibold text-text">
                                                {Math.round(row.coveragePct)}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="divide-y divide-border md:hidden">
                            {upcomingRows.map((row, idx) => (
                                <div key={`${row.time}-${idx}`} className="p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-text">{row.time}</span>
                                        <span className="text-sm font-bold text-text">{Math.round(row.coveragePct)}% covered</span>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-surface-soft p-2.5">
                                            <p className="text-[10px] uppercase tracking-wide text-text-muted">Solar</p>
                                            <p className="mt-1 text-sm font-medium text-solar">{row.solar}</p>
                                        </div>
                                        <div className="rounded-lg bg-surface-soft p-2.5">
                                            <p className="text-[10px] uppercase tracking-wide text-text-muted">Demand</p>
                                            <p className="mt-1 text-sm font-medium text-text-secondary">{row.demand}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-text">
                            {isRising
                                ? "Generation is rising this period"
                                : "Generation is tapering this period"}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-text-secondary">
                            {peakGenerationKw > 0
                                ? `Peak output reaches ${Number(peakGenerationKw).toFixed(2)} kW.`
                                : "Solar system operating within normal envelope."}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary/10 sm:self-auto"
                >
                    View insights
                    <ArrowUpRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}