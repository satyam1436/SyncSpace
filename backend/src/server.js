// import app from "./app.js";

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`SyncSpace API running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        });
    } catch (error) {
        console.error("Failed to start SyncSpace server:", error.message);
        process.exit(1);
    }
};

startServer();