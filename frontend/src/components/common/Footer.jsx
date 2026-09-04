import {
    ArrowUp,
    Mail,
    MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

const FOOTER_LINKS = {
    Platform: [
        {
            label: "Home",
            path: "/home",
        },
        {
            label: "Dashboard",
            path: "/dashboard",
        },
        {
            label: "FAQ",
            path: "/faq",
        },
    ],

    Support: [
        {
            label: "Contact Us",
            path: "/contact",
        },
        {
            label: "Login",
            path: "/login",
        },
    ],
};

function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="border-t border-border bg-surface">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">

                {/* =====================================================
                    MAIN FOOTER
                   ===================================================== */}

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.35fr] lg:gap-16">

                    {/* =================================================
                        BRAND
                       ================================================= */}

                    <div className="max-w-md">

                        <Link
                            to="/home"
                            className="inline-flex items-center gap-3"
                            aria-label="UrjaSathi home"
                        >
                            {/* Square logo */}
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                                <img
                                    src="/logos/UrjaSathi_1.png"
                                    alt="UrjaSathi"
                                    className="h-full w-full object-contain"
                                />
                            </div>

                            {/* Brand name */}
                            <div>
                                <span
                                    className="
                                        block
                                        text-xl
                                        font-bold
                                        leading-none
                                        tracking-[-0.03em]
                                        text-text
                                    "
                                >
                                    UrjaSathi
                                </span>

                                <span
                                    className="
                                        mt-1.5
                                        block
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.2em]
                                        text-text-muted
                                    "
                                >
                                    Smart Energy
                                </span>
                            </div>
                        </Link>


                        <p
                            className="
                                mt-6
                                max-w-sm
                                text-sm
                                leading-6
                                text-text-secondary
                                sm:text-base
                                sm:leading-7
                            "
                        >
                            Intelligent energy management for homes,
                            institutions, public facilities, and commercial
                            buildings.
                        </p>


                        {/* Small brand statement */}

                        <div className="mt-7 flex items-center gap-2.5">

                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-secondary
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.16em]
                                    text-text-muted
                                "
                            >
                                Smarter energy. Better decisions.
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        PLATFORM
                       ================================================= */}

                    <div>
                        <h3
                            className="
                                text-sm
                                font-semibold
                                tracking-[-0.01em]
                                text-text
                            "
                        >
                            Platform
                        </h3>

                        <ul className="mt-5 space-y-3.5">
                            {FOOTER_LINKS.Platform.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="
                                            text-sm
                                            text-text-secondary
                                            transition-colors
                                            duration-200
                                            hover:text-primary
                                        "
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* =================================================
                        SUPPORT
                       ================================================= */}

                    <div>
                        <h3
                            className="
                                text-sm
                                font-semibold
                                tracking-[-0.01em]
                                text-text
                            "
                        >
                            Support
                        </h3>

                        <ul className="mt-5 space-y-3.5">
                            {FOOTER_LINKS.Support.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="
                                            text-sm
                                            text-text-secondary
                                            transition-colors
                                            duration-200
                                            hover:text-primary
                                        "
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* =================================================
                        CONTACT
                       ================================================= */}

                    <div>
                        <h3
                            className="
                                text-sm
                                font-semibold
                                tracking-[-0.01em]
                                text-text
                            "
                        >
                            Get in touch
                        </h3>

                        <div className="mt-5 space-y-5">

                            {/* Email */}

                            <a
                                href="mailto:hello@urjasathi.in"
                                className="
                                    group
                                    flex
                                    items-start
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-primary/10
                                        text-primary
                                        transition-colors
                                        duration-200
                                        group-hover:bg-primary
                                        group-hover:text-white
                                    "
                                >
                                    <Mail
                                        size={16}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.15em]
                                            text-text-muted
                                        "
                                    >
                                        Email
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-text-secondary
                                            transition-colors
                                            duration-200
                                            group-hover:text-primary
                                        "
                                    >
                                        hello@urjasathi.in
                                    </p>
                                </div>
                            </a>


                            {/* Built for */}

                            <div className="flex items-start gap-3">

                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-secondary/10
                                        text-secondary
                                    "
                                >
                                    <MapPin
                                        size={16}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.15em]
                                            text-text-muted
                                        "
                                    >
                                        Built for
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            max-w-[220px]
                                            text-sm
                                            leading-5
                                            text-text-secondary
                                        "
                                    >
                                        Sustainable energy management
                                        across India
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>


                {/* =====================================================
                    BOTTOM BAR
                   ===================================================== */}

                <div
                    className="
                        mt-14
                        flex
                        flex-col
                        gap-5
                        border-t
                        border-border
                        pt-6
                        sm:mt-16
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    {/* Copyright */}

                    <p
                        className="
                            text-xs
                            leading-5
                            text-text-muted
                            sm:text-sm
                        "
                    >
                        © {currentYear} UrjaSathi. Built for a smarter,
                        sustainable energy future.
                    </p>


                    {/* Back to top */}

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2
                            self-start
                            rounded-full
                            bg-primary
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:shadow-md
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-focus
                            sm:self-auto
                        "
                    >
                        Back to top

                        <ArrowUp
                            size={15}
                            strokeWidth={2.2}
                            className="
                                transition-transform
                                duration-200
                                group-hover:-translate-y-0.5
                            "
                        />
                    </button>

                </div>

            </div>
        </footer>
    );
}

export default Footer;