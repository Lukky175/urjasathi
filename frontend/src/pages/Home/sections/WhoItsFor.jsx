import {
    ArrowUpRight,
    Check,
    GraduationCap,
    Hospital,
    Home,
    Landmark,
    Leaf,
    Store,
} from "lucide-react";

const audiences = [
    {
        id: "homes",
        eyebrow: "RESIDENTIAL",
        title: "Homes",
        description:
            "Give households a clear view of consumption, solar generation, and everyday energy patterns.",
        icon: Home,
        accent: "secondary",
        featured: true,
        capabilities: [
            "Track household consumption",
            "Monitor solar generation",
            "Identify peak usage",
        ],
    },

    {
        id: "commercial",
        eyebrow: "COMMERCIAL",
        title: "Commercial buildings",
        description:
            "Turn operational energy data into actionable insights for offices, retail spaces, and commercial facilities.",
        icon: Store,
        accent: "primary",
        featured: true,
        capabilities: [
            "Monitor operational demand",
            "Detect inefficient patterns",
            "Optimize energy usage",
        ],
    },

    {
        id: "institutions",
        eyebrow: "INSTITUTIONS",
        title: "Institutions",
        description:
            "Help campuses and institutions understand where energy is being consumed and where efficiency can improve.",
        icon: GraduationCap,
        accent: "secondary",
        capabilities: [
            "Monitor multiple facilities",
            "Understand usage patterns",
            "Improve operational efficiency",
        ],
    },

    {
        id: "government",
        eyebrow: "PUBLIC INFRASTRUCTURE",
        title: "Government offices",
        description:
            "Enable public facilities to measure energy performance, reduce waste, and make informed operational decisions.",
        icon: Landmark,
        accent: "primary",
        capabilities: [
            "Track facility performance",
            "Identify high-demand periods",
            "Support energy-saving initiatives",
        ],
    },

    {
        id: "hospitals",
        eyebrow: "CRITICAL FACILITIES",
        title: "Hospitals & healthcare",
        description:
            "Maintain visibility over energy-intensive operations while supporting reliable and efficient facility management.",
        icon: Hospital,
        accent: "primary",
        capabilities: [
            "Monitor critical consumption",
            "Understand demand behaviour",
            "Improve energy planning",
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
                py-20
                sm:py-24
                lg:py-28
            "
        >
            {/* =========================================================
                BACKGROUND ATMOSPHERE
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
                        -left-72
                        top-1/4
                        h-[620px]
                        w-[620px]
                        rounded-full
                        bg-secondary/5
                        blur-[150px]
                    "
                />

                <div
                    className="
                        absolute
                        -right-72
                        bottom-0
                        h-[620px]
                        w-[620px]
                        rounded-full
                        bg-primary/5
                        blur-[150px]
                    "
                />

                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[500px]
                        w-[700px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-white/40
                        blur-[120px]
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
                    lg:px-10
                "
            >
                {/* =====================================================
                    SECTION INTRO
                   ===================================================== */}

                <div
                    className="
                        grid
                        gap-8
                        lg:grid-cols-[0.7fr_1.3fr]
                        lg:items-end
                        lg:gap-16
                    "
                >
                    {/* Left intro */}

                    <div>
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-secondary/15
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
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-secondary
                                "
                            />

                            Built for every environment
                        </div>

                        <p
                            className="
                                mt-6
                                max-w-xs
                                text-sm
                                leading-6
                                text-text-muted
                                sm:text-base
                                sm:leading-7
                            "
                        >
                            From individual homes to large-scale
                            facilities, UrjaSathi adapts to how
                            different environments consume energy.
                        </p>
                    </div>

                    {/* Main heading */}

                    <div>
                        <h2
                            className="
                                max-w-5xl
                                text-4xl
                                font-semibold
                                leading-[1.02]
                                tracking-[-0.045em]
                                text-text
                                sm:text-5xl
                                lg:text-[4.2rem]
                            "
                        >
                            One platform.
                            <br />

                            <span className="text-primary">
                                Every place
                            </span>{" "}
                            energy matters.
                        </h2>

                        <p
                            className="
                                mt-6
                                max-w-3xl
                                text-base
                                leading-7
                                text-text-secondary
                                sm:text-lg
                                sm:leading-8
                            "
                        >
                            UrjaSathi brings energy intelligence to the
                            places where people live, work, learn, heal,
                            and serve — turning complex energy data into
                            decisions that are easier to understand and
                            act on.
                        </p>
                    </div>
                </div>

                {/* =====================================================
                    AUDIENCE GRID

                    ROW 1
                    ┌──────────────────┬──────────────────┐
                    │      HOMES       │    COMMERCIAL    │
                    └──────────────────┴──────────────────┘

                    ROW 2
                    ┌────────────┬────────────┬────────────┐
                    │INSTITUTIONS│ GOVERNMENT │ HOSPITALS  │
                    └────────────┴────────────┴────────────┘
                   ===================================================== */}

                <div
                    className="
                        mt-14
                        grid
                        gap-5
                        sm:mt-16
                        sm:grid-cols-2
                        lg:mt-20
                        lg:grid-cols-12
                        lg:gap-6
                    "
                >
                    {audiences.map((audience) => (
                        <AudienceCard
                            key={audience.id}
                            audience={audience}
                        />
                    ))}
                </div>

                {/* =====================================================
                    BOTTOM STATEMENT
                   ===================================================== */}

                <div
                    className="
                        mt-10
                        flex
                        flex-col
                        gap-5
                        border-t
                        border-border
                        pt-7
                        sm:mt-12
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
                                shrink-0
                                place-items-center
                                rounded-full
                                bg-secondary/10
                                text-secondary
                            "
                        >
                            <Leaf className="h-4 w-4" />
                        </div>

                        <p
                            className="
                                text-sm
                                leading-6
                                text-text-muted
                                sm:text-base
                            "
                        >
                            Different environments.
                            <span
                                className="
                                    ml-1
                                    font-medium
                                    text-text
                                "
                            >
                                One intelligent energy platform.
                            </span>
                        </p>
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-text-muted
                            sm:text-xs
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-secondary
                            "
                        />

                        Energy intelligence at every scale
                    </div>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   AUDIENCE CARD
   ========================================================= */

function AudienceCard({ audience }) {
    const Icon = audience.icon;

    const isPrimary = audience.accent === "primary";
    const isFeatured = audience.featured;

    /*
        Desktop layout:

        Featured:
        Homes              Commercial
        col-span-6         col-span-6

        Standard:
        Institutions       Government       Hospitals
        col-span-4         col-span-4        col-span-4
    */

    const gridClass = isFeatured
        ? "lg:col-span-6"
        : "lg:col-span-4";

    return (
        <article
            className={`
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
                ${gridClass}
            `}
        >
            {/* =====================================================
                CARD ATMOSPHERE
               ===================================================== */}

            <div
                aria-hidden="true"
                className={`
                    pointer-events-none
                    absolute
                    -right-28
                    -top-28
                    h-72
                    w-72
                    rounded-full
                    blur-[100px]
                    opacity-70
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    ${
                        isPrimary
                            ? "bg-primary/10"
                            : "bg-secondary/10"
                    }
                `}
            />

            <div
                aria-hidden="true"
                className={`
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-24
                    h-56
                    w-56
                    rounded-full
                    blur-[90px]
                    opacity-40
                    ${
                        isPrimary
                            ? "bg-secondary/5"
                            : "bg-primary/5"
                    }
                `}
            />

            {/* =====================================================
                CARD HEADER
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
                    sm:px-6
                    sm:py-5
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`
                            grid
                            h-10
                            w-10
                            place-items-center
                            rounded-xl
                            transition-all
                            duration-300
                            ${
                                isPrimary
                                    ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                                    : "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white"
                            }
                        `}
                    >
                        <Icon className="h-5 w-5" />
                    </div>

                    <div>
                        <p
                            className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.17em]
                                text-text-muted
                                sm:text-[10px]
                            "
                        >
                            {audience.eyebrow}
                        </p>

                        <p
                            className="
                                mt-0.5
                                text-sm
                                font-medium
                                text-text
                            "
                        >
                            {audience.title}
                        </p>
                    </div>
                </div>

                <div
                    className={`
                        grid
                        h-8
                        w-8
                        place-items-center
                        rounded-full
                        border
                        border-border
                        text-text-muted
                        transition-all
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        ${
                            isPrimary
                                ? "group-hover:border-primary/20 group-hover:text-primary"
                                : "group-hover:border-secondary/20 group-hover:text-secondary"
                        }
                    `}
                >
                    <ArrowUpRight className="h-4 w-4" />
                </div>
            </div>

            {/* =====================================================
                CARD CONTENT
               ===================================================== */}

            <div
                className={`
                    relative
                    ${
                        isFeatured
                            ? "p-6 sm:p-8 lg:p-9"
                            : "p-6 sm:p-7 lg:p-7"
                    }
                `}
            >
                {/* Featured cards */}

                {isFeatured ? (
                    <FeaturedAudienceContent
                        audience={audience}
                        isPrimary={isPrimary}
                    />
                ) : (
                    <StandardAudienceContent
                        audience={audience}
                        isPrimary={isPrimary}
                    />
                )}
            </div>
        </article>
    );
}


/* =========================================================
   FEATURED CONTENT
   ========================================================= */

function FeaturedAudienceContent({
    audience,
    isPrimary,
}) {
    return (
        <div>
            <p
                className={`
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    ${
                        isPrimary
                            ? "text-primary"
                            : "text-secondary"
                    }
                `}
            >
                Energy intelligence for
            </p>

            <h3
                className="
                    mt-3
                    text-3xl
                    font-semibold
                    leading-[1.04]
                    tracking-[-0.04em]
                    text-text
                    sm:text-4xl
                "
            >
                {audience.title}
            </h3>

            <p
                className="
                    mt-4
                    max-w-xl
                    text-sm
                    leading-6
                    text-text-secondary
                    sm:text-base
                    sm:leading-7
                "
            >
                {audience.description}
            </p>

            <CapabilityList
                capabilities={audience.capabilities}
                isPrimary={isPrimary}
                featured
            />
        </div>
    );
}


/* =========================================================
   STANDARD CONTENT
   ========================================================= */

function StandardAudienceContent({
    audience,
    isPrimary,
}) {
    return (
        <div>
            <h3
                className="
                    text-2xl
                    font-semibold
                    leading-tight
                    tracking-[-0.035em]
                    text-text
                    sm:text-3xl
                "
            >
                {audience.title}
            </h3>

            <p
                className="
                    mt-3
                    max-w-xl
                    text-sm
                    leading-6
                    text-text-secondary
                    sm:text-base
                    sm:leading-7
                "
            >
                {audience.description}
            </p>

            <CapabilityList
                capabilities={audience.capabilities}
                isPrimary={isPrimary}
            />
        </div>
    );
}


/* =========================================================
   CAPABILITY LIST
   ========================================================= */

function CapabilityList({
    capabilities,
    isPrimary,
    featured = false,
}) {
    return (
        <div
            className={`
                border-t
                border-border
                ${
                    featured
                        ? "mt-7 pt-6"
                        : "mt-6 pt-5"
                }
                grid
                gap-3
                ${
                    featured
                        ? "sm:grid-cols-3"
                        : "sm:grid-cols-1"
                }
            `}
        >
            {capabilities.map((capability) => (
                <div
                    key={capability}
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
                        {capability}
                    </span>
                </div>
            ))}
        </div>
    );
}