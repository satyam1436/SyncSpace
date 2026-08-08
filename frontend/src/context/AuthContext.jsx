import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getCurrentUser,
    loginUser,
    logoutUser,
} from "../api/auth.api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch (error) {
            console.error("Failed to parse stored user:", error);
            localStorage.removeItem("user");
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = Boolean(token && user);

    // Restore session after page refresh
    useEffect(() => {
        const restoreSession = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await getCurrentUser(token);

                setUser(response.data.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            } catch (error) {
                console.error("Session restoration failed:", error);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        restoreSession();
    }, [token]);

    // Login
    const login = async (credentials) => {
        const response = await loginUser(credentials);

        const { user, token } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);

        return response;
    };

    // Logout
    const logout = async () => {
        try {
            if (token) {
                await logoutUser(token);
            }
        } catch (error) {
            console.error("Logout API failed:", error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setToken(null);
            setUser(null);
        }
    };

    const value = {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
