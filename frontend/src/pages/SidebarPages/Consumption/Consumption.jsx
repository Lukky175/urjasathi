/**
 * ============================================================================
 * File        : Consumption.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Detailed energy-consumption monitoring page, driven by the live
 * 24-hour demand forecast from the backend.
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

const NOMINAL_MAX_LOAD_KW = 300;

function formatHourLabel(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHour} ${period}`;
}

export default function Consumption() {
    const { data, loading, error } = useDashboardData({ horizon: 24 });

    const forecast = data.demand?.forecast ?? [];

    const totalKwh = forecast.reduce((sum, p) => sum + p.value_kw, 0);
    const averageKw = forecast.length > 0 ? totalKwh / forecast.length : 0;

    const peakPoint = forecast.reduce(
        (highest, p) => (p.value_kw > (highest?.value_kw ?? -Infinity) ? p : highest),
        null
    );

    const currentKw = forecast[0]?.value_kw ?? null;
    const nextKw = forecast[1]?.value_kw ?? null;
    const currentVsAveragePct =
        averageKw > 0 && currentKw !== null ? ((currentKw - averageKw) / averageKw) * 100 : null;

    const range = forecast.length > 0
        ? Math.max(...forecast.map((p) => p.value_kw)) - Math.min(...forecast.map((p) => p.value_kw))
        : 0;
    const variabilityPct = averageKw > 0 ? (range / averageKw) * 100 : 0;

    const chartData = forecast.map((p) => ({
        label: formatHourLabel(p.timestamp),
        value: p.value_kw,
    }));

    const stats = [
        {
            label: "Current Load",
            value: currentKw !== null ? currentKw.toFixed(1) : "-",
            unit: "kW",
            description: nextKw !== null ? "Forecasted this hour" : "-",
            icon: Zap,
            trend: currentVsAveragePct !== null && currentVsAveragePct < 0 ? "down" : "up",
            positive: currentVsAveragePct !== null ? currentVsAveragePct < 0 : true,
            trendText:
                currentVsAveragePct !== null
                    ? `${currentVsAveragePct >= 0 ? "+" : ""}${currentVsAveragePct.toFixed(0)}% vs. today's average`
                    : null,
        },
        {
            label: "24h Forecasted Total",
            value: totalKwh > 0 ? totalKwh.toFixed(0) : "-",
            unit: "kWh",
            description: "Sum of next 24 hours",
            icon: Activity,
            trend: "stable",
            positive: true,
            trendText: null,
        },
        {
            label: "Average Load",
            value: averageKw > 0 ? averageKw.toFixed(1) : "-",
            unit: "kW",
            description: "Across the next 24 hours",
            icon: Gauge,
            trend: "stable",
            positive: true,
            trendText: null,
        },
        {
            label: "Peak Demand",
            value: peakPoint ? peakPoint.value_kw.toFixed(1) : "-",
            unit: "kW",
            description: peakPoint ? `Forecasted at ${formatHourLabel(peakPoint.timestamp)}` : "-",
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
                    Some live data could not be loaded. Showing partial results.
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
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
                                    {loading ? "..." : stat.value}
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
                            <p className="mt-1 text-sm text-text-secondary">Next 24 hours, hourly load</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-text">
                                {totalKwh > 0 ? totalKwh.toFixed(0) : "-"}
                                <span className="ml-1 text-sm font-medium text-text-muted">kWh</span>
                            </p>
                            <p className="text-xs text-text-muted">Next 24 hours</p>
                        </div>
                    </div>

                    <BarChart data={chartData} unit=" kW" />
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
                                    {peakPoint ? formatHourLabel(peakPoint.timestamp) : "-"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-end justify-between">
                                <span className="text-sm text-text-secondary">Peak demand</span>
                                <span className="font-semibold text-text">
                                    {peakPoint ? `${peakPoint.value_kw.toFixed(1)} kW` : "-"}
                                </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${
                                            peakPoint
                                                ? Math.min(100, (peakPoint.value_kw / NOMINAL_MAX_LOAD_KW) * 100)
                                                : 0
                                        }%`,
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
                        Observations based on the current forecast
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/40">
                        <div className="flex items-center gap-3">
                            <div
                                className={`rounded-lg p-2 ${
                                    currentVsAveragePct !== null && currentVsAveragePct < 0
                                        ? "bg-emerald-500/10 text-emerald-600"
                                        : "bg-amber-500/10 text-amber-600"
                                }`}
                            >
                                {currentVsAveragePct !== null && currentVsAveragePct < 0 ? (
                                    <ArrowDownRight className="h-4 w-4" />
                                ) : (
                                    <ArrowUpRight className="h-4 w-4" />
                                )}
                            </div>
                            <p className="text-sm font-semibold text-text">
                                {currentVsAveragePct !== null && currentVsAveragePct < 0
                                    ? "Below average right now"
                                    : "Above average right now"}
                            </p>
                        </div>
                        <p className="mt-3 text-xs leading-5 text-text-secondary">
                            Current hour load is{" "}
                            {currentVsAveragePct !== null
                                ? `${Math.abs(currentVsAveragePct).toFixed(0)}%`
                                : "-"}{" "}
                            {currentVsAveragePct !== null && currentVsAveragePct < 0 ? "below" : "above"}{" "}
                            the next-24-hour average.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/40">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                                <Clock3 className="h-4 w-4" />
                            </div>
                            <p className="text-sm font-semibold text-text">Peak window</p>
                        </div>
                        <p className="mt-3 text-xs leading-5 text-text-secondary">
                            Forecasted peak demand is{" "}
                            {peakPoint ? `${peakPoint.value_kw.toFixed(1)} kW` : "-"} at{" "}
                            {peakPoint ? formatHourLabel(peakPoint.timestamp) : "-"}. Shifting load away
                            from this hour has the biggest impact on cost.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/40">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <Activity className="h-4 w-4" />
                            </div>
                            <p className="text-sm font-semibold text-text">Usage pattern</p>
                        </div>
                        <p className="mt-3 text-xs leading-5 text-text-secondary">
                            Demand varies by about {variabilityPct.toFixed(0)}% across the day
                            relative to the average, {variabilityPct > 25 ? "a fairly variable" : "a fairly steady"}{" "}
                            load profile.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}