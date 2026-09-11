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

function pctChange(current, previous) {
    if (previous === undefined || previous === null || previous === 0) return null;
    return ((current - previous) / Math.abs(previous)) * 100;
}

function formatHourLabel(isoString) {
    const date = new Date(isoString);
    return `${date.getHours().toString().padStart(2, "0")}:00`;
}

export default function Dashboard() {
    const { data, loading, error } = useDashboardData({ horizon: 24 });

    const demandPoints = data.demand?.forecast ?? [];
    const solarPoints = data.solar?.forecast ?? [];
    const flowPoints = data.energyFlow?.flow ?? [];
    const costPoints = data.costBreakdown?.breakdown ?? [];

    const currentDemandKw = demandPoints[0]?.value_kw ?? null;
    const nextDemandKw = demandPoints[1]?.value_kw ?? null;
    const demandTrend = pctChange(nextDemandKw, currentDemandKw);

    const currentSolarKw = solarPoints[0]?.value_kw ?? null;
    const nextSolarKw = solarPoints[1]?.value_kw ?? null;
    const solarTrend = pctChange(nextSolarKw, currentSolarKw);

    const socPercent = data.battery?.soc_percent ?? null;
    const batteryHealth = data.battery?.health_percent ?? null;

    const totalSavingsInr =
        data.metrics != null
            ? data.metrics.baseline_cost - data.metrics.optimized_cost
            : null;

    const totalDemandKwh = demandPoints.reduce((sum, p) => sum + p.value_kw, 0);
    const totalSolarToBuildingKwh = flowPoints.reduce((sum, p) => sum + p.solar_to_building, 0);
    const renewableSharePct =
        totalDemandKwh > 0 ? (totalSolarToBuildingKwh / totalDemandKwh) * 100 : null;

    const topRecommendation = data.recommendations?.recommendations?.[0] ?? null;

    const generationVsConsumptionSeries = [
        {
            name: "Consumption",
            color: "#7c3aed",
            data: demandPoints.map((p) => ({ label: formatHourLabel(p.timestamp), value: p.value_kw })),
        },
        {
            name: "Generation",
            color: "#f59e0b",
            data: solarPoints.map((p) => ({ label: formatHourLabel(p.timestamp), value: p.value_kw })),
        },
    ];

    const costSavingsData = costPoints.map((p) => ({
        label: formatHourLabel(p.timestamp),
        value: p.savings_inr,
    }));

    const metrics = [
        {
            label: "Current Consumption",
            value: currentDemandKw !== null ? `${currentDemandKw.toFixed(1)} kW` : "-",
            description: "Forecasted load, this hour",
            icon: Zap,
            trend: demandTrend !== null ? `${demandTrend >= 0 ? "+" : ""}${demandTrend.toFixed(1)}%` : "-",
            trendLabel: "vs. next hour",
            trendUp: demandTrend !== null ? demandTrend >= 0 : null,
        },
        {
            label: "Solar Generation",
            value: currentSolarKw !== null ? `${currentSolarKw.toFixed(1)} kW` : "-",
            description: "Forecasted renewable output",
            icon: SunMedium,
            trend: solarTrend !== null ? `${solarTrend >= 0 ? "+" : ""}${solarTrend.toFixed(1)}%` : "-",
            trendLabel: "vs. next hour",
            trendUp: solarTrend !== null ? solarTrend >= 0 : null,
        },
        {
            label: "Battery Level",
            value: socPercent !== null ? `${socPercent.toFixed(0)}%` : "-",
            description: "Available stored energy",
            icon: BatteryCharging,
            trend: batteryHealth !== null ? `${batteryHealth.toFixed(0)}% health` : "-",
            trendLabel: "battery health",
            trendUp: null,
        },
        {
            label: "Today's Savings",
            value: totalSavingsInr !== null ? `\u20b9${Math.round(totalSavingsInr)}` : "-",
            description: "Estimated savings vs. baseline",
            icon: IndianRupee,
            trend: data.metrics ? `${data.metrics.cost_reduction_pct.toFixed(1)}%` : "-",
            trendLabel: "cost reduction",
            trendUp: data.metrics ? data.metrics.cost_reduction_pct >= 0 : null,
        },
    ];

    return (
        <div>
            <DashboardPageHeader
                title="Energy Dashboard"
                description="Monitor your energy consumption, renewable generation, storage, and savings."
            />

            {error && (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
                    Some live data could not be loaded. Showing partial results.
                </div>
            )}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-4">
                {metrics.map((metric) => {
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
                                        {loading ? "..." : metric.value}
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
                                    {loading ? "" : metric.trend}
                                </span>
                                <span className="text-xs text-text-muted">{metric.trendLabel}</span>
                            </div>
                        </div>
                    );
                })}
            </section>

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
                                {currentSolarKw !== null ? `${currentSolarKw.toFixed(1)} kW` : "-"}
                            </p>
                        </div>

                        <div className="text-2xl font-semibold text-primary">&#8594;</div>

                        <div>
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Zap className="h-6 w-6" />
                            </div>
                            <p className="mt-3 text-xs font-medium text-text">Home Load</p>
                            <p className="mt-1 text-sm font-semibold text-text">
                                {currentDemandKw !== null ? `${currentDemandKw.toFixed(1)} kW` : "-"}
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
                            {renewableSharePct !== null ? `${renewableSharePct.toFixed(0)}%` : "-"}
                        </p>
                        <p className="mt-2 text-sm text-text-secondary">
                            of today's forecasted demand supplied directly by solar.
                        </p>
                    </div>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-primary/10">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${renewableSharePct !== null ? renewableSharePct : 0}%` }}
                        />
                    </div>
                </div>
            </section>

            <section className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-text">Generation vs. Consumption</h2>
                    <p className="text-xs text-text-secondary">Next 24 hours, forecasted (kW)</p>
                    <LineChart series={generationVsConsumptionSeries} unit=" kW" />
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-text">Cost Savings</h2>
                    <p className="text-xs text-text-secondary">Estimated savings per hour vs. baseline (Rs.)</p>
                    <BarChart data={costSavingsData} unit=" Rs." />
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