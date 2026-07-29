import bcrypt from "bcrypt";
import User from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

const SALT_ROUNDS = 12;

/**
 * Register a new user.
 */
export const registerUser = async ({ name, email, password }) => {
    // Normalize email before querying/storing it.
    const normalizedEmail = email.trim().toLowerCase();

    // Check whether the email is already registered.
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
        const error = new Error("An account with this email already exists");
        error.statusCode = 409;
        error.code = "EMAIL_ALREADY_EXISTS";
        throw error;
    }

    // Never store a plain-text password.
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
    });

    const token = generateToken({
        userId: user._id.toString(),
    });

    return {
        user: user.toJSON(),
        token,
    };
};

/**
 * Authenticate an existing user.
 */
export const loginUser = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    // Password has select:false in User.js, so explicitly request it here.
    const user = await User.findOne({
        email: normalizedEmail,
    }).select("+password");

    // Keep the same message for unknown email and wrong password.
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        error.code = "INVALID_CREDENTIALS";
        throw error;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        error.code = "INVALID_CREDENTIALS";
        throw error;
    }

    const token = generateToken({
        userId: user._id.toString(),
    });

    // user.toJSON() removes the password according to your User schema.
    return {
        user: user.toJSON(),
        token,
    };
};

/**
 * Fetch the currently authenticated user.
 */
export const getCurrentUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        error.code = "USER_NOT_FOUND";
        throw error;
    }

    return user;
};