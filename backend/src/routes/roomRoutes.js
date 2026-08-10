import express from "express";

import {
    createRoom,
    joinRoom,
} from "../controllers/roomController.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/", createRoom);
router.post("/join", joinRoom);

export default router;