import {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [status, setStatus] =
        useState("unauthenticated");

    const [user, setUser] =
        useState(null);


    /* ------------------------------------------------------------------------
       LOGIN
       ------------------------------------------------------------------------ */

    const login = useCallback(
        async (email, password) => {

            /*
             * Authentication will be connected to
             * the FastAPI backend once the API layer
             * is implemented.
             */

            setStatus("authenticated");

        },
        []
    );


    /* ------------------------------------------------------------------------
       SIGNUP
       ------------------------------------------------------------------------ */

    const signup = useCallback(
        async (
            name,
            username,
            mobile,
            email,
            password
        ) => {

            /*
             * Account registration will be connected
             * to the FastAPI backend once the API
             * layer is implemented.
             */

            console.log(
                "Signup:",
                {
                    name,
                    username,
                    mobile,
                    email,
                    password,
                }
            );

            /*
             * For now, simulate successful registration.
             */

            setStatus("authenticated");

        },
        []
    );


    /* ------------------------------------------------------------------------
       LOGOUT
       ------------------------------------------------------------------------ */

    const logout = useCallback(
        async () => {

            /*
             * Backend logout will be implemented
             * with the authentication API.
             */

            setUser(null);

            setStatus("unauthenticated");

        },
        []
    );


    /* ------------------------------------------------------------------------
       PERMISSION CHECK
       ------------------------------------------------------------------------ */

    const hasScope = useCallback(
        (scope) =>
            Boolean(
                user?.scopes?.includes(scope)
            ),
        [user]
    );


    /* ------------------------------------------------------------------------
       REFRESH USER
       ------------------------------------------------------------------------ */

    const refresh = useCallback(
        async () => {

            /*
             * Re-fetch the current user profile
             * from the backend.
             *
             * This will eventually use:
             *
             * authApi.me()
             */

        },
        []
    );


    /* ------------------------------------------------------------------------
       CONTEXT VALUE
       ------------------------------------------------------------------------ */

    const value = {

        status,

        user,

        scopes:
            user?.scopes ?? [],

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

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used within <AuthProvider>"
        );

    }

    return context;

}