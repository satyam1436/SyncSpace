import "dotenv/config";

import http from "http";

import app from "./app.js";
import connectDB from "./config/db.js";
import { initializeSocket } from "./socket/socketServer.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        const httpServer = http.createServer(app);

        initializeSocket(httpServer);

        httpServer.listen(PORT, () => {
            console.log(
                `SyncSpace API running on port ${PORT}`
            );

            console.log(
                `Environment: ${process.env.NODE_ENV || "development"
                }`
            );

            console.log(
                "Socket.IO server initialized"
            );
        });
    } catch (error) {
        console.error(
            "Failed to start SyncSpace server:",
            error.message
        );

        process.exit(1);
    }
};

startServer();