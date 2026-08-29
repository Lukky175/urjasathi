import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import {
    Moon,
    Sun,
    Home,
    Phone,
    MessageCircle,
    Menu,
    X,
    LayoutDashboard,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { theme, toggle } = useTheme();
    const { status } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isAuthenticated = status === "authenticated";

    const navItems = [
        {
            to: "/",
            label: "Home",
            icon: Home,
        },
        {
            to: "/faq",
            label: "FAQ",
            icon: MessageCircle,
        },
        {
            to: "/contact",
            label: "Contact Us",
            icon: Phone,
        },
    ];

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav
            className="
                fixed
                inset-x-0
                top-2
                z-50
                px-2
                sm:top-3.5
                sm:px-4
            "
        >
            {/* =====================================================
                MAIN NAVBAR
               ===================================================== */}

            <div
                className="
                    mx-auto
                    flex
                    h-[45px]
                    max-w-7xl
                    items-center
                    justify-between
                    rounded-full
                    border
                    border-border
                    bg-surface/80
                    px-4
                    shadow-xl
                    backdrop-blur-xl
                    sm:h-[64px]
                    sm:px-6
                    md:px-8
                "
            >

                {/* =================================================
                    LOGO
                   ================================================= */}

                <Link
                    to="/"
                    onClick={closeMenu}
                    aria-label="UrjaSathi Home"
                    className="
                        flex
                        shrink-0
                        items-center
                        transition-transform
                        duration-300
                        hover:scale-105
                    "
                >
                    <img
                        src="/logos/UrjaSathi.png"
                        alt="UrjaSathi"
                        className="
                            block
                            h-auto
                            w-[105px]
                            max-h-[30px]
                            object-contain
                            sm:w-[145px]
                            sm:max-h-[42px]
                        "
                    />
                </Link>


                {/* =================================================
                    DESKTOP NAVIGATION
                   ================================================= */}

                <div
                    className="
                        hidden
                        items-center
                        gap-10
                        md:flex
                    "
                >
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `
                                group
                                relative
                                flex
                                items-center
                                gap-2
                                font-medium
                                transition-all
                                duration-300
                                ${
                                    isActive
                                        ? "text-primary"
                                        : "text-text-secondary hover:text-primary"
                                }
                                `
                            }
                        >
                            <Icon className="h-[18px] w-[18px]" />

                            <span>{label}</span>

                            {/* Underline */}
                            <span
                                className="
                                    absolute
                                    -bottom-2
                                    left-0
                                    h-0.5
                                    w-0
                                    rounded-full
                                    bg-primary
                                    transition-all
                                    duration-300
                                    group-hover:w-full
                                "
                            />
                        </NavLink>
                    ))}
                </div>


                {/* =================================================
                    RIGHT SIDE
                   ================================================= */}

                <div className="flex items-center gap-2 sm:gap-3">

                    {/* Theme toggle */}

                    <button
                        type="button"
                        onClick={toggle}
                        aria-label={
                            theme === "light"
                                ? "Switch to dark mode"
                                : "Switch to light mode"
                        }
                        title={
                            theme === "light"
                                ? "Switch to dark mode"
                                : "Switch to light mode"
                        }
                        className="
                            flex
                            h-[32px]
                            w-[32px]
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-border-strong
                            text-text-secondary
                            transition-all
                            duration-300
                            hover:rotate-12
                            hover:border-primary
                            hover:text-primary
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-focus
                            sm:h-[48px]
                            sm:w-[48px]
                        "
                    >
                        {theme === "light" ? (
                            <Moon className="h-4 w-4 sm:h-[19px] sm:w-[19px]" />
                        ) : (
                            <Sun className="h-4 w-4 sm:h-[19px] sm:w-[19px]" />
                        )}
                    </button>


                    {/* =================================================
                        DESKTOP CTA
                       ================================================= */}

                    {isAuthenticated ? (
                        <Link
                            to="/dashboard"
                            className="
                                hidden
                                items-center
                                gap-2
                                rounded-full
                                bg-primary
                                px-6
                                py-3
                                font-semibold
                                text-white
                                shadow-lg
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-xl
                                md:flex
                            "
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="
                                hidden
                                rounded-full
                                bg-primary
                                px-6
                                py-3
                                font-semibold
                                !text-white
                                shadow-lg
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-primary-dark
                                hover:shadow-xl
                                md:block
                            "
                        >
                            Get Started
                        </Link>
                    )}


                    {/* =================================================
                        MOBILE MENU BUTTON
                       ================================================= */}

                    <button
                        type="button"
                        onClick={() =>
                            setIsMenuOpen((open) => !open)
                        }
                        aria-label={
                            isMenuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={isMenuOpen}
                        className="
                            flex
                            h-[32px]
                            w-[32px]
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-border-strong
                            text-text-secondary
                            transition-all
                            duration-300
                            hover:border-primary
                            hover:text-primary
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-focus
                            md:hidden
                        "
                    >
                        {isMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>

                </div>
            </div>


            {/* =====================================================
                MOBILE NAVIGATION
               ===================================================== */}

            {isMenuOpen && (
                <div
                    className="
                        mt-3
                        rounded-2xl
                        border
                        border-border
                        bg-surface/95
                        p-2
                        shadow-xl
                        backdrop-blur-xl
                        md:hidden
                    "
                >
                    <div className="flex flex-col gap-3">

                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `
                                    flex
                                    items-center
                                    gap-2.5
                                    rounded-xl
                                    px-3
                                    py-2
                                    transition-all
                                    duration-300
                                    ${
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-text-secondary hover:bg-primary/10 hover:text-primary"
                                    }
                                    `
                                }
                            >
                                <Icon className="h-[18px] w-[18px]" />

                                <span>{label}</span>
                            </NavLink>
                        ))}


                        {/* Mobile CTA */}

                        <div className="border-t border-border pt-3">

                            {isAuthenticated ? (
                                <Link
                                    to="/dashboard"
                                    onClick={closeMenu}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-primary
                                        px-2
                                        py-2.5
                                        font-semibold
                                        text-white
                                        shadow-md
                                    "
                                >
                                    <LayoutDashboard className="h-[17px] w-[17px]" />
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary
                                        px-2
                                        py-2.5
                                        font-semibold
                                        text-white
                                        shadow-md
                                    "
                                >
                                    Get Started
                                </Link>
                            )}

                        </div>

                    </div>
                </div>
            )}
        </nav>
    );
}