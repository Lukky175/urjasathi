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
                    min-h-[42vh]
                    items-center
                    justify-center
                    overflow-hidden
                    bg-app-bg
                    px-6
                    pb-14
                    pt-24
                    text-center
                    sm:min-h-[44vh]
                    sm:px-8
                    sm:pb-16
                    sm:pt-28
                "
            >

                {/* Background atmosphere */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        -z-10
                        overflow-hidden
                    "
                >

                    {/* Left purple atmosphere */}

                    <div
                        className="
                            absolute
                            -left-56
                            top-0
                            h-[500px]
                            w-[500px]
                            rounded-full
                            bg-primary/8
                            blur-[140px]
                        "
                    />

                    {/* Right subtle teal atmosphere */}

                    <div
                        className="
                            absolute
                            -right-56
                            top-16
                            h-[500px]
                            w-[500px]
                            rounded-full
                            bg-secondary/7
                            blur-[140px]
                        "
                    />

                    {/* Subtle grid */}

                    <div
                        className="
                            absolute
                            inset-0
                            opacity-[0.025]
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
                        max-w-4xl
                    "
                >

                    <h1
                        className="
                            text-[3rem]
                            font-semibold
                            leading-[1.05]
                            tracking-[-0.04em]
                            text-text
                            sm:text-6xl
                            md:text-7xl
                            lg:text-[5.5rem]
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
                            mt-8
                            max-w-2xl
                            text-base
                            leading-7
                            text-text-secondary
                            sm:mt-9
                            sm:text-lg
                            sm:leading-8
                            lg:text-xl
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
                    pb-20
                    pt-16
                    sm:px-8
                    sm:pb-24
                    sm:pt-20
                    lg:px-10
                    lg:pb-28
                    lg:pt-24
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
                        gap-16
                        lg:grid-cols-[0.82fr_1.18fr]
                        lg:gap-28
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
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            "
                        >
                            <HelpCircle className="h-5 w-5" />
                        </div>


                        {/* FAQ label */}

                        <p
                            className="
                                mt-6
                                text-xs
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
                                mt-5
                                text-4xl
                                font-semibold
                                leading-[1.05]
                                tracking-[-0.04em]
                                text-text
                                sm:text-5xl
                                lg:text-[4rem]
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
                                mt-8
                                max-w-md
                                text-base
                                leading-7
                                text-text-secondary
                                sm:text-lg
                                sm:leading-8
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
                            gap-4
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
                                        rounded-2xl
                                        border
                                        bg-surface
                                        transition-all
                                        duration-300
                                        ${
                                            isActive
                                                ? "border-primary shadow-lg shadow-primary/10"
                                                : "border-border hover:border-primary/40"
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
                                            gap-6
                                            px-5
                                            py-5
                                            text-left
                                            sm:px-6
                                            sm:py-6
                                        "
                                    >

                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                leading-6
                                                text-text
                                                sm:text-base
                                                sm:leading-7
                                            "
                                        >
                                            {item.question}
                                        </span>


                                        {/* Purple + / − button */}

                                        <span
                                            className={`
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-primary
                                                text-white
                                                transition-all
                                                duration-300
                                                ${
                                                    isActive
                                                        ? "rotate-180"
                                                        : ""
                                                }
                                            `}
                                        >
                                            {isActive ? (
                                                <FiMinus className="h-4 w-4 text-white" />
                                            ) : (
                                                <FiPlus className="h-4 w-4 text-white" />
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
                                                    pb-6
                                                    pt-5
                                                    text-sm
                                                    leading-7
                                                    text-text-secondary
                                                    sm:px-6
                                                    sm:text-base
                                                    sm:leading-8
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
                    pb-20
                    sm:px-8
                    sm:pb-28
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
                        className="
                            pointer-events-none
                            absolute
                            -right-32
                            -top-32
                            h-80
                            w-80
                            rounded-full
                            bg-primary/8
                            blur-[100px]
                        "
                    />

                    {/* Teal atmosphere */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-32
                            -left-32
                            h-80
                            w-80
                            rounded-full
                            bg-secondary/7
                            blur-[100px]
                        "
                    />


                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            flex
                            max-w-3xl
                            flex-col
                            items-center
                            px-6
                            py-16
                            text-center
                            sm:px-10
                            sm:py-20
                            lg:py-24
                        "
                    >

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-primary
                            "
                        >
                            Need more help?
                        </span>


                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-semibold
                                tracking-[-0.04em]
                                text-text
                                sm:text-4xl
                                lg:text-5xl
                            "
                        >
                            Still have questions?
                        </h2>


                        <p
                            className="
                                mt-5
                                max-w-xl
                                text-sm
                                leading-7
                                text-text-secondary
                                sm:text-base
                                sm:leading-8
                            "
                        >
                            Can't find what you're looking for?
                            Our team is here to help you understand
                            UrjaSathi and get the most out of your
                            energy data.
                        </p>


                        {/* Contact button */}

                        <Link
                            to="/contact"
                            className="
                                group
                                mt-8
                                inline-flex
                                items-center
                                justify-center
                                gap-2.5
                                rounded-full
                                bg-primary
                                px-7
                                py-3.5
                                text-sm
                                font-semibold
                                !text-white
                                shadow-lg
                                shadow-primary/20
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-primary-dark
                                hover:!text-white
                                hover:shadow-xl
                                focus:outline-none
                                focus:ring-2
                                focus:ring-primary/30
                                sm:px-8
                                sm:py-4
                                sm:text-base
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