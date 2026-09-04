/**
 * ============================================================================
 * File        : DashboardLayout.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Main application shell for UrjaSathi dashboard pages.
 *
 * Structure:
 *
 * DashboardLayout
 * ├── DashboardSidebar
 * ├── DashboardTopbar
 * └── Page Content
 *
 * Features:
 * - Desktop sidebar expand / collapse
 * - Mobile sidebar drawer
 * - Animated layout transitions
 * - Responsive dashboard content area
 * ============================================================================
 */

import { useState } from "react";

import DashboardSidebar from "../common/DashboardSidebar";
import DashboardTopbar from "../common/DashboardTopbar";


export default function DashboardLayout({ children }) {

    /**
     * ================================================================
     * SIDEBAR STATE
     * ================================================================
     */

    // Mobile sidebar drawer
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Desktop sidebar collapse state
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);


    /**
     * ================================================================
     * MOBILE SIDEBAR CONTROLS
     * ================================================================
     */

    const openSidebar = () => {
        setSidebarOpen(true);
    };


    const closeSidebar = () => {
        setSidebarOpen(false);
    };


    /**
     * ================================================================
     * DESKTOP SIDEBAR CONTROL
     * ================================================================
     */

    const toggleSidebar = () => {
        setSidebarCollapsed((collapsed) => !collapsed);
    };


    /**
     * ================================================================
     * RENDER
     * ================================================================
     */

    return (
        <div
            className="
                min-h-screen
                bg-white
                text-text
            "
        >

            {/* =========================================================
                SIDEBAR
               ========================================================= */}

            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={toggleSidebar}
            />


            {/* =========================================================
                MAIN APPLICATION AREA
               ========================================================= */}

            <div
                className={`
                    min-h-screen
                    transition-[padding]
                    duration-300
                    ease-in-out

                    ${
                        sidebarCollapsed
                            ? "lg:pl-[76px]"
                            : "lg:pl-64"
                    }
                `}
            >

                {/* =====================================================
                    TOPBAR
                   ===================================================== */}

                <DashboardTopbar
                    onMenuClick={openSidebar}
                />


                {/* =====================================================
                    PAGE CONTENT
                   ===================================================== */}

                <main
                    className="
                        min-h-screen
                        px-4
                        pb-10
                        pt-24
                        sm:px-6
                        lg:px-8
                    "
                >
                    {children}
                </main>

            </div>

        </div>
    );
}