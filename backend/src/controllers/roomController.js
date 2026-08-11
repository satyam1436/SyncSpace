import {
    createRoom as createRoomService,
    joinRoom as joinRoomService,
    leaveRoom as leaveRoomService,
    getRoom as getRoomService,
    getMyRooms as getMyRoomsService,
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

export const leaveRoom = async (req, res, next) => {
    try {
        const { roomId } = req.params;

        const userId = req.user.userId;

        await leaveRoomService({
            roomId,
            userId,
        });

        return res.status(200).json({
            success: true,
            message: "Left room successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getRoom = async (req, res, next) => {
    try {
        const { roomId } = req.params;

        const room = await getRoomService({
            roomId,
        });

        return res.status(200).json({
            success: true,
            message: "Room fetched successfully",
            data: {
                room,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getMyRooms = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const rooms = await getMyRoomsService({
            userId,
        });

        return res.status(200).json({
            success: true,
            message: "Rooms fetched successfully",
            data: {
                rooms: rooms.map((room) => ({
                    roomId: room.roomId,
                    roomName: room.roomName,
                    description: room.description,
                    visibility: room.visibility,
                    owner: room.owner,
                    participantCount: room.participants.length,
                    participants: room.participants,
                    createdAt: room.createdAt,
                    updatedAt: room.updatedAt,
                })),
            },
        });
    } catch (error) {
        next(error);
    }
};