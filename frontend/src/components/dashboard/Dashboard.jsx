/**
 * ============================================================================
 * File        : Dashboard.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Main overview page for the authenticated UrjaSathi dashboard.
 * ============================================================================
 */

import {
    Activity,
    ArrowUpRight,
    BatteryCharging,
    Leaf,
    Zap,
} from "lucide-react";

export default function Dashboard() {

    const stats = [
        {
            title: "Today's Consumption",
            value: "24.8",
            unit: "kWh",
            change: "8.4%",
            description: "vs yesterday",
            icon: Zap,
        },
        {
            title: "Current Usage",
            value: "2.4",
            unit: "kW",
            change: "12.2%",
            description: "lower than average",
            icon: Activity,
        },
        {
            title: "Renewable Energy",
            value: "68",
            unit: "%",
            change: "5.7%",
            description: "this month",
            icon: Leaf,
        },
        {
            title: "Energy Saved",
            value: "142",
            unit: "kWh",
            change: "18.6%",
            description: "this month",
            icon: BatteryCharging,
        },
    ];

    return (
        <div className="mx-auto w-full max-w-[1600px]">

            {/* =====================================================
                PAGE HEADER
               ===================================================== */}

            <div className="mb-8">

                <p
                    className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-primary
                    "
                >
                    Overview
                </p>

                <div
                    className="
                        mt-2
                        flex
                        flex-col
                        justify-between
                        gap-4
                        sm:flex-row
                        sm:items-end
                    "
                >

                    <div>

                        <h2
                            className="
                                text-3xl
                                font-semibold
                                tracking-[-0.04em]
                                text-text
                                sm:text-4xl
                            "
                        >
                            Energy Overview
                        </h2>

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-text-secondary
                                sm:text-base
                            "
                        >
                            Monitor your energy consumption and
                            renewable generation at a glance.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-border
                            bg-surface
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-text-secondary
                            transition-all
                            hover:border-primary
                            hover:text-primary
                        "
                    >
                        Last 30 days

                        <ArrowUpRight className="h-4 w-4" />

                    </button>

                </div>

            </div>


            {/* =====================================================
                STAT CARDS
               ===================================================== */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {stats.map(
                    ({
                        title,
                        value,
                        unit,
                        change,
                        description,
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
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-primary/30
                                hover:shadow-lg
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                "
                            >

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
                                        transition-transform
                                        duration-300
                                        group-hover:scale-105
                                    "
                                >

                                    <Icon className="h-5 w-5" />

                                </div>


                                <span
                                    className="
                                        rounded-full
                                        bg-primary/10
                                        px-2.5
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-primary
                                    "
                                >
                                    {change}
                                </span>

                            </div>


                            <p
                                className="
                                    mt-5
                                    text-sm
                                    font-medium
                                    text-text-secondary
                                "
                            >
                                {title}
                            </p>


                            <div
                                className="
                                    mt-1
                                    flex
                                    items-baseline
                                    gap-1.5
                                "
                            >

                                <span
                                    className="
                                        text-3xl
                                        font-semibold
                                        tracking-tight
                                        text-text
                                    "
                                >
                                    {value}
                                </span>

                                <span
                                    className="
                                        text-sm
                                        font-medium
                                        text-text-secondary
                                    "
                                >
                                    {unit}
                                </span>

                            </div>


                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-text-secondary
                                "
                            >
                                {description}
                            </p>

                        </div>

                    )
                )}

            </div>


            {/* =====================================================
                MAIN DASHBOARD GRID
               ===================================================== */}

            <div
                className="
                    mt-6
                    grid
                    grid-cols-1
                    gap-6
                    xl:grid-cols-[1.6fr_1fr]
                "
            >

                {/* Energy Consumption Chart Placeholder */}

                <section
                    className="
                        min-h-[400px]
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        sm:p-6
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-4
                        "
                    >

                        <div>

                            <h3
                                className="
                                    text-lg
                                    font-semibold
                                    text-text
                                "
                            >
                                Energy Consumption
                            </h3>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-text-secondary
                                "
                            >
                                Your energy usage over time
                            </p>

                        </div>

                    </div>


                    <div
                        className="
                            mt-8
                            flex
                            h-[280px]
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dashed
                            border-border
                            bg-app-bg
                            text-sm
                            text-text-secondary
                        "
                    >
                        Energy consumption chart
                    </div>

                </section>


                {/* Renewable Energy */}

                <section
                    className="
                        min-h-[400px]
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        sm:p-6
                    "
                >

                    <h3
                        className="
                            text-lg
                            font-semibold
                            text-text
                        "
                    >
                        Renewable Energy
                    </h3>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-text-secondary
                        "
                    >
                        Renewable contribution
                    </p>


                    <div
                        className="
                            mt-8
                            flex
                            h-[280px]
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dashed
                            border-border
                            bg-app-bg
                            text-sm
                            text-text-secondary
                        "
                    >
                        Renewable energy chart
                    </div>

                </section>

            </div>

        </div>
    );
}