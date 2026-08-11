import express from "express";

import {
    createRoom,
    joinRoom,
    leaveRoom,
    getRoom,
    getMyRooms,
} from "../controllers/roomController.js";

import {
    validateCreateRoom,
    validateJoinRoom,
    validateRoomIdParam,
} from "../middleware/roomValidation.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateUser);

router.post(
    "/",
    validateCreateRoom,
    createRoom
);

router.post(
    "/join",
    validateJoinRoom,
    joinRoom
);

router.post(
    "/:roomId/leave",
    validateRoomIdParam,
    leaveRoom
);

router.get(
    "/my-rooms",
    getMyRooms
);

router.get(
    "/:roomId",
    validateRoomIdParam,
    getRoom
);

router.post("/", createRoom);
router.post("/join", joinRoom);
router.post("/:roomId/leave", leaveRoom);
router.get("/my-rooms", getMyRooms);
router.get("/:roomId", getRoom);

export default router;