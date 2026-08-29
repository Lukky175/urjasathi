import {
    Activity,
    BarChart3,
    BatteryCharging,
    Gauge,
    Leaf,
    LineChart,
    Sun,
    Zap,
} from "lucide-react";

const capabilities = [
    {
        icon: Activity,
        eyebrow: "MONITORING",
        title: "Real-time energy visibility",
        description:
            "See how energy is being consumed, generated, and exchanged across your property without digging through complicated data.",
        iconClass: "bg-secondary/10 text-secondary",
        accentClass: "group-hover:border-secondary/30",
    },
    {
        icon: Sun,
        eyebrow: "SOLAR",
        title: "Solar generation intelligence",
        description:
            "Understand how much renewable energy your system produces and how effectively that energy is being used.",
        iconClass: "bg-solar/10 text-solar",
        accentClass: "group-hover:border-solar/30",
    },
    {
        icon: BatteryCharging,
        eyebrow: "STORAGE",
        title: "Battery awareness",
        description:
            "Track battery charging, discharging, and available capacity to understand how storage supports your energy needs.",
        iconClass: "bg-secondary/10 text-secondary",
        accentClass: "group-hover:border-secondary/30",
    },
    {
        icon: BarChart3,
        eyebrow: "ANALYTICS",
        title: "Energy analytics",
        description:
            "Turn historical energy data into meaningful patterns, comparisons, and insights that support better decisions.",
        iconClass: "bg-primary/10 text-primary",
        accentClass: "group-hover:border-primary/30",
    },
    {
        icon: Gauge,
        eyebrow: "EFFICIENCY",
        title: "Efficiency intelligence",
        description:
            "Identify inefficient consumption patterns and understand where your property has the greatest opportunity to improve.",
        iconClass: "bg-success/10 text-success",
        accentClass: "group-hover:border-success/30",
    },
    {
        icon: LineChart,
        eyebrow: "FORECASTING",
        title: "Demand forecasting",
        description:
            "Use consumption patterns to anticipate future energy demand and make more informed operational choices.",
        iconClass: "bg-action/10 text-action",
        accentClass: "group-hover:border-action/30",
    },
];

export default function EnergyCapabilities() {
    return (
        <section
            id="capabilities"
            className="
                relative
                overflow-hidden
                bg-surface
                py-24
                sm:py-28
                lg:py-32
            "
        >
            {/* =========================================================
                BACKGROUND
               ========================================================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
                        absolute
                        -right-48
                        top-20
                        h-[440px]
                        w-[440px]
                        rounded-full
                        bg-secondary/5
                        blur-[130px]
                    "
                />

                <div
                    className="
                        absolute
                        -left-48
                        bottom-0
                        h-[440px]
                        w-[440px]
                        rounded-full
                        bg-primary/5
                        blur-[130px]
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
                            tracking-[0.18em]
                            text-primary
                            sm:text-sm
                        "
                    >
                        Built for smarter energy
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
                        Everything you need to
                        <span className="text-primary">
                            {" "}understand energy.
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
                        From everyday consumption to renewable generation,
                        UrjaSathi brings the important parts of your energy
                        ecosystem together in one intelligent platform.
                    </p>
                </div>


                {/* =====================================================
                    CAPABILITY GRID
                   ===================================================== */}

                <div
                    className="
                        mt-16
                        grid
                        gap-5
                        sm:grid-cols-2
                        lg:mt-20
                        lg:grid-cols-3
                    "
                >
                    {capabilities.map((capability, index) => {
                        const Icon = capability.icon;

                        return (
                            <article
                                key={capability.title}
                                className={`
                                    group
                                    relative
                                    flex
                                    min-h-[300px]
                                    flex-col
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-app-bg
                                    p-6
                                    shadow-card
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-hover
                                    ${capability.accentClass}
                                    sm:p-7
                                `}
                            >
                                {/* Top accent */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-x-0
                                        top-0
                                        h-px
                                        bg-gradient-to-r
                                        from-transparent
                                        via-border-strong
                                        to-transparent
                                        opacity-70
                                        transition-opacity
                                        duration-300
                                        group-hover:opacity-100
                                    "
                                />

                                {/* Small index */}

                                <span
                                    className="
                                        absolute
                                        right-6
                                        top-6
                                        text-[10px]
                                        font-semibold
                                        tracking-[0.14em]
                                        text-text-muted
                                        sm:right-7
                                        sm:top-7
                                    "
                                >
                                    0{index + 1}
                                </span>


                                {/* Icon */}

                                <div
                                    className={`
                                        grid
                                        h-12
                                        w-12
                                        place-items-center
                                        rounded-xl
                                        ${capability.iconClass}
                                        transition-all
                                        duration-300
                                        group-hover:scale-105
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>


                                {/* Eyebrow */}

                                <p
                                    className="
                                        mt-7
                                        text-[11px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.16em]
                                        text-text-muted
                                    "
                                >
                                    {capability.eyebrow}
                                </p>


                                {/* Title */}

                                <h3
                                    className="
                                        mt-2
                                        max-w-[18rem]
                                        text-xl
                                        font-semibold
                                        leading-tight
                                        tracking-tight
                                        text-text
                                    "
                                >
                                    {capability.title}
                                </h3>


                                {/* Description */}

                                <p
                                    className="
                                        mt-3
                                        max-w-md
                                        text-sm
                                        leading-6
                                        text-text-secondary
                                    "
                                >
                                    {capability.description}
                                </p>


                                {/* Bottom indicator */}

                                <div
                                    className="
                                        mt-auto
                                        flex
                                        items-center
                                        gap-2
                                        pt-7
                                        text-xs
                                        font-medium
                                        text-text-muted
                                        transition-colors
                                        duration-300
                                        group-hover:text-text
                                    "
                                >
                                    <Zap className="h-3.5 w-3.5" />

                                    Intelligent insight
                                </div>
                            </article>
                        );
                    })}
                </div>


                {/* =====================================================
                    BOTTOM MESSAGE
                   ===================================================== */}

                <div
                    className="
                        mt-10
                        flex
                        flex-col
                        gap-5
                        rounded-2xl
                        border
                        border-border
                        bg-app-bg
                        p-6
                        shadow-card
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        sm:p-7
                    "
                >
                    <div className="flex items-start gap-4">
                        <div
                            className="
                                grid
                                h-10
                                w-10
                                shrink-0
                                place-items-center
                                rounded-full
                                bg-secondary/10
                                text-secondary
                            "
                        >
                            <Leaf className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="font-semibold text-text">
                                One platform. A clearer energy picture.
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    leading-6
                                    text-text-muted
                                "
                            >
                                Connect the dots between consumption,
                                generation, storage, and efficiency.
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-primary
                        "
                    >
                        Smarter energy decisions

                        <Zap className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </section>
    );
}