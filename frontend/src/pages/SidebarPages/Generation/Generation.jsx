/**
 * ============================================================================
 * File        : Generation.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Energy generation dashboard page.
 *
 * Features:
 * - Solar generation summary
 * - Generation statistics
 * - Generation trend
 * - Energy source breakdown
 * - Recent generation data
 *
 * Uses UrjaSathi design tokens through Tailwind utility classes.
 * ============================================================================
 */

import {
    SunMedium,
    Zap,
    TrendingUp,
    CalendarDays,
    ArrowUpRight,
    ArrowDownRight,
    BatteryCharging,
} from "lucide-react";


export default function Generation() {

    /**
     * =========================================================================
     * MOCK DATA
     * =========================================================================
     *
     * Replace these values later with real generation data from the backend.
     */

    const summaryCards = [
        {
            title: "Today's Generation",
            value: "18.6 kWh",
            change: "+12.4%",
            description: "vs yesterday",
            icon: SunMedium,
            iconClass: "text-solar",
            iconBg: "bg-solar/10",
            trend: "up",
        },
        {
            title: "This Month",
            value: "428.7 kWh",
            change: "+8.7%",
            description: "vs last month",
            icon: CalendarDays,
            iconClass: "text-primary",
            iconBg: "bg-primary/10",
            trend: "up",
        },
        {
            title: "Peak Generation",
            value: "4.82 kW",
            change: "13:20",
            description: "today",
            icon: TrendingUp,
            iconClass: "text-secondary",
            iconBg: "bg-secondary/10",
            trend: "up",
        },
        {
            title: "Solar Utilization",
            value: "76.4%",
            change: "+4.2%",
            description: "this month",
            icon: BatteryCharging,
            iconClass: "text-action",
            iconBg: "bg-action/10",
            trend: "up",
        },
    ];


    /**
     * =========================================================================
     * GENERATION TREND
     * =========================================================================
     */

    const generationData = [
        {
            day: "Mon",
            value: 16.8,
        },
        {
            day: "Tue",
            value: 18.2,
        },
        {
            day: "Wed",
            value: 15.7,
        },
        {
            day: "Thu",
            value: 20.4,
        },
        {
            day: "Fri",
            value: 19.1,
        },
        {
            day: "Sat",
            value: 22.6,
        },
        {
            day: "Sun",
            value: 18.6,
        },
    ];

    const maxGeneration = Math.max(
        ...generationData.map((item) => item.value)
    );


    /**
     * =========================================================================
     * SOURCE BREAKDOWN
     * =========================================================================
     */

    const sourceData = [
        {
            name: "Solar",
            value: "428.7 kWh",
            percentage: 91,
            icon: SunMedium,
            colorClass: "bg-solar",
            textClass: "text-solar",
        },
        {
            name: "Battery Discharge",
            value: "42.1 kWh",
            percentage: 9,
            icon: BatteryCharging,
            colorClass: "bg-battery",
            textClass: "text-secondary",
        },
    ];


    /**
     * =========================================================================
     * RECENT GENERATION
     * =========================================================================
     */

    const recentGeneration = [
        {
            time: "14:00",
            solar: "3.84 kW",
            grid: "0.00 kW",
            total: "3.84 kW",
        },
        {
            time: "13:00",
            solar: "4.82 kW",
            grid: "0.00 kW",
            total: "4.82 kW",
        },
        {
            time: "12:00",
            solar: "4.56 kW",
            grid: "0.00 kW",
            total: "4.56 kW",
        },
        {
            time: "11:00",
            solar: "3.91 kW",
            grid: "0.00 kW",
            total: "3.91 kW",
        },
        {
            time: "10:00",
            solar: "3.12 kW",
            grid: "0.21 kW",
            total: "3.33 kW",
        },
    ];


    /**
     * =========================================================================
     * RENDER
     * =========================================================================
     */

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">


            {/* =================================================================
                PAGE HEADER
               ================================================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div>

                    <div className="flex items-center gap-2">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-solar/10
                                text-solar
                            "
                        >
                            <SunMedium className="h-5 w-5" />
                        </div>

                        <div>

                            <h1
                                className="
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-text
                                    sm:text-3xl
                                "
                            >
                                Generation
                            </h1>

                            <p className="mt-1 text-sm text-text-secondary">
                                Monitor your renewable energy generation.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Date indicator */}

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
                        px-4
                        py-2.5
                        text-sm
                        text-text-secondary
                        shadow-sm
                    "
                >
                    <CalendarDays className="h-4 w-4 text-primary" />

                    <span>Today, Aug 31</span>

                </div>

            </div>


            {/* =================================================================
                SUMMARY CARDS
               ================================================================= */}

            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {summaryCards.map((card) => {

                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="
                                rounded-2xl
                                border
                                border-border
                                bg-surface
                                p-5
                                shadow-[var(--shadow-card-value)]
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-[var(--shadow-hover-value)]
                            "
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                            text-text-secondary
                                        "
                                    >
                                        {card.title}
                                    </p>

                                    <p
                                        className="
                                            mt-2
                                            text-2xl
                                            font-bold
                                            tracking-tight
                                            text-text
                                        "
                                    >
                                        {card.value}
                                    </p>

                                </div>


                                <div
                                    className={`
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${card.iconBg}
                                        ${card.iconClass}
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                            </div>


                            <div className="mt-4 flex items-center gap-1.5">

                                {card.trend === "up" ? (
                                    <ArrowUpRight
                                        className="
                                            h-4
                                            w-4
                                            text-success
                                        "
                                    />
                                ) : (
                                    <ArrowDownRight
                                        className="
                                            h-4
                                            w-4
                                            text-danger
                                        "
                                    />
                                )}

                                <span
                                    className="
                                        text-xs
                                        font-semibold
                                        text-success
                                    "
                                >
                                    {card.change}
                                </span>

                                <span className="text-xs text-text-muted">
                                    {card.description}
                                </span>

                            </div>

                        </div>
                    );

                })}

            </div>


            {/* =================================================================
                MAIN ANALYTICS GRID
               ================================================================= */}

            <div
                className="
                    grid
                    gap-6
                    xl:grid-cols-[1.7fr_1fr]
                "
            >


                {/* =============================================================
                    GENERATION TREND
                   ============================================================= */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        shadow-[var(--shadow-card-value)]
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

                            <h2 className="text-lg font-semibold text-text">
                                Generation Trend
                            </h2>

                            <p className="mt-1 text-sm text-text-muted">
                                Renewable energy generated over the last 7 days.
                            </p>

                        </div>


                        <div
                            className="
                                inline-flex
                                w-fit
                                items-center
                                gap-2
                                rounded-lg
                                bg-solar/10
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-solar
                            "
                        >
                            <SunMedium className="h-3.5 w-3.5" />
                            Solar
                        </div>

                    </div>


                    {/* Chart */}

                    <div
                        className="
                            mt-8
                            flex
                            h-64
                            items-end
                            gap-2
                            sm:gap-4
                        "
                    >

                        {generationData.map((item) => {

                            const height =
                                (item.value / maxGeneration) * 100;

                            return (
                                <div
                                    key={item.day}
                                    className="
                                        flex
                                        h-full
                                        flex-1
                                        flex-col
                                        items-center
                                        justify-end
                                        gap-2
                                    "
                                >

                                    <div className="flex h-full w-full items-end">

                                        <div
                                            className="
                                                group
                                                relative
                                                w-full
                                                rounded-t-xl
                                                bg-gradient-to-t
                                                from-solar
                                                to-solar/40
                                                transition-all
                                                duration-500
                                                hover:from-solar
                                                hover:to-solar
                                            "
                                            style={{
                                                height: `${height}%`,
                                            }}
                                        >

                                            <div
                                                className="
                                                    pointer-events-none
                                                    absolute
                                                    -top-8
                                                    left-1/2
                                                    -translate-x-1/2
                                                    whitespace-nowrap
                                                    rounded-md
                                                    bg-text
                                                    px-2
                                                    py-1
                                                    text-[10px]
                                                    font-medium
                                                    text-surface
                                                    opacity-0
                                                    transition-opacity
                                                    duration-200
                                                    group-hover:opacity-100
                                                "
                                            >
                                                {item.value} kWh
                                            </div>

                                        </div>

                                    </div>

                                    <span
                                        className="
                                            text-xs
                                            font-medium
                                            text-text-muted
                                        "
                                    >
                                        {item.day}
                                    </span>

                                </div>
                            );

                        })}

                    </div>


                    <div
                        className="
                            mt-5
                            flex
                            items-center
                            justify-between
                            border-t
                            border-border
                            pt-4
                        "
                    >

                        <span className="text-xs text-text-muted">
                            Average
                        </span>

                        <span className="text-sm font-semibold text-text">
                            18.77 kWh/day
                        </span>

                    </div>

                </div>


                {/* =============================================================
                    SOURCE BREAKDOWN
                   ============================================================= */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        shadow-[var(--shadow-card-value)]
                        sm:p-6
                    "
                >

                    <h2 className="text-lg font-semibold text-text">
                        Energy Sources
                    </h2>

                    <p className="mt-1 text-sm text-text-muted">
                        Generation contribution this month.
                    </p>


                    {/* Donut-style visualization */}

                    <div className="mt-7 flex justify-center">

                        <div
                            className="
                                relative
                                flex
                                h-44
                                w-44
                                items-center
                                justify-center
                                rounded-full
                            "
                            style={{
                                background:
                                    "conic-gradient(var(--solar) 0deg 327.6deg, var(--battery) 327.6deg 360deg)",
                            }}
                        >

                            <div
                                className="
                                    flex
                                    h-32
                                    w-32
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-surface
                                "
                            >

                                <span className="text-2xl font-bold text-text">
                                    470.8
                                </span>

                                <span className="text-xs text-text-muted">
                                    kWh generated
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* Source list */}

                    <div className="mt-7 space-y-4">

                        {sourceData.map((source) => {

                            const Icon = source.icon;

                            return (
                                <div key={source.name}>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <div className="flex items-center gap-2.5">

                                            <div
                                                className={`
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    ${source.colorClass}/10
                                                `}
                                            >
                                                <Icon
                                                    className={`
                                                        h-4
                                                        w-4
                                                        ${source.textClass}
                                                    `}
                                                />
                                            </div>

                                            <span
                                                className="
                                                    text-sm
                                                    font-medium
                                                    text-text
                                                "
                                            >
                                                {source.name}
                                            </span>

                                        </div>

                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                text-text
                                            "
                                        >
                                            {source.percentage}%
                                        </span>

                                    </div>


                                    <div
                                        className="
                                            mt-2
                                            h-2
                                            overflow-hidden
                                            rounded-full
                                            bg-surface-soft
                                        "
                                    >

                                        <div
                                            className={`
                                                h-full
                                                rounded-full
                                                ${source.colorClass}
                                            `}
                                            style={{
                                                width: `${source.percentage}%`,
                                            }}
                                        />

                                    </div>


                                    <p
                                        className="
                                            mt-1.5
                                            text-xs
                                            text-text-muted
                                        "
                                    >
                                        {source.value}
                                    </p>

                                </div>
                            );

                        })}

                    </div>

                </div>

            </div>


            {/* =================================================================
                RECENT GENERATION
               ================================================================= */}

            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    shadow-[var(--shadow-card-value)]
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-2
                        border-b
                        border-border
                        p-5
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        sm:p-6
                    "
                >

                    <div>

                        <h2 className="text-lg font-semibold text-text">
                            Recent Generation
                        </h2>

                        <p className="mt-1 text-sm text-text-muted">
                            Latest energy generation readings.
                        </p>

                    </div>


                    <div
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-lg
                            bg-secondary/10
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-secondary
                        "
                    >
                        <Zap className="h-3.5 w-3.5" />
                        Live data
                    </div>

                </div>


                {/* Desktop table */}

                <div className="hidden overflow-x-auto md:block">

                    <table className="w-full">

                        <thead>

                            <tr
                                className="
                                    border-b
                                    border-border
                                    bg-surface-soft
                                "
                            >

                                <th
                                    className="
                                        px-6
                                        py-3
                                        text-left
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-text-muted
                                    "
                                >
                                    Time
                                </th>

                                <th
                                    className="
                                        px-6
                                        py-3
                                        text-right
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-text-muted
                                    "
                                >
                                    Solar
                                </th>

                                <th
                                    className="
                                        px-6
                                        py-3
                                        text-right
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-text-muted
                                    "
                                >
                                    Grid
                                </th>

                                <th
                                    className="
                                        px-6
                                        py-3
                                        text-right
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-text-muted
                                    "
                                >
                                    Total Generation
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {recentGeneration.map((row) => (

                                <tr
                                    key={row.time}
                                    className="
                                        border-b
                                        border-border
                                        last:border-b-0
                                        transition-colors
                                        duration-200
                                        hover:bg-surface-soft
                                    "
                                >

                                    <td
                                        className="
                                            px-6
                                            py-4
                                            text-sm
                                            font-medium
                                            text-text
                                        "
                                    >
                                        {row.time}
                                    </td>

                                    <td
                                        className="
                                            px-6
                                            py-4
                                            text-right
                                            text-sm
                                            font-medium
                                            text-solar
                                        "
                                    >
                                        {row.solar}
                                    </td>

                                    <td
                                        className="
                                            px-6
                                            py-4
                                            text-right
                                            text-sm
                                            text-text-secondary
                                        "
                                    >
                                        {row.grid}
                                    </td>

                                    <td
                                        className="
                                            px-6
                                            py-4
                                            text-right
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        {row.total}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {/* Mobile cards */}

                <div className="divide-y divide-border md:hidden">

                    {recentGeneration.map((row) => (

                        <div
                            key={row.time}
                            className="p-4"
                        >

                            <div className="flex items-center justify-between">

                                <span
                                    className="
                                        text-sm
                                        font-semibold
                                        text-text
                                    "
                                >
                                    {row.time}
                                </span>

                                <span
                                    className="
                                        text-sm
                                        font-bold
                                        text-text
                                    "
                                >
                                    {row.total}
                                </span>

                            </div>

                            <div
                                className="
                                    mt-3
                                    grid
                                    grid-cols-2
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        rounded-lg
                                        bg-surface-soft
                                        p-2.5
                                    "
                                >
                                    <p className="text-[10px] uppercase tracking-wide text-text-muted">
                                        Solar
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-solar">
                                        {row.solar}
                                    </p>
                                </div>


                                <div
                                    className="
                                        rounded-lg
                                        bg-surface-soft
                                        p-2.5
                                    "
                                >
                                    <p className="text-[10px] uppercase tracking-wide text-text-muted">
                                        Grid
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-text-secondary">
                                        {row.grid}
                                    </p>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* =================================================================
                INSIGHT
               ================================================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    rounded-2xl
                    border
                    border-primary/20
                    bg-primary/5
                    p-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:p-6
                "
            >

                <div className="flex items-start gap-3">

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
                        <TrendingUp className="h-5 w-5" />
                    </div>

                    <div>

                        <h3 className="font-semibold text-text">
                            Generation is trending upward
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-text-secondary">
                            Your renewable generation has increased by 8.7%
                            compared with the previous month.
                        </p>

                    </div>

                </div>

                <button
                    type="button"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        self-start
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-primary
                        transition-all
                        duration-200
                        hover:bg-primary/10
                        sm:self-auto
                    "
                >
                    View insights
                    <ArrowUpRight className="h-4 w-4" />
                </button>

            </div>

        </div>
    );
}