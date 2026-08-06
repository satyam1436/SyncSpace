import api from "./axios";

/**
 * Register new user
 */
export const registerUser = async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
};

/**
 * Login user
 */
export const loginUser = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

/**
 * Get current user
 */
export const getCurrentUser = async (token) => {
    const response = await api.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

/**
 * Logout user
 */
export const logoutUser = async (token) => {
    const response = await api.post(
        "/auth/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};