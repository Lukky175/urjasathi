/**
 * ============================================================================
 * File        : DashboardTopbar.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Top navigation bar for the authenticated UrjaSathi dashboard.
 *
 * Responsibilities:
 * - Display mobile sidebar toggle
 * - Display current dashboard context
 * - Provide user profile area
 * - Provide quick actions
 * ============================================================================
 */

import {
    Menu,
    Bell,
    ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";


export default function DashboardTopbar({
    onMenuClick = () => {},
}) {
    const { user } = useAuth();


    /**
     * Display a friendly user name when
     * information becomes available from
     * the backend.
     */
    const userName =
        user?.name ||
        user?.fullName ||
        user?.email ||
        "User";


    /**
     * Generate a simple avatar initial.
     */
    const userInitial =
        userName
            .charAt(0)
            .toUpperCase();


    return (
        <header
            className="
                fixed
                right-0
                top-0
                z-30
                flex
                h-20
                items-center
                justify-between
                border-b
                border-border
                bg-surface/85
                px-4
                shadow-sm
                backdrop-blur-xl
                sm:px-6
                lg:left-64
                lg:px-8
            "
        >

            {/* =========================================================
                LEFT SIDE
               ========================================================= */}

            <div className="flex items-center gap-4">

                {/* Mobile menu button */}

                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open dashboard navigation"
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-border
                        text-text-secondary
                        transition-all
                        duration-200
                        hover:border-primary
                        hover:bg-primary/5
                        hover:text-primary
                        lg:hidden
                    "
                >
                    <Menu className="h-5 w-5" />
                </button>


                {/* Page context */}

                <div>

                    <p
                        className="
                            hidden
                            text-xs
                            font-medium
                            text-text-secondary
                            sm:block
                        "
                    >
                        UrjaSathi
                    </p>

                    <h1
                        className="
                            text-base
                            font-semibold
                            tracking-tight
                            text-text
                            sm:text-lg
                        "
                    >
                        Energy Dashboard
                    </h1>

                </div>

            </div>


            {/* =========================================================
                RIGHT SIDE
               ========================================================= */}

            <div className="flex items-center gap-2 sm:gap-4">

                {/* Notification */}

                <button
                    type="button"
                    aria-label="Notifications"
                    className="
                        relative
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        text-text-secondary
                        transition-all
                        duration-200
                        hover:bg-primary/10
                        hover:text-primary
                    "
                >

                    <Bell className="h-[19px] w-[19px]" />

                    {/* Notification indicator */}

                    <span
                        className="
                            absolute
                            right-2.5
                            top-2
                            h-2
                            w-2
                            rounded-full
                            bg-primary
                            ring-2
                            ring-surface
                        "
                    />

                </button>


                {/* Divider */}

                <div
                    className="
                        hidden
                        h-8
                        w-px
                        bg-border
                        sm:block
                    "
                />


                {/* User profile */}

                <button
                    type="button"
                    className="
                        group
                        flex
                        items-center
                        gap-2.5
                        rounded-full
                        px-1.5
                        py-1.5
                        transition-all
                        duration-200
                        hover:bg-primary/5
                    "
                >

                    {/* Avatar */}

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
                            text-sm
                            font-semibold
                            text-primary
                        "
                    >
                        {userInitial}
                    </div>


                    {/* User information */}

                    <div
                        className="
                            hidden
                            text-left
                            sm:block
                        "
                    >

                        <p
                            className="
                                max-w-[150px]
                                truncate
                                text-sm
                                font-semibold
                                text-text
                            "
                        >
                            {userName}
                        </p>

                        <p
                            className="
                                text-xs
                                text-text-secondary
                            "
                        >
                            Energy User
                        </p>

                    </div>


                    <ChevronDown
                        className="
                            hidden
                            h-4
                            w-4
                            text-text-secondary
                            transition-transform
                            duration-200
                            group-hover:translate-y-0.5
                            sm:block
                        "
                    />

                </button>

            </div>

        </header>
    );
}