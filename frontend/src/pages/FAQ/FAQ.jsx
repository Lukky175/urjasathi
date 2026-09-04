/**
 * ============================================================================
 * File        : FaqPage.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Public Frequently Asked Questions page for UrjaSathi.
 * ============================================================================
 */

import { useState } from "react";

import { faqItems } from "./faqData";

import { FiPlus, FiMinus } from "react-icons/fi";

import { ArrowRight, HelpCircle } from "lucide-react";

import { Link } from "react-router-dom";

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleQuestion = (index) => {
        setActiveIndex((prev) =>
            prev === index ? null : index
        );
    };

    return (
        <main className="min-h-screen bg-app-bg">

            {/* =========================================================
                FAQ HERO
               ========================================================= */}

            <section
                className="
                    relative
                    isolate
                    flex
                    min-h-[34vh]
                    items-center
                    justify-center
                    overflow-hidden
                    bg-app-bg
                    px-6
                    pb-10
                    pt-20
                    text-center
                    sm:min-h-[36vh]
                    sm:px-8
                    sm:pb-12
                    sm:pt-24
                "
            >

                {/* Background atmosphere */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        -z-10
                        overflow-hidden
                    "
                >

                    {/* Purple atmosphere */}

                    <div
                        className="
                            absolute
                            -left-56
                            -top-32
                            h-[440px]
                            w-[440px]
                            rounded-full
                            bg-primary/8
                            blur-[130px]
                        "
                    />

                    {/* Teal atmosphere */}

                    <div
                        className="
                            absolute
                            -right-56
                            top-10
                            h-[440px]
                            w-[440px]
                            rounded-full
                            bg-secondary/7
                            blur-[130px]
                        "
                    />

                    {/* Subtle grid */}

                    <div
                        className="
                            absolute
                            inset-0
                            opacity-[0.018]
                            [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
                            [background-size:72px_72px]
                        "
                    />

                </div>


                {/* Hero content */}

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-3xl
                    "
                >

                    <h1
                        className="
                            text-[2.75rem]
                            font-semibold
                            leading-[1.04]
                            tracking-[-0.045em]
                            text-text
                            sm:text-5xl
                            md:text-6xl
                            lg:text-[4.5rem]
                        "
                    >
                        Frequently Asked
                        <br />

                        <span className="text-primary">
                            Questions.
                        </span>
                    </h1>


                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-xl
                            text-sm
                            leading-6
                            text-text-secondary
                            sm:mt-6
                            sm:text-base
                            sm:leading-7
                            lg:text-lg
                            lg:leading-8
                        "
                    >
                        Find answers to common questions about
                        UrjaSathi, energy monitoring, consumption,
                        and renewable energy.
                    </p>

                </div>

            </section>



            {/* =========================================================
                FAQ CONTENT
               ========================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-app-bg
                    px-6
                    pb-16
                    pt-10
                    sm:px-8
                    sm:pb-20
                    sm:pt-12
                    lg:px-10
                    lg:pb-20
                    lg:pt-14
                "
            >

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        grid
                        max-w-7xl
                        grid-cols-1
                        items-start
                        gap-10
                        lg:grid-cols-[0.78fr_1.22fr]
                        lg:gap-20
                    "
                >

                    {/* =================================================
                        LEFT INTRO
                       ================================================= */}

                    <div
                        className="
                            lg:sticky
                            lg:top-28
                        "
                    >

                        {/* Icon */}

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            "
                        >
                            <HelpCircle className="h-[18px] w-[18px]" />
                        </div>


                        {/* FAQ label */}

                        <p
                            className="
                                mt-4
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-primary
                            "
                        >
                            FAQ
                        </p>


                        {/* Heading */}

                        <h2
                            className="
                                mt-3
                                text-3xl
                                font-semibold
                                leading-[1.05]
                                tracking-[-0.04em]
                                text-text
                                sm:text-4xl
                                lg:text-[3.25rem]
                            "
                        >
                            Everything{" "}

                            <span className="text-primary">
                                you
                            </span>

                            <br />

                            need{" "}

                            <span className="text-primary">
                                to know.
                            </span>
                        </h2>


                        {/* Description */}

                        <p
                            className="
                                mt-5
                                max-w-md
                                text-sm
                                leading-6
                                text-text-secondary
                                sm:text-base
                                sm:leading-7
                            "
                        >
                            Have questions about your energy,
                            consumption, renewable generation,
                            or the UrjaSathi platform?
                            Find the answers below.
                        </p>

                    </div>



                    {/* =================================================
                        FAQ ACCORDION
                       ================================================= */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                        "
                    >

                        {faqItems.map((item, index) => {

                            const isActive =
                                activeIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={`
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        bg-surface
                                        transition-all
                                        duration-300
                                        ${
                                            isActive
                                                ? "border-primary/60 shadow-md shadow-primary/8"
                                                : "border-border hover:border-primary/30"
                                        }
                                    `}
                                >

                                    {/* Question */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleQuestion(index)
                                        }
                                        aria-expanded={isActive}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            gap-5
                                            px-5
                                            py-4
                                            text-left
                                            sm:px-5
                                            sm:py-[18px]
                                        "
                                    >

                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                leading-6
                                                text-text
                                                sm:text-[15px]
                                                sm:leading-6
                                            "
                                        >
                                            {item.question}
                                        </span>


                                        {/* Purple + / − button */}

                                        <span
                                            className={`
                                                flex
                                                h-8
                                                w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-primary
                                                text-white
                                                transition-transform
                                                duration-300
                                                ${
                                                    isActive
                                                        ? "rotate-180"
                                                        : ""
                                                }
                                            `}
                                        >
                                            {isActive ? (
                                                <FiMinus className="h-3.5 w-3.5 text-white" />
                                            ) : (
                                                <FiPlus className="h-3.5 w-3.5 text-white" />
                                            )}
                                        </span>

                                    </button>



                                    {/* Answer */}

                                    <div
                                        className={`
                                            grid
                                            transition-all
                                            duration-300
                                            ease-in-out
                                            ${
                                                isActive
                                                    ? "grid-rows-[1fr]"
                                                    : "grid-rows-[0fr]"
                                            }
                                        `}
                                    >

                                        <div className="overflow-hidden">

                                            <div
                                                className="
                                                    border-t
                                                    border-border
                                                    px-5
                                                    pb-5
                                                    pt-4
                                                    text-sm
                                                    leading-6
                                                    text-text-secondary
                                                    sm:leading-7
                                                "
                                            >
                                                {item.answer}
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>



            {/* =========================================================
                CONTACT CTA
               ========================================================= */}

            <section
                className="
                    bg-app-bg
                    px-6
                    pb-16
                    pt-2
                    sm:px-8
                    sm:pb-20
                    lg:px-10
                "
            >

                <div
                    className="
                        relative
                        mx-auto
                        max-w-7xl
                        overflow-hidden
                        rounded-3xl
                        border
                        border-border
                        bg-surface
                    "
                >

                    {/* Purple atmosphere */}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -right-28
                            -top-28
                            h-64
                            w-64
                            rounded-full
                            bg-primary/8
                            blur-[90px]
                        "
                    />

                    {/* Teal atmosphere */}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            -bottom-28
                            -left-28
                            h-0
                            w-64
                            rounded-full
                            bg-secondary/7
                            blur-[90px]
                        "
                    />


                    {/* CTA content */}

                    <div
                        className="
                            relative
                            z-10
                            flex
                            flex-col
                            gap-6
                            px-7
                            py-9
                            sm:px-9
                            sm:py-10
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                            lg:px-12
                            lg:py-11
                        "
                    >

                        {/* Text */}

                        <div className="max-w-3xl">

                            <p
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    text-primary
                                    sm:text-[11px]
                                "
                            >
                                Still have questions?
                            </p>


                            <h2
                                className="
                                    mt-2
                                    text-2xl
                                    font-semibold
                                    tracking-[-0.04em]
                                    text-text
                                    sm:text-3xl
                                    lg:text-[2rem]
                                "
                            >
                                Talk to the UrjaSathi team.
                            </h2>


                            <p
                                className="
                                    mt-3
                                    max-w-2xl
                                    text-sm
                                    leading-6
                                    text-text-secondary
                                    sm:text-base
                                    sm:leading-7
                                "
                            >
                                We're happy to help you understand
                                the platform and how it can fit your
                                energy environment.
                            </p>

                        </div>



                        {/* Contact button */}

                        <Link
                            to="/contact"
                            className="
                                group
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-3
                                self-start
                                rounded-full
                                bg-primary
                                px-7
                                py-3.5
                                text-sm
                                font-semibold
                                !text-white
                                shadow-md
                                shadow-primary/15
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-primary-dark
                                hover:shadow-lg
                                focus:outline-none
                                focus:ring-2
                                focus:ring-primary/30
                                lg:self-center
                            "
                        >
                            <span className="!text-white">
                                Contact Us
                            </span>

                            <ArrowRight
                                className="
                                    h-4
                                    w-4
                                    !text-white
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />

                        </Link>

                    </div>

                </div>

            </section>

        </main>
    );
}