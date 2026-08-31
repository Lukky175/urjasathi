/**
 * ============================================================================
 * File        : Dashboard.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Main dashboard for UrjaSathi.
 *
 * Provides a high-level view of:
 * - Current energy consumption
 * - Renewable generation
 * - Battery status
 * - Estimated cost
 * - Energy savings
 *
 * NOTE:
 * Current values are placeholders and will later be connected
 * to the UrjaSathi energy data pipeline.
 * ============================================================================
 */

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


export default function Dashboard() {

    /**
     * ================================================================
     * TEMPORARY DASHBOARD DATA
     * ================================================================
     *
     * Replace these values with API/model data later.
     */

    const metrics = [
        {
            label: "Current Consumption",
            value: "4.8 kW",
            description: "Live household load",
            icon: Zap,
            trend: "+6.2%",
            trendLabel: "vs. yesterday",
            trendUp: true,
        },
        {
            label: "Solar Generation",
            value: "3.2 kW",
            description: "Current renewable output",
            icon: SunMedium,
            trend: "+12.4%",
            trendLabel: "vs. yesterday",
            trendUp: true,
        },
        {
            label: "Battery Level",
            value: "78%",
            description: "Available stored energy",
            icon: BatteryCharging,
            trend: "Good",
            trendLabel: "battery health",
            trendUp: null,
        },
        {
            label: "Today's Savings",
            value: "₹184",
            description: "Estimated energy savings",
            icon: IndianRupee,
            trend: "+18.7%",
            trendLabel: "vs. yesterday",
            trendUp: true,
        },
    ];


    return (
        <div>

            {/* =============================================================
                PAGE HEADER
               ============================================================= */}

            <DashboardPageHeader
                title="Energy Dashboard"
                description="Monitor your energy consumption, renewable generation, storage, and savings."
            />


            {/* =============================================================
                KEY METRICS
               ============================================================= */}

            <section
                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {metrics.map((metric) => {

                    const Icon = metric.icon;

                    return (
                        <div
                            key={metric.label}
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

                            {/* =================================================
                                CARD HEADER
                               ================================================= */}

                            <div className="flex items-start justify-between">

                                <div>

                                    <p
                                        className="
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-wide
                                            text-text-muted
                                        "
                                    >
                                        {metric.label}
                                    </p>

                                    <p
                                        className="
                                            mt-3
                                            text-2xl
                                            font-bold
                                            tracking-tight
                                            text-text
                                        "
                                    >
                                        {metric.value}
                                    </p>

                                </div>


                                {/* Icon */}

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

                            </div>


                            {/* =================================================
                                DESCRIPTION
                               ================================================= */}

                            <p
                                className="
                                    mt-2
                                    text-xs
                                    text-text-secondary
                                "
                            >
                                {metric.description}
                            </p>


                            {/* =================================================
                                TREND
                               ================================================= */}

                            <div className="mt-4 flex items-center gap-2">

                                {metric.trendUp === true && (
                                    <ArrowUpRight
                                        className="
                                            h-4
                                            w-4
                                            text-primary
                                        "
                                    />
                                )}

                                {metric.trendUp === false && (
                                    <ArrowDownRight
                                        className="
                                            h-4
                                            w-4
                                            text-red-500
                                        "
                                    />
                                )}

                                <span
                                    className={`
                                        text-xs
                                        font-semibold
                                        ${
                                            metric.trendUp === true
                                                ? "text-primary"
                                                : metric.trendUp === false
                                                    ? "text-red-500"
                                                    : "text-primary"
                                        }
                                    `}
                                >
                                    {metric.trend}
                                </span>

                                <span
                                    className="
                                        text-xs
                                        text-text-muted
                                    "
                                >
                                    {metric.trendLabel}
                                </span>

                            </div>

                        </div>
                    );
                })}

            </section>


            {/* =============================================================
                ENERGY FLOW
               ============================================================= */}

            <section
                className="
                    mt-6
                    grid
                    gap-6
                    lg:grid-cols-[1.5fr_1fr]
                "
            >

                {/* =========================================================
                    ENERGY FLOW
                   ========================================================= */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        shadow-sm
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <h2
                                className="
                                    text-base
                                    font-semibold
                                    text-text
                                "
                            >
                                Energy Flow
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-text-secondary
                                "
                            >
                                Current energy movement across your system.
                            </p>

                        </div>

                        <Activity
                            className="
                                h-5
                                w-5
                                text-primary
                            "
                        />

                    </div>


                    {/* =====================================================
                        FLOW PLACEHOLDER
                       ===================================================== */}

                    <div
                        className="
                            mt-8
                            grid
                            grid-cols-3
                            items-center
                            gap-3
                            text-center
                        "
                    >

                        <div>

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <SunMedium className="h-6 w-6" />
                            </div>

                            <p className="mt-3 text-xs font-medium text-text">
                                Solar
                            </p>

                            <p className="mt-1 text-sm font-semibold text-text">
                                3.2 kW
                            </p>

                        </div>


                        <div
                            className="
                                text-2xl
                                font-semibold
                                text-primary
                            "
                        >
                            →
                        </div>


                        <div>

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <Zap className="h-6 w-6" />
                            </div>

                            <p className="mt-3 text-xs font-medium text-text">
                                Home Load
                            </p>

                            <p className="mt-1 text-sm font-semibold text-text">
                                4.8 kW
                            </p>

                        </div>

                    </div>

                </div>


                {/* =========================================================
                    SUSTAINABILITY
                   ========================================================= */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        shadow-sm
                    "
                >

                    <div className="flex items-center gap-3">

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
                            <Leaf className="h-5 w-5" />
                        </div>

                        <div>

                            <h2 className="text-base font-semibold text-text">
                                Renewable Impact
                            </h2>

                            <p className="text-xs text-text-secondary">
                                Today's clean-energy contribution
                            </p>

                        </div>

                    </div>


                    <div className="mt-8">

                        <p
                            className="
                                text-4xl
                                font-bold
                                tracking-tight
                                text-text
                            "
                        >
                            68%
                        </p>

                        <p className="mt-2 text-sm text-text-secondary">
                            of today's energy demand supplied by renewable sources.
                        </p>

                    </div>


                    <div
                        className="
                            mt-6
                            h-2
                            overflow-hidden
                            rounded-full
                            bg-primary/10
                        "
                    >
                        <div
                            className="
                                h-full
                                w-[68%]
                                rounded-full
                                bg-primary
                            "
                        />
                    </div>

                </div>

            </section>


            {/* =============================================================
                QUICK SUMMARY
               ============================================================= */}

            <section
                className="
                    mt-6
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    p-5
                    shadow-sm
                "
            >

                <div className="flex items-center gap-3">

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
                        <Activity className="h-5 w-5" />
                    </div>

                    <div>

                        <h2 className="text-base font-semibold text-text">
                            System Status
                        </h2>

                        <p className="text-xs text-text-secondary">
                            Your energy system is operating normally.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}