import {
createContext,
useCallback,
useContext,
useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
const [status, setStatus] = useState("unauthenticated");
const [user, setUser] = useState(null);

const login = useCallback(async () => {
/*
* Authentication will be connected to the FastAPI backend
* once the API layer is implemented.
*/
setStatus("authenticated");
}, []);

const logout = useCallback(async () => {
/*
* Backend logout will be implemented with the authentication API.
*/
setUser(null);
setStatus("unauthenticated");
}, []);

const hasScope = useCallback(
(scope) => Boolean(user?.scopes?.includes(scope)),
[user],
);

const refresh = useCallback(async () => {
/*
* Re-fetch the current user profile from the backend.
* This will be implemented with authApi.me().
*/
}, []);

const value = {
status,
user,
scopes: user?.scopes ?? [],
login,
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
