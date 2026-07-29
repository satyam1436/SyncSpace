const createValidationError = (message) => {
    const error = new Error(message);
    error.statusCode = 400;
    error.code = "VALIDATION_ERROR";

    return error;
};

/**
 * Validate signup request
 */
export const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
        return next(
            createValidationError(
                "Name, email and password are required"
            )
        );
    }

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2 || trimmedName.length > 50) {
        return next(
            createValidationError(
                "Name must be between 2 and 50 characters"
            )
        );
    }

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(normalizedEmail)) {
        return next(
            createValidationError(
                "Please provide a valid email address"
            )
        );
    }

    if (password.length < 8 || password.length > 100) {
        return next(
            createValidationError(
                "Password must be between 8 and 100 characters"
            )
        );
    }

    // Pass normalized values forward
    req.body.name = trimmedName;
    req.body.email = normalizedEmail;

    next();
};

/**
 * Validate login request
 */
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return next(
            createValidationError(
                "Email and password are required"
            )
        );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(normalizedEmail)) {
        return next(
            createValidationError(
                "Please provide a valid email address"
            )
        );
    }

    req.body.email = normalizedEmail;

    next();
};