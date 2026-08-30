/**
 * ============================================================================
 * File        : DashboardSidebar.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Main navigation sidebar for the authenticated UrjaSathi dashboard.
 *
 * Responsibilities:
 * - Provide dashboard navigation
 * - Highlight the active dashboard section
 * - Provide access to major energy monitoring features
 * - Provide logout action
 * - Support responsive mobile navigation
 * ============================================================================
 */

import { NavLink, Link, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    BarChart3,
    Zap,
    SunMedium,
    Lightbulb,
    Settings,
    LogOut,
    X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";


export default function DashboardSidebar({
    isOpen = false,
    onClose = () => {},
}) {
    const { logout } = useAuth();
    const navigate = useNavigate();


    /**
     * Dashboard navigation items.
     *
     * These routes can be expanded later as
     * more UrjaSathi functionality is implemented.
     */
    const navItems = [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            end: true,
        },
        {
            to: "/dashboard/overview",
            label: "Overview",
            icon: BarChart3,
        },
        {
            to: "/dashboard/consumption",
            label: "Energy Consumption",
            icon: Zap,
        },
        {
            to: "/dashboard/generation",
            label: "Renewable Generation",
            icon: SunMedium,
        },
        {
            to: "/dashboard/recommendations",
            label: "Recommendations",
            icon: Lightbulb,
        },
        {
            to: "/dashboard/settings",
            label: "Settings",
            icon: Settings,
        },
    ];


    /**
     * Handles logout.
     */
    const handleLogout = async () => {
        await logout();

        onClose();

        navigate("/home", {
            replace: true,
        });
    };


    return (
        <>
            {/* =========================================================
                MOBILE OVERLAY
               ========================================================= */}

            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/40
                        backdrop-blur-sm
                        lg:hidden
                    "
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}


            {/* =========================================================
                SIDEBAR
               ========================================================= */}

            <aside
                className={`
                    fixed
                    inset-y-0
                    left-0
                    z-50
                    flex
                    w-64
                    flex-col
                    border-r
                    border-border
                    bg-surface
                    shadow-xl
                    transition-transform
                    duration-300
                    ease-in-out

                    lg:translate-x-0

                    ${
                        isOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >

                {/* =====================================================
                    LOGO / BRAND
                   ===================================================== */}

                <div
                    className="
                        flex
                        h-20
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-border
                        px-6
                    "
                >

                    <Link
                        to="/dashboard"
                        onClick={onClose}
                        className="
                            flex
                            items-center
                            transition-transform
                            duration-300
                            hover:scale-[1.03]
                        "
                    >
                        <img
                            src="/logos/UrjaSathi.png"
                            alt="UrjaSathi"
                            className="
                                h-auto
                                w-[135px]
                                object-contain
                            "
                        />
                    </Link>


                    {/* Mobile close button */}

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close dashboard navigation"
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-text-secondary
                            transition-all
                            duration-300
                            hover:bg-primary/10
                            hover:text-primary
                            lg:hidden
                        "
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>


                {/* =====================================================
                    USER / SECTION LABEL
                   ===================================================== */}

                <div className="px-5 pb-3 pt-6">

                    <p
                        className="
                            px-3
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-text-secondary
                        "
                    >
                        Energy Management
                    </p>

                </div>


                {/* =====================================================
                    NAVIGATION
                   ===================================================== */}

                <nav
                    className="
                        flex-1
                        overflow-y-auto
                        px-3
                    "
                >

                    <div className="flex flex-col gap-1">

                        {navItems.map(
                            ({
                                to,
                                label,
                                icon: Icon,
                                end,
                            }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={end}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-200

                                        ${
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                                        }
                                        `
                                    }
                                >

                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                className={`
                                                    h-[19px]
                                                    w-[19px]
                                                    shrink-0
                                                    transition-transform
                                                    duration-200
                                                    ${
                                                        isActive
                                                            ? "scale-105"
                                                            : "group-hover:scale-105"
                                                    }
                                                `}
                                            />

                                            <span>
                                                {label}
                                            </span>

                                            {isActive && (
                                                <span
                                                    className="
                                                        ml-auto
                                                        h-1.5
                                                        w-1.5
                                                        rounded-full
                                                        bg-primary
                                                    "
                                                />
                                            )}
                                        </>
                                    )}

                                </NavLink>
                            )
                        )}

                    </div>

                </nav>


                {/* =====================================================
                    BOTTOM AREA
                   ===================================================== */}

                <div
                    className="
                        shrink-0
                        border-t
                        border-border
                        p-3
                    "
                >

                    {/* Logout */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            group
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-sm
                            font-medium
                            text-text-secondary
                            transition-all
                            duration-200
                            hover:bg-red-500/10
                            hover:text-red-500
                        "
                    >

                        <LogOut
                            className="
                                h-[19px]
                                w-[19px]
                                shrink-0
                                transition-transform
                                duration-200
                                group-hover:-translate-x-0.5
                            "
                        />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>
        </>
    );
}