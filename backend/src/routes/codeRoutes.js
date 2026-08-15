import express from "express";

import {
    executeCode,
} from "../controllers/codeController.js";

import {
    authenticateUser,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateUser);

router.post(
    "/execute",
    executeCode
);

export default router;