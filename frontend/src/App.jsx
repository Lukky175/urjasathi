/**
 * ============================================================================
 * File        : App.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Application routing and layout composition.
 *
 * Public pages:
 * - Home
 * - FAQ
 * - Contact
 * - Login
 *
 * Dashboard pages:
 * - Dashboard
 * - Overview
 * - Consumption
 * - Generation
 * - Battery & Storage
 * - Cost & Savings
 * - Recommendations
 *
 * Dashboard routes use DashboardLayout.
 * Public routes use Navbar + Footer.
 * ============================================================================
 */

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";


/* ============================================================================
   PUBLIC COMPONENTS
   ============================================================================ */

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";


/* ============================================================================
   DASHBOARD LAYOUT
   ============================================================================ */

import DashboardLayout from "./components/layout/DashboardLayout";


/* ============================================================================
   PUBLIC PAGES
   ============================================================================ */

import Home from "./pages/Home/Home";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";


/* ============================================================================
   DASHBOARD PAGES
   ============================================================================ */

import Dashboard from "./pages/SidebarPages/Dashboard/Dashboard";
import Overview from "./pages/SidebarPages/Overview/Overview";
import Consumption from "./pages/SidebarPages/Consumption/Consumption";
import Generation from "./pages/SidebarPages/Generation/Generation";
import Battery from "./pages/SidebarPages/Battery/Battery";
import Cost from "./pages/SidebarPages/Cost/Cost";
import Recommendations from "./pages/SidebarPages/Recommendations/Recommendations";
import UrjaPlanner from "./pages/SidebarPages/UrjaPlanner/UrjaPlanner";


/**
 * ============================================================================
 * DashboardRoute
 * ============================================================================
 *
 * Small wrapper used to keep all dashboard pages inside DashboardLayout.
 *
 * This avoids repeating the layout structure throughout the application.
 */
function DashboardRoute({ children }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}


/**
 * ============================================================================
 * AppContent
 * ============================================================================
 *
 * Determines whether the current route belongs to the public application
 * or the dashboard application.
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
     * Every route beginning with /dashboard belongs
     * to the dashboard application.
     */
    const isDashboardRoute =
        location.pathname.startsWith("/dashboard");


    return (
        <div className="min-h-screen bg-app-bg text-text">

            {/* =================================================================
                PUBLIC NAVBAR
               ================================================================= */}

            {!isDashboardRoute && (
                <Navbar />
            )}


            {/* =================================================================
                APPLICATION ROUTES
               ================================================================= */}

            <Routes>

                {/* =============================================================
                    PUBLIC ROUTES
                   ============================================================= */}

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


                {/* =============================================================
                    DASHBOARD ROUTES
                   ============================================================= */}

                <Route
                    path="/dashboard"
                    element={
                        <DashboardRoute>
                            <Dashboard />
                        </DashboardRoute>
                    }
                />

                <Route
                    path="/dashboard/overview"
                    element={
                        <DashboardRoute>
                            <Overview />
                        </DashboardRoute>
                    }
                />

                <Route
                    path="/dashboard/consumption"
                    element={
                        <DashboardRoute>
                            <Consumption />
                        </DashboardRoute>
                    }
                />

                <Route
                    path="/dashboard/generation"
                    element={
                        <DashboardRoute>
                            <Generation />
                        </DashboardRoute>
                    }
                />

                <Route
                    path="/dashboard/battery"
                    element={
                        <DashboardRoute>
                            <Battery />
                        </DashboardRoute>
                    }
                />

                <Route
                    path="/dashboard/cost"
                    element={
                        <DashboardRoute>
                            <Cost />
                        </DashboardRoute>
                    }
                />

                <Route
                    path="/dashboard/urja-planner"
                    element={
                        <DashboardRoute>
                            <UrjaPlanner />
                        </DashboardRoute>
                    }
                />

                <Route
                    path="/dashboard/recommendations"
                    element={
                        <DashboardRoute>
                            <Recommendations />
                        </DashboardRoute>
                    }
                />


                {/* =============================================================
                    FALLBACK
                   ============================================================= */}

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


            {/* =================================================================
                PUBLIC FOOTER
               ================================================================= */}

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