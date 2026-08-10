import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

import roomRoutes from "./routes/roomRoutes.js";

const app = express();

// Global Middleware
// Allow frontend to communicate with backend
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Parse incoming JSON request bodies
app.use(express.json({ limit: "10kb" }));

// Parse URL-encoded request bodies
app.use(
    express.urlencoded({
        extended: true,
        limit: "10kb",
    })
);

app.use("/api/v1/rooms", roomRoutes);

// Health Check
app.get("/api/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "SyncSpace API is running",
    });
});

// API Routes
app.use("/api/auth", authRoutes);

// 404 Handler
app.use((req, res, next) => {
    const error = new Error(
        `Route not found: ${req.method} ${req.originalUrl}`
    );

    error.statusCode = 404;
    error.code = "ROUTE_NOT_FOUND";

    next(error);
});

// Global Error Handler
app.use(errorHandler);

export default app;
