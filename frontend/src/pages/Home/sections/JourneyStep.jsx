import {
    ArrowRight,
    Check,
    Leaf,
    Lightbulb,
    LineChart,
    ShieldCheck,
    Sparkles,
    Sun,
    Zap,
} from "lucide-react";

import { forwardRef } from "react";

const iconMap = {
    solar: Sun,
    insights: LineChart,
    optimize: Zap,
    action: Lightbulb,
    impact: Leaf,
    secure: ShieldCheck,
};

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

    /*
     * Active step = fully visible
     * Adjacent steps = visible but subdued
     * Distant steps = very subtle
     */
    const opacityClass = isActive
        ? "opacity-100"
        : distance === 1
            ? "opacity-50"
            : "opacity-20";

    const scaleClass = isActive
        ? "scale-100"
        : "scale-[0.985]";

    return (
        <article
            ref={ref}
            className={`
                relative
                grid
                items-center
                transition-all
                duration-500
                ease-out
                lg:min-h-[380px]
                lg:grid-cols-2
                ${opacityClass}
                ${scaleClass}
            `}
        >
            {/* =====================================================
                CENTRAL TIMELINE NODE
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
                        h-10
                        w-10
                        place-items-center
                        rounded-full
                        border-[3px]
                        border-app-bg
                        transition-all
                        duration-500
                        ${
                            isActive
                                ? "bg-primary shadow-[0_0_0_7px_rgb(124_58_237_/_0.10)]"
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
                                    : "bg-text-muted/60"
                            }
                        `}
                    />
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
                        max-w-xl
                        ${
                            reverse
                                ? "lg:ml-20 xl:ml-24"
                                : "lg:mr-20 xl:mr-24"
                        }
                    `}
                >
                    {/* Step number + eyebrow */}

                    <div className="flex items-center gap-3">
                        <span
                            className={`
                                inline-flex
                                h-8
                                min-w-8
                                items-center
                                justify-center
                                rounded-full
                                px-2
                                text-xs
                                font-bold
                                transition-all
                                duration-500
                                ${
                                    isActive
                                        ? "bg-primary text-white shadow-sm"
                                        : "bg-surface-soft text-text-muted"
                                }
                            `}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-secondary
                            "
                        >
                            {step.eyebrow}
                        </span>
                    </div>


                    {/* Heading */}

                    <h3
                        className="
                            mt-5
                            max-w-lg
                            text-3xl
                            font-semibold
                            leading-[1.08]
                            tracking-[-0.025em]
                            text-text
                            sm:text-4xl
                            lg:text-[2.75rem]
                        "
                    >
                        {step.title}
                    </h3>


                    {/* Description */}

                    <p
                        className="
                            mt-5
                            max-w-lg
                            text-base
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
                        <div className="mt-6 space-y-2.5">
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
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-primary
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
                    mt-10
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
                        max-w-xl
                        transition-all
                        duration-700
                        ${
                            reverse
                                ? "lg:mr-20 xl:mr-24"
                                : "lg:ml-20 xl:ml-24"
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
   JOURNEY VISUAL
   ========================================================= */

function JourneyVisual({ step, Icon, active }) {
    return (
        <div
            className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                bg-surface
                p-5
                shadow-card
                transition-all
                duration-500
                sm:p-7
                ${
                    active
                        ? "border-primary/25 shadow-hover"
                        : "border-border"
                }
            `}
        >
            {/* Ambient primary glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-48
                    w-48
                    rounded-full
                    bg-primary/8
                    blur-[70px]
                "
            />

            {/* Ambient secondary glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-24
                    h-44
                    w-44
                    rounded-full
                    bg-secondary/8
                    blur-[70px]
                "
            />


            {/* Header */}

            <div className="relative flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div
                        className={`
                            grid
                            h-11
                            w-11
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
                        <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs text-text-muted">
                            Energy intelligence
                        </p>

                        <p className="mt-0.5 truncate text-sm font-semibold text-text">
                            {step.visualTitle || "Live system view"}
                        </p>
                    </div>
                </div>

                <span
                    className={`
                        shrink-0
                        rounded-full
                        px-3
                        py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        transition-all
                        duration-500
                        ${
                            active
                                ? "bg-secondary/10 text-secondary"
                                : "bg-surface-soft text-text-muted"
                        }
                    `}
                >
                    {active ? "Active" : "Next"}
                </span>
            </div>


            {/* Diagram */}

            <div className="relative mt-7 min-h-[230px]">
                <JourneyDiagram
                    step={step}
                    active={active}
                />
            </div>


            {/* Metrics */}

            {step.metrics?.length > 0 && (
                <div className="relative mt-5 grid grid-cols-2 gap-3">
                    {step.metrics
                        .slice(0, 2)
                        .map((metric) => (
                            <div
                                key={metric.label}
                                className="
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-surface-soft/60
                                    p-3.5
                                    sm:p-4
                                "
                            >
                                <p className="text-[11px] text-text-muted">
                                    {metric.label}
                                </p>

                                <p className="mt-1 text-lg font-semibold text-text">
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
   DIAGRAM
   ========================================================= */

function JourneyDiagram({ step, active }) {
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
        <div className="flex h-full flex-col items-center justify-center">
            <div className="relative">
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
                                ? "scale-110 shadow-[0_0_60px_rgb(1_172_159_/_0.16)]"
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
                            inset-[-14px]
                            animate-ping
                            rounded-full
                            border
                            border-secondary/20
                        "
                    />
                )}
            </div>

            <div className="mt-7 flex items-center gap-2.5">
                <EnergyNode label="Sun" />

                <div className="h-px w-6 bg-border sm:w-10" />

                <EnergyNode
                    label="Solar"
                    active
                />

                <div className="h-px w-6 bg-border sm:w-10" />

                <EnergyNode label="Home" />
            </div>
        </div>
    );
}


/* =========================================================
   MONITOR DIAGRAM
   ========================================================= */

function MonitorDiagram({ active }) {
    return (
        <div className="flex h-full flex-col justify-center">
            <div className="rounded-2xl border border-border bg-surface-soft p-5">
                <div className="flex items-end gap-2">
                    {[35, 52, 42, 68, 55, 78, 62, 88, 70, 94].map(
                        (height, index) => (
                            <div
                                key={index}
                                className="
                                    flex-1
                                    rounded-t-md
                                    bg-primary/15
                                "
                                style={{
                                    height: `${height}px`,
                                }}
                            >
                                <div
                                    className={`
                                        h-full
                                        rounded-t-md
                                        bg-primary
                                        transition-all
                                        duration-700
                                        ${
                                            active
                                                ? "opacity-100"
                                                : "opacity-40"
                                        }
                                    `}
                                    style={{
                                        transform: `scaleY(${
                                            active ? 1 : 0.65
                                        })`,
                                        transformOrigin: "bottom",
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>

                <div className="mt-4 flex justify-between text-[10px] text-text-muted">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>24:00</span>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
                <EnergyNode
                    label="Consumption"
                    active
                />

                <EnergyNode label="Generation" />

                <EnergyNode label="Grid" />
            </div>
        </div>
    );
}


/* =========================================================
   OPTIMIZE DIAGRAM
   ========================================================= */

function OptimizeDiagram({ active }) {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="relative grid h-48 w-48 place-items-center rounded-full border border-primary/20">
                <div className="absolute inset-6 rounded-full border border-secondary/20" />

                <div
                    className={`
                        grid
                        h-24
                        w-24
                        place-items-center
                        rounded-full
                        bg-primary/10
                        text-primary
                        transition-transform
                        duration-700
                        ${
                            active
                                ? "scale-110"
                                : "scale-100"
                        }
                    `}
                >
                    <Zap className="h-10 w-10" />
                </div>

                <span className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary" />
                <span className="absolute right-0 top-1/2 h-3 w-3 translate-x-1/2 rounded-full bg-secondary" />
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
                <span className="absolute bottom-0 left-1/2 h-3 w-3 translate-y-1/2 rounded-full bg-secondary" />
            </div>
        </div>
    );
}


/* =========================================================
   ACTION DIAGRAM
   ========================================================= */

function ActionDiagram({ active }) {
    const items = [
        "Shift high-load usage",
        "Prioritize solar power",
        "Reduce unnecessary demand",
    ];

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div
                    key={item}
                    className={`
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        border
                        border-border
                        bg-surface-soft/60
                        p-4
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
                    <div
                        className="
                            grid
                            h-9
                            w-9
                            shrink-0
                            place-items-center
                            rounded-xl
                            bg-primary/10
                            text-primary
                        "
                    >
                        <Check className="h-4 w-4" />
                    </div>

                    <span className="text-sm font-medium text-text">
                        {item}
                    </span>
                </div>
            ))}
        </div>
    );
}


/* =========================================================
   IMPACT DIAGRAM
   ========================================================= */

function ImpactDiagram({ active }) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <ImpactCard
                label="Energy saved"
                value="18.6%"
                icon={Zap}
                active={active}
            />

            <ImpactCard
                label="Solar share"
                value="47.3%"
                icon={Sun}
                active={active}
            />

            <ImpactCard
                label="Grid reliance"
                value="-22%"
                icon={Leaf}
                active={active}
            />

            <ImpactCard
                label="Efficiency"
                value="+31%"
                icon={LineChart}
                active={active}
            />
        </div>
    );
}


/* =========================================================
   GENERIC DIAGRAM
   ========================================================= */

function GenericDiagram({ active }) {
    return (
        <div className="flex h-full items-center justify-center">
            <div
                className={`
                    grid
                    h-40
                    w-40
                    place-items-center
                    rounded-3xl
                    border
                    border-primary/20
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
                <Sparkles className="h-12 w-12 text-primary" />
            </div>
        </div>
    );
}


/* =========================================================
   ENERGY NODE
   ========================================================= */

function EnergyNode({ label, active = false }) {
    return (
        <div
            className={`
                rounded-full
                border
                px-3
                py-1.5
                text-[10px]
                font-medium
                whitespace-nowrap
                ${
                    active
                        ? "border-primary/20 bg-primary/10 text-primary"
                        : "border-border bg-surface-soft text-text-muted"
                }
            `}
        >
            {label}
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
    active,
}) {
    return (
        <div
            className={`
                rounded-2xl
                border
                border-border
                bg-surface-soft/60
                p-4
                transition-all
                duration-500
                ${
                    active
                        ? "border-primary/20"
                        : ""
                }
            `}
        >
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

            <p className="mt-4 text-xl font-semibold text-text">
                {value}
            </p>

            <p className="mt-1 text-[11px] text-text-muted">
                {label}
            </p>
        </div>
    );
}