/**
 * ============================================================================
 * File        : DashboardLayout.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Main application shell for authenticated dashboard pages.
 *
 * Structure:
 *
 * DashboardLayout
 * ├── DashboardSidebar
 * ├── DashboardTopbar
 * └── Page Content
 * ============================================================================
 */

import { useState } from "react";

import DashboardSidebar from "../common/DashboardSidebar";
import DashboardTopbar from "../common/DashboardTopbar";


export default function DashboardLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const openSidebar = () => {
        setSidebarOpen(true);
    };


    const closeSidebar = () => {
        setSidebarOpen(false);
    };


    return (
        <div
            className="
                min-h-screen
                bg-app-bg
                text-text
            "
        >

            {/* =========================================================
                SIDEBAR
               ========================================================= */}

            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />


            {/* =========================================================
                MAIN APPLICATION AREA
               ========================================================= */}

            <div
                className="
                    min-h-screen
                    lg:pl-64
                "
            >

                {/* Topbar */}

                <DashboardTopbar
                    onMenuClick={openSidebar}
                />


                {/* Page content */}

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