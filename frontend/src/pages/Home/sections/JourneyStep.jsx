import {
    ArrowDown,
    ArrowRight,
    BatteryCharging,
    Building2,
    Check,
    CircleCheck,
    CircleDollarSign,
    CloudSun,
    Gauge,
    Leaf,
    Lightbulb,
    LineChart,
    ShieldCheck,
    Sparkles,
    Sun,
    TrendingDown,
    TrendingUp,
    Zap,
    Activity,
} from "lucide-react";

import { forwardRef } from "react";


/* =========================================================
   ICON MAP
   ========================================================= */

const iconMap = {
    solar: Sun,
    insights: LineChart,
    optimize: Zap,
    action: Lightbulb,
    impact: Leaf,
    secure: ShieldCheck,
};


/* =========================================================
   HIGHLIGHT WORDS
   ========================================================= */

const highlightWords = {
    "Bring your energy": "energy",
    "See where your energy goes.": "where",
    "Find opportunities to save.": "save",
    "Make smarter energy decisions.": "smarter",
    "Measure what changes.": "what",
};


/* =========================================================
   JOURNEY STEP
   ========================================================= */

const JourneyStep = forwardRef(function JourneyStep(
    {
        step,
        index,
        reverse = false,
        activeStep = 0,
    },
    ref
) {
    const Icon = iconMap[step.icon] || Sparkles;

    const isActive = index === activeStep;
    const distance = Math.abs(index - activeStep);

    const opacityClass = isActive
        ? "opacity-100"
        : distance === 1
            ? "opacity-55"
            : "opacity-25";

    const scaleClass = isActive
        ? "scale-100"
        : "scale-[0.985]";

    return (
        <article
            ref={ref}
            className={`
                group
                relative
                grid
                items-center
                transition-all
                duration-700
                ease-out
                lg:min-h-[410px]
                lg:grid-cols-2
                ${opacityClass}
                ${scaleClass}
            `}
        >

            {/* =====================================================
                CENTRAL TIMELINE
               ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    z-30
                    hidden
                    -translate-x-1/2
                    -translate-y-1/2
                    lg:block
                "
            >
                <div
                    className={`
                        relative
                        grid
                        h-11
                        w-11
                        place-items-center
                        rounded-full
                        border-[4px]
                        border-app-bg
                        transition-all
                        duration-700
                        ${
                            isActive
                                ? "bg-primary shadow-[0_0_0_8px_rgb(108_29_95_/_0.08),0_8px_30px_rgb(108_29_95_/_0.18)]"
                                : "bg-surface-soft"
                        }
                    `}
                >
                    <span
                        className={`
                            h-2.5
                            w-2.5
                            rounded-full
                            transition-all
                            duration-500
                            ${
                                isActive
                                    ? "bg-white"
                                    : "bg-text-muted/50"
                            }
                        `}
                    />

                    {isActive && (
                        <span
                            className="
                                absolute
                                inset-[-8px]
                                rounded-full
                                border
                                border-primary/15
                            "
                        />
                    )}
                </div>
            </div>


            {/* =====================================================
                CONTENT SIDE
               ===================================================== */}

            <div
                className={`
                    relative
                    ${
                        reverse
                            ? "lg:col-start-2 lg:row-start-1"
                            : "lg:col-start-1 lg:row-start-1"
                    }
                `}
            >
                <div
                    className={`
                        max-w-[560px]
                        ${
                            reverse
                                ? "lg:ml-14 xl:ml-20"
                                : "lg:mr-14 xl:mr-20"
                        }
                    `}
                >

                    {/* Step marker */}

                    <div className="flex items-center gap-3">
                        <span
                            className={`
                                inline-flex
                                h-9
                                min-w-9
                                items-center
                                justify-center
                                rounded-full
                                px-2
                                text-[11px]
                                font-bold
                                tracking-wide
                                transition-all
                                duration-500
                                ${
                                    isActive
                                        ? "bg-primary text-white shadow-[0_6px_20px_rgb(108_29_95_/_0.18)]"
                                        : "bg-surface-soft text-text-muted"
                                }
                            `}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-secondary
                                sm:text-xs
                            "
                        >
                            {step.eyebrow}
                        </span>
                    </div>


                    {/* =================================================
                        IMPACT HEADING
                       ================================================= */}

                    <JourneyHeading
                        title={step.title}
                        isActive={isActive}
                    />


                    {/* Description */}

                    <p
                        className="
                            mt-6
                            max-w-xl
                            text-[15px]
                            leading-7
                            text-text-secondary
                            sm:text-lg
                            sm:leading-8
                        "
                    >
                        {step.description}
                    </p>


                    {/* Supporting points */}

                    {step.points?.length > 0 && (
                        <div className="mt-7 space-y-3">
                            {step.points.map((point) => (
                                <div
                                    key={point}
                                    className="
                                        flex
                                        items-start
                                        gap-3
                                        text-sm
                                        leading-6
                                        text-text-secondary
                                    "
                                >
                                    <span
                                        className="
                                            mt-0.5
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

                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    )}


                    {/* Optional action */}

                    {step.action && (
                        <div
                            className="
                                mt-7
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-primary
                                transition-all
                                duration-300
                                hover:gap-3
                            "
                        >
                            {step.action}

                            <ArrowRight className="h-4 w-4" />
                        </div>
                    )}
                </div>
            </div>


            {/* =====================================================
                VISUAL SIDE
               ===================================================== */}

            <div
                className={`
                    mt-12
                    lg:mt-0
                    ${
                        reverse
                            ? "lg:col-start-1 lg:row-start-1"
                            : "lg:col-start-2 lg:row-start-1"
                    }
                `}
            >
                <div
                    className={`
                        relative
                        mx-auto
                        w-full
                        max-w-[560px]
                        transition-all
                        duration-700
                        ${
                            reverse
                                ? "lg:mr-14 xl:mr-20"
                                : "lg:ml-14 xl:ml-20"
                        }
                    `}
                >
                    <JourneyVisual
                        step={step}
                        Icon={Icon}
                        active={isActive}
                    />
                </div>
            </div>
        </article>
    );
});

export default JourneyStep;


/* =========================================================
   JOURNEY HEADING
   ========================================================= */

function JourneyHeading({ title, isActive }) {
    const highlight =
        highlightWords[title] || getHighlightWord(title);

    if (!highlight) {
        return (
            <h3
                className="
                    mt-6
                    max-w-xl
                    text-[2.8rem]
                    font-semibold
                    leading-[0.98]
                    tracking-[-0.055em]
                    text-text
                    sm:text-5xl
                    lg:text-[3.5rem]
                    xl:text-[3.9rem]
                "
            >
                {title}
            </h3>
        );
    }

    const parts = title.split(new RegExp(`(${highlight})`, "i"));

    return (
        <h3
            className="
                mt-6
                max-w-xl
                text-[2.8rem]
                font-semibold
                leading-[0.98]
                tracking-[-0.055em]
                text-text
                sm:text-5xl
                lg:text-[3.5rem]
                xl:text-[3.9rem]
            "
        >
            {parts.map((part, index) => {
                const isHighlighted =
                    part.toLowerCase() ===
                    highlight.toLowerCase();

                if (!isHighlighted) {
                    return (
                        <span key={index}>
                            {part}
                        </span>
                    );
                }

                return (
                    <span
                        key={index}
                        className="
                            relative
                            inline-block
                            text-primary
                        "
                    >

                        {/* Word */}

                        <span className="relative">
                            {part}
                        </span>

                        {/* Underline */}

                        <span
                            aria-hidden="true"
                            className="
                                absolute
                                -bottom-1
                                left-0
                                h-[3px]
                                w-full
                                rounded-full
                                bg-secondary
                                sm:-bottom-1.5
                            "
                        />
                    </span>
                );
            })}
        </h3>
    );
}


/* =========================================================
   FALLBACK HIGHLIGHT
   ========================================================= */

function getHighlightWord(title = "") {
    const words = title
        .replace(/[.!?,]/g, "")
        .split(" ")
        .filter(Boolean);

    const preferred = [
        "energy",
        "where",
        "save",
        "smarter",
        "what",
        "impact",
        "solar",
        "decisions",
    ];

    return (
        preferred.find((word) =>
            words.some(
                (item) =>
                    item.toLowerCase() === word
            )
        ) || null
    );
}


/* =========================================================
   JOURNEY VISUAL
   ========================================================= */

function JourneyVisual({
    step,
    Icon,
    active,
}) {
    return (
        <div
            className={`
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                bg-surface
                shadow-card
                transition-all
                duration-700
                ${
                    active
                        ? "border-primary/25 shadow-hover"
                        : "border-border"
                }
            `}
        >

            {/* =================================================
                GRID
               ================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-80
                    [background-image:linear-gradient(to_right,rgb(148_163_184/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)]
                    [background-size:48px_48px]
                "
            />


            {/* =================================================
                GLOW
               ================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-28
                    -top-28
                    h-72
                    w-72
                    rounded-full
                    bg-primary/10
                    blur-[100px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-28
                    -left-28
                    h-64
                    w-64
                    rounded-full
                    bg-secondary/10
                    blur-[90px]
                "
            />


            {/* =================================================
                CARD HEADER
               ================================================= */}

            <div
                className="
                    relative
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-border
                    px-5
                    py-4
                    sm:px-6
                    sm:py-5
                "
            >
                <div className="flex min-w-0 items-center gap-3">
                    <div
                        className={`
                            grid
                            h-10
                            w-10
                            shrink-0
                            place-items-center
                            rounded-xl
                            transition-all
                            duration-500
                            ${
                                active
                                    ? "bg-primary/10 text-primary"
                                    : "bg-surface-soft text-text-muted"
                            }
                        `}
                    >
                        <Icon className="h-[18px] w-[18px]" />
                    </div>

                    <div className="min-w-0">
                        <p
                            className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-text-muted
                            "
                        >
                            Energy intelligence
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-text">
                            {step.visualTitle ||
                                "Live system view"}
                        </p>
                    </div>
                </div>

                <span
                    className={`
                        shrink-0
                        rounded-full
                        border
                        px-3
                        py-1
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        transition-all
                        duration-500
                        ${
                            active
                                ? "border-secondary/20 bg-secondary/10 text-secondary"
                                : "border-border bg-surface-soft text-text-muted"
                        }
                    `}
                >
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />

                    {active ? "Live" : "Next"}
                </span>
            </div>


            {/* =================================================
                VISUAL AREA
               ================================================= */}

            <div
                className="
                    relative
                    min-h-[285px]
                    px-5
                    py-6
                    sm:min-h-[305px]
                    sm:px-6
                    sm:py-7
                "
            >
                <JourneyDiagram
                    step={step}
                    active={active}
                />
            </div>


            {/* =================================================
                METRICS
               ================================================= */}

            {step.metrics?.length > 0 && (
                <div
                    className="
                        relative
                        grid
                        grid-cols-2
                        gap-px
                        border-t
                        border-border
                        bg-border
                    "
                >
                    {step.metrics
                        .slice(0, 2)
                        .map((metric) => (
                            <div
                                key={metric.label}
                                className="
                                    bg-surface
                                    px-5
                                    py-4
                                    sm:px-6
                                "
                            >
                                <p
                                    className="
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.14em]
                                        text-text-muted
                                    "
                                >
                                    {metric.label}
                                </p>

                                <p
                                    className="
                                        mt-1.5
                                        text-lg
                                        font-semibold
                                        tracking-tight
                                        text-text
                                    "
                                >
                                    {metric.value}
                                </p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}


/* =========================================================
   DIAGRAM ROUTER
   ========================================================= */

function JourneyDiagram({
    step,
    active,
}) {
    const type = step.visual || step.type;

    if (type === "solar") {
        return <SolarDiagram active={active} />;
    }

    if (type === "monitor") {
        return <MonitorDiagram active={active} />;
    }

    if (type === "optimize") {
        return <OptimizeDiagram active={active} />;
    }

    if (type === "action") {
        return <ActionDiagram active={active} />;
    }

    if (type === "impact") {
        return <ImpactDiagram active={active} />;
    }

    return <GenericDiagram active={active} />;
}


/* =========================================================
   SOLAR DIAGRAM
   ========================================================= */

function SolarDiagram({ active }) {
    return (
        <div className="relative flex h-full min-h-[285px] items-center justify-center">

            {/* Outer orbit */}

            <div
                className={`
                    absolute
                    h-52
                    w-52
                    rounded-full
                    border
                    border-secondary/15
                    transition-all
                    duration-700
                    sm:h-60
                    sm:w-60
                    ${
                        active
                            ? "scale-105"
                            : "scale-100"
                    }
                `}
            />

            {/* Dashed orbit */}

            <div
                className="
                    absolute
                    h-64
                    w-64
                    rounded-full
                    border
                    border-dashed
                    border-primary/10
                "
            />


            {/* Sun */}

            <div className="relative z-10">
                <div
                    className={`
                        grid
                        h-28
                        w-28
                        place-items-center
                        rounded-full
                        bg-secondary/10
                        transition-all
                        duration-700
                        ${
                            active
                                ? "scale-110 shadow-[0_0_80px_rgb(1_172_159_/_0.20)]"
                                : ""
                        }
                    `}
                >
                    <Sun className="h-14 w-14 text-secondary" />
                </div>

                {active && (
                    <span
                        className="
                            absolute
                            inset-[-12px]
                            animate-ping
                            rounded-full
                            border
                            border-secondary/15
                        "
                    />
                )}
            </div>


            {/* Solar node */}

            <div className="absolute left-[2%] top-1/2 -translate-y-1/2">
                <MiniVisualNode
                    icon={CloudSun}
                    label="Solar"
                    active={active}
                />
            </div>


            {/* Building node */}

            <div className="absolute right-[2%] top-1/2 -translate-y-1/2">
                <MiniVisualNode
                    icon={Building2}
                    label="Building"
                />
            </div>


            {/* Storage node */}

            <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2">
                <MiniVisualNode
                    icon={BatteryCharging}
                    label="Storage"
                />
            </div>


            {/* Flow lines */}

            <div className="pointer-events-none absolute left-[17%] right-[17%] top-1/2 h-px bg-border" />

            <div className="pointer-events-none absolute bottom-[15%] left-1/2 h-10 w-px bg-border" />


            {/* Status */}

            <div
                className="
                    absolute
                    bottom-0
                    right-0
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-secondary/15
                    bg-secondary/5
                    px-3
                    py-1.5
                    text-[9px]
                    font-semibold
                    text-secondary
                "
            >
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

                Renewable source
            </div>
        </div>
    );
}


/* =========================================================
   MONITOR DIAGRAM
   ========================================================= */

function MonitorDiagram({ active }) {
    const bars = [
        34,
        48,
        42,
        62,
        54,
        74,
        58,
        84,
        68,
        92,
        76,
        66,
    ];

    return (
        <div className="flex h-full min-h-[285px] flex-col justify-center">

            {/* Dashboard */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-surface-soft/70
                    p-4
                    sm:p-5
                "
            >
                {/* Header */}

                <div className="mb-5 flex items-start justify-between">
                    <div>
                        <p
                            className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.15em]
                                text-text-muted
                            "
                        >
                            Live consumption
                        </p>

                        <div className="mt-1 flex items-baseline gap-1.5">
                            <span className="text-3xl font-semibold tracking-tight text-text">
                                18.4
                            </span>

                            <span className="text-[10px] text-text-muted">
                                kWh
                            </span>
                        </div>
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-1
                            rounded-full
                            bg-secondary/10
                            px-2
                            py-1
                            text-[9px]
                            font-semibold
                            text-secondary
                        "
                    >
                        <TrendingDown className="h-3 w-3" />

                        8.4%
                    </div>
                </div>


                {/* Chart */}

                <div className="relative flex h-[130px] items-end gap-1.5">
                    {/* Grid */}

                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                        <span className="h-px bg-border/70" />
                        <span className="h-px bg-border/50" />
                        <span className="h-px bg-border/50" />
                        <span className="h-px bg-border/70" />
                    </div>

                    {bars.map((height, index) => (
                        <div
                            key={index}
                            className="
                                relative
                                z-10
                                flex-1
                                rounded-t-md
                                bg-primary/10
                            "
                            style={{
                                height: `${height}px`,
                            }}
                        >
                            <div
                                className={`
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    rounded-t-md
                                    bg-primary
                                    transition-all
                                    duration-700
                                    ${
                                        active
                                            ? "opacity-100"
                                            : "opacity-30"
                                    }
                                `}
                                style={{
                                    height: active
                                        ? `${height}px`
                                        : `${height * 0.62}px`,
                                    transitionDelay: `${index * 35}ms`,
                                }}
                            />
                        </div>
                    ))}
                </div>


                {/* Axis */}

                <div className="mt-3 flex justify-between text-[9px] text-text-muted">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>24:00</span>
                </div>
            </div>


            {/* Sources */}

            <div className="mt-4 grid grid-cols-3 gap-2">
                <DataPill
                    icon={Activity}
                    label="Usage"
                    value="18.4"
                    active={active}
                />

                <DataPill
                    icon={Sun}
                    label="Solar"
                    value="8.7"
                />

                <DataPill
                    icon={Zap}
                    label="Grid"
                    value="9.7"
                />
            </div>
        </div>
    );
}


/* =========================================================
   OPTIMIZE DIAGRAM
   ========================================================= */

function OptimizeDiagram({ active }) {
    return (
        <div className="relative flex h-full min-h-[285px] items-center justify-center">

            <div
                className={`
                    relative
                    grid
                    h-52
                    w-52
                    place-items-center
                    rounded-full
                    border
                    border-primary/15
                    transition-all
                    duration-700
                    ${
                        active
                            ? "scale-105"
                            : ""
                    }
                `}
            >
                <div
                    className="
                        absolute
                        inset-6
                        rounded-full
                        border
                        border-secondary/15
                    "
                />

                <div
                    className="
                        absolute
                        inset-12
                        rounded-full
                        border
                        border-dashed
                        border-primary/10
                    "
                />


                {/* Center */}

                <div
                    className={`
                        relative
                        z-10
                        grid
                        h-24
                        w-24
                        place-items-center
                        rounded-3xl
                        bg-primary/10
                        text-primary
                        transition-all
                        duration-700
                        ${
                            active
                                ? "scale-110 shadow-[0_15px_50px_rgb(108_29_95_/_0.14)]"
                                : ""
                        }
                    `}
                >
                    <Gauge className="h-10 w-10" />
                </div>


                {/* Nodes */}

                <OptimizeNode
                    icon={Sun}
                    label="Solar"
                    position="left"
                    active={active}
                />

                <OptimizeNode
                    icon={Zap}
                    label="Demand"
                    position="right"
                    active={active}
                />

                <OptimizeNode
                    icon={BatteryCharging}
                    label="Storage"
                    position="top"
                    active={active}
                />

                <OptimizeNode
                    icon={Building2}
                    label="Grid"
                    position="bottom"
                    active={active}
                />
            </div>


            {/* Badge */}

            <div
                className="
                    absolute
                    bottom-1
                    left-1/2
                    flex
                    -translate-x-1/2
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-secondary/15
                    bg-secondary/5
                    px-3
                    py-1.5
                    text-[9px]
                    font-semibold
                    text-secondary
                "
            >
                <Sparkles className="h-3 w-3" />

                Smarter energy flow
            </div>
        </div>
    );
}


/* =========================================================
   ACTION DIAGRAM
   ========================================================= */

function ActionDiagram({ active }) {
    const items = [
        {
            label: "Shift high-load usage",
            description: "Move demand away from peak hours",
            icon: ArrowDown,
        },
        {
            label: "Prioritize solar power",
            description: "Use renewable energy when available",
            icon: Sun,
        },
        {
            label: "Reduce unnecessary demand",
            description: "Cut energy waste automatically",
            icon: TrendingDown,
        },
    ];

    return (
        <div className="relative flex h-full min-h-[285px] flex-col justify-center">

            {/* Connector */}

            <div className="absolute left-5 top-8 bottom-8 w-px bg-border" />


            {/* Actions */}

            <div className="relative space-y-3">
                {items.map((item, index) => {
                    const ItemIcon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className={`
                                relative
                                flex
                                items-center
                                gap-4
                                rounded-2xl
                                border
                                border-border
                                bg-surface-soft/75
                                p-3.5
                                transition-all
                                duration-500
                                ${
                                    active
                                        ? "translate-x-0"
                                        : "translate-x-2"
                                }
                            `}
                            style={{
                                transitionDelay: `${index * 80}ms`,
                            }}
                        >
                            {/* Icon */}

                            <div
                                className={`
                                    relative
                                    z-10
                                    grid
                                    h-10
                                    w-10
                                    shrink-0
                                    place-items-center
                                    rounded-xl
                                    transition-all
                                    duration-500
                                    ${
                                        active
                                            ? "bg-primary/10 text-primary"
                                            : "bg-surface text-text-muted"
                                    }
                                `}
                            >
                                <ItemIcon className="h-4 w-4" />
                            </div>


                            {/* Text */}

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-text">
                                    {item.label}
                                </p>

                                <p className="mt-0.5 text-[10px] leading-4 text-text-muted">
                                    {item.description}
                                </p>
                            </div>


                            {/* Check */}

                            <CircleCheck
                                className={`
                                    h-4
                                    w-4
                                    shrink-0
                                    transition-all
                                    duration-500
                                    ${
                                        active
                                            ? "text-secondary"
                                            : "text-text-muted/40"
                                    }
                                `}
                            />
                        </div>
                    );
                })}
            </div>


            {/* Status */}

            <div
                className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-secondary/15
                    bg-secondary/5
                    px-3
                    py-2.5
                "
            >
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

                    <span className="text-[10px] font-medium text-text-secondary">
                        Recommended actions
                    </span>
                </div>

                <span className="text-[10px] font-semibold text-secondary">
                    3 ready
                </span>
            </div>
        </div>
    );
}


/* =========================================================
   IMPACT DIAGRAM
   ========================================================= */

function ImpactDiagram({ active }) {
    return (
        <div className="relative flex h-full min-h-[285px] flex-col justify-center">

            {/* Main performance */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-surface-soft/70
                    p-5
                "
            >
                <div className="flex items-start justify-between">
                    <div>
                        <p
                            className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.15em]
                                text-text-muted
                            "
                        >
                            Energy performance
                        </p>

                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-4xl font-semibold tracking-[-0.04em] text-text">
                                82
                            </span>

                            <span className="text-xs text-text-muted">
                                / 100
                            </span>
                        </div>
                    </div>

                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary/10 text-secondary">
                        <LineChart className="h-5 w-5" />
                    </div>
                </div>


                {/* Progress */}

                <div className="mt-5">
                    <div className="h-2 overflow-hidden rounded-full bg-border/70">
                        <div
                            className={`
                                h-full
                                rounded-full
                                bg-secondary
                                transition-all
                                duration-1000
                                ${
                                    active
                                        ? "w-[82%]"
                                        : "w-[45%]"
                                }
                            `}
                        />
                    </div>

                    <div className="mt-2 flex justify-between text-[9px] text-text-muted">
                        <span>Baseline</span>
                        <span>Better performance</span>
                    </div>
                </div>
            </div>


            {/* Metrics */}

            <div className="mt-3 grid grid-cols-2 gap-3">
                <ImpactCard
                    label="Energy saved"
                    value="18.6%"
                    icon={Zap}
                    trend="down"
                    active={active}
                />

                <ImpactCard
                    label="Solar share"
                    value="47.3%"
                    icon={Sun}
                    trend="up"
                    active={active}
                />

                <ImpactCard
                    label="Grid reliance"
                    value="-22%"
                    icon={Leaf}
                    trend="down"
                    active={active}
                />

                <ImpactCard
                    label="Efficiency"
                    value="+31%"
                    icon={Gauge}
                    trend="up"
                    active={active}
                />
            </div>
        </div>
    );
}


/* =========================================================
   GENERIC DIAGRAM
   ========================================================= */

function GenericDiagram({ active }) {
    return (
        <div className="flex h-full min-h-[285px] items-center justify-center">
            <div
                className={`
                    relative
                    grid
                    h-44
                    w-44
                    place-items-center
                    rounded-[2rem]
                    border
                    border-primary/15
                    bg-primary/5
                    transition-all
                    duration-700
                    ${
                        active
                            ? "rotate-3 scale-105"
                            : ""
                    }
                `}
            >
                <div className="absolute inset-5 rounded-[1.5rem] border border-primary/10" />

                <Sparkles className="relative z-10 h-12 w-12 text-primary" />
            </div>
        </div>
    );
}


/* =========================================================
   MINI VISUAL NODE
   ========================================================= */

function MiniVisualNode({
    icon: Icon,
    label,
    active = false,
}) {
    return (
        <div
            className={`
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-2.5
                py-2
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-500
                ${
                    active
                        ? "border-secondary/20 bg-surface text-secondary"
                        : "border-border bg-surface-soft text-text-muted"
                }
            `}
        >
            <Icon className="h-3.5 w-3.5" />

            <span className="text-[9px] font-semibold">
                {label}
            </span>
        </div>
    );
}


/* =========================================================
   DATA PILL
   ========================================================= */

function DataPill({
    icon: Icon,
    label,
    value,
    active = false,
}) {
    return (
        <div
            className={`
                rounded-xl
                border
                border-border
                bg-surface-soft/60
                p-2.5
                transition-all
                duration-300
                ${
                    active
                        ? "border-primary/15"
                        : ""
                }
            `}
        >
            <div className="flex items-center gap-1.5">
                <Icon
                    className={`
                        h-3
                        w-3
                        ${
                            active
                                ? "text-primary"
                                : "text-text-muted"
                        }
                    `}
                />

                <span className="text-[9px] text-text-muted">
                    {label}
                </span>
            </div>

            <p className="mt-1 text-xs font-semibold text-text">
                {value}

                <span className="ml-0.5 text-[8px] font-normal text-text-muted">
                    kWh
                </span>
            </p>
        </div>
    );
}


/* =========================================================
   OPTIMIZE NODE
   ========================================================= */

function OptimizeNode({
    icon: Icon,
    label,
    position,
    active,
}) {
    const positionClass = {
        left: "left-[-18px] top-1/2 -translate-y-1/2",
        right: "right-[-18px] top-1/2 -translate-y-1/2",
        top: "left-1/2 top-[-18px] -translate-x-1/2",
        bottom: "bottom-[-18px] left-1/2 -translate-x-1/2",
    }[position];

    return (
        <div
            className={`
                absolute
                ${positionClass}
                z-20
                flex
                items-center
                gap-1.5
                rounded-full
                border
                bg-surface
                px-2.5
                py-1.5
                shadow-sm
                transition-all
                duration-500
                ${
                    active
                        ? "border-primary/15"
                        : "border-border"
                }
            `}
        >
            <Icon
                className={`
                    h-3
                    w-3
                    ${
                        active
                            ? "text-primary"
                            : "text-text-muted"
                    }
                `}
            />

            <span className="text-[9px] font-semibold text-text-secondary">
                {label}
            </span>
        </div>
    );
}


/* =========================================================
   IMPACT CARD
   ========================================================= */

function ImpactCard({
    label,
    value,
    icon: Icon,
    trend,
    active,
}) {
    const TrendIcon =
        trend === "up"
            ? TrendingUp
            : TrendingDown;

    return (
        <div
            className={`
                rounded-2xl
                border
                border-border
                bg-surface-soft/60
                p-3.5
                transition-all
                duration-500
                sm:p-4
                ${
                    active
                        ? "border-primary/15 bg-surface-soft/80"
                        : ""
                }
            `}
        >
            <div className="flex items-center justify-between">
                <Icon
                    className={`
                        h-4
                        w-4
                        ${
                            active
                                ? "text-primary"
                                : "text-text-muted"
                        }
                    `}
                />

                {trend && (
                    <TrendIcon
                        className="
                            h-3.5
                            w-3.5
                            text-secondary
                        "
                    />
                )}
            </div>

            <p className="mt-3 text-xl font-semibold tracking-tight text-text">
                {value}
            </p>

            <p className="mt-1 text-[10px] text-text-muted">
                {label}
            </p>
        </div>
    );
}