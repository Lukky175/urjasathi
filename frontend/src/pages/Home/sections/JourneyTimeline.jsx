import { useEffect, useRef, useState } from "react";
import JourneyStep from "./JourneyStep";
import journeySteps from "../data/journeyData";

export default function JourneyTimeline() {
    const [activeStep, setActiveStep] = useState(0);

    const stepRefs = useRef([]);

    useEffect(() => {
        let ticking = false;

        function updateActiveStep() {
            if (ticking) return;

            ticking = true;

            window.requestAnimationFrame(() => {
                let current = 0;
                let smallestDistance = Infinity;

                stepRefs.current.forEach((step, index) => {
                    if (!step) return;

                    const rect = step.getBoundingClientRect();

                    const center =
                        rect.top + rect.height / 2;

                    const distance = Math.abs(
                        center - window.innerHeight * 0.5
                    );

                    if (distance < smallestDistance) {
                        smallestDistance = distance;
                        current = index;
                    }
                });

                setActiveStep(current);

                ticking = false;
            });
        }

        updateActiveStep();

        window.addEventListener(
            "scroll",
            updateActiveStep,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateActiveStep
        );

        return () => {
            window.removeEventListener(
                "scroll",
                updateActiveStep
            );

            window.removeEventListener(
                "resize",
                updateActiveStep
            );
        };
    }, []);

    return (
        <section
            id="energy-journey"
            className="
                relative
                isolate
                overflow-hidden
                bg-app-bg
                px-6
                py-18
                sm:px-8
                lg:px-10
                lg:py-18
            "
        >
            {/* =====================================================
                SECTION BACKGROUND
               ===================================================== */}

            <SectionGrid />

            {/* =====================================================
                AMBIENT ATMOSPHERE
               ===================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-40
                    -z-10
                    h-96
                    w-96
                    rounded-full
                    bg-primary/5
                    blur-[120px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-20
                    -z-10
                    h-80
                    w-80
                    rounded-full
                    bg-secondary/5
                    blur-[110px]
                "
            />

            {/* =====================================================
                CONTENT
               ===================================================== */}

            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                "
            >
                {/* =====================================================
                    SECTION INTRO
                   ===================================================== */}

                <div
                    className="
                        mx-auto
                        mb-24
                        max-w-3xl
                        text-center
                        lg:mb-32
                    "
                >
                    {/* Eyebrow */}

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-secondary
                            sm:text-sm
                        "
                    >
                        Your energy journey
                    </p>

                    {/* Heading */}

                    <h2
                        className="
                            mt-5
                            text-4xl
                            font-semibold
                            leading-[1.05]
                            tracking-[-0.04em]
                            text-text
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        From energy data
                        <br />

                        <span className="text-primary">
                            to better decisions.
                        </span>
                    </h2>

                    {/* Description */}

                    <p
                        className="
                            mx-auto
                            mt-6
                            max-w-2xl
                            text-base
                            leading-7
                            text-text-secondary
                            sm:text-lg
                            sm:leading-8
                        "
                    >
                        Solar Sathi turns the complexity of
                        energy management into a simple journey
                        you can understand, act on, and measure.
                    </p>
                </div>

                {/* =====================================================
                    TIMELINE
                   ===================================================== */}

                <div className="relative">

                    {/* =================================================
                        PERMANENT TIMELINE
                       ================================================= */}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-0
                            hidden
                            h-full
                            w-[3px]
                            -translate-x-1/2
                            rounded-full
                            bg-primary
                            lg:block
                        "
                    />

                    {/* =================================================
                        JOURNEY STEPS
                       ================================================= */}

                    <div className="space-y-20 lg:space-y-20">
                        {journeySteps.map(
                            (step, index) => (
                                <JourneyStep
                                    key={step.id}
                                    ref={(element) => {
                                        stepRefs.current[index] =
                                            element;
                                    }}
                                    step={step}
                                    index={index}
                                    reverse={
                                        index % 2 === 1
                                    }
                                    activeStep={
                                        activeStep
                                    }
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}


/* =========================================================
   SECTION GRID BACKGROUND
   ========================================================= */

function SectionGrid() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                inset-0
                -z-20
                overflow-hidden
            "
        >
            {/* Main grid */}

            <div
                className="
                    absolute
                    inset-0
                    opacity-100
                    [background-image:linear-gradient(to_right,rgb(148_163_184/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.12)_1px,transparent_1px)]
                    [background-size:80px_80px]
                "
            />
        </div>
    );
}