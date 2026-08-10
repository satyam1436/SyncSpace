import {
    createRoom as createRoomService,
    joinRoom as joinRoomService,
} from "../services/roomService.js";

export const createRoom = async (req, res, next) => {
    try {
        const { roomName, description, visibility } = req.body;

        const userId = req.user.userId;
        console.log("Authenticated User:", req.user);

        const room = await createRoomService({
            roomName,
            description,
            visibility,
            userId,
        });

        return res.status(201).json({
            success: true,
            message: "Room created successfully",
            data: {
                room,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const joinRoom = async (req, res, next) => {
    try {
        const { roomId } = req.body;

        const userId = req.user.userId;

        const room = await joinRoomService({
            roomId,
            userId,
        });

        return res.status(200).json({
            success: true,
            message: "Joined room successfully",
            data: {
                roomId: room.roomId,
                roomName: room.roomName,
                participantCount: room.participants.length,
                participants: room.participants,
            },
        });
    } catch (error) {
        next(error);
    }
};