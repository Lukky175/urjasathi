import {
    Activity,
    Layers3,
    Radio,
    Sun,
} from "lucide-react";

const values = [
    {
        icon: Radio,
        value: "24/7",
        label: "Energy visibility",
        description: "Know how your energy is being used.",
    },
    {
        icon: Layers3,
        value: "1",
        label: "Unified platform",
        description: "Consumption, generation and grid in one place.",
    },
    {
        icon: Activity,
        value: "Real-time",
        label: "Intelligent insights",
        description: "Turn energy data into useful decisions.",
    },
    {
        icon: Sun,
        value: "Renewable",
        label: "Ready",
        description: "Built to work with cleaner energy sources.",
    },
];

export default function EnergyValueStrip() {
    return (
        <section
            className="
                relative
                border-y
                border-border
                bg-surface
            "
        >
            <div
                className="
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

                    return (
                        <div
                            key={`${item.value}-${item.label}`}
                            className="
                                group
                                flex
                                items-center
                                gap-5
                                px-5
                                py-9
                                transition-all
                                duration-300
                                hover:bg-surface-soft
                                sm:px-7
                                lg:px-8
                                lg:py-11
                            "
                        >
                            {/* Icon */}
                            <div
                                className="
                                    grid
                                    h-12
                                    w-12
                                    shrink-0
                                    place-items-center
                                    rounded-xl
                                    bg-primary/10
                                    text-primary
                                    transition-all
                                    duration-300
                                    group-hover:scale-105
                                    group-hover:bg-primary
                                    group-hover:text-white
                                "
                            >
                                <Icon className="h-5 w-5" />
                            </div>

                            {/* Content */}
                            <div>
                                <p
                                    className="
                                        text-2xl
                                        font-semibold
                                        tracking-tight
                                        text-primary
                                    "
                                >
                                    {item.value}
                                </p>

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
                                        max-w-[190px]
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