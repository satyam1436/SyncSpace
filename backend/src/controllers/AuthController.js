import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../services/auth.service.js";

/**
 * Register a new user
 * POST /api/auth/signup
 */
export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const { user, token } = await registerUser({
            name,
            email,
            password,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Login existing user
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await loginUser({
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get currently authenticated user
 * GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
    try {
        const user = await getCurrentUser(req.user.userId);

        return res.status(200).json({
            success: true,
            message: "Current user retrieved successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logout successful",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};