/**
 * ============================================================================
 * File        : AuthContext.jsx
 * Project     : UrjaSathi
 *
 * Description :
 * Central authentication provider connecting React state to FastAPI backend.
 * Provides user profile, JWT token management, login, signup, logout, and session restoration.
 * ============================================================================
 */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import authService, {
    clearAuthSession,
    getStoredToken,
    getStoredUser,
    setStoredToken,
    setStoredUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const initialToken = getStoredToken();
    const initialUser = getStoredUser();

    const [status, setStatus] = useState(
        initialToken ? "authenticated" : "unauthenticated"
    );

    const [user, setUser] = useState(initialUser);
    const [token, setToken] = useState(initialToken);
    const [isLoading, setIsLoading] = useState(Boolean(initialToken));

    /* ------------------------------------------------------------------------
       SESSION RESTORATION & TOKEN VERIFICATION ON MOUNT
       ------------------------------------------------------------------------ */
    useEffect(() => {
        let isMounted = true;

        async function verifySession() {
            const storedToken = getStoredToken();
            if (!storedToken) {
                if (isMounted) {
                    setIsLoading(false);
                    setStatus("unauthenticated");
                }
                return;
            }

            try {
                const currentUser = await authService.getMe();
                if (isMounted) {
                    setUser(currentUser);
                    setToken(storedToken);
                    setStatus("authenticated");
                    setStoredUser(currentUser);
                }
            } catch (err) {
                console.warn("Session verification failed:", err.message);
                if (isMounted) {
                    clearAuthSession();
                    setUser(null);
                    setToken(null);
                    setStatus("unauthenticated");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        verifySession();

        return () => {
            isMounted = false;
        };
    }, []);

    /* ------------------------------------------------------------------------
       LOGIN
       ------------------------------------------------------------------------ */
    const login = useCallback(
        async (email, password, remember = true) => {
            const data = await authService.login({ email, password });

            const accessToken = data.access_token;
            const userData = data.user;

            setStoredToken(accessToken, remember);
            setStoredUser(userData, remember);

            setToken(accessToken);
            setUser(userData);
            setStatus("authenticated");

            return data;
        },
        []
    );

    /* ------------------------------------------------------------------------
       SIGNUP
       Accepts either an object { full_name, email, password, location, address }
       or positional arguments (name, username, mobile, email, password, location, address)
       ------------------------------------------------------------------------ */
    const signup = useCallback(
        async (arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            let registrationData = {};

            if (typeof arg1 === "object" && arg1 !== null) {
                registrationData = {
                    email: arg1.email,
                    password: arg1.password,
                    full_name: arg1.full_name || arg1.name,
                    location: arg1.location || "Delhi",
                    address: arg1.address || "Default Address",
                    mobile: arg1.mobile,
                    username: arg1.username,
                };
            } else {
                registrationData = {
                    full_name: arg1,
                    username: arg2,
                    mobile: arg3,
                    email: arg4,
                    password: arg5,
                    location: arg6 || "Delhi",
                    address: arg7 || "Default Address",
                };
            }

            const data = await authService.register(registrationData);
            return data;
        },
        []
    );

    /* ------------------------------------------------------------------------
       LOGOUT
       ------------------------------------------------------------------------ */
    const logout = useCallback(async () => {
        clearAuthSession();
        setUser(null);
        setToken(null);
        setStatus("unauthenticated");
    }, []);

    /* ------------------------------------------------------------------------
       PERMISSION / SCOPE CHECK
       ------------------------------------------------------------------------ */
    const hasScope = useCallback(
        (scope) => Boolean(user?.scopes?.includes(scope)),
        [user]
    );

    /* ------------------------------------------------------------------------
       REFRESH USER PROFILE
       ------------------------------------------------------------------------ */
    const refresh = useCallback(async () => {
        try {
            const updatedUser = await authService.getMe();
            setUser(updatedUser);
            setStoredUser(updatedUser);
            return updatedUser;
        } catch (err) {
            console.warn("Failed to refresh user:", err.message);
            throw err;
        }
    }, []);

    /* ------------------------------------------------------------------------
       CONTEXT VALUE
       ------------------------------------------------------------------------ */
    const value = {
        status,
        user,
        token,
        isLoading,
        isAuthenticated: status === "authenticated",
        scopes: user?.scopes ?? [],
        login,
        signup,
        logout,
        hasScope,
        refresh,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within <AuthProvider>");
    }

    return context;
}