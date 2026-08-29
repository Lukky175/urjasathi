import {
    Activity,
    ArrowDown,
    ArrowRight,
    Check,
    Leaf,
    Sun,
    TrendingDown,
    Zap,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section
            className="
                relative
                isolate
                overflow-hidden
                bg-app-bg
                pt-16
                sm:pt-20
                lg:pt-24
            "
        >
            {/* =========================================================
                BACKGROUND ATMOSPHERE
               ========================================================= */}

            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

                {/* Left energy glow */}
                <div
                    className="
                        absolute
                        -left-64
                        top-0
                        h-[620px]
                        w-[620px]
                        rounded-full
                        bg-primary/10
                        blur-[150px]
                    "
                />

                {/* Right renewable glow */}
                <div
                    className="
                        absolute
                        -right-64
                        top-24
                        h-[620px]
                        w-[620px]
                        rounded-full
                        bg-secondary/10
                        blur-[150px]
                    "
                />

                {/* Dashboard glow */}
                <div
                    className="
                        absolute
                        left-1/2
                        top-[58%]
                        h-[520px]
                        w-[1000px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-primary/5
                        blur-[140px]
                    "
                />

                {/* Subtle grid */}
                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.025]
                        [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
                        [background-size:72px_72px]
                    "
                />

                {/* Bottom fade */}
                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-56
                        bg-gradient-to-t
                        from-app-bg
                        to-transparent
                    "
                />
            </div>


            {/* =========================================================
                CONTENT
               ========================================================= */}

            <div
                className="
                    relative
                    mx-auto
                    flex
                    max-w-7xl
                    flex-col
                    items-center
                    px-6
                    pb-14
                    text-center
                    sm:px-8
                    sm:pb-18
                    lg:px-10
                    lg:pb-20
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
                        rounded-full
                        border
                        border-primary/20
                        bg-primary/5
                        px-4
                        py-2
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-primary
                        backdrop-blur-md
                        sm:text-xs
                    "
                >
                    <span className="relative flex h-2 w-2">
                        <span
                            className="
                                absolute
                                inset-0
                                animate-ping
                                rounded-full
                                bg-secondary
                                opacity-60
                            "
                        />

                        <span className="relative h-2 w-2 rounded-full bg-secondary" />
                    </span>

                    Intelligent Energy Management
                </div>


                {/* =====================================================
                    HEADING
                   ===================================================== */}

                <h1
                    className="
                        mt-7
                        max-w-5xl
                        text-[3.35rem]
                        font-semibold
                        leading-[0.94]
                        tracking-[-0.055em]
                        text-text
                        sm:mt-8
                        sm:text-6xl
                        md:text-7xl
                        lg:text-[5.7rem]
                        xl:text-[6.5rem]
                    "
                >
                    Make every unit
                    <br />

                    of energy{" "}

                    <span className="relative inline-block text-primary">
                        count.

                        <span
                            className="
                                absolute
                                -bottom-2
                                left-1/2
                                h-1
                                w-14
                                -translate-x-1/2
                                rounded-full
                                bg-secondary
                                sm:-bottom-3
                                sm:w-16
                            "
                        />
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
                        sm:mt-9
                        sm:text-lg
                        sm:leading-8
                        lg:text-xl
                    "
                >
                    UrjaSathi brings consumption, renewable generation,
                    and energy performance into one intelligent platform —
                    helping homes and businesses understand their energy
                    and use it better.
                </p>


                {/* =====================================================
                    PRIMARY CTA
                   ===================================================== */}

                <div className="mt-8">
                    <Link
                        to="/login"
                        className="
                            group
                            inline-flex
                            items-center
                            justify-center
                            gap-2.5
                            rounded-full
                            bg-primary
                            px-8
                            py-3.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-[0_14px_35px_rgb(124_58_237_/_0.20)]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-primary-dark
                            hover:text-white
                            hover:shadow-[0_20px_45px_rgb(124_58_237_/_0.26)]
                            focus:outline-none
                            focus:ring-2
                            focus:ring-primary/30
                            sm:px-9
                            sm:py-4
                            sm:text-base
                        "
                    >
                        <span className="text-white">
                            Get started
                        </span>

                        <ArrowRight
                            className="
                                h-4
                                w-4
                                text-white
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </div>


                {/* =====================================================
                    VALUE POINTS
                   ===================================================== */}

                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-x-7
                        gap-y-3
                        text-xs
                        text-text-muted
                        sm:mt-7
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
                    PRODUCT SHOWCASE
                   ===================================================== */}

                <div
                    className="
                        relative
                        mt-14
                        w-full
                        max-w-6xl
                        sm:mt-16
                        lg:mt-20
                    "
                >

                    {/* Dashboard glow */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            h-80
                            w-4/5
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            bg-secondary/10
                            blur-[110px]
                        "
                    />

                    {/* Dashboard */}
                    <div className="relative z-10">
                        <EnergyDashboard />
                    </div>

                </div>


                {/* =====================================================
                    SCROLL INDICATOR
                   ===================================================== */}

                <a
                    href="#what-we-do"
                    className="
                        mt-10
                        inline-flex
                        flex-col
                        items-center
                        gap-2
                        text-[10px]
                        font-medium
                        tracking-[0.18em]
                        text-text-muted
                        transition-colors
                        duration-300
                        hover:text-primary
                        sm:mt-12
                        sm:text-xs
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
                    shrink-0
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
                border-border-strong
                bg-surface
                text-left
                shadow-[0_30px_90px_rgb(15_23_42_/_0.13)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-hover
                sm:rounded-3xl
            "
        >

            {/* Top highlight */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-primary/50
                    to-transparent
                "
            />


            {/* =====================================================
                DASHBOARD HEADER
               ===================================================== */}

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
                    sm:py-5
                    lg:px-8
                "
            >
                <div className="flex items-center gap-2.5">
                    <span
                        className="
                            relative
                            flex
                            h-2.5
                            w-2.5
                        "
                    >
                        <span
                            className="
                                absolute
                                inset-0
                                animate-ping
                                rounded-full
                                bg-secondary
                                opacity-50
                            "
                        />

                        <span className="relative h-2.5 w-2.5 rounded-full bg-secondary" />
                    </span>

                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                        UrjaSathi Energy Intelligence
                    </span>
                </div>

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-success/10
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        tracking-wide
                        text-success
                        sm:text-xs
                    "
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />

                    SYSTEM OPTIMIZED
                </div>
            </div>


            {/* =====================================================
                DASHBOARD BODY
               ===================================================== */}

            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">

                {/* =================================================
                    LEFT — OVERVIEW
                   ================================================= */}

                <div
                    className="
                        border-b
                        border-border
                        p-5
                        sm:p-7
                        lg:border-b-0
                        lg:border-r
                        lg:p-8
                    "
                >

                    {/* Main consumption */}
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-text-muted">
                                Today's consumption
                            </p>

                            <div className="mt-2 flex items-baseline gap-2">
                                <span
                                    className="
                                        text-4xl
                                        font-semibold
                                        tracking-[-0.04em]
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

                            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-success">
                                <TrendingDown className="h-3.5 w-3.5" />

                                12% lower than usual
                            </div>
                        </div>

                        <div
                            className="
                                grid
                                h-10
                                w-10
                                place-items-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            "
                        >
                            <Activity className="h-5 w-5" />
                        </div>
                    </div>


                    {/* =================================================
                        KEY ENERGY METRICS
                       ================================================= */}

                    <div className="mt-8 space-y-6">

                        <DashboardMetric
                            icon={Sun}
                            label="Renewable generation"
                            value="8.7 kWh"
                            percentage="47%"
                            bar="bg-solar"
                        />

                        <DashboardMetric
                            icon={Zap}
                            label="Total consumption"
                            value="18.4 kWh"
                            percentage="72%"
                            bar="bg-primary"
                        />

                        <DashboardMetric
                            icon={TrendingDown}
                            label="Energy saved"
                            value="12%"
                            percentage="12%"
                            bar="bg-secondary"
                        />

                    </div>


                    {/* Performance status */}
                    <div
                        className="
                            mt-8
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-border
                            bg-surface-soft/60
                            p-3
                        "
                    >
                        <div
                            className="
                                grid
                                h-8
                                w-8
                                shrink-0
                                place-items-center
                                rounded-lg
                                bg-secondary/10
                                text-secondary
                            "
                        >
                            <Leaf className="h-4 w-4" />
                        </div>

                        <div>
                            <p className="text-[10px] text-text-muted">
                                Renewable contribution
                            </p>

                            <p className="text-xs font-semibold text-text">
                                47.3% of today's energy
                            </p>
                        </div>
                    </div>

                </div>


                {/* =================================================
                    RIGHT — ENERGY FLOW
                   ================================================= */}

                <div className="p-5 sm:p-7 lg:p-8">

                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-text-muted">
                                Energy flow
                            </p>

                            <p className="mt-1 text-lg font-semibold text-text sm:text-xl">
                                Today's energy performance
                            </p>
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-secondary/10
                                px-2.5
                                py-1
                                text-[10px]
                                font-semibold
                                text-secondary
                            "
                        >
                            <Sun className="h-3 w-3" />

                            Renewable
                        </div>
                    </div>


                    {/* Chart */}
                    <div className="mt-6">
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


                    {/* Bottom metrics */}
                    <div className="mt-7 grid grid-cols-3 gap-3">

                        <DashboardStat
                            label="Peak demand"
                            value="4.8 kW"
                        />

                        <DashboardStat
                            label="Renewable"
                            value="47.3%"
                        />

                        <DashboardStat
                            label="Efficiency"
                            value="+18.6%"
                        />

                    </div>


                    {/* Insight */}
                    <div
                        className="
                            mt-4
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-secondary/20
                            bg-secondary/5
                            px-4
                            py-3
                        "
                    >
                        <div className="text-secondary">
                            <Zap className="h-4 w-4" />
                        </div>

                        <p className="text-xs leading-5 text-text-secondary">
                            Renewable energy is covering a larger share of
                            today's demand.
                        </p>
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
    icon: Icon,
    label,
    value,
    percentage,
    bar,
}) {
    return (
        <div>

            <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-2.5">

                    <div
                        className="
                            grid
                            h-8
                            w-8
                            shrink-0
                            place-items-center
                            rounded-lg
                            bg-surface-soft
                            text-text-muted
                        "
                    >
                        <Icon className="h-4 w-4" />
                    </div>

                    <span className="text-xs text-text-secondary">
                        {label}
                    </span>

                </div>

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
   DASHBOARD STAT
   ========================================================= */

function DashboardStat({
    label,
    value,
}) {
    return (
        <div
            className="
                rounded-xl
                border
                border-border
                bg-surface-soft/50
                px-3
                py-3
            "
        >
            <p className="text-[10px] text-text-muted">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-text">
                {value}
            </p>
        </div>
    );
}


/* =========================================================
   ENERGY CHART
   ========================================================= */

function EnergyChart() {
    return (
        <div className="relative h-48 w-full overflow-hidden sm:h-52">

            {/* Grid */}
            <div
                className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    justify-between
                "
            >
                <span className="h-px w-full bg-border" />
                <span className="h-px w-full bg-border" />
                <span className="h-px w-full bg-border" />
                <span className="h-px w-full bg-border" />
            </div>


            {/* Chart */}
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


                {/* Area */}
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


                {/* Main line */}
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


                {/* End glow */}
                <circle
                    cx="800"
                    cy="35"
                    r="13"
                    fill="rgb(1 172 159)"
                    fillOpacity="0.12"
                />

                <circle
                    cx="800"
                    cy="35"
                    r="5"
                    fill="rgb(1 172 159)"
                />

            </svg>
        </div>
    );
}