/**
 * ============================================================================
 * File        : Battery.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Battery and energy-storage monitoring page for the UrjaSathi dashboard.
 *
 * Responsibilities:
 * - Display current battery state of charge
 * - Display battery health
 * - Display charging / discharging status
 * - Show battery capacity and backup estimate
 * - Show battery usage trends
 * - Provide battery performance insights
 * ============================================================================
 */

import {
    Activity,
    ArrowDown,
    ArrowUp,
    BatteryCharging,
    BatteryFull,
    Clock3,
    Gauge,
    Leaf,
    ShieldCheck,
    Zap,
} from "lucide-react";


export default function Battery() {

    /**
     * ========================================================================
     * DEMO BATTERY DATA
     * ========================================================================
     *
     * Temporary values for UI development.
     *
     * These will later come from the battery / energy-management backend.
     */

    const batteryLevel = 78;

    const batteryMetrics = [
        {
            title: "Battery Health",
            value: "94",
            unit: "%",
            description: "Overall battery condition",
            icon: ShieldCheck,
        },
        {
            title: "Battery Capacity",
            value: "10",
            unit: "kWh",
            description: "Usable storage capacity",
            icon: BatteryFull,
        },
        {
            title: "Today's Throughput",
            value: "6.8",
            unit: "kWh",
            description: "Charge + discharge",
            icon: Activity,
        },
        {
            title: "Estimated Backup",
            value: "4.6",
            unit: "hrs",
            description: "At current load",
            icon: Clock3,
        },
    ];


    /**
     * ========================================================================
     * BATTERY ACTIVITY DATA
     * ========================================================================
     *
     * Simplified hourly battery activity.
     *
     * Positive values represent charging.
     * Negative values represent discharging.
     */

    const batteryActivity = [
        {
            time: "06 AM",
            value: 1.2,
            type: "charge",
        },
        {
            time: "08 AM",
            value: 1.8,
            type: "charge",
        },
        {
            time: "10 AM",
            value: 2.4,
            type: "charge",
        },
        {
            time: "12 PM",
            value: 1.4,
            type: "charge",
        },
        {
            time: "02 PM",
            value: 0.8,
            type: "discharge",
        },
        {
            time: "04 PM",
            value: 1.1,
            type: "discharge",
        },
        {
            time: "06 PM",
            value: 2.1,
            type: "discharge",
        },
        {
            time: "08 PM",
            value: 1.7,
            type: "discharge",
        },
    ];


    const maxActivity = Math.max(
        ...batteryActivity.map((item) => item.value)
    );


    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">

            {/* =================================================================
                PAGE HEADER
               ================================================================= */}

            <section>

                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                font-medium
                                text-primary
                            "
                        >
                            Energy Storage
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
                            Battery & Storage
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
                            Monitor battery charge, health, storage
                            performance, and backup availability.
                        </p>

                    </div>


                    {/* Current status */}

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

                        <span className="h-2 w-2 rounded-full bg-emerald-500" />

                        Battery operating normally

                    </div>

                </div>

            </section>


            {/* =================================================================
                MAIN BATTERY STATUS
               ================================================================= */}

            <section
                className="
                    grid
                    gap-6
                    lg:grid-cols-[1.15fr_1fr]
                "
            >

                {/* =============================================================
                    BATTERY LEVEL
                   ============================================================= */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-6
                        shadow-sm
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-text-secondary
                                "
                            >
                                Current Battery Level
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-text-muted
                                "
                            >
                                State of charge
                            </p>

                        </div>


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
                            <BatteryCharging className="h-5 w-5" />
                        </div>

                    </div>


                    {/* Battery percentage */}

                    <div
                        className="
                            mt-8
                            flex
                            flex-col
                            items-center
                        "
                    >

                        <div className="relative">

                            {/* Battery outline */}

                            <div
                                className="
                                    relative
                                    flex
                                    h-44
                                    w-44
                                    items-end
                                    justify-center
                                    overflow-hidden
                                    rounded-[2rem]
                                    border-4
                                    border-border-strong
                                    bg-app-bg
                                    p-3
                                "
                            >

                                {/* Battery fill */}

                                <div
                                    className="
                                        absolute
                                        inset-x-3
                                        bottom-3
                                        rounded-[1.25rem]
                                        bg-primary/15
                                        transition-all
                                        duration-1000
                                    "
                                    style={{
                                        height: `${batteryLevel - 4}%`,
                                    }}
                                />

                                {/* Inner battery indicator */}

                                <div
                                    className="
                                        relative
                                        z-10
                                        flex
                                        h-full
                                        w-full
                                        flex-col
                                        items-center
                                        justify-center
                                    "
                                >

                                    <BatteryFull
                                        className="
                                            h-10
                                            w-10
                                            text-primary
                                        "
                                    />

                                    <span
                                        className="
                                            mt-3
                                            text-4xl
                                            font-bold
                                            tracking-tight
                                            text-text
                                        "
                                    >
                                        {batteryLevel}%
                                    </span>

                                    <span
                                        className="
                                            mt-1
                                            text-xs
                                            font-medium
                                            text-text-muted
                                        "
                                    >
                                        State of Charge
                                    </span>

                                </div>

                            </div>


                            {/* Battery terminal */}

                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-0
                                    h-2
                                    w-10
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    bg-border-strong
                                "
                            />

                        </div>


                        <div
                            className="
                                mt-6
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-emerald-500
                            "
                        >

                            <span className="h-2 w-2 rounded-full bg-emerald-500" />

                            Healthy charge level

                        </div>

                    </div>

                </div>


                {/* =============================================================
                    BATTERY PERFORMANCE
                   ============================================================= */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-6
                        shadow-sm
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
                            Battery Performance
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-text-secondary
                            "
                        >
                            Current storage system performance
                        </p>

                    </div>


                    <div className="mt-7 space-y-6">

                        {/* Battery health */}

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <ShieldCheck
                                        className="
                                            h-4
                                            w-4
                                            text-primary
                                        "
                                    />

                                    <span
                                        className="
                                            text-sm
                                            text-text-secondary
                                        "
                                    >
                                        Battery Health
                                    </span>

                                </div>

                                <span
                                    className="
                                        text-sm
                                        font-semibold
                                        text-text
                                    "
                                >
                                    94%
                                </span>

                            </div>


                            <div
                                className="
                                    mt-3
                                    h-2
                                    overflow-hidden
                                    rounded-full
                                    bg-border
                                "
                            >

                                <div
                                    className="
                                        h-full
                                        rounded-full
                                        bg-primary
                                        transition-all
                                        duration-700
                                    "
                                    style={{
                                        width: "94%",
                                    }}
                                />

                            </div>

                        </div>


                        {/* Available capacity */}

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <BatteryFull
                                        className="
                                            h-4
                                            w-4
                                            text-primary
                                        "
                                    />

                                    <span
                                        className="
                                            text-sm
                                            text-text-secondary
                                        "
                                    >
                                        Available Capacity
                                    </span>

                                </div>

                                <span
                                    className="
                                        text-sm
                                        font-semibold
                                        text-text
                                    "
                                >
                                    7.8 / 10 kWh
                                </span>

                            </div>


                            <div
                                className="
                                    mt-3
                                    h-2
                                    overflow-hidden
                                    rounded-full
                                    bg-border
                                "
                            >

                                <div
                                    className="
                                        h-full
                                        rounded-full
                                        bg-primary
                                    "
                                    style={{
                                        width: "78%",
                                    }}
                                />

                            </div>

                        </div>


                        {/* Current power */}

                        <div
                            className="
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
                                    items-center
                                    justify-between
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-primary/10
                                            text-primary
                                        "
                                    >
                                        <ArrowDown className="h-4 w-4" />
                                    </div>

                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                text-text-muted
                                            "
                                        >
                                            Current Activity
                                        </p>

                                        <p
                                            className="
                                                mt-0.5
                                                text-sm
                                                font-semibold
                                                text-text
                                            "
                                        >
                                            Discharging
                                        </p>

                                    </div>

                                </div>


                                <span
                                    className="
                                        text-lg
                                        font-bold
                                        text-text
                                    "
                                >
                                    1.7 kW
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================================
                METRICS
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

                    {batteryMetrics.map(
                        ({
                            title,
                            value,
                            unit,
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
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-primary/30
                                    hover:shadow-md
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

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

                                </div>


                                <p
                                    className="
                                        mt-5
                                        text-sm
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
                                        gap-1
                                    "
                                >

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


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-text-muted
                                    "
                                >
                                    {description}
                                </p>

                            </div>

                        )
                    )}

                </div>

            </section>


            {/* =================================================================
                BATTERY ACTIVITY
               ================================================================= */}

            <section
                className="
                    grid
                    gap-6
                    xl:grid-cols-[1.7fr_1fr]
                "
            >

                {/* =============================================================
                    CHARGE / DISCHARGE CHART
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
                                Battery Activity
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-text-secondary
                                "
                            >
                                Charging and discharging activity today
                            </p>

                        </div>


                        <div className="flex items-center gap-4 text-xs">

                            <div className="flex items-center gap-2">

                                <span
                                    className="
                                        h-2.5
                                        w-2.5
                                        rounded-full
                                        bg-primary
                                    "
                                />

                                Charging

                            </div>

                            <div className="flex items-center gap-2">

                                <span
                                    className="
                                        h-2.5
                                        w-2.5
                                        rounded-full
                                        bg-emerald-500
                                    "
                                />

                                Discharging

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
                            "
                        >

                            {batteryActivity.map((item) => {

                                const height =
                                    (item.value / maxActivity) * 100;

                                const isCharging =
                                    item.type === "charge";

                                return (
                                    <div
                                        key={item.time}
                                        className="
                                            flex
                                            h-full
                                            flex-1
                                            items-end
                                            justify-center
                                        "
                                    >

                                        <div
                                            className={`
                                                w-5
                                                rounded-t-md
                                                transition-all
                                                duration-500
                                                sm:w-7
                                                ${
                                                    isCharging
                                                        ? "bg-primary/75 hover:bg-primary"
                                                        : "bg-emerald-500/70 hover:bg-emerald-500"
                                                }
                                            `}
                                            style={{
                                                height: `${height}%`,
                                            }}
                                            title={`${item.value} kW`}
                                        />

                                    </div>
                                );

                            })}

                        </div>


                        <div className="mt-3 flex justify-between">

                            {batteryActivity.map((item) => (

                                <span
                                    key={item.time}
                                    className="
                                        flex-1
                                        text-center
                                        text-[10px]
                                        text-text-muted
                                    "
                                >
                                    {item.time}
                                </span>

                            ))}

                        </div>

                    </div>

                </div>


                {/* =============================================================
                    BATTERY MODE
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
                            Storage Mode
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-text-secondary
                            "
                        >
                            How the battery is currently being used
                        </p>

                    </div>


                    <div className="mt-6 space-y-3">

                        {/* Solar charging */}

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
                                <Leaf className="h-5 w-5" />
                            </div>

                            <div className="min-w-0 flex-1">

                                <p className="text-sm font-medium text-text">
                                    Solar Charging
                                </p>

                                <p className="mt-1 text-xs text-text-muted">
                                    Battery charges from renewable energy
                                </p>

                            </div>

                            <ArrowUp
                                className="
                                    h-4
                                    w-4
                                    shrink-0
                                    text-primary
                                "
                            />

                        </div>


                        {/* Peak load support */}

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

                            <div className="min-w-0 flex-1">

                                <p className="text-sm font-medium text-text">
                                    Peak Load Support
                                </p>

                                <p className="mt-1 text-xs text-text-muted">
                                    Battery helps reduce grid demand
                                </p>

                            </div>

                            <ArrowDown
                                className="
                                    h-4
                                    w-4
                                    shrink-0
                                    text-emerald-500
                                "
                            />

                        </div>


                        {/* Efficiency */}

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
                                <Gauge className="h-5 w-5" />
                            </div>

                            <div className="min-w-0 flex-1">

                                <p className="text-sm font-medium text-text">
                                    Storage Efficiency
                                </p>

                                <p className="mt-1 text-xs text-text-muted">
                                    Estimated round-trip efficiency
                                </p>

                            </div>

                            <span
                                className="
                                    text-sm
                                    font-semibold
                                    text-text
                                "
                            >
                                91%
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================================
                BATTERY INSIGHT
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
                            <BatteryCharging className="h-5 w-5" />
                        </div>

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-text
                                "
                            >
                                Battery is performing efficiently
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    leading-6
                                    text-text-secondary
                                "
                            >
                                Your battery is currently at {batteryLevel}%
                                charge with an estimated health of 94%.
                                Using stored energy during higher-demand
                                periods can help reduce grid dependency and
                                electricity costs.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}