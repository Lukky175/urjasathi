import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { initPerformanceDefenses } from "./utils/performance";
import "./index.css";

// Initialize defensive handlers against performance-tracking race conditions
initPerformanceDefenses();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);
