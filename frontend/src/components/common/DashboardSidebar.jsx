/**
 * ============================================================================
 * File        : DashboardSidebar.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Main navigation sidebar for the UrjaSathi dashboard.
 *
 * Responsibilities:
 * - Provide dashboard navigation
 * - Highlight the active dashboard section
 * - Support desktop collapse / expand
 * - Support responsive mobile drawer navigation
 * - Provide access to core energy-management features
 * - Provide logout action
 * ============================================================================
 */

import { NavLink, Link, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Zap,
    SunMedium,
    BatteryCharging,
    IndianRupee,
    Lightbulb,
    Sparkles,
    LogOut,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";


export default function DashboardSidebar({
    isOpen = false,
    onClose = () => {},
    isCollapsed = false,
    onToggleCollapse = () => {},
}) {

    const { logout } = useAuth();
    const navigate = useNavigate();


    /* =========================================================================
       NAVIGATION ITEMS
       ========================================================================= */

    const navItems = [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            end: true,
        },
        {
            to: "/dashboard/consumption",
            label: "Consumption",
            icon: Zap,
        },
        {
            to: "/dashboard/generation",
            label: "Generation",
            icon: SunMedium,
        },
        {
            to: "/dashboard/battery",
            label: "Battery & Storage",
            icon: BatteryCharging,
        },
        {
            to: "/dashboard/cost",
            label: "Cost & Savings",
            icon: IndianRupee,
        },
        {
            to: "/dashboard/urja-planner",
            label: "Urja Planner",
            icon: Sparkles,
        },
        {
            to: "/dashboard/recommendations",
            label: "Recommendations",
            icon: Lightbulb,
        },
    ];


    /* =========================================================================
       LOGOUT
       ========================================================================= */

    const handleLogout = async () => {

        await logout();

        onClose();

        navigate("/home", {
            replace: true,
        });
    };


    /* =========================================================================
       RENDER
       ========================================================================= */

    return (
        <>
            {/* =================================================================
                MOBILE OVERLAY
               ================================================================= */}

            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/40
                        backdrop-blur-sm
                        transition-opacity
                        duration-300
                        lg:hidden
                    "
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}


            {/* =================================================================
                SIDEBAR
               ================================================================= */}

            <aside
                className={`
                    fixed
                    inset-y-0
                    left-0
                    z-50
                    flex
                    flex-col

                    border-r
                    border-border

                    bg-surface
                    shadow-xl

                    transition-[width,transform]
                    duration-300
                    ease-in-out

                    w-64

                    lg:translate-x-0

                    ${
                        isOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }

                    ${
                        isCollapsed
                            ? "lg:w-[76px]"
                            : "lg:w-64"
                    }
                `}
            >

                {/* =================================================================
                    BRAND HEADER
                   ================================================================= */}

                <div
                    className={`
                        relative
                        flex
                        h-20
                        shrink-0
                        items-center

                        border-b
                        border-border

                        transition-all
                        duration-300

                        ${
                            isCollapsed
                                ? "justify-center px-3"
                                : "justify-start px-5"
                        }
                    `}
                >

                    {/* =============================================================
                        LOGO
                       ============================================================= */}

                    <Link
                        to="/dashboard"
                        onClick={onClose}
                        aria-label="UrjaSathi Dashboard"
                        className="
                            flex
                            shrink-0
                            items-center
                            transition-transform
                            duration-300
                            hover:scale-[1.03]
                        "
                    >

                        {isCollapsed ? (

                            <img
                                src="/logo/urjasathi-logo.svg"
                                alt="UrjaSathi"
                                className="
                                    h-10
                                    w-10
                                    object-contain
                                    transition-all
                                    duration-300
                                "
                            />

                        ) : (

                            <img
                                src="/logos/UrjaSathi.png"
                                alt="UrjaSathi"
                                className="
                                    h-auto
                                    w-[135px]
                                    object-contain
                                    transition-all
                                    duration-300
                                "
                            />

                        )}

                    </Link>


                    {/* =============================================================
                        MOBILE CLOSE BUTTON
                       ============================================================= */}

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close dashboard navigation"
                        className="
                            ml-auto
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center

                            rounded-full

                            text-text-secondary

                            transition-all
                            duration-300

                            hover:bg-primary/10
                            hover:text-primary
                            hover:rotate-90
                            hover:scale-105

                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-focus

                            lg:hidden
                        "
                    >
                        <X className="h-5 w-5" />
                    </button>


                    {/* =============================================================
                        DESKTOP COLLAPSE / EXPAND BUTTON
                       ============================================================= */}

                    <button
                        type="button"
                        onClick={onToggleCollapse}
                        aria-label={
                            isCollapsed
                                ? "Expand sidebar"
                                : "Collapse sidebar"
                        }
                        title={
                            isCollapsed
                                ? "Expand sidebar"
                                : "Collapse sidebar"
                        }
                        className="
                            absolute
                            -right-3
                            top-1/2
                            z-50

                            hidden
                            h-7
                            w-7
                            -translate-y-1/2

                            items-center
                            justify-center

                            rounded-full

                            border
                            border-border-strong

                            bg-surface
                            text-text-secondary

                            shadow-md

                            transition-all
                            duration-300
                            ease-out

                            hover:scale-110
                            hover:border-primary
                            hover:bg-primary
                            hover:text-white
                            hover:shadow-lg

                            active:scale-95

                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-focus

                            lg:flex
                        "
                    >

                        {/* =========================================================
                            COLLAPSED → EXPAND
                           ========================================================= */}

                        {isCollapsed ? (

                            <ChevronRight
                                className="
                                    h-4
                                    w-4
                                    transition-all
                                    duration-300
                                "
                            />

                        ) : (

                            /* =====================================================
                               EXPANDED → COLLAPSE
                               ===================================================== */

                            <ChevronLeft
                                className="
                                    h-4
                                    w-4
                                    transition-all
                                    duration-300
                                "
                            />

                        )}

                    </button>

                </div>


                {/* =================================================================
                    SECTION LABEL
                   ================================================================= */}

                <div
                    className={`
                        overflow-hidden
                        transition-all
                        duration-300

                        ${
                            isCollapsed
                                ? "h-0 opacity-0"
                                : "h-[52px] opacity-100"
                        }
                    `}
                >

                    <div className="px-5 pb-3 pt-6">

                        <p
                            className="
                                px-3

                                whitespace-nowrap

                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]

                                text-text-muted
                            "
                        >
                            Energy Management
                        </p>

                    </div>

                </div>


                {/* =================================================================
                    NAVIGATION
                   ================================================================= */}

                <nav
                    className="
                        flex-1
                        overflow-y-auto
                        px-3
                        py-2
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
                                    title={
                                        isCollapsed
                                            ? label
                                            : undefined
                                    }
                                    className={({ isActive }) =>
                                        `
                                        group
                                        relative

                                        flex
                                        items-center

                                        rounded-xl
                                        py-3

                                        text-sm
                                        font-medium

                                        transition-all
                                        duration-200

                                        ${
                                            isCollapsed
                                                ? "justify-center px-3"
                                                : "gap-3 px-3"
                                        }

                                        ${
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                                        }

                                        hover:translate-x-0.5
                                        `
                                    }
                                >

                                    {({ isActive }) => (
                                        <>

                                            {/* =================================================
                                                ACTIVE INDICATOR
                                               ================================================= */}

                                            {isActive && (
                                                <span
                                                    className="
                                                        absolute
                                                        left-0
                                                        top-1/2

                                                        h-6
                                                        w-0.5

                                                        -translate-y-1/2

                                                        rounded-full
                                                        bg-primary

                                                        transition-all
                                                        duration-300
                                                    "
                                                />
                                            )}


                                            {/* =================================================
                                                ICON
                                               ================================================= */}

                                            <Icon
                                                className={`
                                                    h-[19px]
                                                    w-[19px]
                                                    shrink-0

                                                    transition-all
                                                    duration-200

                                                    ${
                                                        isActive
                                                            ? "scale-105"
                                                            : "group-hover:scale-110"
                                                    }
                                                `}
                                            />


                                            {/* =================================================
                                                LABEL
                                               ================================================= */}

                                            {!isCollapsed && (
                                                <span
                                                    className="
                                                        truncate
                                                        whitespace-nowrap

                                                        transition-all
                                                        duration-200
                                                    "
                                                >
                                                    {label}
                                                </span>
                                            )}

                                        </>
                                    )}

                                </NavLink>

                            )
                        )}

                    </div>

                </nav>


                {/* =================================================================
                    LOGOUT
                   ================================================================= */}

                <div
                    className="
                        shrink-0
                        border-t
                        border-border
                        p-3
                    "
                >

                    <button
                        type="button"
                        onClick={handleLogout}
                        title={
                            isCollapsed
                                ? "Logout"
                                : undefined
                        }
                        className={`
                            group

                            flex
                            w-full
                            items-center

                            rounded-xl
                            py-3

                            text-sm
                            font-medium
                            text-text-secondary

                            transition-all
                            duration-200

                            hover:bg-red-500/10
                            hover:text-red-500

                            ${
                                isCollapsed
                                    ? "justify-center px-3"
                                    : "gap-3 px-3"
                            }
                        `}
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

                        {!isCollapsed && (
                            <span>
                                Logout
                            </span>
                        )}

                    </button>

                </div>

            </aside>
        </>
    );
}