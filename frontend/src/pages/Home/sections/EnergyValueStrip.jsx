import {
    Activity,
    Layers3,
    Radio,
    Sun,
    ArrowUpRight,
} from "lucide-react";

const values = [
    {
        icon: Radio,
        value: "24/7",
        label: "Energy visibility",
        description: "Always know where your energy goes.",
        accent: "secondary",
    },
    {
        icon: Layers3,
        value: "1",
        label: "Unified energy view",
        description: "Consumption, generation and grid in one place.",
        accent: "primary",
    },
    {
        icon: Activity,
        value: "Real-time",
        label: "Intelligent insights",
        description: "Turn energy data into better decisions.",
        accent: "solar",
    },
    {
        icon: Sun,
        value: "Renewable",
        label: "Ready",
        description: "Built for cleaner, smarter energy.",
        accent: "secondary",
    },
];

export default function EnergyValueStrip() {
    return (
        <section
            className="
                relative
                overflow-hidden
                border-y
                border-border
                bg-surface
            "
        >
            {/* Subtle atmosphere */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-72
                    w-[900px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-primary/5
                    blur-[120px]
                "
            />

            <div
                className="
                    relative
                    mx-auto
                    grid
                    max-w-7xl
                    grid-cols-1
                    divide-y
                    divide-border
                    px-6
                    sm:grid-cols-2
                    sm:divide-x
                    sm:divide-y-0
                    lg:grid-cols-4
                    lg:px-10
                "
            >
                {values.map((item) => {
                    const Icon = item.icon;

                    const accent = {
                        primary: {
                            icon: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
                            value: "text-primary",
                            line: "bg-primary",
                        },
                        secondary: {
                            icon: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white",
                            value: "text-secondary",
                            line: "bg-secondary",
                        },
                        solar: {
                            icon: "bg-solar/10 text-solar group-hover:bg-solar group-hover:text-white",
                            value: "text-solar",
                            line: "bg-solar",
                        },
                    }[item.accent];

                    return (
                        <div
                            key={`${item.value}-${item.label}`}
                            className="
                                group
                                relative
                                flex
                                min-h-[150px]
                                items-center
                                gap-4
                                px-5
                                py-7
                                transition-colors
                                duration-300
                                hover:bg-surface-soft/70
                                sm:px-7
                                lg:min-h-[170px]
                                lg:px-8
                                lg:py-8
                            "
                        >
                            {/* Accent line */}
                            <div
                                className={`
                                    absolute
                                    bottom-0
                                    left-0
                                    h-0.5
                                    w-0
                                    transition-all
                                    duration-300
                                    group-hover:w-full
                                    ${accent.line}
                                `}
                            />

                            {/* Icon */}
                            <div
                                className={`
                                    grid
                                    h-11
                                    w-11
                                    shrink-0
                                    place-items-center
                                    rounded-xl
                                    transition-all
                                    duration-300
                                    group-hover:scale-105
                                    ${accent.icon}
                                `}
                            >
                                <Icon className="h-5 w-5" />
                            </div>

                            {/* Content */}
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <p
                                        className={`
                                            text-xl
                                            font-semibold
                                            tracking-tight
                                            sm:text-2xl
                                            ${accent.value}
                                        `}
                                    >
                                        {item.value}
                                    </p>

                                    <ArrowUpRight
                                        className="
                                            h-3.5
                                            w-3.5
                                            text-text-muted
                                            opacity-0
                                            transition-all
                                            duration-300
                                            group-hover:translate-x-0.5
                                            group-hover:-translate-y-0.5
                                            group-hover:opacity-100
                                        "
                                    />
                                </div>

                                <p
                                    className="
                                        mt-0.5
                                        text-sm
                                        font-semibold
                                        text-text
                                    "
                                >
                                    {item.label}
                                </p>

                                <p
                                    className="
                                        mt-1
                                        max-w-[210px]
                                        text-xs
                                        leading-5
                                        text-text-muted
                                    "
                                >
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}