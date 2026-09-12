/**
 * ============================================================================
 * File        : Overview.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * High-level energy performance overview for the UrjaSathi dashboard.
 *
 * Responsibilities:
 * - Display overall energy performance
 * - Summarize consumption and renewable generation
 * - Show renewable energy contribution
 * - Show energy efficiency indicators
 * - Display recent energy trends
 * - Provide a high-level view without duplicating detailed pages
 * ============================================================================
 */

import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    BatteryCharging,
    CircleDollarSign,
    Leaf,
    SunMedium,
    Zap,
} from "lucide-react";

import { useTableData } from "../../../hooks/useTableData";


export default function Overview() {

    const { tableData, loading, error, notFound } = useTableData();

    /* =========================================================================
       LIVE METRICS — sourced from GET /table-data
       ========================================================================= */

    const summaryMetrics = [
        {
            title: "Current Consumption",
            value: tableData?.current_consumption != null
                ? Number(tableData.current_consumption).toFixed(1)
                : "0.0",
            unit: "kW",
            change: null,
            description: "Real-time power draw",
            trend: null,
            icon: Zap,
        },
        {
            title: "Solar Generation",
            value: tableData?.solar_generation != null
                ? Number(tableData.solar_generation).toFixed(1)
                : "0.0",
            unit: "kW",
            change: null,
            description: "Renewable output now",
            trend: "up",
            icon: SunMedium,
        },
        {
            title: "Renewable Contribution",
            value: tableData?.renewable_implant != null
                ? Number(tableData.renewable_implant).toFixed(1)
                : "0.0",
            unit: "%",
            change: null,
            description: "Clean-energy share today",
            trend: "up",
            icon: Leaf,
        },
        {
            title: "Today's Savings",
            value: tableData?.today_saving != null
                ? `₹${Math.round(Number(tableData.today_saving)).toLocaleString("en-IN")}`
                : "₹0",
            unit: "",
            change: null,
            description: "Estimated cost reduction",
            trend: "down",
            icon: CircleDollarSign,
        },
    ];

    const renewablePct = tableData?.renewable_implant != null ? Math.min(100, Math.max(0, Number(tableData.renewable_implant))) : 0;
    const gridPct = (100 - renewablePct).toFixed(1);



    /**
     * Weekly energy performance — kept as illustrative chart data.
     * Will be replaced with real historical data when that endpoint is available.
     */

    const weeklyData = [
        { day: "Mon", consumption: 62, generation: 48 },
        { day: "Tue", consumption: 71, generation: 55 },
        { day: "Wed", consumption: 58, generation: 61 },
        { day: "Thu", consumption: 69, generation: 52 },
        { day: "Fri", consumption: 74, generation: 64 },
        { day: "Sat", consumption: 51, generation: 59 },
        { day: "Sun", consumption: 43, generation: 47 },
    ];


    /**
     * Maximum value used to scale the simple chart.
     */

    const maxEnergy = Math.max(
        ...weeklyData.flatMap((item) => [
            item.consumption,
            item.generation,
        ])
    );


    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">

            {/* =================================================================
                PAGE HEADER
               ================================================================= */}

            <section>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <p
                            className="
                                text-sm
                                font-medium
                                text-primary
                            "
                        >
                            Energy Performance
                        </p>

                        <h1
                            className="
                                mt-1
                                text-2xl
                                font-bold
                                tracking-tight
                                text-text
                                sm:text-3xl
                            "
                        >
                            Energy Overview
                        </h1>

                        <p
                            className="
                                mt-2
                                max-w-2xl
                                text-sm
                                leading-6
                                text-text-secondary
                            "
                        >
                            Understand how your energy is being consumed,
                            generated, stored, and optimized.
                        </p>

                    </div>


                    {/* Period indicator */}

                    <div
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-border
                            bg-surface
                            px-3
                            py-2
                            text-xs
                            font-medium
                            text-text-secondary
                        "
                    >

                        <Activity className="h-4 w-4 text-primary" />

                        Last 7 days

                    </div>

                </div>

            </section>


            {/* =================================================================
                STATUS BANNERS
               ================================================================= */}

            {error && (
                <div className="mt-0 mb-4 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold">!</span>
                    <span>Live energy data could not be loaded. Please refresh or check your connection.</span>
                </div>
            )}

            {notFound && !loading && (
                <div className="mt-0 mb-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 text-sm">
                    <p className="font-semibold text-text">No energy snapshot yet</p>
                    <p className="mt-1 text-text-secondary">No energy data has been recorded for your account. Metrics will appear here once your smart meter begins reporting.</p>
                </div>
            )}


            {/* =================================================================
                SUMMARY METRICS
               ================================================================= */}

            <section>

                <div
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                        xl:grid-cols-4
                    "
                >

                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="group rounded-2xl border border-border bg-surface p-5 shadow-sm animate-pulse"
                              >
                                  <div className="flex items-start justify-between">
                                      <div className="h-10 w-10 rounded-xl bg-border" />
                                      <div className="h-4 w-12 rounded bg-border" />
                                  </div>
                                  <div className="mt-5 space-y-2">
                                      <div className="h-3 w-28 rounded bg-border" />
                                      <div className="h-7 w-20 rounded bg-border" />
                                      <div className="h-3 w-16 rounded bg-border" />
                                  </div>
                              </div>
                          ))
                        : summaryMetrics.map(
                        ({
                            title,
                            value,
                            unit,
                            change,
                            description,
                            trend,
                            icon: Icon,
                        }) => (

                            <div
                                key={title}
                                className="
                                    group
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-surface
                                    p-5
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-primary/30
                                    hover:shadow-md
                                "
                            >

                                {/* Card header */}

                                <div className="flex items-start justify-between">

                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-primary/10
                                            text-primary
                                            transition-transform
                                            duration-300
                                            group-hover:scale-105
                                        "
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>


                                    <div
                                        className={`
                                            flex
                                            items-center
                                            gap-1
                                            text-xs
                                            font-semibold
                                            ${
                                                trend === "up"
                                                    ? "text-primary"
                                                    : "text-emerald-500"
                                            }
                                        `}
                                    >

                                        {trend === "up" ? (
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        ) : (
                                            <ArrowDownRight className="h-3.5 w-3.5" />
                                        )}

                                        {change}

                                    </div>

                                </div>


                                {/* Value */}

                                <div className="mt-5">

                                    <p className="text-sm text-text-secondary">
                                        {title}
                                    </p>

                                    <div className="mt-1 flex items-baseline gap-1">

                                        <span
                                            className="
                                                text-2xl
                                                font-bold
                                                tracking-tight
                                                text-text
                                            "
                                        >
                                            {value}
                                        </span>

                                        {unit && (
                                            <span
                                                className="
                                                    text-sm
                                                    font-medium
                                                    text-text-muted
                                                "
                                            >
                                                {unit}
                                            </span>
                                        )}

                                    </div>

                                    <p className="mt-1 text-xs text-text-muted">
                                        {description}
                                    </p>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </section>


            {/* =================================================================
                ENERGY TREND + ENERGY MIX
               ================================================================= */}

            <section
                className="
                    grid
                    gap-6
                    xl:grid-cols-[1.7fr_1fr]
                "
            >

                {/* =============================================================
                    WEEKLY ENERGY TREND
                   ============================================================= */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        shadow-sm
                        sm:p-6
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div>

                            <h2
                                className="
                                    text-base
                                    font-semibold
                                    text-text
                                "
                            >
                                Energy Trend
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-text-secondary
                                "
                            >
                                Consumption vs renewable generation
                            </p>

                        </div>


                        {/* Legend */}

                        <div className="flex items-center gap-4 text-xs">

                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                Consumption
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                Generation
                            </div>

                        </div>

                    </div>


                    {/* Chart */}

                    <div className="mt-8">

                        <div
                            className="
                                flex
                                h-56
                                items-end
                                justify-between
                                gap-2
                                border-b
                                border-border
                                px-1
                                pb-0
                            "
                        >

                            {weeklyData.map((item) => {

                                const consumptionHeight =
                                    (item.consumption / maxEnergy) * 100;

                                const generationHeight =
                                    (item.generation / maxEnergy) * 100;

                                return (
                                    <div
                                        key={item.day}
                                        className="
                                            flex
                                            h-full
                                            flex-1
                                            items-end
                                            justify-center
                                            gap-1
                                        "
                                    >

                                        {/* Consumption */}

                                        <div
                                            className="
                                                w-3
                                                rounded-t-md
                                                bg-primary/80
                                                transition-all
                                                duration-500
                                                hover:bg-primary
                                                sm:w-4
                                            "
                                            style={{
                                                height: `${consumptionHeight}%`,
                                            }}
                                            title={`${item.consumption} kWh consumption`}
                                        />


                                        {/* Generation */}

                                        <div
                                            className="
                                                w-3
                                                rounded-t-md
                                                bg-emerald-500/70
                                                transition-all
                                                duration-500
                                                hover:bg-emerald-500
                                                sm:w-4
                                            "
                                            style={{
                                                height: `${generationHeight}%`,
                                            }}
                                            title={`${item.generation} kWh generation`}
                                        />

                                    </div>
                                );

                            })}

                        </div>


                        {/* Days */}

                        <div className="mt-3 flex justify-between px-1">

                            {weeklyData.map((item) => (
                                <span
                                    key={item.day}
                                    className="
                                        flex-1
                                        text-center
                                        text-[11px]
                                        text-text-muted
                                    "
                                >
                                    {item.day}
                                </span>
                            ))}

                        </div>

                    </div>

                </div>


                {/* =============================================================
                    ENERGY MIX
                   ============================================================= */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        shadow-sm
                        sm:p-6
                    "
                >

                    <div>

                        <h2
                            className="
                                text-base
                                font-semibold
                                text-text
                            "
                        >
                            Energy Mix
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-text-secondary
                            "
                        >
                            Where your consumed energy came from
                        </p>

                    </div>


                    {/* Circular indicator */}

                    <div className="mt-7 flex justify-center">

                            <div
                                className="
                                    relative
                                    flex
                                    h-40
                                    w-40
                                    items-center
                                    justify-center
                                    rounded-full
                                "
                                style={{
                                    background: `conic-gradient(var(--color-primary) 0% ${renewablePct}%, var(--color-border) ${renewablePct}% 100%)`,
                                }}
                            >

                            <div
                                className="
                                    flex
                                    h-28
                                    w-28
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-surface
                                "
                            >

                                <span
                                    className="
                                        text-2xl
                                        font-bold
                                        text-text
                                    "
                                >
                                    {renewablePct > 0 ? `${renewablePct.toFixed(1)}%` : "0.0%"}
                                </span>

                                <span
                                    className="
                                        mt-1
                                        text-[11px]
                                        text-text-muted
                                    "
                                >
                                    Renewable
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* Energy sources */}

                    <div className="mt-7 space-y-4">

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <span className="h-2.5 w-2.5 rounded-full bg-primary" />

                                <span className="text-sm text-text-secondary">
                                    Solar / Renewable
                                </span>

                            </div>

                            <span className="text-sm font-semibold text-text">
                                {renewablePct > 0 ? `${renewablePct.toFixed(1)}%` : "0.0%"}
                            </span>

                        </div>


                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />

                                <span className="text-sm text-text-secondary">
                                    Grid Energy
                                </span>

                            </div>

                            <span className="text-sm font-semibold text-text">
                                {renewablePct > 0 ? `${gridPct}%` : "100.0%"}
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================================
                SYSTEM STATUS
               ================================================================= */}

            <section>

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        shadow-sm
                        sm:p-6
                    "
                >

                    <div>

                        <h2
                            className="
                                text-base
                                font-semibold
                                text-text
                            "
                        >
                            Energy System Status
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-text-secondary
                            "
                        >
                            Current status of your connected energy systems
                        </p>

                    </div>


                    <div
                        className="
                            mt-6
                            grid
                            gap-3
                            sm:grid-cols-3
                        "
                    >

                        {/* Solar */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-border
                                bg-app-bg
                                p-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <SunMedium className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">

                                <p className="text-sm font-medium text-text">
                                    Solar System
                                </p>

                                <div className="mt-1 flex items-center gap-1.5">

                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                    <span className="text-xs text-text-secondary">
                                        Generating normally
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Battery */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-border
                                bg-app-bg
                                p-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <BatteryCharging className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">

                                <p className="text-sm font-medium text-text">
                                    Battery
                                </p>

                                <div className="mt-1 flex items-center gap-1.5">

                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                    <span className="text-xs text-text-secondary">
                                        78% charged
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Grid */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-border
                                bg-app-bg
                                p-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <Zap className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">

                                <p className="text-sm font-medium text-text">
                                    Grid Connection
                                </p>

                                <div className="mt-1 flex items-center gap-1.5">

                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                    <span className="text-xs text-text-secondary">
                                        Connected
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================================
                INSIGHT
               ================================================================= */}

            <section>

                <div
                    className="
                        rounded-2xl
                        border
                        border-primary/20
                        bg-primary/5
                        p-5
                        sm:p-6
                    "
                >

                    <div className="flex items-start gap-4">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            "
                        >
                            <Leaf className="h-5 w-5" />
                        </div>

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-text
                                "
                            >
                                Your renewable energy contribution is strong
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    leading-6
                                    text-text-secondary
                                "
                            >
                                Renewable sources supplied approximately
                                66.8% of your energy needs during this period.
                                Increasing daytime solar utilization could
                                further reduce grid dependency and electricity
                                costs.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}