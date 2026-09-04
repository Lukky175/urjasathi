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
                    pb-10
                    text-center
                    sm:px-8
                    sm:pb-18
                    lg:px-10
                    lg:pb-20
                "
            >

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
                    PRIMARY CTAs
                ===================================================== */}

                <div
                    className="
                        mt-8
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-8
                        sm:flex-row
                    "
                >
                    {/* Get Started */}

                    <Link
                        to="/login"
                        className="
                            group
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-2.5
                            rounded-full
                            bg-primary
                            px-7
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
                            sm:w-auto
                            sm:px-7
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


                    {/* Contact Us */}

                    <Link
                        to="/contact"
                        className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-primary
                            bg-surface
                            px-8
                            py-3.5
                            text-sm
                            font-semibold
                            text-primary
                            shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-primary/5
                            hover:shadow-md
                            focus:outline-none
                            focus:ring-2
                            focus:ring-primary/30
                            sm:w-auto
                            sm:px-9
                            sm:py-4
                            sm:text-base
                        "
                    >
                        Contact Us
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
        <div className="relative w-full">

            {/* =====================================================
                LEGEND
               ===================================================== */}

            <div
                className="
                    mb-4
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-3
                "
            >
                <div className="flex items-center gap-4">

                    {/* Consumption */}
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />

                        <span className="text-[10px] font-medium text-text-secondary sm:text-xs">
                            Consumption
                        </span>
                    </div>


                    {/* Solar */}
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-solar" />

                        <span className="text-[10px] font-medium text-text-secondary sm:text-xs">
                            Solar generation
                        </span>
                    </div>


                    {/* Savings */}
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success" />

                        <span className="text-[10px] font-medium text-text-secondary sm:text-xs">
                            Energy saved
                        </span>
                    </div>

                </div>


                <span className="text-[10px] font-medium text-text-muted sm:text-xs">
                    kW
                </span>
            </div>


            {/* =====================================================
                CHART
               ===================================================== */}

            <div className="relative h-48 w-full sm:h-52">

                {/* Y-axis */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-1
                        inset-y-0
                        flex
                        flex-col
                        justify-between
                        pr-2
                        text-[9px]
                        text-text-muted
                        sm:text-[10px]
                    "
                >
                    <span>5</span>
                    <span>4</span>
                    <span>3</span>
                    <span>2</span>
                    <span>1</span>
                    <span>0</span>
                </div>


                {/* =================================================
                    GRAPH AREA
                   ================================================= */}

                <div className="absolute inset-y-0 left-5 right-0">

                    {/* Grid */}
                    <div
                        className="
                            pointer-events-none
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
                        <span className="h-px w-full bg-border" />
                        <span className="h-px w-full bg-border" />
                    </div>


                    <svg
                        viewBox="0 0 960 300"
                        preserveAspectRatio="none"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            overflow-visible
                        "
                    >

                        <defs>

                            {/* -----------------------------------------
                                Solar fill
                               ----------------------------------------- */}

                            <linearGradient
                                id="solarFill"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="rgb(245 183 0)"
                                    stopOpacity="0.12"
                                />

                                <stop
                                    offset="100%"
                                    stopColor="rgb(245 183 0)"
                                    stopOpacity="0"
                                />
                            </linearGradient>


                            {/* -----------------------------------------
                                Consumption fill
                               ----------------------------------------- */}

                            <linearGradient
                                id="consumptionFill"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="rgb(108 29 95)"
                                    stopOpacity="0.07"
                                />

                                <stop
                                    offset="100%"
                                    stopColor="rgb(108 29 95)"
                                    stopOpacity="0"
                                />
                            </linearGradient>

                        </defs>


                        {/* =================================================
                            SOLAR GENERATION
                            
                            Sunrise → gradual increase
                            Noon → rounded moderate peak
                            Sunset → gradual decrease
                           ================================================= */}

                        <path
                            d="
                                M0 300

                                C
                                    105 300,
                                    155 300,
                                    205 296

                                C
                                    255 292,
                                    285 270,
                                    325 235

                                C
                                    365 200,
                                    405 160,
                                    455 145

                                C
                                    500 131,
                                    545 136,
                                    585 153

                                C
                                    625 170,
                                    660 205,
                                    700 238

                                C
                                    740 270,
                                    780 292,
                                    830 298

                                C
                                    875 300,
                                    920 300,
                                    960 300

                                L960 300
                                L0 300
                                Z
                            "
                            fill="url(#solarFill)"
                        />


                        {/* Solar line */}

                        <path
                            d="
                                M0 300

                                C
                                    105 300,
                                    155 300,
                                    205 296

                                C
                                    255 292,
                                    285 270,
                                    325 235

                                C
                                    365 200,
                                    405 160,
                                    455 145

                                C
                                    500 131,
                                    545 136,
                                    585 153

                                C
                                    625 170,
                                    660 205,
                                    700 238

                                C
                                    740 270,
                                    780 292,
                                    830 298

                                C
                                    875 300,
                                    920 300,
                                    960 300
                            "
                            fill="none"
                            stroke="rgb(245 183 0)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />


                        {/* =================================================
                            CONSUMPTION
                            
                            Realistic building load:
                            - overnight baseline
                            - morning activity
                            - daytime operating load
                            - evening increase
                            - gradual night reduction

                            Important:
                            No triangular spikes.
                           ================================================= */}

                        <path
                            d="
                                M0 216

                                C
                                    35 210,
                                    70 222,
                                    105 216

                                C
                                    135 217,
                                    155 212,
                                    175 218

                                C
                                    190 219,
                                    198 208,
                                    215 203

                                C
                                    235 197,
                                    255 198,
                                    275 201

                                C
                                    300 204,
                                    315 211,
                                    335 211

                                C
                                    355 211,
                                    370 204,
                                    390 202

                                C
                                    415 199,
                                    435 203,
                                    455 204

                                C
                                    475 200,
                                    490 199,
                                    510 193

                                C
                                    535 185,
                                    560 183,
                                    585 187

                                C
                                    610 191,
                                    625 199,
                                    645 199

                                C
                                    670 199,
                                    690 190,
                                    710 189

                                C
                                    735 186,
                                    755 189,
                                    775 195

                                C
                                    795 199,
                                    805 202,
                                    825 210

                                C
                                    850 220,
                                    870 208,
                                    890 210

                                C
                                    915 212,
                                    935 214,
                                    960 216
                            "
                            fill="none"
                            stroke="rgb(108 29 95)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />


                        {/* Consumption subtle area */}

                        <path
                            d="
                                M0 236

                                C
                                    35 235,
                                    70 235,
                                    105 236

                                C
                                    135 237,
                                    155 232,
                                    175 225

                                C
                                    190 219,
                                    198 208,
                                    215 203

                                C
                                    235 197,
                                    255 198,
                                    275 201

                                C
                                    300 204,
                                    315 211,
                                    335 211

                                C
                                    355 211,
                                    370 204,
                                    390 202

                                C
                                    415 199,
                                    435 203,
                                    455 204

                                C
                                    475 205,
                                    490 199,
                                    510 193

                                C
                                    535 185,
                                    560 183,
                                    585 187

                                C
                                    610 191,
                                    625 199,
                                    645 199

                                C
                                    670 199,
                                    690 190,
                                    710 184

                                C
                                    735 177,
                                    755 179,
                                    775 185

                                C
                                    795 199,
                                    805 202,
                                    825 210

                                C
                                    850 220,
                                    870 208,
                                    890 210

                                C
                                    915 212,
                                    935 214,
                                    960 216

                                L960 300
                                L0 300
                                Z
                            "
                            fill="url(#consumptionFill)"
                        />


                        {/* =================================================
                            ENERGY SAVED
                            
                            Savings should correlate with renewable
                            generation, therefore:
                            
                            low → rises → broad middle bulge → falls

                            Kept subtle so it doesn't compete with
                            consumption.
                           ================================================= */}

                        <path
                            d="
                                M0 287

                                C
                                    110 287,
                                    175 285,
                                    230 281

                                C
                                    285 277,
                                    325 260,
                                    365 242

                                C
                                    405 224,
                                    445 213,
                                    490 211

                                C
                                    535 209,
                                    575 217,
                                    615 232

                                C
                                    655 247,
                                    695 266,
                                    735 278

                                C
                                    780 290,
                                    835 293,
                                    900 291

                                C
                                    925 290,
                                    945 288,
                                    960 287
                            "
                            fill="none"
                            stroke="rgb(22 135 90)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />


                        {/* =================================================
                            CURRENT CONSUMPTION POINT
                           ================================================= */}

                        <circle
                            cx="960"
                            cy="216"
                            r="11"
                            fill="rgb(108 29 95)"
                            fillOpacity="0.08"
                        />

                        <circle
                            cx="960"
                            cy="216"
                            r="4"
                            fill="rgb(108 29 95)"
                        />

                    </svg>

                </div>
            </div>


            {/* =====================================================
                X AXIS
               ===================================================== */}

            <div
                className="
                    ml-5
                    mt-3
                    flex
                    justify-between
                    text-[9px]
                    text-text-muted
                    sm:text-[10px]
                "
            >
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
                <span>24:00</span>
            </div>

        </div>
    );
}