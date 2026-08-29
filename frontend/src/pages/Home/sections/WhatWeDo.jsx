import {
    Activity,
    ArrowUpRight,
    BatteryCharging,
    ChartNoAxesCombined,
    CircleGauge,
    Sun,
    Zap,
} from "lucide-react";

const capabilities = [
    {
        icon: Activity,
        title: "Understand",
        description:
            "See where your energy goes across consumption, generation, and grid usage.",
    },
    {
        icon: Sun,
        title: "Optimize",
        description:
            "Identify opportunities to use renewable energy and reduce unnecessary demand.",
    },
    {
        icon: ChartNoAxesCombined,
        title: "Improve",
        description:
            "Track performance over time and turn energy data into measurable results.",
    },
];

export default function WhatWeDo() {
    return (
        <section
            id="what-we-do"
            className="
                relative
                overflow-hidden
                bg-app-bg
                py-20
                sm:py-24
                lg:py-28
            "
        >
            {/* =====================================================
                BACKGROUND ATMOSPHERE
               ===================================================== */}

            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute
                        -right-40
                        top-20
                        h-96
                        w-96
                        rounded-full
                        bg-primary/5
                        blur-[120px]
                    "
                />

                <div
                    className="
                        absolute
                        -left-40
                        bottom-0
                        h-80
                        w-80
                        rounded-full
                        bg-secondary/5
                        blur-[110px]
                    "
                />
            </div>


            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-6
                    sm:px-8
                    lg:px-10
                "
            >
                {/* =================================================
                    MAIN LAYOUT
                   ================================================= */}

                <div
                    className="
                        grid
                        items-center
                        gap-14
                        lg:grid-cols-[0.85fr_1.15fr]
                        lg:gap-20
                    "
                >

                    {/* =================================================
                        LEFT — PRODUCT MESSAGE
                       ================================================= */}

                    <div>
                        {/* Eyebrow */}

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-secondary/20
                                bg-secondary/5
                                px-3.5
                                py-1.5
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-secondary
                            "
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

                            Energy intelligence
                        </div>


                        {/* Heading */}

                        <h2
                            className="
                                mt-6
                                max-w-xl
                                text-4xl
                                font-semibold
                                leading-[1.04]
                                tracking-[-0.04em]
                                text-text
                                sm:text-5xl
                                lg:text-[3.5rem]
                            "
                        >
                            Know your energy.
                            <br />

                            <span className="text-primary">
                                Make it work smarter.
                            </span>
                        </h2>


                        {/* Description */}

                        <p
                            className="
                                mt-6
                                max-w-xl
                                text-base
                                leading-7
                                text-text-secondary
                                sm:text-lg
                                sm:leading-8
                            "
                        >
                            Solar Sathi brings consumption, solar generation,
                            grid dependency, and efficiency into one simple
                            view — giving you the clarity to make better
                            energy decisions.
                        </p>


                        {/* Capability cards */}

                        <div className="mt-9 space-y-3">
                            {capabilities.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            rounded-2xl
                                            border
                                            border-border
                                            bg-surface/70
                                            p-4
                                            transition-all
                                            duration-300
                                            hover:-translate-y-0.5
                                            hover:border-primary/20
                                            hover:bg-surface
                                            hover:shadow-card
                                            sm:p-5
                                        "
                                    >
                                        {/* Number */}

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
                                                transition-all
                                                duration-300
                                                group-hover:bg-primary
                                                group-hover:text-white
                                            "
                                        >
                                            <Icon className="h-4.5 w-4.5" />
                                        </div>


                                        {/* Content */}

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-text-muted">
                                                    0{index + 1}
                                                </span>

                                                <h3 className="text-sm font-semibold text-text sm:text-base">
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <p
                                                className="
                                                    mt-1
                                                    text-xs
                                                    leading-5
                                                    text-text-secondary
                                                    sm:text-sm
                                                    sm:leading-6
                                                "
                                            >
                                                {item.description}
                                            </p>
                                        </div>


                                        {/* Arrow */}

                                        <ArrowUpRight
                                            className="
                                                h-4
                                                w-4
                                                shrink-0
                                                text-text-muted
                                                transition-all
                                                duration-300
                                                group-hover:-translate-y-0.5
                                                group-hover:translate-x-0.5
                                                group-hover:text-primary
                                            "
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    {/* =================================================
                        RIGHT — ENERGY INTELLIGENCE VISUAL
                       ================================================= */}

                    <EnergyOverview />
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   ENERGY OVERVIEW
   ========================================================= */

function EnergyOverview() {
    return (
        <div className="relative">

            {/* Floating top metric */}

            <div
                className="
                    absolute
                    -right-2
                    -top-5
                    z-20
                    hidden
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    px-4
                    py-3
                    shadow-card
                    sm:block
                    lg:-right-8
                    lg:-top-6
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            grid
                            h-9
                            w-9
                            place-items-center
                            rounded-xl
                            bg-secondary/10
                            text-secondary
                        "
                    >
                        <CircleGauge className="h-4 w-4" />
                    </div>

                    <div>
                        <p className="text-[10px] text-text-muted">
                            Efficiency
                        </p>

                        <p className="text-sm font-semibold text-text">
                            +18.6%
                        </p>
                    </div>
                </div>
            </div>


            {/* Floating bottom metric */}

            <div
                className="
                    absolute
                    -bottom-5
                    -left-2
                    z-20
                    hidden
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    px-4
                    py-3
                    shadow-card
                    sm:block
                    lg:-left-8
                    lg:-bottom-6
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            grid
                            h-9
                            w-9
                            place-items-center
                            rounded-xl
                            bg-primary/10
                            text-primary
                        "
                    >
                        <Sun className="h-4 w-4" />
                    </div>

                    <div>
                        <p className="text-[10px] text-text-muted">
                            Renewable share
                        </p>

                        <p className="text-sm font-semibold text-text">
                            47.3%
                        </p>
                    </div>
                </div>
            </div>


            {/* Main dashboard */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-border
                    bg-surface
                    shadow-card
                "
            >
                {/* Atmosphere */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-72
                        w-72
                        rounded-full
                        bg-primary/10
                        blur-[100px]
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-32
                        -left-20
                        h-64
                        w-64
                        rounded-full
                        bg-secondary/10
                        blur-[90px]
                    "
                />


                {/* Dashboard header */}

                <div
                    className="
                        relative
                        flex
                        items-center
                        justify-between
                        border-b
                        border-border
                        px-5
                        py-4
                        sm:px-7
                        sm:py-5
                    "
                >
                    <div className="flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-secondary" />

                        <span className="text-xs font-medium text-text-secondary sm:text-sm">
                            Solar Sathi Intelligence
                        </span>
                    </div>

                    <span
                        className="
                            rounded-full
                            bg-secondary/10
                            px-2.5
                            py-1
                            text-[9px]
                            font-semibold
                            tracking-wide
                            text-secondary
                            sm:text-[10px]
                        "
                    >
                        LIVE
                    </span>
                </div>


                {/* Dashboard body */}

                <div className="relative p-5 sm:p-7">

                    {/* Main metric */}

                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs text-text-muted">
                                Today's consumption
                            </p>

                            <div className="mt-1 flex items-baseline gap-2">
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
                            <Zap className="h-3 w-3" />

                            8.4%
                        </div>
                    </div>


                    {/* Chart */}

                    <EnergyChart />


                    {/* Metrics */}

                    <div
                        className="
                            mt-6
                            grid
                            grid-cols-3
                            gap-2
                            sm:gap-3
                        "
                    >
                        <Metric
                            icon={Sun}
                            label="Solar"
                            value="8.7 kWh"
                            accent="secondary"
                        />

                        <Metric
                            icon={BatteryCharging}
                            label="Grid"
                            value="5.2 kWh"
                            accent="primary"
                        />

                        <Metric
                            icon={ChartNoAxesCombined}
                            label="Saved"
                            value="18.6%"
                            accent="secondary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


/* =========================================================
   ENERGY CHART
   ========================================================= */

function EnergyChart() {
    return (
        <div className="relative mt-7 h-48 w-full overflow-hidden sm:h-56">

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
                        id="solarSathiEnergyFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="rgb(1 172 159)"
                            stopOpacity="0.24"
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
                        C55 155 80 125 135 140
                        C190 155 210 178 265 150
                        C320 122 335 72 390 86
                        C445 100 460 145 515 126
                        C570 107 590 58 645 72
                        C700 86 720 115 755 94
                        C780 79 790 57 800 38
                        L800 220
                        L0 220
                        Z
                    "
                    fill="url(#solarSathiEnergyFill)"
                />

                <path
                    d="
                        M0 165
                        C55 155 80 125 135 140
                        C190 155 210 178 265 150
                        C320 122 335 72 390 86
                        C445 100 460 145 515 126
                        C570 107 590 58 645 72
                        C700 86 720 115 755 94
                        C780 79 790 57 800 38
                    "
                    fill="none"
                    stroke="rgb(1 172 159)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                <circle
                    cx="800"
                    cy="38"
                    r="5"
                    fill="rgb(1 172 159)"
                />

                <circle
                    cx="800"
                    cy="38"
                    r="11"
                    fill="rgb(1 172 159)"
                    fillOpacity="0.12"
                />
            </svg>


            {/* Time labels */}

            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    flex
                    justify-between
                    text-[9px]
                    text-text-muted
                    sm:text-[10px]
                "
            >
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
            </div>
        </div>
    );
}


/* =========================================================
   METRIC
   ========================================================= */

function Metric({
    icon: Icon,
    label,
    value,
    accent,
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-border
                bg-surface-soft/60
                p-3
                sm:p-4
            "
        >
            <div className="flex items-center gap-2">
                <Icon
                    className={`
                        h-3.5
                        w-3.5
                        ${
                            accent === "primary"
                                ? "text-primary"
                                : "text-secondary"
                        }
                    `}
                />

                <span className="text-[10px] text-text-muted sm:text-xs">
                    {label}
                </span>
            </div>

            <p className="mt-2 text-sm font-semibold text-text sm:text-base">
                {value}
            </p>
        </div>
    );
}