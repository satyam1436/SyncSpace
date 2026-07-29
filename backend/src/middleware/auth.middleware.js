import { verifyToken } from "../utils/jwt.js";

/**
 * Protect routes that require authentication.
 */
export const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Authorization header must exist and use Bearer authentication.
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const error = new Error("Authentication required");
            error.statusCode = 401;
            error.code = "AUTH_TOKEN_MISSING";
            return next(error);
        }

        // Format: "Bearer <token>"
        const token = authHeader.split(" ")[1];

        if (!token) {
            const error = new Error("Authentication token is missing");
            error.statusCode = 401;
            error.code = "AUTH_TOKEN_MISSING";
            return next(error);
        }

        // verifyToken throws if the token is invalid or expired.
        const decoded = verifyToken(token);

        if (!decoded?.userId) {
            const error = new Error("Invalid authentication token");
            error.statusCode = 401;
            error.code = "INVALID_TOKEN";
            return next(error);
        }

        // Make authenticated user's identity available to later middleware/controllers.
        req.user = {
            userId: decoded.userId,
        };

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            error.statusCode = 401;
            error.code = "TOKEN_EXPIRED";
            error.message = "Authentication token has expired";
        } else if (error.name === "JsonWebTokenError") {
            error.statusCode = 401;
            error.code = "INVALID_TOKEN";
            error.message = "Invalid authentication token";
        }

        next(error);
    }
};