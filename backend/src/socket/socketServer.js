import { Server } from "socket.io";

let io;

/*
|--------------------------------------------------------------------------
| In-memory workspace state
|--------------------------------------------------------------------------
| Each room has its own files and code content.
|
| Example:
| workspaceState = {
|   "SYNC-A7K2": {
|      files: [...],
|      codeContent: {...}
|   }
| }
|
| NOTE:
| This is perfect for your current local/demo submission.
| For production/multiple backend instances, this should be moved
| to MongoDB/Redis.
|--------------------------------------------------------------------------
*/

const workspaceState = new Map();

const DEFAULT_FILES = [
    {
        id: "workspace",
        name: "Workspace.jsx",
        type: "react",
        language: "javascript",
    },
    {
        id: "app",
        name: "App.jsx",
        type: "react",
        language: "javascript",
    },
    {
        id: "styles",
        name: "styles.css",
        type: "css",
        language: "css",
    },
];

const DEFAULT_CODE = {
    workspace: `import React from "react";

function Workspace() {
    // Start writing your code from here

    return (
        <div>
            <h1>Workspace</h1>
        </div>
    );
}

export default Workspace;`,

    app: `import Workspace from "./Workspace";

function App() {
    // Start writing your code from here

    return (
        <Workspace />
    );
}

export default App;`,

    styles: `/* Start writing your CSS from here */

.workspace-container {
    min-height: 100vh;
}`,
};

const createWorkspaceState = () => ({
    files: DEFAULT_FILES.map(
        (file) => ({
            ...file,
        })
    ),

    codeContent: {
        ...DEFAULT_CODE,
    },
});

const getWorkspaceState = (
    roomId
) => {
    if (!workspaceState.has(roomId)) {
        workspaceState.set(
            roomId,
            createWorkspaceState()
        );
    }

    return workspaceState.get(roomId);
};

const getRoomParticipants = (
    roomId
) => {
    const room =
        io.sockets.adapter.rooms.get(
            roomId
        );

    const participants = [];

    if (!room) {
        return participants;
    }

    const socketIds = [...room];

    socketIds.forEach(
        (socketId, index) => {
            const participantSocket =
                io.sockets.sockets.get(
                    socketId
                );

            if (!participantSocket) {
                return;
            }

            participants.push({
                id: socketId,

                userId:
                    participantSocket.data
                        .userId || null,

                name:
                    participantSocket.data
                        .name || "User",

                initials:
                    participantSocket.data
                        .initials || "U",

                role:
                    index === 0
                        ? "Host"
                        : "Member",

                status: "online",

                muted: false,
            });
        }
    );

    return participants;
};

export const initializeSocket = (
    httpServer
) => {
    io = new Server(
        httpServer,
        {
            cors: {
                origin:
                    process.env
                        .CLIENT_URL ||
                    "http://localhost:5173",

                methods: [
                    "GET",
                    "POST",
                ],
            },
        }
    );

    console.log(
        "Socket.IO server initialized"
    );

    io.on(
        "connection",
        (socket) => {
            console.log(
                `Socket connected: ${socket.id}`
            );

            /* =========================================
               JOIN ROOM
            ========================================= */

            socket.on(
                "join-room",
                ({
                    roomId,
                    userId,
                    name,
                    initials,
                }) => {
                    if (!roomId) {
                        socket.emit(
                            "room-error",
                            {
                                message:
                                    "Room ID is required",
                            }
                        );

                        return;
                    }

                    socket.join(roomId);

                    socket.data.roomId =
                        roomId;

                    socket.data.userId =
                        userId || null;

                    socket.data.name =
                        name || "User";

                    socket.data.initials =
                        initials || "U";

                    /*
                     * Make sure workspace state exists.
                     */
                    const workspace =
                        getWorkspaceState(
                            roomId
                        );

                    console.log(
                        `Socket ${socket.id} joined room ${roomId}`
                    );

                    socket.emit(
                        "room-joined",
                        {
                            roomId,
                        }
                    );

                    /*
                     * Send current workspace state
                     * to the newly joined participant.
                     */
                    socket.emit(
                        "workspace-state",
                        {
                            files:
                                workspace.files,

                            codeContent:
                                workspace.codeContent,
                        }
                    );

                    /*
                     * Update everyone about participants.
                     */
                    io.to(
                        roomId
                    ).emit(
                        "room-participants",
                        getRoomParticipants(
                            roomId
                        )
                    );
                }
            );

            /* =========================================
               REQUEST PARTICIPANTS
            ========================================= */

            socket.on(
                "request-participants",
                () => {
                    const roomId =
                        socket.data
                            .roomId;

                    if (!roomId) {
                        return;
                    }

                    socket.emit(
                        "room-participants",
                        getRoomParticipants(
                            roomId
                        )
                    );
                }
            );

            /* =========================================
               REQUEST WORKSPACE STATE
            ========================================= */

            socket.on(
                "request-workspace-state",
                () => {
                    const roomId =
                        socket.data
                            .roomId;

                    if (!roomId) {
                        return;
                    }

                    const workspace =
                        getWorkspaceState(
                            roomId
                        );

                    socket.emit(
                        "workspace-state",
                        {
                            files:
                                workspace.files,

                            codeContent:
                                workspace.codeContent,
                        }
                    );
                }
            );

            /* =========================================
               REAL-TIME CHAT
            ========================================= */

            socket.on(
                "send-message",
                ({
                    roomId,
                    message,
                    sender,
                    initials,
                }) => {
                    if (
                        !roomId ||
                        !message ||
                        !sender
                    ) {
                        return;
                    }

                    const chatMessage = {
                        id:
                            Date.now() +
                            Math.random(),

                        type: "normal",

                        sender,

                        initials:
                            initials || "U",

                        message,

                        time:
                            new Date().toLocaleTimeString(
                                [],
                                {
                                    hour:
                                        "2-digit",

                                    minute:
                                        "2-digit",
                                }
                            ),
                    };

                    socket
                        .to(roomId)
                        .emit(
                            "chat-message",
                            chatMessage
                        );

                    socket.emit(
                        "chat-message",
                        chatMessage
                    );
                }
            );

            /* =========================================
               REAL-TIME WHITEBOARD
            ========================================= */

            socket.on(
                "whiteboard-draw",
                ({
                    roomId,
                    type,
                    item,
                }) => {
                    if (
                        !roomId ||
                        !type ||
                        !item
                    ) {
                        return;
                    }

                    socket
                        .to(roomId)
                        .emit(
                            "whiteboard-update",
                            {
                                type,
                                item,
                            }
                        );
                }
            );

            /* =========================================
               REAL-TIME CODE UPDATE
            ========================================= */

            socket.on(
                "code-update",
                ({
                    roomId,
                    fileId,
                    content,
                }) => {
                    if (
                        !roomId ||
                        !fileId ||
                        content ===
                        undefined
                    ) {
                        return;
                    }

                    const workspace =
                        getWorkspaceState(
                            roomId
                        );

                    /*
                     * Save latest code on server.
                     */
                    workspace.codeContent[
                        fileId
                    ] = content;

                    /*
                     * Send to everyone else.
                     */
                    socket
                        .to(roomId)
                        .emit(
                            "code-update",
                            {
                                fileId,
                                content,
                            }
                        );
                }
            );

            /* =========================================
               CREATE FILE
            ========================================= */

            socket.on(
                "file-created",
                ({
                    roomId,
                    file,
                    content,
                }) => {
                    if (
                        !roomId ||
                        !file ||
                        !file.id ||
                        !file.name
                    ) {
                        return;
                    }

                    const workspace =
                        getWorkspaceState(
                            roomId
                        );

                    const alreadyExists =
                        workspace.files.some(
                            (existingFile) =>
                                existingFile.id ===
                                file.id
                        );

                    if (
                        alreadyExists
                    ) {
                        return;
                    }

                    workspace.files.push(
                        file
                    );

                    workspace.codeContent[
                        file.id
                    ] =
                        content || "";

                    /*
                     * Send new file to everyone
                     * except creator.
                     */
                    socket
                        .to(roomId)
                        .emit(
                            "file-created",
                            {
                                file,
                                content:
                                    content ||
                                    "",
                            }
                        );

                    console.log(
                        `📄 File created in ${roomId}: ${file.name}`
                    );
                }
            );

            /* =========================================
               DELETE FILE
            ========================================= */

            socket.on(
                "file-deleted",
                ({
                    roomId,
                    fileId,
                }) => {
                    if (
                        !roomId ||
                        !fileId
                    ) {
                        return;
                    }

                    const workspace =
                        getWorkspaceState(
                            roomId
                        );

                    /*
                     * Don't allow deleting the
                     * last remaining file.
                     */
                    if (
                        workspace.files
                            .length <= 1
                    ) {
                        return;
                    }

                    workspace.files =
                        workspace.files.filter(
                            (file) =>
                                file.id !==
                                fileId
                        );

                    delete workspace
                        .codeContent[
                        fileId
                    ];

                    socket
                        .to(roomId)
                        .emit(
                            "file-deleted",
                            {
                                fileId,
                            }
                        );

                    console.log(
                        `🗑️ File deleted in ${roomId}: ${fileId}`
                    );
                }
            );

            /* =========================================
               FILE UPDATED
               Rename / Language Change
            ========================================= */

            socket.on(
                "file-updated",
                ({
                    roomId,
                    file,
                }) => {
                    if (
                        !roomId ||
                        !file ||
                        !file.id
                    ) {
                        return;
                    }

                    const workspace =
                        getWorkspaceState(
                            roomId
                        );

                    const index =
                        workspace.files.findIndex(
                            (existingFile) =>
                                existingFile.id ===
                                file.id
                        );

                    if (
                        index === -1
                    ) {
                        return;
                    }

                    workspace.files[
                        index
                    ] = file;

                    socket
                        .to(roomId)
                        .emit(
                            "file-updated",
                            {
                                file,
                            }
                        );

                    console.log(
                        `✏️ File updated in ${roomId}: ${file.name}`
                    );
                }
            );

            /* =========================================
               DISCONNECT
            ========================================= */

            socket.on(
                "disconnect",
                (reason) => {
                    const roomId =
                        socket.data
                            .roomId;

                    console.log(
                        `Socket disconnected: ${socket.id}`,
                        reason
                    );

                    if (!roomId) {
                        return;
                    }

                    setTimeout(
                        () => {
                            io.to(
                                roomId
                            ).emit(
                                "room-participants",
                                getRoomParticipants(
                                    roomId
                                )
                            );
                        },
                        0
                    );
                }
            );
        }
    );

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error(
            "Socket.IO has not been initialized"
        );
    }

    return io;
};