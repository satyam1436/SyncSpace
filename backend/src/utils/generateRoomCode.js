import Room from "../models/Room.js";

const generateRoomCode = async () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    while (true) {
        let randomCode = "";

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(
                Math.random() * characters.length
            );

            randomCode += characters[randomIndex];
        }

        const roomCode = `SYNC-${randomCode}`;

        const existingRoom = await Room.findOne({ roomId: roomCode });

        if (!existingRoom) {
            return roomCode;
        }
    }
};

export default generateRoomCode;