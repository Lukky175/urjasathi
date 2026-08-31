/**
 * ============================================================================
 * File        : Cost.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Energy cost and savings page for the UrjaSathi dashboard.
 *
 * Responsibilities:
 * - Display electricity cost metrics
 * - Show estimated bill and energy expenditure
 * - Track renewable-energy savings
 * - Track battery-related savings
 * - Visualize cost trends
 * - Highlight opportunities for further savings
 *
 * Future:
 * - Connect to actual electricity tariff data
 * - Support DISCOM-specific tariff slabs
 * - Add fixed charges / taxes / subsidies
 * - Calculate real-time savings
 * - Integrate AI-powered cost optimization
 * ============================================================================
 */

import {
    ArrowDownRight,
    ArrowUpRight,
    BatteryCharging,
    CalendarDays,
    IndianRupee,
    Lightbulb,
    PiggyBank,
    ReceiptIndianRupee,
    SunMedium,
    TrendingDown,
    Zap,
} from "lucide-react";


export default function Cost() {

    /* =========================================================================
       MOCK DATA
       ========================================================================= */

    const monthlyCostData = [
        {
            month: "Jan",
            cost: 2480,
        },
        {
            month: "Feb",
            cost: 2310,
        },
        {
            month: "Mar",
            cost: 2180,
        },
        {
            month: "Apr",
            cost: 1960,
        },
        {
            month: "May",
            cost: 1820,
        },
        {
            month: "Jun",
            cost: 1640,
        },
        {
            month: "Jul",
            cost: 1510,
        },
    ];


    const costBreakdown = [
        {
            label: "Grid Electricity",
            value: 1280,
            percentage: 57,
            icon: Zap,
        },
        {
            label: "Solar Contribution",
            value: 620,
            percentage: 28,
            icon: SunMedium,
        },
        {
            label: "Battery Optimization",
            value: 340,
            percentage: 15,
            icon: BatteryCharging,
        },
    ];


    /* =========================================================================
       DERIVED VALUES
       ========================================================================= */

    const highestCost = Math.max(
        ...monthlyCostData.map((item) => item.cost)
    );

    const currentMonth =
        monthlyCostData[monthlyCostData.length - 1];

    const previousMonth =
        monthlyCostData[monthlyCostData.length - 2];

    const monthlyReduction =
        previousMonth.cost - currentMonth.cost;

    const monthlyReductionPercentage =
        (monthlyReduction / previousMonth.cost) * 100;


    /* =========================================================================
       STAT CARDS
       ========================================================================= */

    const stats = [
        {
            label: "Estimated Monthly Bill",
            value: "₹1,510",
            description: "Current month's estimated cost",
            icon: ReceiptIndianRupee,
            trend: "down",
            trendText: `${monthlyReductionPercentage.toFixed(0)}% lower`,
            positive: true,
        },
        {
            label: "Monthly Savings",
            value: "₹960",
            description: "Compared with conventional usage",
            icon: PiggyBank,
            trend: "up",
            trendText: "18% increase",
            positive: true,
        },
        {
            label: "Solar Savings",
            value: "₹620",
            description: "Estimated savings from solar",
            icon: SunMedium,
            trend: "up",
            trendText: "This month",
            positive: true,
        },
        {
            label: "Battery Savings",
            value: "₹340",
            description: "Peak-hour cost avoided",
            icon: BatteryCharging,
            trend: "up",
            trendText: "This month",
            positive: true,
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

                        <IndianRupee className="h-4 w-4 text-primary" />

                        <span>
                            Financial Impact
                        </span>

                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                        Cost & Savings
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                        Understand your electricity costs and see how
                        solar generation, battery storage, and smarter
                        energy usage are reducing your expenses.
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

                    This Month
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


                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                        rounded-full
                                        bg-emerald-500/10
                                        px-2
                                        py-1
                                        text-xs
                                        font-medium
                                        text-emerald-600
                                    "
                                >
                                    <ArrowDownRight className="h-3.5 w-3.5" />

                                    {stat.trendText}
                                </div>

                            </div>


                            <p className="mt-5 text-sm font-medium text-text-secondary">
                                {stat.label}
                            </p>


                            <p className="mt-1 text-2xl font-bold text-text">
                                {stat.value}
                            </p>


                            <p className="mt-2 text-xs text-text-muted">
                                {stat.description}
                            </p>

                        </div>
                    );

                })}

            </div>


            {/* =================================================================
                MAIN COST OVERVIEW
               ================================================================= */}

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">

                {/* =============================================================
                    MONTHLY COST TREND
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
                                Electricity Cost Trend
                            </h2>

                            <p className="mt-1 text-sm text-text-secondary">
                                Estimated monthly electricity expenditure
                            </p>

                        </div>


                        <div className="text-right">

                            <p className="text-2xl font-bold text-text">
                                ₹{currentMonth.cost.toLocaleString("en-IN")}
                            </p>

                            <div className="mt-1 flex items-center justify-end gap-1 text-xs font-medium text-emerald-600">

                                <TrendingDown className="h-3.5 w-3.5" />

                                {monthlyReductionPercentage.toFixed(0)}%
                                vs last month

                            </div>

                        </div>

                    </div>


                    {/* Chart */}

                    <div className="mt-8 flex h-64 items-end gap-2 sm:gap-4">

                        {monthlyCostData.map((item) => {

                            const height =
                                (item.cost / highestCost) * 100;

                            const isCurrent =
                                item.month === currentMonth.month;

                            return (
                                <div
                                    key={item.month}
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
                                            title={`₹${item.cost.toLocaleString("en-IN")}`}
                                            className={`
                                                group
                                                relative
                                                w-full
                                                rounded-t-lg
                                                transition-all
                                                duration-500
                                                hover:opacity-80

                                                ${
                                                    isCurrent
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
                                                    -top-9
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
                                                ₹
                                                {item.cost.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </div>

                                        </div>

                                    </div>


                                    <span className="text-xs text-text-muted">
                                        {item.month}
                                    </span>

                                </div>
                            );

                        })}

                    </div>

                </section>


                {/* =============================================================
                    SAVINGS SUMMARY
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
                            Savings Summary
                        </h2>

                        <p className="mt-1 text-sm text-text-secondary">
                            How UrjaSathi is reducing your energy costs
                        </p>

                    </div>


                    <div className="mt-6">

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                bg-primary/5
                                p-5
                            "
                        >

                            <div>

                                <p className="text-sm text-text-secondary">
                                    Total savings this month
                                </p>

                                <p className="mt-1 text-3xl font-bold text-text">
                                    ₹960
                                </p>

                            </div>


                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <PiggyBank className="h-6 w-6" />
                            </div>

                        </div>


                        {/* Savings progress */}

                        <div className="mt-6">

                            <div className="flex items-center justify-between">

                                <span className="text-sm text-text-secondary">
                                    Cost reduction
                                </span>

                                <span className="text-sm font-semibold text-text">
                                    39%
                                </span>

                            </div>


                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">

                                <div
                                    className="
                                        h-full
                                        w-[39%]
                                        rounded-full
                                        bg-primary
                                        transition-all
                                        duration-700
                                    "
                                />

                            </div>

                        </div>


                        {/* Comparison */}

                        <div
                            className="
                                mt-6
                                flex
                                items-center
                                justify-between
                                border-t
                                border-border
                                pt-5
                            "
                        >

                            <div>

                                <p className="text-xs text-text-muted">
                                    Without optimization
                                </p>

                                <p className="mt-1 font-semibold text-text">
                                    ₹2,470
                                </p>

                            </div>


                            <ArrowDownRight
                                className="
                                    h-5
                                    w-5
                                    text-emerald-600
                                "
                            />


                            <div className="text-right">

                                <p className="text-xs text-text-muted">
                                    With UrjaSathi
                                </p>

                                <p className="mt-1 font-semibold text-primary">
                                    ₹1,510
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            </div>


            {/* =================================================================
                COST BREAKDOWN
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
                        Energy Cost Breakdown
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                        Estimated contribution of different energy sources
                    </p>

                </div>


                <div className="mt-6 space-y-5">

                    {costBreakdown.map((item) => {

                        const Icon = item.icon;

                        return (
                            <div key={item.label}>

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-primary/10
                                            text-primary
                                        "
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>


                                    <div className="min-w-0 flex-1">

                                        <div className="flex items-center justify-between gap-3">

                                            <p className="truncate text-sm font-medium text-text">
                                                {item.label}
                                            </p>

                                            <p className="shrink-0 text-sm font-semibold text-text">
                                                ₹
                                                {item.value.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </p>

                                        </div>


                                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">

                                            <div
                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-primary
                                                    transition-all
                                                    duration-700
                                                "
                                                style={{
                                                    width: `${item.percentage}%`,
                                                }}
                                            />

                                        </div>

                                    </div>


                                    <span className="hidden w-10 text-right text-xs text-text-muted sm:block">
                                        {item.percentage}%
                                    </span>

                                </div>

                            </div>
                        );

                    })}

                </div>

            </section>


            {/* =================================================================
                SAVINGS SOURCES
               ================================================================= */}

            <div className="mt-6 grid gap-6 md:grid-cols-2">

                {/* =============================================================
                    SOLAR SAVINGS
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

                    <div className="flex items-start gap-4">

                        <div
                            className="
                                flex
                                h-11
                                w-11
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


                        <div>

                            <h3 className="font-semibold text-text">
                                Solar Generation Savings
                            </h3>

                            <p className="mt-1 text-sm leading-5 text-text-secondary">
                                Solar energy reduced your dependence
                                on grid electricity this month.
                            </p>

                        </div>

                    </div>


                    <div className="mt-6 flex items-end justify-between">

                        <div>

                            <p className="text-xs text-text-muted">
                                Estimated savings
                            </p>

                            <p className="mt-1 text-2xl font-bold text-text">
                                ₹620
                            </p>

                        </div>


                        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">

                            <ArrowDownRight className="h-4 w-4" />

                            28% of total savings

                        </div>

                    </div>

                </section>


                {/* =============================================================
                    BATTERY SAVINGS
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

                    <div className="flex items-start gap-4">

                        <div
                            className="
                                flex
                                h-11
                                w-11
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


                        <div>

                            <h3 className="font-semibold text-text">
                                Battery Optimization Savings
                            </h3>

                            <p className="mt-1 text-sm leading-5 text-text-secondary">
                                Stored energy was used during expensive
                                peak-demand periods.
                            </p>

                        </div>

                    </div>


                    <div className="mt-6 flex items-end justify-between">

                        <div>

                            <p className="text-xs text-text-muted">
                                Estimated savings
                            </p>

                            <p className="mt-1 text-2xl font-bold text-text">
                                ₹340
                            </p>

                        </div>


                        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">

                            <ArrowDownRight className="h-4 w-4" />

                            Peak cost avoided

                        </div>

                    </div>

                </section>

            </div>


            {/* =================================================================
                COST OPTIMIZATION INSIGHT
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

                <div className="flex items-start gap-4">

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-primary/10
                            text-primary
                        "
                    >
                        <Lightbulb className="h-5 w-5" />
                    </div>


                    <div className="min-w-0">

                        <h2 className="text-lg font-semibold text-text">
                            Cost Optimization Opportunity
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-text-secondary">
                            Your highest electricity demand occurs during
                            evening peak hours. Increasing battery usage
                            during this period and shifting flexible loads
                            to lower-cost hours could further reduce your
                            monthly electricity bill.
                        </p>


                        <div className="mt-5 grid gap-3 sm:grid-cols-3">

                            <div className="rounded-xl bg-primary/5 p-4">

                                <p className="text-xs text-text-muted">
                                    Current peak usage
                                </p>

                                <p className="mt-1 font-semibold text-text">
                                    8 PM – 10 PM
                                </p>

                            </div>


                            <div className="rounded-xl bg-primary/5 p-4">

                                <p className="text-xs text-text-muted">
                                    Potential additional savings
                                </p>

                                <p className="mt-1 font-semibold text-text">
                                    ₹180–₹250
                                </p>

                            </div>


                            <div className="rounded-xl bg-primary/5 p-4">

                                <p className="text-xs text-text-muted">
                                    Recommended action
                                </p>

                                <p className="mt-1 font-semibold text-text">
                                    Shift peak loads
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================================
                FOOTNOTE
               ================================================================= */}

            <p className="mt-6 text-center text-xs leading-5 text-text-muted">
                Cost figures shown above are estimates based on current
                energy usage and assumed tariff rates. Actual electricity
                bills may vary based on your electricity provider, tariff
                slab, taxes, fixed charges, and other applicable fees.
            </p>

        </div>
    );
}