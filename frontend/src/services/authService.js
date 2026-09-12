/**
 * ============================================================================
 * File        : authService.js
 * Project     : UrjaSathi
 *
 * Description :
 * Authentication service handling API communication with FastAPI backend:
 * - User registration (POST /auth/register)
 * - User login (POST /auth/login / POST /auth/token)
 * - Current user profile (GET /auth/me)
 * - Token & user session storage management
 * - Consistent error extraction (handling 400/409 duplicate user, 401 invalid credentials, 422 validation)
 * ============================================================================
 */

import { api, ApiError } from "./api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const STORAGE_KEYS = {
    TOKEN: "access_token",
    USER: "auth_user",
    REMEMBER: "remember_login",
};

/**
 * Helper to extract human-readable error messages from backend errors.
 * Handles:
 * - Direct ApiError / Axios-like err.response.data.detail
 * - Pydantic 422 validation error arrays [{ loc, msg, ... }]
 * - Status-specific overrides (400/409 duplicate email, 401 invalid credentials)
 */
export function extractErrorMessage(error, defaultMessage = "An unexpected error occurred.") {
    if (!error) return defaultMessage;

    // Check status code
    const status = error.status || error.response?.status;
    const data = error.payload || error.response?.data;
    const detail = data?.detail;

    // Check status-specific conventions
    if (status === 401) {
        return "Invalid email or password.";
    }

    if (status === 400 || status === 409) {
        if (typeof detail === "string" && /already\s*(registered|exists)/i.test(detail)) {
            return "An account with this email already exists.";
        }
        if (typeof detail === "string") {
            return detail;
        }
        return "An account with this email already exists.";
    }

    // Handle Pydantic validation errors (array of errors)
    if (Array.isArray(detail)) {
        return detail
            .map((item) => {
                const field = item.loc ? item.loc[item.loc.length - 1] : "";
                return field ? `${field}: ${item.msg}` : item.msg;
            })
            .join(". ");
    }

    if (typeof detail === "string") {
        return detail;
    }

    if (error.code === "NETWORK" || error.message?.includes("Failed to fetch") || error.message?.includes("Network error")) {
        return "Unable to connect to the authentication server at " + BASE_URL + ". Please ensure the backend is running.";
    }

    if (error.message) {
        return error.message;
    }

    return defaultMessage;
}

/**
 * Token Storage Helpers
 */
export function getStoredToken() {
    try {
        return localStorage.getItem(STORAGE_KEYS.TOKEN) || sessionStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch {
        return null;
    }
}

export function setStoredToken(token, remember = true) {
    try {
        if (remember) {
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);
            sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
        } else {
            sessionStorage.setItem(STORAGE_KEYS.TOKEN, token);
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
        }
    } catch (e) {
        console.warn("Failed to store token:", e);
    }
}

export function removeStoredToken() {
    try {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (e) {
        console.warn("Failed to remove token:", e);
    }
}

/**
 * User Info Storage Helpers
 */
export function getStoredUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.USER) || sessionStorage.getItem(STORAGE_KEYS.USER);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function setStoredUser(user, remember = true) {
    try {
        const str = JSON.stringify(user);
        if (remember) {
            localStorage.setItem(STORAGE_KEYS.USER, str);
            sessionStorage.removeItem(STORAGE_KEYS.USER);
        } else {
            sessionStorage.setItem(STORAGE_KEYS.USER, str);
            localStorage.removeItem(STORAGE_KEYS.USER);
        }
    } catch (e) {
        console.warn("Failed to store user:", e);
    }
}

export function removeStoredUser() {
    try {
        localStorage.removeItem(STORAGE_KEYS.USER);
        sessionStorage.removeItem(STORAGE_KEYS.USER);
    } catch (e) {
        console.warn("Failed to remove user:", e);
    }
}

export function clearAuthSession() {
    removeStoredToken();
    removeStoredUser();
}

/**
 * API Calls
 */

/**
 * Register a new user
 * POST /auth/register
 * 
 * @param {Object} userData
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} userData.full_name
 * @param {string} [userData.location="Delhi"]
 * @param {string} [userData.address="Not specified"]
 * @returns {Promise<{ access_token: string, token_type: string, user: Object }>}
 */
export async function registerUser({
    email,
    password,
    full_name,
    name,
    location = "Delhi",
    address = "Default Address",
}) {
    const payload = {
        email: email.trim().toLowerCase(),
        password,
        full_name: (full_name || name || "").trim(),
        location: location || "Delhi",
        address: (address || "Not specified").trim(),
    };

    try {
        const response = await api.post("/auth/register", payload, {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return response;
    } catch (err) {
        const message = extractErrorMessage(err, "Unable to complete registration.");
        const enhancedError = new Error(message);
        enhancedError.status = err.status || err.response?.status;
        enhancedError.payload = err.payload || err.response?.data;
        enhancedError.response = err.response || { status: err.status, data: err.payload };
        throw enhancedError;
    }
}

/**
 * Authenticate existing user
 * POST /auth/login (with fallback to POST /auth/token)
 * 
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<{ access_token: string, token_type: string, user: Object }>}
 */
export async function loginUser({ email, password }) {
    const payload = {
        email: email.trim().toLowerCase(),
        password,
    };

    try {
        // Try /auth/login first
        const response = await api.post("/auth/login", payload, {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return response;
    } catch (err) {
        // If /auth/login gives 404, try /auth/token as fallback
        if (err.status === 404) {
            try {
                const response = await api.post("/auth/token", payload, {
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                return response;
            } catch (tokenErr) {
                const message = extractErrorMessage(tokenErr, "Unable to sign in.");
                const enhanced = new Error(message);
                enhanced.status = tokenErr.status || tokenErr.response?.status;
                enhanced.payload = tokenErr.payload || tokenErr.response?.data;
                enhanced.response = tokenErr.response;
                throw enhanced;
            }
        }

        const message = extractErrorMessage(err, "Unable to sign in.");
        const enhancedError = new Error(message);
        enhancedError.status = err.status || err.response?.status;
        enhancedError.payload = err.payload || err.response?.data;
        enhancedError.response = err.response || { status: err.status, data: err.payload };
        throw enhancedError;
    }
}

/**
 * Get current authenticated user profile
 * GET /auth/me
 * 
 * @returns {Promise<Object>}
 */
export async function getCurrentUser() {
    try {
        const response = await api.get("/auth/me", {
            credentials: "include",
        });
        return response;
    } catch (err) {
        const message = extractErrorMessage(err, "Unable to retrieve user profile.");
        const enhancedError = new Error(message);
        enhancedError.status = err.status || err.response?.status;
        enhancedError.payload = err.payload || err.response?.data;
        enhancedError.response = err.response || { status: err.status, data: err.payload };
        throw enhancedError;
    }
}

const authService = {
    register: registerUser,
    login: loginUser,
    getMe: getCurrentUser,
    getStoredToken,
    setStoredToken,
    removeStoredToken,
    getStoredUser,
    setStoredUser,
    removeStoredUser,
    clearAuthSession,
    extractErrorMessage,
};

export default authService;
