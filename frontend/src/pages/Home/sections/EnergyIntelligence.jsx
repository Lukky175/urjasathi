import {
    ArrowDownRight,
    ArrowUpRight,
    BatteryCharging,
    CircleDollarSign,
    Gauge,
    Leaf,
    Sun,
    TrendingDown,
    Zap,
} from "lucide-react";

export default function EnergyIntelligence() {
    return (
        <section
            className="
                relative
                overflow-hidden
                bg-surface
                py-18
                sm:py-20
                lg:py-24
            "
        >
            {/* =========================================================
                BACKGROUND
               ========================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    overflow-hidden
                "
            >
                <div
                    className="
                        absolute
                        -left-64
                        top-1/4
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-secondary/5
                        blur-[140px]
                    "
                />

                <div
                    className="
                        absolute
                        -right-64
                        bottom-0
                        h-[460px]
                        w-[460px]
                        rounded-full
                        bg-primary/5
                        blur-[140px]
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
                    max-w-7xl
                    px-5
                    sm:px-7
                    lg:px-8
                "
            >
                {/* =====================================================
                    HEADER
                   ===================================================== */}

                <div className="max-w-3xl">
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-primary/15
                            bg-primary/5
                            px-3.5
                            py-1.5
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-primary
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-primary
                            "
                        />

                        Energy intelligence
                    </div>


                    <h2
                        className="
                            mt-6
                            max-w-3xl
                            text-4xl
                            font-semibold
                            leading-[1.02]
                            tracking-[-0.045em]
                            text-text
                            sm:text-5xl
                            lg:text-[3.75rem]
                        "
                    >
                        Don't just see your
                        <br />

                        energy.{" "}
                        <span className="text-secondary">
                            Understand it.
                        </span>
                    </h2>


                    <p
                        className="
                            mt-6
                            max-w-2xl
                            text-base
                            leading-7
                            text-text-secondary
                            sm:text-lg
                            sm:leading-8
                        "
                    >
                        UrjaSathi transforms raw energy information into a
                        clear picture of what is happening, where energy is
                        being used, and where smarter decisions can make a
                        difference.
                    </p>
                </div>


                {/* =====================================================
                    MAIN CONTENT
                   ===================================================== */}

                <div
                    className="
                        mt-14
                        grid
                        gap-12
                        lg:mt-20
                        lg:grid-cols-[0.78fr_1.22fr]
                        lg:items-center
                        lg:gap-16
                    "
                >
                    {/* =================================================
                        LEFT — BENEFITS
                       ================================================= */}

                    <div>
                        <div className="space-y-10">
                            <IntelligencePoint
                                icon={Gauge}
                                number="01"
                                title="Know your consumption"
                                description="See exactly how much energy you're using and understand when demand rises, falls, and reaches its daily peak."
                            />

                            <IntelligencePoint
                                icon={Sun}
                                number="02"
                                title="Track renewable generation"
                                description="Understand how much of your energy comes from solar and when renewable generation is doing the most work."
                            />

                            <IntelligencePoint
                                icon={TrendingDown}
                                number="03"
                                title="Find opportunities to save"
                                description="Spot inefficient patterns and discover where shifting usage or using more solar can reduce demand."
                            />
                        </div>


                        {/* Supporting statement */}

                        <div
                            className="
                                mt-11
                                flex
                                items-center
                                gap-3
                                border-t
                                border-border
                                pt-6
                            "
                        >
                            <div
                                className="
                                    grid
                                    h-9
                                    w-9
                                    shrink-0
                                    place-items-center
                                    rounded-xl
                                    bg-secondary/10
                                    text-secondary
                                "
                            >
                                <Leaf className="h-4 w-4" />
                            </div>

                            <p
                                className="
                                    text-xs
                                    leading-5
                                    text-text-muted
                                    sm:text-sm
                                "
                            >
                                Better visibility turns everyday energy data
                                into decisions you can actually act on.
                            </p>
                        </div>
                    </div>


                    {/* =================================================
                        RIGHT — ANALYTICS
                       ================================================= */}

                    <EnergyAnalyticsCard />
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   INTELLIGENCE POINT
   ========================================================= */

function IntelligencePoint({
    icon: Icon,
    number,
    title,
    description,
}) {
    return (
        <div className="group flex gap-4 sm:gap-5">
            {/* Icon */}

            <div
                className="
                    relative
                    mt-0.5
                    grid
                    h-12
                    w-12
                    shrink-0
                    place-items-center
                    rounded-xl
                    border
                    border-primary/10
                    bg-primary/5
                    text-primary
                    transition-all
                    duration-300
                    group-hover:border-primary/20
                    group-hover:bg-primary
                    group-hover:text-white
                "
            >
                <Icon className="h-5 w-5" />
            </div>


            {/* Content */}

            <div className="min-w-0">
                {/* Number only — removed the unnecessary line */}

                <span
                    className="
                        text-[10px]
                        font-semibold
                        tracking-[0.16em]
                        text-text-muted
                    "
                >
                    {number}
                </span>


                <h3
                    className="
                        mt-2
                        text-xl
                        font-semibold
                        tracking-[-0.02em]
                        text-text
                        sm:text-[1.35rem]
                    "
                >
                    {title}
                </h3>


                <p
                    className="
                        mt-2.5
                        max-w-md
                        text-sm
                        leading-6
                        text-text-secondary
                        sm:text-base
                        sm:leading-7
                    "
                >
                    {description}
                </p>
            </div>
        </div>
    );
}


/* =========================================================
   ANALYTICS DATA
   ========================================================= */

/*
 * These values are intentionally internally consistent.
 *
 * Weekly consumption:
 *
 * Mon 17.2
 * Tue 16.8
 * Wed 17.5
 * Thu 18.1
 * Fri 17.0
 * Sat 22.4  ← peak
 * Sun 17.8
 *
 * Total = 126.8 kWh
 *
 * Solar generation:
 *
 * Mon 7.0
 * Tue 7.8
 * Wed 9.0
 * Thu 10.0
 * Fri 8.2
 * Sat 10.5
 * Sun 7.5
 *
 * Total = 60.0 kWh
 *
 * Renewable share:
 *
 * 60 / 126.8 × 100 = 47.3%
 */

const WEEKLY_DATA = [
    {
        day: "Mon",
        consumption: 17.2,
        solar: 7.0,
    },
    {
        day: "Tue",
        consumption: 16.8,
        solar: 7.8,
    },
    {
        day: "Wed",
        consumption: 17.5,
        solar: 9.0,
    },
    {
        day: "Thu",
        consumption: 18.1,
        solar: 10.0,
    },
    {
        day: "Fri",
        consumption: 17.0,
        solar: 8.2,
    },
    {
        day: "Sat",
        consumption: 22.4,
        solar: 10.5,
    },
    {
        day: "Sun",
        consumption: 17.8,
        solar: 7.5,
    },
];


const WEEKLY_CONSUMPTION = Number(
    WEEKLY_DATA.reduce(
        (total, item) => total + item.consumption,
        0
    ).toFixed(1)
);


const WEEKLY_SOLAR = Number(
    WEEKLY_DATA.reduce(
        (total, item) => total + item.solar,
        0
    ).toFixed(1)
);


const RENEWABLE_SHARE = Number(
    ((WEEKLY_SOLAR / WEEKLY_CONSUMPTION) * 100).toFixed(1)
);


const PEAK_DAY = WEEKLY_DATA.reduce(
    (peak, item) =>
        item.consumption > peak.consumption
            ? item
            : peak,
    WEEKLY_DATA[0]
);


/* =========================================================
   ANALYTICS CARD
   ========================================================= */

function EnergyAnalyticsCard() {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-surface-soft/45
                shadow-card
                transition-all
                duration-500
                hover:shadow-hover
            "
        >
            {/* =====================================================
                AMBIENT GLOW
               ===================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-72
                    w-72
                    rounded-full
                    bg-secondary/6
                    blur-[100px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    -left-32
                    h-64
                    w-64
                    rounded-full
                    bg-primary/5
                    blur-[100px]
                "
            />


            {/* =====================================================
                HEADER
               ===================================================== */}

            <div
                className="
                    relative
                    flex
                    items-center
                    justify-between
                    border-b
                    border-border
                    bg-surface/75
                    px-5
                    py-4
                    sm:px-7
                    sm:py-5
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
                        <Zap className="h-4 w-4" />
                    </div>

                    <div>
                        <p className="text-[10px] text-text-muted">
                            Energy analytics
                        </p>

                        <p className="mt-0.5 text-sm font-semibold text-text">
                            Weekly overview
                        </p>
                    </div>
                </div>


                <div
                    className="
                        flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-secondary/10
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-secondary
                    "
                >
                    <ArrowDownRight className="h-3 w-3" />

                    8.4%

                    <span className="hidden sm:inline">
                        lower
                    </span>
                </div>
            </div>


            {/* =====================================================
                TOP METRICS
               ===================================================== */}

            <div
                className="
                    relative
                    grid
                    grid-cols-2
                    border-b
                    border-border
                    bg-surface/40
                "
            >
                <AnalyticsMetric
                    icon={BatteryCharging}
                    iconClass="bg-primary/10 text-primary"
                    label="Weekly consumption"
                    value={WEEKLY_CONSUMPTION}
                    unit="kWh"
                    trend="12.4% lower"
                    trendIcon={ArrowDownRight}
                    trendClass="text-success"
                    bordered
                />

                <AnalyticsMetric
                    icon={Sun}
                    iconClass="bg-solar/10 text-solar"
                    label="Renewable share"
                    value={RENEWABLE_SHARE}
                    unit="%"
                    trend="6.8% higher"
                    trendIcon={ArrowUpRight}
                    trendClass="text-secondary"
                />
            </div>


            {/* =====================================================
                CHART AREA
               ===================================================== */}

            <div
                className="
                    relative
                    m-3
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-[#fbfaf8]
                    sm:m-4
                "
            >
                {/* Chart header */}

                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        border-b
                        border-border
                        px-4
                        py-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        sm:px-5
                    "
                >
                    <div>
                        <p className="text-xs font-semibold text-text">
                            Daily energy flow
                        </p>

                        <p className="mt-0.5 text-[10px] text-text-muted">
                            Consumption stays steady with one peak day
                        </p>
                    </div>


                    <div className="flex items-center gap-4">
                        <ChartLegend
                            color="bg-primary"
                            label="Consumption"
                        />

                        <ChartLegend
                            color="bg-solar"
                            label="Solar"
                        />
                    </div>
                </div>


                {/* Chart */}

                <EnergyAnalyticsChart />


                {/* Days */}

                <div
                    className="
                        grid
                        grid-cols-7
                        px-8
                        pb-4
                        text-center
                        text-[9px]
                        font-medium
                        text-text-muted
                        sm:px-10
                        sm:text-[10px]
                    "
                >
                    {WEEKLY_DATA.map((item) => (
                        <span key={item.day}>
                            {item.day}
                        </span>
                    ))}
                </div>
            </div>


            {/* =====================================================
                INSIGHT
               ===================================================== */}

            <div className="relative px-3 pb-3 sm:px-4 sm:pb-4">
                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        rounded-2xl
                        border
                        border-secondary/15
                        bg-secondary/5
                        p-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        sm:p-5
                    "
                >
                    <div className="flex items-start gap-3">
                        <div
                            className="
                                grid
                                h-9
                                w-9
                                shrink-0
                                place-items-center
                                rounded-xl
                                bg-secondary/10
                                text-secondary
                            "
                        >
                            <CircleDollarSign className="h-4 w-4" />
                        </div>

                        <div>
                            <p
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.12em]
                                    text-secondary
                                "
                            >
                                Smart insight
                            </p>

                            <p
                                className="
                                    mt-1
                                    max-w-md
                                    text-xs
                                    leading-5
                                    text-text-secondary
                                    sm:text-sm
                                "
                            >
                                Saturday reached the week's highest demand
                                at {PEAK_DAY.consumption.toFixed(1)} kWh.
                                Solar supplied {RENEWABLE_SHARE}% of weekly
                                consumption.
                            </p>
                        </div>
                    </div>


                    <div
                        className="
                            shrink-0
                            border-t
                            border-secondary/10
                            pt-3
                            sm:border-l
                            sm:border-t-0
                            sm:pl-5
                            sm:pt-0
                        "
                    >
                        <p className="text-[10px] text-text-muted">
                            Est. monthly savings
                        </p>

                        <p className="mt-0.5 text-base font-semibold text-text">
                            ₹1,240
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


/* =========================================================
   ANALYTICS METRIC
   ========================================================= */

function AnalyticsMetric({
    icon: Icon,
    iconClass,
    label,
    value,
    unit,
    trend,
    trendIcon: TrendIcon,
    trendClass,
    bordered = false,
}) {
    return (
        <div
            className={`
                p-5
                sm:p-6
                ${bordered ? "border-r border-border" : ""}
            `}
        >
            <div className="flex items-center gap-2.5">
                <div
                    className={`
                        grid
                        h-8
                        w-8
                        place-items-center
                        rounded-lg
                        ${iconClass}
                    `}
                >
                    <Icon className="h-4 w-4" />
                </div>

                <span className="text-[10px] text-text-muted sm:text-xs">
                    {label}
                </span>
            </div>


            <div className="mt-4 flex items-baseline gap-1.5">
                <span
                    className="
                        text-3xl
                        font-semibold
                        tracking-tight
                        text-text
                        sm:text-4xl
                    "
                >
                    {value}
                </span>

                <span className="text-[10px] text-text-muted sm:text-xs">
                    {unit}
                </span>
            </div>


            <div
                className={`
                    mt-2
                    flex
                    items-center
                    gap-1
                    text-[10px]
                    font-medium
                    ${trendClass}
                `}
            >
                {TrendIcon && (
                    <TrendIcon className="h-3 w-3" />
                )}

                {trend}

                <span className="text-text-muted">
                    vs last week
                </span>
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

            <span className="text-[9px] text-text-muted sm:text-[10px]">
                {label}
            </span>
        </div>
    );
}


/* =========================================================
   ENERGY ANALYTICS CHART
   ========================================================= */

function EnergyAnalyticsChart() {
    const maxValue = 25;
    const chartHeight = 220;

    const left = 12;
    const right = 700;
    const top = 12;
    const bottom = chartHeight;

    const chartWidth = right - left;

    const getX = (index) => {
        return (
            left +
            (index / (WEEKLY_DATA.length - 1)) *
                chartWidth
        );
    };

    const getY = (value) => {
        return (
            top +
            ((maxValue - value) / maxValue) *
                (bottom - top)
        );
    };


    const consumptionPoints = WEEKLY_DATA.map(
        (item, index) => ({
            x: getX(index),
            y: getY(item.consumption),
            value: item.consumption,
        })
    );


    const solarPoints = WEEKLY_DATA.map(
        (item, index) => ({
            x: getX(index),
            y: getY(item.solar),
            value: item.solar,
        })
    );


    const createSmoothPath = (points) => {
        if (points.length === 0) return "";

        if (points.length === 1) {
            return `M ${points[0].x} ${points[0].y}`;
        }

        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];

            const previous =
                points[i - 1] || current;

            const following =
                points[i + 2] || next;

            const control1X =
                current.x +
                (next.x - previous.x) / 6;

            const control1Y =
                current.y +
                (next.y - previous.y) / 6;

            const control2X =
                next.x -
                (following.x - current.x) / 6;

            const control2Y =
                next.y -
                (following.y - current.y) / 6;

            path += `
                C
                ${control1X} ${control1Y},
                ${control2X} ${control2Y},
                ${next.x} ${next.y}
            `;
        }

        return path;
    };


    const consumptionPath =
        createSmoothPath(consumptionPoints);

    const solarPath =
        createSmoothPath(solarPoints);


    const consumptionArea = `
        ${consumptionPath}
        L ${consumptionPoints[consumptionPoints.length - 1].x} ${bottom}
        L ${consumptionPoints[0].x} ${bottom}
        Z
    `;


    const solarArea = `
        ${solarPath}
        L ${solarPoints[solarPoints.length - 1].x} ${bottom}
        L ${solarPoints[0].x} ${bottom}
        Z
    `;


    const peakIndex = WEEKLY_DATA.findIndex(
        (item) =>
            item.consumption === PEAK_DAY.consumption
    );


    const peakPoint =
        consumptionPoints[peakIndex];


    return (
        <div className="relative h-64 px-3 pt-5 sm:h-72 sm:px-5">
            {/* =====================================================
                Y AXIS
               ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-8
                    left-3
                    top-5
                    flex
                    flex-col
                    justify-between
                    text-[8px]
                    font-medium
                    text-text-muted
                    sm:left-5
                    sm:text-[9px]
                "
            >
                <span>25</span>
                <span>20</span>
                <span>15</span>
                <span>10</span>
                <span>5</span>
                <span>0</span>
            </div>


            {/* =====================================================
                CHART PLOT
               ===================================================== */}

            <div
                className="
                    absolute
                    bottom-8
                    left-10
                    right-3
                    top-5
                    sm:left-12
                    sm:right-5
                "
            >
                {/* =================================================
                    GRID
                   ================================================= */}

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
                    <span className="h-px w-full bg-border/70" />
                    <span className="h-px w-full bg-border/55" />
                    <span className="h-px w-full bg-border/55" />
                    <span className="h-px w-full bg-border/55" />
                    <span className="h-px w-full bg-border/55" />
                    <span className="h-px w-full bg-border/70" />
                </div>


                {/* Vertical grid */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        opacity-40
                        [background-image:linear-gradient(to_right,rgb(148_163_184/0.10)_1px,transparent_1px)]
                        [background-size:16.666%_100%]
                    "
                />


                {/* =================================================
                    PEAK DAY HIGHLIGHT
                   ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-0
                        top-0
                        w-[14.285%]
                        -translate-x-1/2
                        bg-primary/[0.035]
                    "
                    style={{
                        left: `${(peakIndex / 6) * 100}%`,
                    }}
                />


                {/* =================================================
                    SVG
                   ================================================= */}

                <svg
                    viewBox={`0 0 ${right} ${chartHeight}`}
                    preserveAspectRatio="none"
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                    "
                    aria-label="
                        Weekly energy consumption and solar generation.
                        Saturday has the highest consumption.
                    "
                >
                    <defs>
                        {/* Consumption fill */}

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
                                stopOpacity="0.13"
                            />

                            <stop
                                offset="100%"
                                stopColor="rgb(108 29 95)"
                                stopOpacity="0"
                            />
                        </linearGradient>


                        {/* Solar fill */}

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
                                stopOpacity="0.16"
                            />

                            <stop
                                offset="100%"
                                stopColor="rgb(245 183 0)"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>


                    {/* =================================================
                        SOLAR AREA
                       ================================================= */}

                    <path
                        d={solarArea}
                        fill="url(#solarFill)"
                    />


                    {/* =================================================
                        CONSUMPTION AREA
                       ================================================= */}

                    <path
                        d={consumptionArea}
                        fill="url(#consumptionFill)"
                    />


                    {/* =================================================
                        SOLAR LINE
                       ================================================= */}

                    <path
                        d={solarPath}
                        fill="none"
                        stroke="rgb(245 183 0)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />


                    {/* =================================================
                        CONSUMPTION LINE
                       ================================================= */}

                    <path
                        d={consumptionPath}
                        fill="none"
                        stroke="rgb(108 29 95)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />


                    {/* =================================================
                        DAILY CONSUMPTION POINTS
                       ================================================= */}

                    {consumptionPoints.map(
                        (point, index) => {
                            const isPeak =
                                index === peakIndex;

                            return (
                                <g key={`consumption-${index}`}>
                                    {isPeak && (
                                        <circle
                                            cx={point.x}
                                            cy={point.y}
                                            r="11"
                                            fill="rgb(108 29 95)"
                                            fillOpacity="0.10"
                                        />
                                    )}

                                    <circle
                                        cx={point.x}
                                        cy={point.y}
                                        r={isPeak ? 5 : 3}
                                        fill="rgb(108 29 95)"
                                    />
                                </g>
                            );
                        }
                    )}


                    {/* =================================================
                        SOLAR POINTS
                       ================================================= */}

                    {solarPoints.map(
                        (point, index) => (
                            <circle
                                key={`solar-${index}`}
                                cx={point.x}
                                cy={point.y}
                                r="3"
                                fill="rgb(245 183 0)"
                            />
                        )
                    )}


                    {/* =================================================
                        PEAK GUIDE
                       ================================================= */}

                    <line
                        x1={peakPoint.x}
                        y1={peakPoint.y}
                        x2={peakPoint.x}
                        y2={bottom}
                        stroke="rgb(108 29 95)"
                        strokeOpacity="0.20"
                        strokeDasharray="4 5"
                    />
                </svg>


                {/* =================================================
                    PEAK LABEL
                   ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -translate-x-1/2
                        -translate-y-full
                        rounded-xl
                        border
                        border-primary/15
                        bg-surface
                        px-3
                        py-2
                        shadow-sm
                    "
                    style={{
                        left: `${(peakIndex / 6) * 100}%`,
                        top: `${(peakPoint.y / chartHeight) * 100}%`,
                    }}
                >
                    <div className="flex items-center gap-1.5">
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-primary
                            "
                        />

                        <span
                            className="
                                text-[9px]
                                font-semibold
                                text-primary
                            "
                        >
                            Peak demand
                        </span>
                    </div>

                    <p
                        className="
                            mt-0.5
                            whitespace-nowrap
                            text-xs
                            font-semibold
                            text-text
                        "
                    >
                        {PEAK_DAY.consumption.toFixed(1)} kWh
                    </p>

                    <p className="text-[9px] text-text-muted">
                        {PEAK_DAY.day}
                    </p>
                </div>
            </div>
        </div>
    );
}