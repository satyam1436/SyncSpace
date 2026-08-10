import Room from "../models/Room.js";
import generateRoomCode from "../utils/generateRoomCode.js";

export const createRoom = async ({
    roomName,
    description,
    visibility,
    userId,
}) => {
    // Generate a unique room code
    const roomId = await generateRoomCode();

    // Create room
    const room = await Room.create({
        roomId,
        roomName,
        description,
        visibility,
        owner: userId,
        participants: [userId],
    });

    // Return populated room data
    return await Room.findById(room._id)
        .populate("owner", "name email avatar")
        .populate("participants", "name email avatar");
};

export const joinRoom = async ({ roomId, userId }) => {
    const existingRoom = await Room.findOne({ roomId });

    if (!existingRoom) {
        const error = new Error("Room not found");
        error.statusCode = 404;
        error.errorCode = "ROOM_NOT_FOUND";
        throw error;
    }

    const alreadyParticipant = existingRoom.participants.some(
        (participantId) => participantId.toString() === userId.toString()
    );

    if (alreadyParticipant) {
        const error = new Error("User is already a participant in this room");
        error.statusCode = 409;
        error.errorCode = "ALREADY_PARTICIPANT";
        throw error;
    }

    const room = await Room.findOneAndUpdate(
        { roomId },
        {
            $addToSet: {
                participants: userId,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    )
        .populate("owner", "name email avatar")
        .populate("participants", "name email avatar");

    return room;
};

export const leaveRoom = async ({ roomId, userId }) => {
    const room = await Room.findOne({ roomId });

    if (!room) {
        const error = new Error("Room not found");
        error.statusCode = 404;
        error.errorCode = "ROOM_NOT_FOUND";
        throw error;
    }

    const isParticipant = room.participants.some(
        (participantId) =>
            participantId.toString() === userId.toString()
    );

    if (!isParticipant) {
        const error = new Error(
            "User is not a participant in this room"
        );
        error.statusCode = 400;
        error.errorCode = "NOT_A_PARTICIPANT";
        throw error;
    }

    if (room.owner.toString() === userId.toString()) {
        const error = new Error(
            "Room owner cannot leave the room"
        );
        error.statusCode = 400;
        error.errorCode = "OWNER_CANNOT_LEAVE";
        throw error;
    }

    const updatedRoom = await Room.findOneAndUpdate(
        { roomId },
        {
            $pull: {
                participants: userId,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    )
        .populate("owner", "name email avatar")
        .populate("participants", "name email avatar");

    return updatedRoom;
};