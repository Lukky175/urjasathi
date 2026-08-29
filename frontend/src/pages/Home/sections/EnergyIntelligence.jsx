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
        <section className="relative overflow-hidden bg-surface py-24 sm:py-28 lg:py-36">
            {/* =========================================================
                BACKGROUND
               ========================================================= */}

            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute
                        -left-52
                        top-1/3
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-secondary/5
                        blur-[130px]
                    "
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

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
                            leading-[1.05]
                            tracking-[-0.035em]
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

                <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">

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
                        RIGHT — ANALYTICS VISUAL
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

            <div>
                <h3 className="font-semibold text-text">
                    {title}
                </h3>

                <p
                    className="
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-text-secondary
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
                sm:rounded-3xl
            "
        >

            {/* =====================================================
                CARD HEADER
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
                        flex
                        items-center
                        gap-1.5
                        rounded-pill
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
                MAIN METRICS
               ===================================================== */}

            <div className="grid grid-cols-2 border-b border-border">

                <div className="border-r border-border p-5 sm:p-7">
                    <div className="flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-secondary/10 text-secondary">
                            <BatteryCharging className="h-4 w-4" />
                        </div>

                        <span className="text-xs text-text-muted">
                            Consumption
                        </span>
                    </div>

                    <div className="mt-4 flex items-baseline gap-1.5">
                        <span className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                            126.8
                        </span>

                        <span className="text-xs text-text-muted">
                            kWh
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-success">
                        ↓ 12.4% vs last week
                    </p>
                </div>


                <div className="p-5 sm:p-7">
                    <div className="flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-solar/10 text-solar">
                            <Sun className="h-4 w-4" />
                        </div>

                        <span className="text-xs text-text-muted">
                            Renewable
                        </span>
                    </div>

                    <div className="mt-4 flex items-baseline gap-1.5">
                        <span className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                            47.3
                        </span>

                        <span className="text-xs text-text-muted">
                            %
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-secondary">
                        ↑ 6.8% vs last week
                    </p>
                </div>

            </div>


            {/* =====================================================
                CHART
               ===================================================== */}

            <div className="p-5 sm:p-7">

                <div className="flex items-center justify-between">
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


                <div className="relative mt-6 h-52">

                    {/* Grid */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                        <span className="h-px w-full bg-border" />
                        <span className="h-px w-full bg-border" />
                        <span className="h-px w-full bg-border" />
                        <span className="h-px w-full bg-border" />
                    </div>


                    {/* Chart */}
                    <svg
                        viewBox="0 0 700 220"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full"
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


                {/* Days */}
                <div
                    className="
                        mt-3
                        flex
                        justify-between
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


                {/* Bottom insight */}
                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-border
                        bg-surface
                        p-4
                    "
                >
                    <div className="flex items-center gap-3">

                        <div
                            className="
                                grid
                                h-9
                                w-9
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

                    <span className="text-xs font-medium text-secondary">
                        On track
                    </span>
                </div>

            </div>
        </div>
    );
}