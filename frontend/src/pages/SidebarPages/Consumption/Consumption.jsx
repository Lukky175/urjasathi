/**
 * ============================================================================
 * File        : Consumption.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Detailed energy-consumption monitoring page.
 *
 * Responsibilities:
 * - Display overall electricity consumption metrics
 * - Visualize consumption trends
 * - Show peak-demand information
 * - Display consumption breakdown
 * - Provide useful consumption insights
 *
 * Future:
 * - Connect to real smart-meter / IoT data
 * - Add selectable date ranges
 * - Add real-time consumption updates
 * - Integrate AI-based consumption analysis
 * ============================================================================
 */

import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    CalendarDays,
    Clock3,
    Gauge,
    Info,
    Zap,
} from "lucide-react";


export default function Consumption() {

    /* =========================================================================
       MOCK DATA
       ========================================================================= */

    const consumptionData = [
        {
            day: "Mon",
            value: 18,
        },
        {
            day: "Tue",
            value: 21,
        },
        {
            day: "Wed",
            value: 17,
        },
        {
            day: "Thu",
            value: 24,
        },
        {
            day: "Fri",
            value: 22,
        },
        {
            day: "Sat",
            value: 19,
        },
        {
            day: "Sun",
            value: 16,
        },
    ];


    const hourlyData = [
        {
            time: "12 AM",
            value: 0.8,
        },
        {
            time: "4 AM",
            value: 0.6,
        },
        {
            time: "8 AM",
            value: 1.9,
        },
        {
            time: "12 PM",
            value: 2.7,
        },
        {
            time: "4 PM",
            value: 2.2,
        },
        {
            time: "8 PM",
            value: 3.4,
        },
        {
            time: "12 AM",
            value: 1.4,
        },
    ];


    /* =========================================================================
       DERIVED VALUES
       ========================================================================= */

    const totalConsumption = consumptionData.reduce(
        (total, item) => total + item.value,
        0
    );

    const averageConsumption =
        totalConsumption / consumptionData.length;

    const highestDay = consumptionData.reduce(
        (highest, item) =>
            item.value > highest.value ? item : highest,
        consumptionData[0]
    );

    const highestHourlyUsage = hourlyData.reduce(
        (highest, item) =>
            item.value > highest.value ? item : highest,
        hourlyData[0]
    );


    /* =========================================================================
       STAT CARDS
       ========================================================================= */

    const stats = [
        {
            label: "Today's Consumption",
            value: "16.0",
            unit: "kWh",
            description: "12% lower than yesterday",
            icon: Zap,
            trend: "down",
            positive: true,
        },
        {
            label: "Weekly Consumption",
            value: totalConsumption.toFixed(1),
            unit: "kWh",
            description: "7-day total usage",
            icon: Activity,
            trend: "up",
            positive: false,
        },
        {
            label: "Average Daily Usage",
            value: averageConsumption.toFixed(1),
            unit: "kWh",
            description: "Based on the last 7 days",
            icon: Gauge,
            trend: "stable",
            positive: true,
        },
        {
            label: "Peak Demand",
            value: highestHourlyUsage.value.toFixed(1),
            unit: "kW",
            description: `Highest at ${highestHourlyUsage.time}`,
            icon: Clock3,
            trend: "up",
            positive: false,
        },
    ];


    /* =========================================================================
       RENDER
       ========================================================================= */

    return (
        <div className="mx-auto w-full max-w-7xl">

            {/* =================================================================
                PAGE HEADER
               ================================================================= */}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                    <div className="mb-2 flex items-center gap-2 text-sm text-text-secondary">

                        <Zap
                            className="h-4 w-4 text-primary"
                        />

                        <span>
                            Energy Management
                        </span>

                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                        Energy Consumption
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                        Monitor your electricity usage, identify peak
                        consumption periods, and understand how energy
                        is being consumed.
                    </p>

                </div>


                {/* Date selector */}

                <button
                    type="button"
                    className="
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-border
                        bg-surface
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-text-secondary
                        shadow-sm
                        transition-all
                        duration-200
                        hover:border-primary
                        hover:text-primary
                    "
                >
                    <CalendarDays className="h-4 w-4" />

                    Last 7 Days
                </button>

            </div>


            {/* =================================================================
                STAT CARDS
               ================================================================= */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {

                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="
                                rounded-2xl
                                border
                                border-border
                                bg-surface
                                p-5
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-md
                            "
                        >

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
                                    "
                                >
                                    <Icon className="h-5 w-5" />
                                </div>


                                {stat.trend !== "stable" && (
                                    <div
                                        className={`
                                            flex
                                            items-center
                                            gap-1
                                            rounded-full
                                            px-2
                                            py-1
                                            text-xs
                                            font-medium

                                            ${
                                                stat.positive
                                                    ? "bg-emerald-500/10 text-emerald-600"
                                                    : "bg-amber-500/10 text-amber-600"
                                            }
                                        `}
                                    >

                                        {stat.trend === "down" ? (
                                            <ArrowDownRight className="h-3.5 w-3.5" />
                                        ) : (
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        )}

                                        {stat.trend === "down"
                                            ? "Lower"
                                            : "Higher"}
                                    </div>
                                )}

                            </div>


                            <p className="mt-5 text-sm font-medium text-text-secondary">
                                {stat.label}
                            </p>


                            <div className="mt-1 flex items-baseline gap-1">

                                <span className="text-2xl font-bold text-text">
                                    {stat.value}
                                </span>

                                <span className="text-sm text-text-muted">
                                    {stat.unit}
                                </span>

                            </div>


                            <p className="mt-2 text-xs text-text-muted">
                                {stat.description}
                            </p>

                        </div>
                    );

                })}

            </div>


            {/* =================================================================
                MAIN ANALYTICS GRID
               ================================================================= */}

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">

                {/* =============================================================
                    WEEKLY CONSUMPTION CHART
                   ============================================================= */}

                <section
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

                    <div className="flex items-start justify-between">

                        <div>

                            <h2 className="text-lg font-semibold text-text">
                                Consumption Trend
                            </h2>

                            <p className="mt-1 text-sm text-text-secondary">
                                Daily electricity consumption
                            </p>

                        </div>

                        <div className="text-right">

                            <p className="text-2xl font-bold text-text">
                                {totalConsumption.toFixed(1)}
                                <span className="ml-1 text-sm font-medium text-text-muted">
                                    kWh
                                </span>
                            </p>

                            <p className="text-xs text-text-muted">
                                This week
                            </p>

                        </div>

                    </div>


                    {/* Chart */}

                    <div className="mt-8 flex h-64 items-end gap-2 sm:gap-4">

                        {consumptionData.map((item) => {

                            const height =
                                (item.value /
                                    highestDay.value) *
                                100;

                            const isHighest =
                                item.day === highestDay.day;

                            return (
                                <div
                                    key={item.day}
                                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                                >

                                    <div className="flex h-full w-full items-end">

                                        <div
                                            title={`${item.value} kWh`}
                                            className={`
                                                group relative
                                                w-full
                                                rounded-t-lg
                                                transition-all
                                                duration-500
                                                hover:opacity-80
                                                ${
                                                    isHighest
                                                        ? "bg-primary"
                                                        : "bg-primary/20"
                                                }
                                            `}
                                            style={{
                                                height: `${height}%`,
                                            }}
                                        >

                                            <div
                                                className="
                                                    absolute
                                                    -top-8
                                                    left-1/2
                                                    hidden
                                                    -translate-x-1/2
                                                    whitespace-nowrap
                                                    rounded-md
                                                    bg-text
                                                    px-2
                                                    py-1
                                                    text-[10px]
                                                    text-surface
                                                    group-hover:block
                                                "
                                            >
                                                {item.value} kWh
                                            </div>

                                        </div>

                                    </div>


                                    <span className="text-xs text-text-muted">
                                        {item.day}
                                    </span>

                                </div>
                            );

                        })}

                    </div>

                </section>


                {/* =============================================================
                    PEAK USAGE
                   ============================================================= */}

                <section
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

                        <h2 className="text-lg font-semibold text-text">
                            Peak Usage
                        </h2>

                        <p className="mt-1 text-sm text-text-secondary">
                            When your energy demand is highest
                        </p>

                    </div>


                    <div
                        className="
                            mt-6
                            rounded-2xl
                            bg-primary/5
                            p-5
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <Clock3 className="h-5 w-5" />
                            </div>

                            <div>

                                <p className="text-sm text-text-secondary">
                                    Peak period
                                </p>

                                <p className="text-xl font-bold text-text">
                                    8 PM – 10 PM
                                </p>

                            </div>

                        </div>


                        <div className="mt-6">

                            <div className="flex items-end justify-between">

                                <span className="text-sm text-text-secondary">
                                    Peak demand
                                </span>

                                <span className="font-semibold text-text">
                                    3.4 kW
                                </span>

                            </div>


                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">

                                <div
                                    className="
                                        h-full
                                        w-[78%]
                                        rounded-full
                                        bg-primary
                                    "
                                />

                            </div>

                        </div>

                    </div>


                    {/* Insight */}

                    <div className="mt-5 flex gap-3">

                        <Info
                            className="
                                mt-0.5
                                h-4
                                w-4
                                shrink-0
                                text-primary
                            "
                        />

                        <p className="text-xs leading-5 text-text-secondary">
                            Shifting flexible loads such as washing
                            machines, water heating, or EV charging
                            outside peak hours can help reduce demand
                            and electricity costs.
                        </p>

                    </div>

                </section>

            </div>


            {/* =================================================================
                HOURLY CONSUMPTION
               ================================================================= */}

            <section
                className="
                    mt-6
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

                    <h2 className="text-lg font-semibold text-text">
                        Today's Consumption Pattern
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                        Approximate energy demand throughout the day
                    </p>

                </div>


                <div className="mt-8 grid gap-3 sm:grid-cols-7">

                    {hourlyData.map((item) => {

                        const percentage =
                            (item.value / 3.4) * 100;

                        return (
                            <div
                                key={`${item.time}-${item.value}`}
                                className="
                                    rounded-xl
                                    border
                                    border-border
                                    p-3
                                "
                            >

                                <div className="flex items-center justify-between gap-2">

                                    <span className="text-xs text-text-muted">
                                        {item.time}
                                    </span>

                                    <span className="text-xs font-semibold text-text">
                                        {item.value} kW
                                    </span>

                                </div>


                                <div
                                    className="
                                        mt-3
                                        h-24
                                        overflow-hidden
                                        rounded-lg
                                        bg-primary/5
                                    "
                                >

                                    <div
                                        className="
                                            mt-auto
                                            h-full
                                            w-full
                                            origin-bottom
                                            rounded-lg
                                            bg-primary/30
                                            transition-transform
                                            duration-500
                                            hover:bg-primary/50
                                        "
                                        style={{
                                            transform: `scaleY(${percentage / 100})`,
                                        }}
                                    />

                                </div>

                            </div>
                        );

                    })}

                </div>

            </section>


            {/* =================================================================
                CONSUMPTION INSIGHTS
               ================================================================= */}

            <section
                className="
                    mt-6
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

                    <h2 className="text-lg font-semibold text-text">
                        Consumption Insights
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                        Helpful observations based on your energy usage
                    </p>

                </div>


                <div className="mt-6 grid gap-4 md:grid-cols-3">

                    <div
                        className="
                            rounded-xl
                            border
                            border-border
                            p-4
                            transition-all
                            duration-200
                            hover:border-primary/40
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                                <ArrowDownRight className="h-4 w-4" />
                            </div>

                            <p className="text-sm font-semibold text-text">
                                Lower usage today
                            </p>

                        </div>

                        <p className="mt-3 text-xs leading-5 text-text-secondary">
                            Your consumption is currently lower than
                            yesterday. Continue shifting flexible loads
                            away from peak periods.
                        </p>

                    </div>


                    <div
                        className="
                            rounded-xl
                            border
                            border-border
                            p-4
                            transition-all
                            duration-200
                            hover:border-primary/40
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                                <Clock3 className="h-4 w-4" />
                            </div>

                            <p className="text-sm font-semibold text-text">
                                Evening peak
                            </p>

                        </div>

                        <p className="mt-3 text-xs leading-5 text-text-secondary">
                            Most of your electricity demand occurs
                            during the evening. Battery discharge or
                            load shifting could reduce peak demand.
                        </p>

                    </div>


                    <div
                        className="
                            rounded-xl
                            border
                            border-border
                            p-4
                            transition-all
                            duration-200
                            hover:border-primary/40
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <Activity className="h-4 w-4" />
                            </div>

                            <p className="text-sm font-semibold text-text">
                                Usage pattern
                            </p>

                        </div>

                        <p className="mt-3 text-xs leading-5 text-text-secondary">
                            Your weekly consumption is relatively
                            consistent, making it easier to identify
                            unusual energy spikes.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}