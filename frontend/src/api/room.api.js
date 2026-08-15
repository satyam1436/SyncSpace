import api from "./axios";

/**
 * Join an existing room
 */
export const joinRoom = async (roomId) => {
    const response = await api.post(
        "/v1/rooms/join",
        {
            roomId,
        }
    );

    return response.data;
};

/**
 * Create a new room
 */
export const createRoom = async ({
    roomName,
    description = "",
    visibility = "public",
}) => {
    const response = await api.post(
        "/v1/rooms",
        {
            roomName,
            description,
            visibility,
        }
    );

    return response.data;
};

/**
 * Get room details
 */
export const getRoom = async (roomId) => {
    const response = await api.get(
        `/v1/rooms/${roomId}`
    );

    return response.data;
};