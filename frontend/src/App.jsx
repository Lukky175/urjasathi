/**
 * ============================================================================
 * File        : App.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Application routing and layout composition.
 *
 * Public pages use the public Navbar/Footer layout.
 * Dashboard pages use the private DashboardLayout.
 * ============================================================================
 */

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import DashboardLayout from "./components/layout/DashboardLayout";

import Home from "./pages/Home/Home";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";


/**
 * ============================================================================
 * Temporary Dashboard Pages
 * ============================================================================
 *
 * These are placeholders for now.
 * Later, replace them with the actual dashboard pages.
 */

function DashboardOverview() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-text">
                Dashboard Overview
            </h1>

            <p className="mt-2 text-text-secondary">
                Welcome to your UrjaSathi dashboard.
            </p>
        </div>
    );
}


function DashboardAnalytics() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-text">
                Energy Analytics
            </h1>

            <p className="mt-2 text-text-secondary">
                Energy analytics will appear here.
            </p>
        </div>
    );
}


/**
 * ============================================================================
 * DashboardPage
 * ============================================================================
 *
 * The main dashboard route currently redirects to the overview page.
 *
 * This keeps /dashboard as the root of the dashboard application while
 * allowing /dashboard/overview to become the default dashboard screen.
 */

function DashboardPage() {
    return (
        <Navigate
            to="/dashboard/overview"
            replace
        />
    );
}


/**
 * ============================================================================
 * AppContent
 * ============================================================================
 *
 * Determines which global layout should be displayed.
 *
 * Public routes:
 * - Navbar
 * - Footer
 *
 * Dashboard routes:
 * - DashboardSidebar
 * - DashboardTopbar
 * - No public Navbar
 * - No public Footer
 */

function AppContent() {
    const location = useLocation();

    /**
     * Every route beginning with /dashboard
     * belongs to the dashboard application.
     */
    const isDashboardRoute =
        location.pathname.startsWith("/dashboard");


    return (
        <div className="min-h-screen bg-app-bg text-text">

            {/* =========================================================
                PUBLIC NAVBAR
               ========================================================= */}

            {!isDashboardRoute && (
                <Navbar />
            )}


            {/* =========================================================
                ROUTES
               ========================================================= */}

            <Routes>

                {/* =====================================================
                    PUBLIC ROUTES
                   ===================================================== */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/home"
                            replace
                        />
                    }
                />

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/faq"
                    element={<FAQ />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =====================================================
                    DASHBOARD ROUTES
                   ===================================================== */}

                <Route
                    path="/dashboard"
                    element={
                        <DashboardLayout>
                            <DashboardPage />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/dashboard/overview"
                    element={
                        <DashboardLayout>
                            <DashboardOverview />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/dashboard/analytics"
                    element={
                        <DashboardLayout>
                            <DashboardAnalytics />
                        </DashboardLayout>
                    }
                />


                {/* =====================================================
                    FALLBACK
                   ===================================================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/home"
                            replace
                        />
                    }
                />

            </Routes>


            {/* =========================================================
                PUBLIC FOOTER
               ========================================================= */}

            {!isDashboardRoute && (
                <Footer />
            )}

        </div>
    );
}


/**
 * ============================================================================
 * App
 * ============================================================================
 *
 * BrowserRouter must wrap AppContent because AppContent uses useLocation().
 */

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}