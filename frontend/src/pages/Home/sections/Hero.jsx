import {
    ArrowDown,
    ArrowRight,
    Check,
    Leaf,
    Zap,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="relative isolate min-h-[calc(100svh-5.5rem)] overflow-hidden bg-app-bg">
            {/* =========================================================
                BACKGROUND ATMOSPHERE
               ========================================================= */}

            <div className="pointer-events-none absolute inset-0 -z-10">
                {/* Primary glow */}
                <div
                    className="
                        absolute
                        -left-40
                        top-10
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-primary/10
                        blur-[120px]
                    "
                />

                {/* Secondary glow */}
                <div
                    className="
                        absolute
                        -right-40
                        top-24
                        h-[560px]
                        w-[560px]
                        rounded-full
                        bg-secondary/10
                        blur-[130px]
                    "
                />

                {/* Bottom energy glow */}
                <div
                    className="
                        absolute
                        bottom-[-250px]
                        left-1/2
                        h-[500px]
                        w-[900px]
                        -translate-x-1/2
                        rounded-full
                        bg-primary/5
                        blur-[120px]
                    "
                />

                {/* Subtle grid */}
                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.035]
                        [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
                        [background-size:72px_72px]
                    "
                />
            </div>


            {/* =========================================================
                HERO CONTENT
               ========================================================= */}

            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-[calc(100svh-5.5rem)]
                    max-w-7xl
                    flex-col
                    items-center
                    justify-center
                    px-6
                    pb-20
                    pt-20
                    text-center
                    sm:px-8
                    lg:px-10
                    lg:pb-24
                "
            >

                {/* =====================================================
                    EYEBROW
                   ===================================================== */}

                <div
                    className="
                        inline-flex
                        items-center
                        gap-2.5
                        rounded-pill
                        border
                        border-primary/20
                        bg-primary/5
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-primary
                        backdrop-blur-sm
                        sm:text-sm
                    "
                >
                    <span className="relative flex h-2 w-2">
                        <span
                            className="
                                absolute
                                inline-flex
                                h-full
                                w-full
                                animate-ping
                                rounded-full
                                bg-secondary
                                opacity-60
                            "
                        />

                        <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                    </span>

                    Intelligent Energy Management
                </div>


                {/* =====================================================
                    MAIN HEADING
                   ===================================================== */}

                <h1
                    className="
                        mt-8
                        max-w-5xl
                        text-5xl
                        font-semibold
                        leading-[0.98]
                        tracking-[-0.045em]
                        text-text
                        sm:text-6xl
                        md:text-7xl
                        lg:text-[5.75rem]
                        xl:text-[6.5rem]
                    "
                >
                    Make every unit
                    <br />

                    of energy{" "}

                    <span className="text-primary">
                        count.
                    </span>
                </h1>


                {/* =====================================================
                    DESCRIPTION
                   ===================================================== */}

                <p
                    className="
                        mx-auto
                        mt-8
                        max-w-2xl
                        text-base
                        leading-7
                        text-text-secondary
                        sm:text-lg
                        sm:leading-8
                        lg:text-xl
                    "
                >
                    UrjaSathi brings your energy consumption, generation,
                    and efficiency into one intelligent platform —
                    helping homes and businesses understand where their
                    energy goes and how to use it better.
                </p>


                {/* =====================================================
                    CTA
                   ===================================================== */}

                <div
                    className="
                        mt-9
                        flex
                        flex-wrap
                        justify-center
                        gap-4
                    "
                >
                    <Link
                        to="/login"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2.5
                            rounded-pill
                            bg-primary
                            px-7
                            py-3.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-card
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-primary-dark
                            hover:shadow-hover
                            sm:px-8
                            sm:py-4
                            sm:text-base
                        "
                    >
                        Get started

                        <ArrowRight
                            className="
                                h-4
                                w-4
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>

                    <a
                        href="#how-it-works"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-pill
                            border
                            border-border-strong
                            bg-surface/70
                            px-7
                            py-3.5
                            text-sm
                            font-semibold
                            text-text
                            backdrop-blur-sm
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-primary/40
                            hover:bg-surface
                            hover:text-primary
                            sm:px-8
                            sm:py-4
                            sm:text-base
                        "
                    >
                        How it Works
                    </a>
                </div>


                {/* =====================================================
                    VALUE POINTS
                   ===================================================== */}

                <div
                    className="
                        mt-9
                        flex
                        flex-wrap
                        justify-center
                        gap-x-7
                        gap-y-3
                        text-xs
                        text-text-muted
                        sm:text-sm
                    "
                >
                    <ValuePoint>
                        Real-time insights
                    </ValuePoint>

                    <ValuePoint>
                        Smarter consumption
                    </ValuePoint>

                    <ValuePoint>
                        Renewable-ready
                    </ValuePoint>
                </div>


                {/* =====================================================
                    HERO PRODUCT VISUAL
                   ===================================================== */}

                <div className="relative mt-16 w-full max-w-5xl sm:mt-20">

                    {/* Glow */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            h-72
                            w-3/4
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            bg-secondary/10
                            blur-[100px]
                        "
                    />

                    {/* Dashboard */}
                    <EnergyDashboard />

                    {/* Floating renewable card */}
                    <div
                        className="
                            absolute
                            -bottom-5
                            -left-2
                            hidden
                            rounded-xl
                            border
                            border-border
                            bg-surface
                            p-3
                            shadow-card
                            sm:block
                            lg:-left-8
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    grid
                                    h-10
                                    w-10
                                    place-items-center
                                    rounded-lg
                                    bg-secondary/10
                                    text-secondary
                                "
                            >
                                <Leaf className="h-5 w-5" />
                            </div>

                            <div className="text-left">
                                <p className="text-[11px] text-text-muted">
                                    Renewable usage
                                </p>

                                <p className="text-sm font-semibold text-text">
                                    47.3%
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Floating optimization card */}
                    <div
                        className="
                            absolute
                            -right-2
                            -top-5
                            hidden
                            rounded-xl
                            border
                            border-border
                            bg-surface
                            p-3
                            shadow-card
                            sm:block
                            lg:-right-8
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    grid
                                    h-10
                                    w-10
                                    place-items-center
                                    rounded-lg
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <Zap className="h-5 w-5" />
                            </div>

                            <div className="text-left">
                                <p className="text-[11px] text-text-muted">
                                    Efficiency
                                </p>

                                <p className="text-sm font-semibold text-text">
                                    +18.6%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* =====================================================
                    SCROLL INDICATOR
                   ===================================================== */}

                <a
                    href="#what-we-do"
                    className="
                        mt-14
                        inline-flex
                        flex-col
                        items-center
                        gap-2
                        text-xs
                        tracking-[0.16em]
                        text-text-muted
                        transition-colors
                        hover:text-primary
                    "
                >
                    <span>EXPLORE</span>

                    <ArrowDown className="h-4 w-4 animate-bounce" />
                </a>
            </div>
        </section>
    );
}


/* =========================================================
   VALUE POINT
   ========================================================= */

function ValuePoint({ children }) {
    return (
        <div className="flex items-center gap-2">
            <span
                className="
                    grid
                    h-5
                    w-5
                    place-items-center
                    rounded-full
                    bg-secondary/10
                    text-secondary
                "
            >
                <Check className="h-3 w-3" />
            </span>

            <span>{children}</span>
        </div>
    );
}


/* =========================================================
   ENERGY DASHBOARD
   ========================================================= */

function EnergyDashboard() {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-surface
                text-left
                shadow-card
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-hover
                sm:rounded-3xl
            "
        >
            {/* Top bar */}
            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-border
                    px-5
                    py-4
                    sm:px-7
                "
            >
                <div className="flex items-center gap-2.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-secondary" />

                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                        UrjaSathi Energy Intelligence
                    </span>
                </div>

                <span
                    className="
                        rounded-pill
                        bg-success/10
                        px-3
                        py-1
                        text-[10px]
                        font-semibold
                        text-success
                        sm:text-xs
                    "
                >
                    SYSTEM OPTIMIZED
                </span>
            </div>


            {/* Dashboard */}
            <div className="grid gap-0 lg:grid-cols-[0.7fr_1.3fr]">

                {/* Metrics */}
                <div
                    className="
                        border-b
                        border-border
                        p-5
                        sm:p-7
                        lg:border-b-0
                        lg:border-r
                    "
                >
                    <p className="text-xs text-text-muted">
                        Today's consumption
                    </p>

                    <div className="mt-2 flex items-baseline gap-2">
                        <span
                            className="
                                text-4xl
                                font-semibold
                                tracking-tight
                                text-text
                                sm:text-5xl
                            "
                        >
                            18.4
                        </span>

                        <span className="text-xs text-text-muted sm:text-sm">
                            kWh
                        </span>
                    </div>

                    <div className="mt-7 space-y-5">
                        <DashboardMetric
                            label="Solar generation"
                            value="8.7 kWh"
                            percentage="47%"
                            bar="bg-solar"
                        />

                        <DashboardMetric
                            label="Grid usage"
                            value="5.2 kWh"
                            percentage="28%"
                            bar="bg-primary"
                        />

                        <DashboardMetric
                            label="Energy saved"
                            value="12%"
                            percentage="12%"
                            bar="bg-secondary"
                        />
                    </div>
                </div>


                {/* Chart */}
                <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-text-muted">
                                Energy flow
                            </p>

                            <p className="mt-1 text-lg font-semibold text-text">
                                Today
                            </p>
                        </div>

                        <span className="text-xs font-medium text-secondary">
                            +8.4%
                        </span>
                    </div>

                    <div className="mt-5">
                        <EnergyChart />
                    </div>

                    {/* Time labels */}
                    <div
                        className="
                            mt-3
                            flex
                            justify-between
                            text-[10px]
                            text-text-muted
                        "
                    >
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>24:00</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


/* =========================================================
   DASHBOARD METRIC
   ========================================================= */

function DashboardMetric({
    label,
    value,
    percentage,
    bar,
}) {
    return (
        <div>
            <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-text-secondary">
                    {label}
                </span>

                <span className="text-xs font-semibold text-text">
                    {value}
                </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-soft">
                <div
                    className={`h-full rounded-full ${bar}`}
                    style={{ width: percentage }}
                />
            </div>
        </div>
    );
}


/* =========================================================
   ENERGY CHART
   ========================================================= */

function EnergyChart() {
    return (
        <div className="relative h-48 w-full overflow-hidden">
            {/* Grid */}
            <div className="absolute inset-0 flex flex-col justify-between">
                <span className="h-px w-full bg-border" />
                <span className="h-px w-full bg-border" />
                <span className="h-px w-full bg-border" />
                <span className="h-px w-full bg-border" />
            </div>

            <svg
                viewBox="0 0 800 220"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
            >
                <defs>
                    <linearGradient
                        id="urjasathiEnergyFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="rgb(1 172 159)"
                            stopOpacity="0.28"
                        />

                        <stop
                            offset="100%"
                            stopColor="rgb(1 172 159)"
                            stopOpacity="0"
                        />
                    </linearGradient>
                </defs>

                <path
                    d="
                        M0 165
                        C55 155 75 125 130 140
                        C185 155 205 180 260 150
                        C315 120 330 65 385 82
                        C440 99 455 145 510 125
                        C565 105 585 58 640 70
                        C695 82 720 115 755 92
                        C775 79 790 55 800 35
                        L800 220
                        L0 220
                        Z
                    "
                    fill="url(#urjasathiEnergyFill)"
                />

                <path
                    d="
                        M0 165
                        C55 155 75 125 130 140
                        C185 155 205 180 260 150
                        C315 120 330 65 385 82
                        C440 99 455 145 510 125
                        C565 105 585 58 640 70
                        C695 82 720 115 755 92
                        C775 79 790 55 800 35
                    "
                    fill="none"
                    stroke="rgb(1 172 159)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* End point */}
                <circle
                    cx="800"
                    cy="35"
                    r="6"
                    fill="rgb(1 172 159)"
                />

                <circle
                    cx="800"
                    cy="35"
                    r="11"
                    fill="rgb(1 172 159)"
                    fillOpacity="0.12"
                />
            </svg>
        </div>
    );
}