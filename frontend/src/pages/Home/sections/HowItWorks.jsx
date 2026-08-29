import {
    ArrowRight,
    BarChart3,
    Lightbulb,
    PlugZap,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: PlugZap,
        title: "Connect your energy",
        description:
            "Bring your electricity consumption, generation, and meter data into one connected platform.",
    },
    {
        number: "02",
        icon: BarChart3,
        title: "Understand your patterns",
        description:
            "UrjaSathi turns raw energy data into clear insights about consumption, generation, and efficiency.",
    },
    {
        number: "03",
        icon: Lightbulb,
        title: "Make smarter decisions",
        description:
            "Use intelligent recommendations to reduce waste, improve efficiency, and make better use of renewable energy.",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="relative bg-app-bg py-24 sm:py-28 lg:py-36"
        >
            {/* =========================================================
                BACKGROUND
               ========================================================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
                        absolute
                        -right-48
                        top-1/4
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
                    SECTION HEADER
                   ===================================================== */}

                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

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
                            How it works
                        </p>

                        <div className="mt-4 h-1 w-12 rounded-full bg-secondary" />
                    </div>

                    <div>
                        <h2
                            className="
                                max-w-4xl
                                text-4xl
                                font-semibold
                                leading-[1.05]
                                tracking-[-0.035em]
                                text-text
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            From energy data
                            <br />
                            to{" "}
                            <span className="text-primary">
                                better decisions.
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
                            Energy management shouldn't require you to be an
                            energy expert. UrjaSathi makes the journey from
                            complex data to actionable insight simple.
                        </p>
                    </div>
                </div>


                {/* =====================================================
                    STEPS
                   ===================================================== */}

                <div className="relative mt-20 lg:mt-24">

                    {/* Connecting line */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-[2.5rem]
                            right-[2.5rem]
                            top-8
                            hidden
                            h-px
                            bg-border
                            lg:block
                        "
                    />

                    <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className="
                                        group
                                        relative
                                        border-t
                                        border-border
                                        pt-7
                                        lg:border-t-0
                                        lg:pt-0
                                    "
                                >
                                    {/* Number + icon */}
                                    <div className="flex items-center justify-between lg:block">

                                        <div
                                            className="
                                                relative
                                                z-10
                                                grid
                                                h-16
                                                w-16
                                                place-items-center
                                                rounded-full
                                                border
                                                border-border
                                                bg-surface
                                                text-primary
                                                shadow-card
                                                transition-all
                                                duration-300
                                                group-hover:border-primary/40
                                                group-hover:text-primary
                                                group-hover:shadow-hover
                                            "
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                tracking-[0.12em]
                                                text-text-muted
                                                lg:absolute
                                                lg:right-0
                                                lg:top-5
                                            "
                                        >
                                            {step.number}
                                        </span>
                                    </div>


                                    {/* Content */}
                                    <div className="mt-7 max-w-sm">
                                        <h3
                                            className="
                                                text-2xl
                                                font-semibold
                                                tracking-tight
                                                text-text
                                            "
                                        >
                                            {step.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-4
                                                text-sm
                                                leading-7
                                                text-text-secondary
                                                sm:text-base
                                            "
                                        >
                                            {step.description}
                                        </p>

                                        <div
                                            className="
                                                mt-7
                                                flex
                                                items-center
                                                gap-2
                                                text-sm
                                                font-medium
                                                text-primary
                                                opacity-0
                                                transition-all
                                                duration-300
                                                group-hover:gap-3
                                                group-hover:opacity-100
                                            "
                                        >
                                            Learn more
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* =====================================================
                    BOTTOM STATEMENT
                   ===================================================== */}

                <div
                    className="
                        mt-20
                        border-t
                        border-border
                        pt-8
                        sm:mt-24
                        sm:pt-10
                    "
                >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <p
                            className="
                                max-w-2xl
                                text-sm
                                leading-6
                                text-text-muted
                                sm:text-base
                            "
                        >
                            One platform. One view of your energy.
                            Better decisions at every step.
                        </p>

                        <div className="flex items-center gap-3 text-sm font-medium text-secondary">
                            <span className="h-2 w-2 rounded-full bg-secondary" />
                            Intelligent energy management
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}