import {
    ArrowUpRight,
    BarChart3,
    Building2,
    Check,
    Home as HomeIcon,
    Leaf,
    Sun,
    Zap,
} from "lucide-react";

const audiences = [
    {
        type: "Homes",
        eyebrow: "FOR YOUR HOME",
        title: "Know where your\nenergy goes.",
        description:
            "See household consumption, renewable generation, and peak usage in one simple view.",
        icon: HomeIcon,
        visualIcon: Sun,
        metric: "47%",
        metricLabel: "renewable usage",
        accent: "secondary",
        points: [
            "Track household consumption",
            "Monitor solar generation",
            "Understand peak usage",
        ],
    },
    {
        type: "Businesses",
        eyebrow: "FOR YOUR BUSINESS",
        title: "Turn energy into\nan advantage.",
        description:
            "Understand operational energy patterns and find opportunities to improve efficiency and reduce waste.",
        icon: Building2,
        visualIcon: BarChart3,
        metric: "18.6%",
        metricLabel: "efficiency improvement",
        accent: "primary",
        points: [
            "Monitor operational energy use",
            "Identify inefficient patterns",
            "Improve energy performance",
        ],
    },
];

export default function WhoItsFor() {
    return (
        <section
            id="who-its-for"
            className="
                relative
                overflow-hidden
                bg-app-bg
                py-24
                sm:py-28
                lg:py-36
            "
        >
            {/* =========================================================
                BACKGROUND ATMOSPHERE
               ========================================================= */}

            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute
                        -left-48
                        top-1/3
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-secondary/5
                        blur-[130px]
                    "
                />

                <div
                    className="
                        absolute
                        -right-48
                        bottom-0
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-primary/5
                        blur-[130px]
                    "
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

                {/* =====================================================
                    HEADER
                   ===================================================== */}

                <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">

                    <div>
                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-secondary
                                sm:text-sm
                            "
                        >
                            Who it's for
                        </p>

                        <div className="mt-4 h-1 w-12 rounded-full bg-secondary" />

                        <p
                            className="
                                mt-6
                                max-w-xs
                                text-sm
                                leading-6
                                text-text-muted
                            "
                        >
                            One platform, adapted to the way different
                            environments use energy.
                        </p>
                    </div>

                    <div>
                        <h2
                            className="
                                max-w-4xl
                                text-4xl
                                font-semibold
                                leading-[1.02]
                                tracking-[-0.04em]
                                text-text
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            Built around how
                            <br />
                            you use{" "}
                            <span className="text-primary">
                                energy.
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
                            Whether you're powering a home or running a
                            business, UrjaSathi turns your energy data into
                            something you can actually understand and act on.
                        </p>
                    </div>
                </div>


                {/* =====================================================
                    AUDIENCE PANELS
                   ===================================================== */}

                <div
                    className="
                        mt-16
                        grid
                        gap-6
                        lg:mt-20
                        lg:grid-cols-2
                        lg:gap-8
                    "
                >
                    {audiences.map((audience) => {
                        const Icon = audience.icon;
                        const VisualIcon = audience.visualIcon;
                        const isPrimary = audience.accent === "primary";

                        return (
                            <article
                                key={audience.type}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-border
                                    bg-surface
                                    shadow-card
                                    transition-all
                                    duration-500
                                    hover:-translate-y-1
                                    hover:shadow-hover
                                "
                            >
                                {/* =================================================
                                    ATMOSPHERE
                                   ================================================= */}

                                <div
                                    className={`
                                        pointer-events-none
                                        absolute
                                        -right-32
                                        -top-32
                                        h-96
                                        w-96
                                        rounded-full
                                        blur-[110px]
                                        ${
                                            isPrimary
                                                ? "bg-primary/10"
                                                : "bg-secondary/10"
                                        }
                                    `}
                                />

                                <div className="relative">

                                    {/* =================================================
                                        TOP BAR
                                       ================================================= */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            border-b
                                            border-border
                                            px-6
                                            py-5
                                            sm:px-8
                                        "
                                    >
                                        <div className="flex items-center gap-3">

                                            <div
                                                className={`
                                                    grid
                                                    h-9
                                                    w-9
                                                    place-items-center
                                                    rounded-lg
                                                    ${
                                                        isPrimary
                                                            ? "bg-primary/10 text-primary"
                                                            : "bg-secondary/10 text-secondary"
                                                    }
                                                `}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </div>

                                            <span
                                                className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-[0.16em]
                                                    text-text-muted
                                                "
                                            >
                                                {audience.eyebrow}
                                            </span>
                                        </div>

                                        <ArrowUpRight
                                            className={`
                                                h-5
                                                w-5
                                                text-text-muted
                                                transition-all
                                                duration-300
                                                group-hover:-translate-y-0.5
                                                group-hover:translate-x-0.5
                                                ${
                                                    isPrimary
                                                        ? "group-hover:text-primary"
                                                        : "group-hover:text-secondary"
                                                }
                                            `}
                                        />
                                    </div>


                                    {/* =================================================
                                        CONTENT
                                       ================================================= */}

                                    <div className="p-6 sm:p-8 lg:p-10">

                                        <div className="grid gap-10 sm:grid-cols-[1fr_auto]">

                                            {/* Text */}

                                            <div>
                                                <h3
                                                    className="
                                                        whitespace-pre-line
                                                        text-3xl
                                                        font-semibold
                                                        leading-[1.04]
                                                        tracking-[-0.035em]
                                                        text-text
                                                        sm:text-4xl
                                                    "
                                                >
                                                    {audience.title}
                                                </h3>

                                                <p
                                                    className="
                                                        mt-5
                                                        max-w-md
                                                        text-sm
                                                        leading-7
                                                        text-text-secondary
                                                        sm:text-base
                                                    "
                                                >
                                                    {audience.description}
                                                </p>
                                            </div>


                                            {/* =================================================
                                                BIG METRIC
                                               ================================================= */}

                                            <div
                                                className={`
                                                    flex
                                                    min-w-[130px]
                                                    flex-col
                                                    justify-end
                                                    rounded-2xl
                                                    border
                                                    border-border
                                                    bg-app-bg
                                                    p-5
                                                    sm:min-w-[145px]
                                                `}
                                            >
                                                <div
                                                    className={`
                                                        grid
                                                        h-10
                                                        w-10
                                                        place-items-center
                                                        rounded-xl
                                                        ${
                                                            isPrimary
                                                                ? "bg-primary/10 text-primary"
                                                                : "bg-secondary/10 text-secondary"
                                                        }
                                                    `}
                                                >
                                                    <VisualIcon className="h-5 w-5" />
                                                </div>

                                                <p
                                                    className={`
                                                        mt-6
                                                        text-3xl
                                                        font-semibold
                                                        tracking-[-0.04em]
                                                        ${
                                                            isPrimary
                                                                ? "text-primary"
                                                                : "text-secondary"
                                                        }
                                                    `}
                                                >
                                                    {audience.metric}
                                                </p>

                                                <p className="mt-1 text-[11px] leading-4 text-text-muted">
                                                    {audience.metricLabel}
                                                </p>
                                            </div>
                                        </div>


                                        {/* =================================================
                                            POINTS
                                           ================================================= */}

                                        <div
                                            className="
                                                mt-10
                                                grid
                                                gap-3
                                                border-t
                                                border-border
                                                pt-7
                                                sm:grid-cols-3
                                            "
                                        >
                                            {audience.points.map((point) => (
                                                <div
                                                    key={point}
                                                    className="
                                                        flex
                                                        items-start
                                                        gap-2.5
                                                    "
                                                >
                                                    <span
                                                        className={`
                                                            mt-0.5
                                                            grid
                                                            h-5
                                                            w-5
                                                            shrink-0
                                                            place-items-center
                                                            rounded-full
                                                            ${
                                                                isPrimary
                                                                    ? "bg-primary/10 text-primary"
                                                                    : "bg-secondary/10 text-secondary"
                                                            }
                                                        `}
                                                    >
                                                        <Check className="h-3 w-3" />
                                                    </span>

                                                    <span
                                                        className="
                                                            text-xs
                                                            leading-5
                                                            text-text-secondary
                                                        "
                                                    >
                                                        {point}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>


                {/* =====================================================
                    BOTTOM STATEMENT
                   ===================================================== */}

                <div
                    className="
                        mt-8
                        flex
                        flex-col
                        gap-5
                        border-t
                        border-border
                        pt-7
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        sm:pt-8
                    "
                >
                    <div className="flex items-center gap-3">

                        <div
                            className="
                                grid
                                h-9
                                w-9
                                place-items-center
                                rounded-full
                                bg-secondary/10
                                text-secondary
                            "
                        >
                            <Leaf className="h-4 w-4" />
                        </div>

                        <p className="text-sm text-text-muted sm:text-base">
                            Different environments.
                            <span className="ml-1 font-medium text-text">
                                One intelligent energy platform.
                            </span>
                        </p>

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-text-muted
                        "
                    >
                        <span className="h-2 w-2 rounded-full bg-secondary" />
                        Smarter energy, everywhere
                    </div>

                </div>

            </div>
        </section>
    );
}