/**
 * ============================================================================
 * File        : Generation.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Energy generation dashboard page, driven by the live 24-hour solar
 * forecast and energy-flow data from the backend.
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

function formatHourLabel(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHour} ${period}`;
}

export default function Generation() {
    const { data, loading, error } = useDashboardData({ horizon: 24 });

    const solarPoints = data.solar?.forecast ?? [];
    const flowPoints = data.energyFlow?.flow ?? [];

    const currentGenerationKw = solarPoints[0]?.value_kw ?? null;
    const nextGenerationKw = solarPoints[1]?.value_kw ?? null;
    const isRising =
        currentGenerationKw !== null && nextGenerationKw !== null
            ? nextGenerationKw >= currentGenerationKw
            : null;

    const totalGenerationKwh = solarPoints.reduce((sum, p) => sum + p.value_kw, 0);

    const peakPoint = solarPoints.reduce(
        (highest, p) => (p.value_kw > (highest?.value_kw ?? -Infinity) ? p : highest),
        null
    );

    const solarUtilizationPct = data.metrics?.solar_utilization_pct ?? null;

    const totalBatteryToBuildingKwh = flowPoints.reduce((sum, p) => sum + p.battery_to_building, 0);
    const sourceTotal = totalGenerationKwh + totalBatteryToBuildingKwh;
    const solarSharePct = sourceTotal > 0 ? (totalGenerationKwh / sourceTotal) * 100 : 0;
    const batterySharePct = sourceTotal > 0 ? (totalBatteryToBuildingKwh / sourceTotal) * 100 : 0;

    const sourceData = [
        {
            name: "Solar",
            value: `${totalGenerationKwh.toFixed(1)} kWh`,
            percentage: Math.round(solarSharePct),
            icon: SunMedium,
            colorClass: "bg-solar",
            textClass: "text-solar",
        },
        {
            name: "Battery Discharge",
            value: `${totalBatteryToBuildingKwh.toFixed(1)} kWh`,
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

    const upcomingRows = solarPoints.slice(0, 6).map((p, index) => {
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

    const summaryCards = [
        {
            title: "Current Generation",
            value: currentGenerationKw !== null ? `${currentGenerationKw.toFixed(2)} kW` : "-",
            description: "Forecasted this hour",
            icon: SunMedium,
            iconClass: "text-solar",
            iconBg: "bg-solar/10",
            trendIcon: isRising === null ? null : isRising ? TrendingUp : TrendingDown,
        },
        {
            title: "Next 24h Generation",
            value: totalGenerationKwh > 0 ? `${totalGenerationKwh.toFixed(1)} kWh` : "-",
            description: "Forecasted total",
            icon: Gauge,
            iconClass: "text-primary",
            iconBg: "bg-primary/10",
            trendIcon: null,
        },
        {
            title: "Peak Generation",
            value: peakPoint ? `${peakPoint.value_kw.toFixed(2)} kW` : "-",
            description: peakPoint ? `Forecasted at ${formatHourLabel(peakPoint.timestamp)}` : "-",
            icon: Clock3,
            iconClass: "text-secondary",
            iconBg: "bg-secondary/10",
            trendIcon: null,
        },
        {
            title: "Solar Utilization",
            value: solarUtilizationPct !== null ? `${solarUtilizationPct.toFixed(1)}%` : "-",
            description: "Of generated solar actually used",
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
                    Some live data could not be loaded. Showing partial results.
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => {
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
                                {loading ? "..." : card.value}
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
                                {totalGenerationKwh > 0 ? totalGenerationKwh.toFixed(1) : "-"}
                                <span className="ml-1 text-sm font-medium text-text-muted">kWh</span>
                            </p>
                            <p className="text-xs text-text-muted">Next 24 hours</p>
                        </div>
                    </div>

                    <BarChart data={chartData} unit=" kW" />
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
                                            style={{ width: `${source.percentage}%` }}
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
                    <p className="mt-1 text-sm text-text-secondary">Forecasted solar output for the next few hours</p>
                </div>

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
                            {upcomingRows.map((row) => (
                                <tr
                                    key={row.time}
                                    className="border-b border-border last:border-b-0 transition-colors duration-200 hover:bg-surface-soft"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-text">{row.time}</td>
                                    <td className="px-6 py-4 text-right text-sm font-medium text-solar">{row.solar}</td>
                                    <td className="px-6 py-4 text-right text-sm text-text-secondary">{row.demand}</td>
                                    <td className="px-6 py-4 text-right text-sm font-semibold text-text">
                                        {row.coveragePct.toFixed(0)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="divide-y divide-border md:hidden">
                    {upcomingRows.map((row) => (
                        <div key={row.time} className="p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-text">{row.time}</span>
                                <span className="text-sm font-bold text-text">{row.coveragePct.toFixed(0)}% covered</span>
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
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-text">
                            {isRising === null
                                ? "Generation forecast"
                                : isRising
                                ? "Generation is rising this hour"
                                : "Generation is falling this hour"}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-text-secondary">
                            {peakPoint
                                ? `Peak output of ${peakPoint.value_kw.toFixed(2)} kW is forecasted at ${formatHourLabel(peakPoint.timestamp)}.`
                                : "Forecast data is loading."}
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