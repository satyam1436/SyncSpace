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

export const AuthContext =
    createContext(null);

/* =========================================
   STORAGE HELPERS
========================================= */

const getStoredToken = () => {
    return (
        sessionStorage.getItem(
            "token"
        ) ||
        localStorage.getItem(
            "token"
        )
    );
};

const getStoredUser = () => {
    const storedUser =
        sessionStorage.getItem(
            "user"
        ) ||
        localStorage.getItem(
            "user"
        );

    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(
            storedUser
        );
    } catch (error) {
        console.error(
            "Failed to parse stored user:",
            error
        );

        sessionStorage.removeItem(
            "user"
        );

        localStorage.removeItem(
            "user"
        );

        return null;
    }
};

export const AuthProvider = ({
    children,
}) => {
    const [user, setUser] =
        useState(() =>
            getStoredUser()
        );

    const [token, setToken] =
        useState(() =>
            getStoredToken()
        );

    const [isLoading, setIsLoading] =
        useState(true);

    const isAuthenticated =
        Boolean(
            token && user
        );

    /* =========================================
       RESTORE SESSION
    ========================================= */

    useEffect(() => {
        const restoreSession =
            async () => {
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                try {
                    const response =
                        await getCurrentUser(
                            token
                        );

                    const currentUser =
                        response.data.user;

                    setUser(
                        currentUser
                    );

                    /*
                     * Update the storage from
                     * which the current token came.
                     */
                    if (
                        sessionStorage.getItem(
                            "token"
                        ) === token
                    ) {
                        sessionStorage.setItem(
                            "user",
                            JSON.stringify(
                                currentUser
                            )
                        );
                    } else if (
                        localStorage.getItem(
                            "token"
                        ) === token
                    ) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(
                                currentUser
                            )
                        );
                    }
                } catch (error) {
                    console.error(
                        "Session restoration failed:",
                        error
                    );

                    sessionStorage.removeItem(
                        "token"
                    );

                    sessionStorage.removeItem(
                        "user"
                    );

                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    setToken(null);
                    setUser(null);
                } finally {
                    setIsLoading(false);
                }
            };

        restoreSession();
    }, [token]);

    /* =========================================
       LOGIN
    ========================================= */

    const login = async (
        credentials
    ) => {
        const response =
            await loginUser(
                credentials
            );

        const {
            user,
            token,
        } = response.data;

        const rememberMe =
            credentials.rememberMe ||
            false;

        /*
         * Clear old authentication
         * from both storage types.
         */
        sessionStorage.removeItem(
            "token"
        );

        sessionStorage.removeItem(
            "user"
        );

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        /*
         * Remember Me:
         *
         * checked   → localStorage
         * unchecked → sessionStorage
         */
        const storage =
            rememberMe
                ? localStorage
                : sessionStorage;

        storage.setItem(
            "token",
            token
        );

        storage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(token);
        setUser(user);

        return response;
    };

    /* =========================================
       LOGOUT
    ========================================= */

    const logout = async () => {
        try {
            if (token) {
                await logoutUser(
                    token
                );
            }
        } catch (error) {
            console.error(
                "Logout API failed:",
                error
            );
        } finally {
            sessionStorage.removeItem(
                "token"
            );

            sessionStorage.removeItem(
                "user"
            );

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

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
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
};