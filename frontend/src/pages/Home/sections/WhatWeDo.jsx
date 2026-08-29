import {
    Activity,
    ArrowUpRight,
    BatteryCharging,
    ChartNoAxesCombined,
    Sun,
} from "lucide-react";

const capabilities = [
    {
        icon: Activity,
        title: "Understand consumption",
        description:
            "See when, where, and how energy is being consumed across your home or business.",
    },
    {
        icon: Sun,
        title: "Track generation",
        description:
            "Monitor renewable generation and understand how much of your demand it can cover.",
    },
    {
        icon: ChartNoAxesCombined,
        title: "Optimize performance",
        description:
            "Turn your energy patterns into actionable opportunities for greater efficiency.",
    },
];

export default function WhatWeDo() {
    return (
        <section
            id="what-we-do"
            className="
                relative
                bg-app-bg
                py-24
                sm:py-28
                lg:py-36
            "
        >
            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    sm:px-8
                    lg:px-10
                "
            >
                {/* =====================================================
                    INTRO
                   ===================================================== */}

                <div
                    className="
                        grid
                        gap-8
                        lg:grid-cols-[0.8fr_1.2fr]
                        lg:items-end
                    "
                >
                    <div>
                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-secondary
                                sm:text-sm
                            "
                        >
                            What we do
                        </p>

                        <h2
                            className="
                                mt-4
                                max-w-xl
                                text-4xl
                                font-semibold
                                leading-[1.05]
                                tracking-[-0.035em]
                                text-text
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            Understand your energy.
                            <br />

                            <span className="text-primary">
                                Then make it work smarter.
                            </span>
                        </h2>
                    </div>

                    <p
                        className="
                            max-w-2xl
                            text-base
                            leading-7
                            text-text-secondary
                            sm:text-lg
                            sm:leading-8
                            lg:justify-self-end
                        "
                    >
                        UrjaSathi brings consumption, generation, grid usage,
                        and energy performance into one clear view — so you
                        can move from simply seeing your energy to making
                        better decisions about it.
                    </p>
                </div>


                {/* =====================================================
                    MAIN CONTENT
                   ===================================================== */}

                <div
                    className="
                        mt-16
                        grid
                        gap-6
                        lg:grid-cols-[1.05fr_0.95fr]
                        lg:gap-8
                    "
                >

                    {/* =================================================
                        ENERGY VISUAL
                       ================================================= */}

                    <EnergyOverview />


                    {/* =================================================
                        CAPABILITIES
                       ================================================= */}

                    <div
                        className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-border
                            bg-surface
                            shadow-card
                            sm:rounded-3xl
                        "
                    >
                        {capabilities.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className={`
                                        group
                                        relative
                                        p-6
                                        transition-colors
                                        duration-300
                                        hover:bg-surface-soft
                                        sm:p-8
                                        ${
                                            index !==
                                            capabilities.length - 1
                                                ? "border-b border-border"
                                                : ""
                                        }
                                    `}
                                >
                                    <div className="flex gap-5">

                                        {/* Icon */}
                                        <div
                                            className="
                                                grid
                                                h-11
                                                w-11
                                                shrink-0
                                                place-items-center
                                                rounded-xl
                                                bg-primary/10
                                                text-primary
                                                transition-all
                                                duration-300
                                                group-hover:bg-primary
                                                group-hover:text-white
                                            "
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        {/* Text */}
                                        <div className="min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <h3
                                                    className="
                                                        text-lg
                                                        font-semibold
                                                        text-text
                                                        sm:text-xl
                                                    "
                                                >
                                                    {item.title}
                                                </h3>

                                                <ArrowUpRight
                                                    className="
                                                        h-5
                                                        w-5
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

                                            <p
                                                className="
                                                    mt-2
                                                    max-w-lg
                                                    text-sm
                                                    leading-6
                                                    text-text-secondary
                                                    sm:text-base
                                                    sm:leading-7
                                                "
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
        <div
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-surface
                p-6
                shadow-card
                sm:rounded-3xl
                sm:p-8
                lg:p-10
            "
        >
            {/* Subtle purple atmosphere */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-80
                    w-80
                    rounded-full
                    bg-primary/5
                    blur-[100px]
                "
            />

            <div className="relative">

                {/* Header */}
                <div className="flex items-start justify-between gap-5">
                    <div>
                        <p className="text-xs text-text-muted">
                            Energy overview
                        </p>

                        <h3
                            className="
                                mt-1
                                text-xl
                                font-semibold
                                text-text
                                sm:text-2xl
                            "
                        >
                            See the bigger picture.
                        </h3>
                    </div>

                    <div
                        className="
                            grid
                            h-10
                            w-10
                            shrink-0
                            place-items-center
                            rounded-xl
                            bg-secondary/10
                            text-secondary
                        "
                    >
                        <BatteryCharging className="h-5 w-5" />
                    </div>
                </div>


                {/* Main metric */}
                <div className="mt-10">
                    <p className="text-sm text-text-muted">
                        Today's energy consumption
                    </p>

                    <div className="mt-1 flex items-baseline gap-2">
                        <span
                            className="
                                text-5xl
                                font-semibold
                                tracking-tight
                                text-text
                                sm:text-6xl
                            "
                        >
                            18.4
                        </span>

                        <span className="text-sm text-text-muted">
                            kWh
                        </span>
                    </div>
                </div>


                {/* Chart */}
                <EnergyChart />


                {/* Bottom data */}
                <div
                    className="
                        mt-7
                        grid
                        grid-cols-3
                        gap-4
                        border-t
                        border-border
                        pt-6
                    "
                >
                    <OverviewMetric
                        label="Solar"
                        value="8.7 kWh"
                        accent="text-solar"
                    />

                    <OverviewMetric
                        label="Grid"
                        value="5.2 kWh"
                        accent="text-primary"
                    />

                    <OverviewMetric
                        label="Efficiency"
                        value="+18.6%"
                        accent="text-secondary"
                    />
                </div>
            </div>
        </div>
    );
}


/* =========================================================
   CHART
   ========================================================= */

function EnergyChart() {
    return (
        <div className="relative mt-8 h-52 w-full overflow-hidden">

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


            {/* SVG */}
            <svg
                viewBox="0 0 800 220"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
            >
                <defs>
                    <linearGradient
                        id="whatWeDoEnergyFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="rgb(1 172 159)"
                            stopOpacity="0.22"
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
                    fill="url(#whatWeDoEnergyFill)"
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
                    r="10"
                    fill="rgb(1 172 159)"
                    fillOpacity="0.12"
                />
            </svg>
        </div>
    );
}


/* =========================================================
   OVERVIEW METRIC
   ========================================================= */

function OverviewMetric({ label, value, accent }) {
    return (
        <div>
            <p className="text-xs text-text-muted">
                {label}
            </p>

            <p
                className={`
                    mt-1
                    text-sm
                    font-semibold
                    ${accent}
                `}
            >
                {value}
            </p>
        </div>
    );
}