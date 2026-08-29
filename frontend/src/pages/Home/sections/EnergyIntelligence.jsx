import {
    ArrowUpRight,
    BatteryCharging,
    CircleDollarSign,
    Gauge,
    Sun,
    TrendingDown,
} from "lucide-react";

export default function EnergyIntelligence() {
    return (
        <section
            className="
                relative
                overflow-hidden
                bg-surface
                py-24
                sm:py-28
                lg:py-36
            "
        >
            {/* =========================================================
                BACKGROUND
               ========================================================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
                        absolute
                        -left-56
                        top-1/3
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
                        -right-56
                        bottom-0
                        h-[420px]
                        w-[420px]
                        rounded-full
                        bg-primary/5
                        blur-[130px]
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
                {/* =====================================================
                    HEADER
                   ===================================================== */}

                <div className="max-w-3xl">
                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-primary
                            sm:text-sm
                        "
                    >
                        Energy intelligence
                    </p>

                    <div className="mt-4 h-1 w-12 rounded-full bg-primary" />

                    <h2
                        className="
                            mt-7
                            text-4xl
                            font-semibold
                            leading-[1.04]
                            tracking-[-0.04em]
                            text-text
                            sm:text-5xl
                            lg:text-6xl
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
                        clear picture of what's happening, where energy is
                        being used, and where you can improve.
                    </p>
                </div>

                {/* =====================================================
                    MAIN CONTENT
                   ===================================================== */}

                <div
                    className="
                        mt-16
                        grid
                        gap-12
                        lg:mt-20
                        lg:grid-cols-[0.78fr_1.22fr]
                        lg:items-center
                        lg:gap-20
                    "
                >
                    {/* =================================================
                        LEFT — BENEFITS
                       ================================================= */}

                    <div className="space-y-8">
                        <IntelligencePoint
                            icon={Gauge}
                            title="Know your consumption"
                            description="See exactly how much energy you're using and how your usage changes throughout the day."
                        />

                        <IntelligencePoint
                            icon={Sun}
                            title="Track renewable generation"
                            description="Understand how much of your energy comes from solar and how effectively you're using it."
                        />

                        <IntelligencePoint
                            icon={TrendingDown}
                            title="Find opportunities to save"
                            description="Identify inefficient patterns and discover where smarter energy decisions can make an impact."
                        />
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
    title,
    description,
}) {
    return (
        <div className="group flex gap-4">
            <div
                className="
                    mt-0.5
                    grid
                    h-11
                    w-11
                    shrink-0
                    place-items-center
                    rounded-xl
                    border
                    border-primary/10
                    bg-primary/10
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

            <div>
                <h3
                    className="
                        text-base
                        font-semibold
                        tracking-tight
                        text-text
                        sm:text-lg
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-2
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
   ANALYTICS CARD
   ========================================================= */

function EnergyAnalyticsCard() {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-app-bg
                shadow-card
                transition-shadow
                duration-500
                hover:shadow-hover
                sm:rounded-3xl
            "
        >
            {/* Ambient glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-72
                    w-72
                    rounded-full
                    bg-secondary/5
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
                    px-5
                    py-4
                    sm:px-7
                    sm:py-5
                "
            >
                <div>
                    <p className="text-xs text-text-muted">
                        Energy analytics
                    </p>

                    <p className="mt-1 text-base font-semibold text-text">
                        Weekly overview
                    </p>
                </div>

                <span
                    className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-success/10
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-success
                    "
                >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    8.4%
                </span>
            </div>


            {/* =====================================================
                METRICS
               ===================================================== */}

            <div
                className="
                    relative
                    grid
                    grid-cols-2
                    border-b
                    border-border
                "
            >
                <AnalyticsMetric
                    icon={BatteryCharging}
                    iconClass="bg-secondary/10 text-secondary"
                    label="Consumption"
                    value="126.8"
                    unit="kWh"
                    trend="↓ 12.4% vs last week"
                    trendClass="text-success"
                    bordered
                />

                <AnalyticsMetric
                    icon={Sun}
                    iconClass="bg-solar/10 text-solar"
                    label="Renewable"
                    value="47.3"
                    unit="%"
                    trend="↑ 6.8% vs last week"
                    trendClass="text-secondary"
                />
            </div>


            {/* =====================================================
                CHART
               ===================================================== */}

            <div className="relative p-5 sm:p-7">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-xs text-text-muted">
                            Daily energy flow
                        </p>

                        <p className="mt-1 text-sm font-semibold text-text">
                            This week
                        </p>
                    </div>

                    <span className="text-xs text-text-muted">
                        kWh
                    </span>
                </div>

                <EnergyAnalyticsChart />

                {/* Days */}

                <div
                    className="
                        mt-3
                        flex
                        justify-between
                        px-1
                        text-[10px]
                        text-text-muted
                    "
                >
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>


                {/* Insight */}

                <div
                    className="
                        mt-6
                        flex
                        flex-col
                        gap-4
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                grid
                                h-9
                                w-9
                                shrink-0
                                place-items-center
                                rounded-lg
                                bg-action/10
                                text-action
                            "
                        >
                            <CircleDollarSign className="h-4 w-4" />
                        </div>

                        <div>
                            <p className="text-xs text-text-muted">
                                Estimated savings
                            </p>

                            <p className="mt-0.5 text-sm font-semibold text-text">
                                ₹1,240 this month
                            </p>
                        </div>
                    </div>

                    <span
                        className="
                            pl-12
                            text-xs
                            font-semibold
                            text-secondary
                            sm:pl-0
                        "
                    >
                        On track
                    </span>
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
    trendClass,
    bordered = false,
}) {
    return (
        <div
            className={`
                p-5
                sm:p-7
                ${bordered ? "border-r border-border" : ""}
            `}
        >
            <div className="flex items-center gap-2">
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

                <span className="text-xs text-text-muted">
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

                <span className="text-xs text-text-muted">
                    {unit}
                </span>
            </div>

            <p className={`mt-2 text-xs ${trendClass}`}>
                {trend}
            </p>
        </div>
    );
}


/* =========================================================
   ANALYTICS CHART
   ========================================================= */

function EnergyAnalyticsChart() {
    return (
        <div className="relative mt-6 h-52">
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
            </div>

            {/* SVG */}

            <svg
                viewBox="0 0 700 220"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient
                        id="analyticsFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="rgb(1 172 159)"
                            stopOpacity="0.20"
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
                        M0 155
                        C45 145 65 120 105 130
                        C145 140 170 165 215 145
                        C260 125 275 80 320 95
                        C365 110 385 145 425 125
                        C465 105 490 65 535 78
                        C580 91 600 125 635 105
                        C665 88 685 70 700 48
                        L700 220
                        L0 220
                        Z
                    "
                    fill="url(#analyticsFill)"
                />

                <path
                    d="
                        M0 155
                        C45 145 65 120 105 130
                        C145 140 170 165 215 145
                        C260 125 275 80 320 95
                        C365 110 385 145 425 125
                        C465 105 490 65 535 78
                        C580 91 600 125 635 105
                        C665 88 685 70 700 48
                    "
                    fill="none"
                    stroke="rgb(1 172 159)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                <circle
                    cx="700"
                    cy="48"
                    r="5"
                    fill="rgb(1 172 159)"
                />

                <circle
                    cx="700"
                    cy="48"
                    r="10"
                    fill="rgb(1 172 159)"
                    fillOpacity="0.12"
                />
            </svg>
        </div>
    );
}