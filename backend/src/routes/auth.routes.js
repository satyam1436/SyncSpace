import { Router } from "express";

import {
    signup,
    login,
    logout,
    getMe,
} from "../controllers/AuthController.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

import {
    validateSignup,
    validateLogin,
} from "../middleware/validation.middleware.js";

const router = Router();


// Public routes
router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);


// Protected routes
router.get("/me", authenticateUser, getMe);
router.post("/logout", authenticateUser, logout);

export default router;
