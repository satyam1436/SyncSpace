/**
 * Global Error Handler
 * Handles all errors forwarded using next(error)
 */
export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";
    let errorCode = err.code || "INTERNAL_SERVER_ERROR";

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        errorCode = "VALIDATION_ERROR";

        message = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");
    }

    // MongoDB duplicate key error
    if (err.code === 11000) {
        statusCode = 409;
        errorCode = "DUPLICATE_RESOURCE";

        const field = Object.keys(err.keyValue || {})[0];

        message = field
            ? `${field} already exists`
            : "Resource already exists";
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        errorCode = "INVALID_ID";
        message = "Invalid resource ID";
    }

    const response = {
        success: false,
        message,
        errorCode,
    };

    // Development environment only
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    return res.status(statusCode).json(response);
};