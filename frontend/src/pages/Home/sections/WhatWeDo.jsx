import {
    Activity,
    ArrowUpRight,
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
                isolate
                overflow-hidden
                bg-app-bg
                py-15
                sm:py-15
                lg:py-15
            "
        >
            {/* =====================================================
                SECTION BACKGROUND
               ===================================================== */}

            <SectionGrid />

            {/* Ambient glow */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-10
                    -z-10
                    h-96
                    w-96
                    rounded-full
                    bg-primary/5
                    blur-[120px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-0
                    -z-10
                    h-80
                    w-80
                    rounded-full
                    bg-secondary/5
                    blur-[110px]
                "
            />

            {/* =====================================================
                CONTENT
               ===================================================== */}

            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-5
                    sm:px-7
                    lg:px-8
                "
            >
                <div
                    className="
                        grid
                        items-center
                        gap-12
                        lg:grid-cols-[0.88fr_1.12fr]
                        lg:gap-14
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
                            <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full bg-secondary"
                            />

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
                                lg:text-[3.4rem]
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
                                max-w-lg
                                text-base
                                leading-7
                                text-text-secondary
                                sm:text-lg
                                sm:leading-8
                            "
                        >
                            UrjaSathi brings consumption, solar generation,
                            grid dependency, and efficiency into one simple
                            view — giving you the clarity to make better
                            energy decisions.
                        </p>

                        {/* Capability cards */}

                        <div className="mt-8 space-y-3">
                            {capabilities.map(
                                ({ icon: Icon, title, description }, index) => (
                                    <div
                                        key={title}
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-3.5
                                            rounded-2xl
                                            border
                                            border-border
                                            bg-surface/80
                                            p-3.5
                                            backdrop-blur-sm
                                            transition-all
                                            duration-300
                                            hover:-translate-y-0.5
                                            hover:border-primary/20
                                            hover:bg-surface
                                            hover:shadow-card
                                            sm:gap-4
                                            sm:p-4
                                        "
                                    >
                                        {/* Icon */}

                                        <div
                                            className="
                                                grid
                                                h-10
                                                w-10
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
                                            <Icon className="h-[18px] w-[18px]" />
                                        </div>

                                        {/* Content */}

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="
                                                        text-[10px]
                                                        font-medium
                                                        text-text-muted
                                                    "
                                                >
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </span>

                                                <h3
                                                    className="
                                                        text-sm
                                                        font-semibold
                                                        text-text
                                                        sm:text-base
                                                    "
                                                >
                                                    {title}
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
                                                {description}
                                            </p>
                                        </div>

                                        {/* Arrow */}

                                        <ArrowUpRight
                                            aria-hidden="true"
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
                                ),
                            )}
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
   SECTION GRID BACKGROUND
   ========================================================= */

function SectionGrid() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                inset-0
                -z-20
                overflow-hidden
            "
        >
            {/* Main grid */}

            <div
                className="
                    absolute
                    inset-0
                    opacity-100
                    [background-image:linear-gradient(to_right,rgb(148_163_184/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.12)_1px,transparent_1px)]
                    [background-size:80px_80px]
                "
            />
         
        </div>
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
                    lg:-right-6
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
                    lg:-left-6
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
                            bg-solar/10
                            text-solar
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


            {/* =====================================================
                MAIN DASHBOARD
               ===================================================== */}

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
                        px-4
                        py-4
                        sm:px-5
                        sm:py-5
                    "
                >
                    <div className="flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-secondary" />

                        <span className="text-xs font-medium text-text-secondary sm:text-sm">
                            UrjaSathi Energy Intelligence
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

                <div className="relative px-4 py-5 sm:px-5 sm:py-6">

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
                            <TrendingDownIcon />

                            8.4%
                        </div>
                    </div>


                    {/* Chart */}

                    <EnergyChart />


                    {/* Metrics */}

                    <div
                        className="
                            mt-5
                            grid
                            grid-cols-3
                            gap-2
                            sm:gap-3
                        "
                    >
                        <Metric
                            icon={Sun}
                            label="Generation"
                            value="8.7 kWh"
                            accent="solar"
                        />

                        <Metric
                            icon={Zap}
                            label="Grid Export"
                            value="5.2 kWh"
                            accent="grid"
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
   TREND ICON
   ========================================================= */

function TrendingDownIcon() {
    return (
        <svg
            viewBox="0 0 16 16"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 5l4 4 3-3 3 3" />
            <path d="M10 9h3V6" />
        </svg>
    );
}


/* =========================================================
   ENERGY CHART
   ========================================================= */

/* =========================================================
   ENERGY CHART
   ========================================================= */

function EnergyChart() {
    return (
        <div
            className="
                mt-6
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-surface-soft/40
            "
        >
            {/* =================================================
                CHART HEADER
               ================================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-3
                    border-b
                    border-border
                    px-4
                    py-3
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:px-5
                    sm:py-4
                "
            >
                <div>
                    <p className="text-xs font-semibold text-text">
                        Energy flow
                    </p>

                    <p className="mt-0.5 text-[10px] text-text-muted">
                        Generation, usage & grid export
                    </p>
                </div>

                {/* Legend */}

                <div className="flex items-center gap-3 sm:gap-4">
                    <ChartLegend
                        color="bg-solar"
                        label="Generation"
                    />

                    <ChartLegend
                        color="bg-primary"
                        label="Consumption"
                    />

                    <ChartLegend
                        color="bg-blue-500"
                        label="Grid export"
                    />

                    <ChartLegend
                        color="bg-secondary"
                        label="Saving"
                        dashed
                    />
                </div>
            </div>


            {/* =================================================
                CHART AREA
               ================================================= */}

            <div className="relative px-3 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-5">

                <div className="relative h-48 w-full sm:h-52">

                    {/* Horizontal grid */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-x-0
                            inset-y-2
                            flex
                            flex-col
                            justify-between
                        "
                    >
                        <span className="h-px w-full bg-border/80" />
                        <span className="h-px w-full bg-border/60" />
                        <span className="h-px w-full bg-border/60" />
                        <span className="h-px w-full bg-border/80" />
                    </div>


                    {/* Y-axis labels */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-0
                            top-0
                            flex
                            h-[calc(100%-24px)]
                            flex-col
                            justify-between
                            text-[8px]
                            text-text-muted
                            sm:text-[9px]
                        "
                    >
                        <span>High</span>
                        <span>Med</span>
                        <span>Low</span>
                        <span>Base</span>
                    </div>

                    {/* Subtle chart grid */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            opacity-60
                            [background-image:linear-gradient(to_right,rgb(148_163_184/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.08)_1px,transparent_1px)]
                            [background-size:25%_100%,100%_25%]
                        "
                    />

                    {/* =================================================
                        SVG
                       ================================================= */}

                    <svg
                        viewBox="0 0 800 240"
                        preserveAspectRatio="none"
                        className="
                            absolute
                            left-7
                            right-0
                            top-0
                            h-[calc(100%-20px)]
                            w-[calc(100%-28px)]
                        "
                    >
                        <defs>

                            {/* Generation */}

                            <linearGradient
                                id="generationArea"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="rgb(245 183 0)"
                                    stopOpacity="0.16"
                                />

                                <stop
                                    offset="100%"
                                    stopColor="rgb(245 183 0)"
                                    stopOpacity="0"
                                />
                            </linearGradient>


                            {/* Consumption */}

                            <linearGradient
                                id="consumptionArea"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="rgb(108 29 95)"
                                    stopOpacity="0.10"
                                />

                                <stop
                                    offset="100%"
                                    stopColor="rgb(108 29 95)"
                                    stopOpacity="0"
                                />
                            </linearGradient>


                            {/* Grid export */}

                            <linearGradient
                                id="gridExportArea"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="rgb(59 130 246)"
                                    stopOpacity="0.10"
                                />

                                <stop
                                    offset="100%"
                                    stopColor="rgb(59 130 246)"
                                    stopOpacity="0"
                                />
                            </linearGradient>

                        </defs>


                        {/* =================================================
                            GENERATION AREA
                           ================================================= */}

                        <path
                            d="
                                M0 205
                                C55 203 80 195 125 190
                                C175 184 205 170 250 145
                                C295 120 320 72 365 58
                                C410 44 450 62 490 92
                                C530 122 555 135 600 105
                                C645 75 670 48 710 55
                                C750 62 775 82 800 70

                                L800 220
                                L0 220
                                Z
                            "
                            fill="url(#generationArea)"
                        />


                        {/* =================================================
                            CONSUMPTION AREA
                           ================================================= */}

                        <path
                            d="
                                M0 135
                                C45 125 75 112 120 120
                                C165 128 200 150 245 142
                                C290 134 325 112 365 118
                                C410 124 445 145 485 136
                                C530 126 555 108 600 112
                                C645 116 680 135 720 126
                                C755 118 780 105 800 92

                                L800 220
                                L0 220
                                Z
                            "
                            fill="url(#consumptionArea)"
                        />


                        {/* =================================================
                            GRID EXPORT AREA
                           ================================================= */}

                        <path
                            d="
                                M0 218
                                C55 216 90 214 135 212
                                C180 210 215 207 260 202
                                C305 197 340 180 380 168
                                C420 156 455 162 495 178
                                C535 194 570 192 610 170
                                C650 148 675 126 715 132
                                C755 138 780 155 800 145

                                L800 220
                                L0 220
                                Z
                            "
                            fill="url(#gridExportArea)"
                        />


                        {/* =================================================
                            GENERATION LINE — YELLOW
                           ================================================= */}

                        <path
                            d="
                                M0 205
                                C55 203 80 195 125 190
                                C175 184 205 170 250 145
                                C295 120 320 72 365 58
                                C410 44 450 62 490 92
                                C530 122 555 135 600 105
                                C645 75 670 48 710 55
                                C750 62 775 82 800 70
                            "
                            fill="none"
                            stroke="rgb(245 183 0)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />


                        {/* =================================================
                            CONSUMPTION LINE — PURPLE
                           ================================================= */}

                        <path
                            d="
                                M0 135
                                C45 125 75 112 120 120
                                C165 128 200 150 245 142
                                C290 134 325 112 365 118
                                C410 124 445 145 485 136
                                C530 126 555 108 600 112
                                C645 116 680 135 720 126
                                C755 118 780 105 800 92
                            "
                            fill="none"
                            stroke="rgb(108 29 95)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />


                        {/* =================================================
                            GRID EXPORT LINE — BLUE
                           ================================================= */}

                        <path
                            d="
                                M0 218
                                C55 216 90 214 135 212
                                C180 210 215 207 260 202
                                C305 197 340 180 380 168
                                C420 156 455 162 495 178
                                C535 194 570 192 610 170
                                C650 148 675 126 715 132
                                C755 138 780 155 800 145
                            "
                            fill="none"
                            stroke="rgb(59 130 246)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />


                        {/* =================================================
                            SAVING LINE — GREEN / DASHED
                           ================================================= */}

                        <path
                            d="
                                M0 195
                                C55 194 90 188 135 190
                                C180 192 215 184 260 178
                                C305 172 340 158 380 162
                                C425 166 455 176 495 168
                                C535 160 570 145 610 150
                                C650 155 685 165 720 158
                                C755 151 780 140 800 130
                            "
                            fill="none"
                            stroke="rgb(1 172 159)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="7 6"
                            opacity="0.9"
                        />


                        {/* =================================================
                            END POINTS
                           ================================================= */}

                        {/* Generation */}

                        <circle
                            cx="800"
                            cy="70"
                            r="4"
                            fill="rgb(245 183 0)"
                        />

                        {/* Consumption */}

                        <circle
                            cx="800"
                            cy="92"
                            r="4"
                            fill="rgb(108 29 95)"
                        />

                        {/* Grid */}

                        <circle
                            cx="800"
                            cy="145"
                            r="4"
                            fill="rgb(59 130 246)"
                        />

                        {/* Saving */}

                        <circle
                            cx="800"
                            cy="130"
                            r="4"
                            fill="rgb(1 172 159)"
                        />
                    </svg>


                    {/* =================================================
                        TIME LABELS
                       ================================================= */}

                    <div
                        className="
                            absolute
                            bottom-0
                            left-7
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


                {/* Chart explanation */}

                <div
                    className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-blue-500/15
                        bg-blue-500/5
                        px-3
                        py-2.5
                    "
                >
                    <Zap className="h-3.5 w-3.5 shrink-0 text-blue-500" />

                    <p className="text-[10px] leading-4 text-text-secondary sm:text-xs">
                        Excess renewable energy can be exported to the grid,
                        helping turn surplus generation into value.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   CHART LEGEND
   ========================================================= */

function ChartLegend({ color, label }) {
    return (
        <div className="flex items-center gap-1.5">
            <span
                className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${color}
                `}
            />

            <span className="hidden text-[9px] text-text-muted sm:inline">
                {label}
            </span>
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
    const accentClass = {
        primary: "text-primary",
        secondary: "text-secondary",
        solar: "text-solar",
        grid: "text-blue-500",
    }[accent];

    return (
        <div
            className="
                rounded-xl
                border
                border-border
                bg-surface-soft/60
                p-2.5
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-surface
                sm:p-3
            "
        >
            <div className="flex items-center gap-1.5">
                <Icon
                    className={`
                        h-3.5
                        w-3.5
                        ${accentClass}
                    `}
                />

                <span className="text-[10px] text-text-muted sm:text-xs">
                    {label}
                </span>
            </div>

            <p className="mt-1.5 text-sm font-semibold text-text sm:text-base">
                {value}
            </p>
        </div>
    );
}