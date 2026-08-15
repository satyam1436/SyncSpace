import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

console.log("🔌 Socket URL:", SOCKET_URL);

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["polling"],
});

socket.on("connect", () => {
    console.log("🟢 SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (error) => {
    console.error(
        "🔴 SOCKET CONNECT ERROR:",
        error.message
    );
});

socket.on("disconnect", (reason) => {
    console.log(
        "🟠 SOCKET DISCONNECTED:",
        reason
    );
});

export const connectSocket = () => {
    console.log("🔌 Calling socket.connect()");

    if (!socket.connected) {
        socket.connect();
    }
};

export const disconnectSocket = () => {
    console.log("🔌 Calling socket.disconnect()");

    if (socket.connected) {
        socket.disconnect();
    }
};


