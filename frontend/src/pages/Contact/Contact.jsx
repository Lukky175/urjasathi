/**
 * ============================================================================
 * File        : Contact.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Public Contact page for UrjaSathi.
 *
 * Features:
 * - Static contact information
 * - Responsive contact form
 * - Floating-label inputs
 * - FAQ CTA
 * - Auto-playing image carousel
 * - Manual carousel navigation
 * - Progress indicator
 *
 * Note:
 * No public Site Settings API is used.
 * All content is currently static and can be connected to a backend later.
 * ============================================================================
 */

import { useEffect, useState } from "react";

import {
    IoPersonOutline,
    IoCallOutline,
    IoLocationOutline,
} from "react-icons/io5";

import { MdOutlineAlternateEmail } from "react-icons/md";
import { GoPencil } from "react-icons/go";

import {
    FiChevronLeft,
    FiChevronRight,
    FiMessageCircle,
} from "react-icons/fi";

import {
    ArrowRight,
    Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

import { officeGallery } from "./contactData";


/* ============================================================================
   STATIC CONTACT INFORMATION
   ============================================================================ */

const CONTACT_INFO = {
    email: "support@urjasathi.in",
    phone: "+91 000 000 0000",
    location: "Greater Noida, Uttar Pradesh, India",
};


/* ============================================================================
   FLOATING INPUT FIELD
   ============================================================================ */

function InputField({
    type = "text",
    label,
    Icon,
    required = false,
}) {
    return (
        <div className="relative">

            <input
                type={type}
                placeholder=" "
                required={required}
                className="
                    peer
                    h-16
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    px-5
                    pr-12
                    text-text
                    outline-none
                    transition-all
                    duration-300
                    placeholder-transparent
                    focus:border-primary
                    focus:ring-4
                    focus:ring-primary/10
                "
            />

            <label
                className="
                    pointer-events-none
                    absolute
                    left-5
                    top-5
                    bg-surface
                    px-1
                    text-base
                    text-text-secondary
                    transition-all
                    duration-300

                    peer-placeholder-shown:top-5
                    peer-placeholder-shown:text-base

                    peer-focus:-top-2.5
                    peer-focus:text-xs
                    peer-focus:font-semibold
                    peer-focus:text-primary

                    peer-[&:not(:placeholder-shown)]:-top-2.5
                    peer-[&:not(:placeholder-shown)]:text-xs
                    peer-[&:not(:placeholder-shown)]:font-semibold
                "
            >
                {label}
                {required && (
                    <span className="ml-1 text-primary">*</span>
                )}
            </label>

            {Icon && (
                <Icon
                    className="
                        pointer-events-none
                        absolute
                        right-5
                        top-5
                        text-xl
                        text-text-secondary
                        transition-colors
                        duration-300
                        peer-focus:text-primary
                    "
                />
            )}

        </div>
    );
}


/* ============================================================================
   TEXT AREA FIELD
   ============================================================================ */

function TextAreaField({
    label,
    required = false,
}) {
    return (
        <div className="relative">

            <textarea
                rows={6}
                placeholder=" "
                required={required}
                className="
                    peer
                    min-h-[180px]
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    p-5
                    text-text
                    outline-none
                    transition-all
                    duration-300
                    placeholder-transparent
                    focus:border-primary
                    focus:ring-4
                    focus:ring-primary/10
                "
            />

            <label
                className="
                    pointer-events-none
                    absolute
                    left-5
                    top-5
                    bg-surface
                    px-1
                    text-base
                    text-text-secondary
                    transition-all
                    duration-300

                    peer-placeholder-shown:top-5
                    peer-placeholder-shown:text-base

                    peer-focus:-top-2.5
                    peer-focus:text-xs
                    peer-focus:font-semibold
                    peer-focus:text-primary

                    peer-[&:not(:placeholder-shown)]:-top-2.5
                    peer-[&:not(:placeholder-shown)]:text-xs
                    peer-[&:not(:placeholder-shown)]:font-semibold
                "
            >
                {label}
                {required && (
                    <span className="ml-1 text-primary">*</span>
                )}
            </label>

        </div>
    );
}


/* ============================================================================
   CONTACT PAGE
   ============================================================================ */

export default function Contact() {
    /* ------------------------------------------------------------------------
       Carousel state
       ------------------------------------------------------------------------ */

    const [currentImage, setCurrentImage] = useState(0);

    const [progress, setProgress] = useState(0);

    const [paused, setPaused] = useState(false);


    /* ------------------------------------------------------------------------
       Carousel timing
       ------------------------------------------------------------------------ */

    const SLIDE_DURATION = 7000;

    const INTERVAL = 50;

    const PROGRESS_STEP =
        100 / (SLIDE_DURATION / INTERVAL);


    /* ------------------------------------------------------------------------
       Automatic carousel
       ------------------------------------------------------------------------ */

    useEffect(() => {

        if (paused) return;

        const interval = setInterval(() => {

            setProgress((prev) => {

                if (prev >= 100) {

                    setCurrentImage(
                        (index) =>
                            (index + 1) %
                            officeGallery.length
                    );

                    return 0;
                }

                return prev + PROGRESS_STEP;
            });

        }, INTERVAL);


        return () => clearInterval(interval);

    }, [
        paused,
        PROGRESS_STEP,
        officeGallery.length,
    ]);


    /* ------------------------------------------------------------------------
       Next image
       ------------------------------------------------------------------------ */

    const nextImage = () => {

        setCurrentImage(
            (index) =>
                (index + 1) %
                officeGallery.length
        );

        setProgress(0);
    };


    /* ------------------------------------------------------------------------
       Previous image
       ------------------------------------------------------------------------ */

    const previousImage = () => {

        setCurrentImage(
            (index) =>
                index === 0
                    ? officeGallery.length - 1
                    : index - 1
        );

        setProgress(0);
    };


    return (
        <main className="min-h-screen bg-app-bg">


            {/* =================================================================
                HERO
               ================================================================= */}

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
                    pb-12
                    pt-24
                    text-center
                    sm:min-h-[44vh]
                    sm:px-8
                    sm:pb-14
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

                <div className="relative z-10 mx-auto max-w-4xl">

                    <h1
                        className="
                            text-[3rem]
                            font-semibold
                            leading-[0.96]
                            tracking-[-0.055em]
                            text-text
                            sm:text-6xl
                            md:text-7xl
                            lg:text-[5.5rem]
                        "
                    >
                        Let's Start a
                        <br />

                        <span className="text-primary">
                            Conversation.
                        </span>
                    </h1>


                    <p
                        className="
                            mx-auto
                            mt-7
                            max-w-2xl
                            text-base
                            leading-7
                            text-text-secondary
                            sm:mt-8
                            sm:text-lg
                            sm:leading-8
                            lg:text-xl
                        "
                    >
                        Have a question about UrjaSathi,
                        energy monitoring, or renewable energy?
                        We're here to help.
                    </p>

                </div>

            </section>



            {/* =================================================================
                CONTACT SECTION
               ================================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-app-bg
                    px-6
                    py-15
                    sm:px-8
                    sm:py-15
                    lg:px-10
                    lg:py-15
                "
            >

                {/* Background glows */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-48
                        top-20
                        h-[450px]
                        w-[450px]
                        rounded-full
                        bg-primary/7
                        blur-[140px]
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-48
                        bottom-0
                        h-[450px]
                        w-[450px]
                        rounded-full
                        bg-secondary/7
                        blur-[140px]
                    "
                />


                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        grid
                        max-w-7xl
                        grid-cols-1
                        items-start
                        gap-12
                        lg:grid-cols-[0.85fr_1.15fr]
                        lg:gap-20
                    "
                >


                    {/* =========================================================
                        LEFT CONTACT INFORMATION
                    ========================================================= */}

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
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            "
                        >
                            <FiMessageCircle className="h-5 w-5" />
                        </div>


                        {/* Eyebrow */}

                        <p
                            className="
                                mt-5
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-primary
                            "
                        >
                            Contact
                        </p>


                        {/* Main heading */}

                        <h2
                            className="
                                mt-4
                                text-5xl
                                font-semibold
                                leading-[0.98]
                                tracking-[-0.045em]
                                text-text
                                sm:text-6xl
                                lg:text-[4rem]
                            "
                        >
                            Get in {" "}
                            <span className="text-primary">
                                touch.
                            </span>
                        </h2>


                        {/* Description */}

                        <p
                            className="
                                mt-5
                                max-w-lg
                                text-[15px]
                                leading-6
                                text-text-secondary
                                sm:text-base
                                sm:leading-7
                            "
                        >
                            Whether you need help understanding your energy data,
                            have feedback about UrjaSathi, or simply want to know
                            more, send us a message.
                        </p>


                        {/* -----------------------------------------------------
                            Contact details
                        ----------------------------------------------------- */}

                        <div className="mt-9 space-y-8">


                            {/* Location */}

                            <div className="group flex items-center gap-4">

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        py-2
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                        transition-colors
                                        duration-200
                                        group-hover:bg-primary
                                        group-hover:text-white
                                    "
                                >
                                    <IoLocationOutline className="text-[20px]" />
                                </div>

                                <div>
                                    <h3
                                        className="
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Our Location
                                    </h3>

                                    <p
                                        className="
                                            mt-0.5
                                            text-sm
                                            leading-5
                                            text-text-secondary
                                        "
                                    >
                                        {CONTACT_INFO.location}
                                    </p>
                                </div>

                            </div>


                            {/* Email */}

                            <div className="group flex items-center gap-4">

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                        transition-colors
                                        duration-200
                                        group-hover:bg-primary
                                        group-hover:text-white
                                    "
                                >
                                    <MdOutlineAlternateEmail className="text-[20px]" />
                                </div>

                                <div>
                                    <h3
                                        className="
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Email Us
                                    </h3>

                                    <a
                                        href={`mailto:${CONTACT_INFO.email}`}
                                        className="
                                            mt-0.5
                                            block
                                            text-sm
                                            leading-5
                                            text-text-secondary
                                            transition-colors
                                            duration-200
                                            hover:text-primary
                                        "
                                    >
                                        {CONTACT_INFO.email}
                                    </a>
                                </div>

                            </div>


                            {/* Phone */}

                            <div className="group flex items-center gap-4">

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                        transition-colors
                                        duration-200
                                        group-hover:bg-primary
                                        group-hover:text-white
                                    "
                                >
                                    <IoCallOutline className="text-[20px]" />
                                </div>

                                <div>
                                    <h3
                                        className="
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Call Us
                                    </h3>

                                    <a
                                        href={`tel:${CONTACT_INFO.phone}`}
                                        className="
                                            mt-0.5
                                            block
                                            text-sm
                                            leading-5
                                            text-text-secondary
                                            transition-colors
                                            duration-200
                                            hover:text-primary
                                        "
                                    >
                                        {CONTACT_INFO.phone}
                                    </a>
                                </div>

                            </div>

                        </div>

                    </div>



                    {/* =========================================================
                        CONTACT FORM
                       ========================================================= */}

                    <div
                        className="
                            w-full
                            max-w-3xl
                            justify-self-end
                            rounded-3xl
                            border
                            border-border
                            bg-surface
                            p-5
                            shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                            sm:p-8
                            lg:p-10
                            xl:p-11
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    text-primary
                                "
                            >
                                Send a message
                            </p>


                            <h3
                                className="
                                    mt-4
                                    text-3xl
                                    font-semibold
                                    tracking-[-0.045em]
                                    text-text
                                    sm:text-4xl
                                "
                            >
                                How can we help?
                            </h3>


                            <p
                                className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-text-secondary
                                    sm:text-base
                                "
                            >
                                Fill out the form below and tell us
                                what you need help with.
                            </p>

                        </div>


                        <form className="mt-6 space-y-5">

                            {/* Name */}

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    sm:grid-cols-2
                                "
                            >

                                <InputField
                                    label="First Name"
                                    Icon={IoPersonOutline}
                                    required
                                />

                                <InputField
                                    label="Last Name"
                                    Icon={IoPersonOutline}
                                    required
                                />

                            </div>


                            {/* Phone / Email */}

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    sm:grid-cols-2
                                "
                            >

                                <InputField
                                    type="tel"
                                    label="Phone Number"
                                    Icon={IoCallOutline}
                                />

                                <InputField
                                    type="email"
                                    label="Email Address"
                                    Icon={MdOutlineAlternateEmail}
                                    required
                                />

                            </div>


                            {/* Subject */}

                            <InputField
                                label="Subject"
                                Icon={GoPencil}
                            />


                            {/* Message */}

                            <TextAreaField
                                label="Message"
                                required
                            />


                            {/* Submit */}

                            <button
                                type="submit"
                                className="
                                    group
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2.5
                                    rounded-full
                                    bg-primary
                                    px-7
                                    py-4
                                    text-sm
                                    font-semibold
                                    !text-white
                                    shadow-lg
                                    shadow-primary/20
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-primary-dark
                                    hover:shadow-xl
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-primary/30
                                    sm:text-base
                                "
                            >

                                <span className="!text-white">
                                    Send Message
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

                            </button>

                        </form>

                    </div>

                </div>

            </section>



            {/* =================================================================
                FAQ CTA
               ================================================================= */}

            <section
                className="
                    bg-app-bg
                    px-6
                    pb-16
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
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                    "
                >

                    {/* Subtle atmosphere */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-24
                            -top-24
                            h-64
                            w-64
                            rounded-full
                            bg-primary/7
                            blur-[90px]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-24
                            -left-24
                            h-64
                            w-64
                            rounded-full
                            bg-secondary/6
                            blur-[90px]
                        "
                    />


                    <div
                        className="
                            relative
                            z-10
                            flex
                            flex-col
                            items-center
                            gap-6
                            px-6
                            py-10
                            text-center
                            sm:px-10
                            sm:py-12
                            lg:flex-row
                            lg:justify-between
                            lg:px-12
                            lg:text-left
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    text-primary
                                "
                            >
                                Need help?
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-2xl
                                    font-semibold
                                    tracking-[-0.04em]
                                    text-text
                                    sm:text-3xl
                                "
                            >
                                Have more questions?
                            </h2>

                            <p
                                className="
                                    mt-2
                                    max-w-2xl
                                    text-sm
                                    leading-6
                                    text-text-secondary
                                    sm:text-base
                                "
                            >
                                Explore our frequently asked questions
                                to quickly find answers about UrjaSathi
                                and energy monitoring.
                            </p>

                        </div>


                        <Link
                            to="/faq"
                            className="
                                group
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-primary
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                !text-white
                                shadow-lg
                                shadow-primary/20
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-primary-dark
                                hover:shadow-xl
                                focus:outline-none
                                focus:ring-2
                                focus:ring-primary/30
                            "
                        >

                            <span className="!text-white">
                                View FAQs
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



            {/* =================================================================
                IMAGE CAROUSEL
               ================================================================= */}

            <section
                className="
                    bg-app-bg
                    px-6
                    pb-20
                    sm:px-8
                    sm:pb-24
                    lg:px-10
                    lg:pb-28
                "
            >

                <div className="mx-auto max-w-7xl">

                    {/* Section heading */}

                    <div className="mb-10 text-center">

                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-primary
                            "
                        >
                            Inside UrjaSathi
                        </p>

                        <h2
                            className="
                                mt-3
                                text-3xl
                                font-semibold
                                tracking-[-0.045em]
                                text-text
                                sm:text-4xl
                                lg:text-5xl
                            "
                        >
                            Powering Ideas.
                            <span className="text-primary">
                                {" "}Creating Impact.
                            </span>
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-text-secondary
                                sm:text-base
                            "
                        >
                            A glimpse into the people, technology,
                            and ideas behind UrjaSathi.
                        </p>

                    </div>


                    {/* Carousel */}

                    <div
                        className="
                            group
                            relative
                            h-[380px]
                            overflow-hidden
                            rounded-3xl
                            border
                            border-border
                            bg-surface
                            shadow-[0_25px_80px_rgba(0,0,0,0.10)]
                            sm:h-[500px]
                            lg:h-[620px]
                        "
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >

                        {/* Images */}

                        {officeGallery.map((image, index) => (

                            <img
                                key={image.src}
                                src={image.src}
                                alt={image.title}
                                className={`
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                    transition-opacity
                                    duration-1000
                                    ${
                                        index === currentImage
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }
                                `}
                            />

                        ))}


                        {/* Image overlay */}

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/80
                                via-black/25
                                to-black/5
                            "
                        />


                        {/* Text */}

                        <div
                            className="
                                absolute
                                bottom-16
                                left-6
                                max-w-xl
                                text-white
                                sm:bottom-16
                                sm:left-10
                                lg:left-12
                            "
                        >

                            <h3
                                className="
                                    text-2xl
                                    font-semibold
                                    tracking-[-0.03em]
                                    sm:text-3xl
                                    lg:text-4xl
                                "
                            >
                                {officeGallery[currentImage].title}
                            </h3>

                            <p
                                className="
                                    mt-3
                                    max-w-lg
                                    text-sm
                                    leading-6
                                    text-white/80
                                    sm:text-base
                                    sm:leading-7
                                "
                            >
                                {officeGallery[currentImage].description}
                            </p>

                        </div>


                        {/* Previous */}

                        <button
                            type="button"
                            aria-label="Previous image"
                            onClick={previousImage}
                            className="
                                absolute
                                left-5
                                top-1/2
                                flex
                                h-11
                                w-11
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/20
                                bg-white/20
                                text-white
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:scale-110
                                hover:bg-white/30
                            "
                        >
                            <FiChevronLeft size={22} />
                        </button>


                        {/* Next */}

                        <button
                            type="button"
                            aria-label="Next image"
                            onClick={nextImage}
                            className="
                                absolute
                                right-5
                                top-1/2
                                flex
                                h-11
                                w-11
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/20
                                bg-white/20
                                text-white
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:scale-110
                                hover:bg-white/30
                            "
                        >
                            <FiChevronRight size={22} />
                        </button>


                        {/* Dots */}

                        <div
                            className="
                                absolute
                                bottom-7
                                left-1/2
                                z-20
                                flex
                                -translate-x-1/2
                                items-center
                                gap-2
                            "
                        >

                            {officeGallery.map((_, index) => (

                                <button
                                    key={index}
                                    type="button"
                                    aria-label={`Go to image ${index + 1}`}
                                    onClick={() => {
                                        setCurrentImage(index);
                                        setProgress(0);
                                    }}
                                    className={`
                                        h-2.5
                                        rounded-full
                                        transition-all
                                        duration-300
                                        ${
                                            currentImage === index
                                                ? "w-8 bg-primary"
                                                : "w-2.5 bg-white/45 hover:bg-white/75"
                                        }
                                    `}
                                />

                            ))}

                        </div>


                        {/* Progress bar */}

                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                h-1
                                w-full
                                bg-white/20
                            "
                        >

                            <div
                                className="
                                    h-full
                                    rounded-full
                                    bg-primary
                                "
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}