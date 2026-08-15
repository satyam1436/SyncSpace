import { useState, useEffect } from "react";
import "./WorkspaceLayout.css";

import TopNav from "./TopNav";
import SidebarNav from "./SidebarNav";
import CodeEditor from "./CodeEditor";
import RightPanel from "./RightPanel";
import StatusBar from "./StatusBar";
import WhiteboardPlaceholder from "./WhiteboardPlaceholder";
import FileExplorer from "./FileExplorer";
import SettingsModal from "./SettingsModal";

import useAuth from "../../hooks/useAuth";
import { getRoom } from "../../api/room.api";

import {
    connectSocket,
    disconnectSocket,
    socket,
} from "../../socket/socket";

const INITIAL_FILES = [
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

const INITIAL_CODE = {
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

function WorkspaceLayout({ roomId }) {
    const [activeMode, setActiveMode] =
        useState("code");

    const [activePanel, setActivePanel] =
        useState("chat");

    const [isSettingsOpen, setIsSettingsOpen] =
        useState(false);

    const [isExplorerOpen, setIsExplorerOpen] =
        useState(false);

    const [room, setRoom] =
        useState(null);

    const [participants, setParticipants] =
        useState([]);

    const [files, setFiles] =
        useState(INITIAL_FILES);

    const [codeContent, setCodeContent] =
        useState(INITIAL_CODE);

    const [activeFile, setActiveFile] =
        useState("workspace");

    const { user } = useAuth();

    /* =========================================
       FETCH ROOM
    ========================================= */

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response =
                    await getRoom(roomId);

                const roomData =
                    response?.data?.room;

                setRoom(roomData);

                setParticipants(
                    roomData?.participants ||
                    []
                );
            } catch (error) {
                console.error(
                    "❌ Failed to fetch room:",
                    error
                );
            }
        };

        if (roomId) {
            fetchRoom();
        }
    }, [roomId]);

    /* =========================================
       SOCKET
    ========================================= */

    useEffect(() => {
        if (!roomId) {
            return;
        }

        connectSocket();

        const handleConnect = () => {
            const sender =
                user?.name ||
                user?.username ||
                user?.fullName ||
                "User";

            const initials = sender
                .split(" ")
                .map(
                    (part) =>
                        part[0]
                )
                .join("")
                .slice(0, 2)
                .toUpperCase();

            socket.emit(
                "join-room",
                {
                    roomId,

                    userId:
                        user?._id ||
                        user?.id ||
                        null,

                    name: sender,

                    initials,
                }
            );
        };

        const handleParticipants = (
            participantList
        ) => {
            setParticipants(
                participantList || []
            );
        };

        /* =========================================
           RECEIVE COMPLETE WORKSPACE STATE
        ========================================= */

        const handleWorkspaceState = ({
            files: remoteFiles,
            codeContent:
            remoteCodeContent,
        }) => {
            if (
                Array.isArray(
                    remoteFiles
                ) &&
                remoteFiles.length > 0
            ) {
                setFiles(remoteFiles);

                setActiveFile(
                    (currentActiveFile) => {
                        const stillExists =
                            remoteFiles.some(
                                (file) =>
                                    file.id ===
                                    currentActiveFile
                            );

                        return stillExists
                            ? currentActiveFile
                            : remoteFiles[0]
                                .id;
                    }
                );
            }

            if (
                remoteCodeContent &&
                typeof remoteCodeContent ===
                "object"
            ) {
                setCodeContent(
                    remoteCodeContent
                );
            }
        };

        /* =========================================
           NEW FILE
        ========================================= */

        const handleFileCreated = ({
            file,
            content,
        }) => {
            if (!file?.id) {
                return;
            }

            setFiles((prev) => {
                const exists =
                    prev.some(
                        (item) =>
                            item.id ===
                            file.id
                    );

                if (exists) {
                    return prev;
                }

                return [
                    ...prev,
                    file,
                ];
            });

            setCodeContent((prev) => ({
                ...prev,
                [file.id]:
                    content || "",
            }));

            /*
             * Open newly received file
             * automatically.
             */
            setActiveFile(
                file.id
            );
        };

        /* =========================================
           DELETE FILE
        ========================================= */

        const handleFileDeleted = ({
            fileId,
        }) => {
            if (!fileId) {
                return;
            }

            setFiles((prev) => {
                const remaining =
                    prev.filter(
                        (file) =>
                            file.id !==
                            fileId
                    );

                setActiveFile(
                    (currentActive) => {
                        if (
                            currentActive !==
                            fileId
                        ) {
                            return currentActive;
                        }

                        return (
                            remaining[0]
                                ?.id ||
                            "workspace"
                        );
                    }
                );

                return remaining;
            });

            setCodeContent((prev) => {
                const updated = {
                    ...prev,
                };

                delete updated[
                    fileId
                ];

                return updated;
            });
        };

        /* =========================================
           FILE UPDATED
        ========================================= */

        const handleFileUpdated = ({
            file,
        }) => {
            if (!file?.id) {
                return;
            }

            setFiles((prev) =>
                prev.map(
                    (existingFile) =>
                        existingFile.id ===
                            file.id
                            ? file
                            : existingFile
                )
            );
        };

        socket.on(
            "connect",
            handleConnect
        );

        socket.on(
            "room-participants",
            handleParticipants
        );

        socket.on(
            "workspace-state",
            handleWorkspaceState
        );

        socket.on(
            "file-created",
            handleFileCreated
        );

        socket.on(
            "file-deleted",
            handleFileDeleted
        );

        socket.on(
            "file-updated",
            handleFileUpdated
        );

        if (socket.connected) {
            handleConnect();

            socket.emit(
                "request-participants"
            );

            socket.emit(
                "request-workspace-state"
            );
        }

        return () => {
            socket.off(
                "connect",
                handleConnect
            );

            socket.off(
                "room-participants",
                handleParticipants
            );

            socket.off(
                "workspace-state",
                handleWorkspaceState
            );

            socket.off(
                "file-created",
                handleFileCreated
            );

            socket.off(
                "file-deleted",
                handleFileDeleted
            );

            socket.off(
                "file-updated",
                handleFileUpdated
            );

            disconnectSocket();
        };
    }, [roomId, user]);

    /* =========================================
       CREATE FILE
    ========================================= */

    const handleCreateFile = ({
        file,
        content,
    }) => {
        setFiles((prev) => [
            ...prev,
            file,
        ]);

        setCodeContent((prev) => ({
            ...prev,
            [file.id]:
                content || "",
        }));

        setActiveFile(file.id);

        setIsExplorerOpen(true);

        /*
         * Sync new file with everyone
         * in the same room.
         */
        socket.emit(
            "file-created",
            {
                roomId,
                file,
                content:
                    content || "",
            }
        );
    };

    /* =========================================
       DELETE FILE
    ========================================= */

    const handleDeleteFile = (
        fileId
    ) => {
        if (files.length <= 1) {
            return;
        }

        setFiles((prev) =>
            prev.filter(
                (file) =>
                    file.id !==
                    fileId
            )
        );

        setCodeContent((prev) => {
            const updated = {
                ...prev,
            };

            delete updated[
                fileId
            ];

            return updated;
        });

        if (activeFile === fileId) {
            const remainingFiles =
                files.filter(
                    (file) =>
                        file.id !==
                        fileId
                );

            if (
                remainingFiles.length >
                0
            ) {
                setActiveFile(
                    remainingFiles[0]
                        .id
                );
            }
        }

        /*
         * Sync deletion.
         */
        socket.emit(
            "file-deleted",
            {
                roomId,
                fileId,
            }
        );
    };

    /* =========================================
       UPDATE FILE
    ========================================= */

    const handleFileUpdate = (
        updatedFile
    ) => {
        setFiles((prev) =>
            prev.map(
                (file) =>
                    file.id ===
                        updatedFile.id
                        ? updatedFile
                        : file
            )
        );

        socket.emit(
            "file-updated",
            {
                roomId,
                file: updatedFile,
            }
        );
    };

    return (
        <div className="workspace-layout">
            <TopNav
                activeMode={activeMode}
                onModeChange={
                    setActiveMode
                }
                roomId={
                    room?.roomId ||
                    roomId
                }
                roomName={
                    room?.roomName ||
                    "Loading..."
                }
                participantCount={
                    participants.length
                }
            />

            <div className="workspace-body">
                <SidebarNav
                    activeMode={activeMode}
                    onModeChange={
                        setActiveMode
                    }
                    activePanel={
                        activePanel
                    }
                    onPanelChange={
                        setActivePanel
                    }
                    onSettingsClick={() =>
                        setIsSettingsOpen(
                            true
                        )
                    }
                    isExplorerOpen={
                        isExplorerOpen
                    }
                    onExplorerClick={() =>
                        setIsExplorerOpen(
                            (prev) =>
                                !prev
                        )
                    }
                />

                {isExplorerOpen && (
                    <FileExplorer
                        files={files}
                        activeFile={
                            activeFile
                        }
                        onFileSelect={
                            setActiveFile
                        }
                        onCreateFile={
                            handleCreateFile
                        }
                    />
                )}

                <main className="workspace-main">
                    {activeMode ===
                        "code" && (
                            <CodeEditor
                                roomId={
                                    roomId
                                }
                                files={files}
                                setFiles={
                                    setFiles
                                }
                                activeFile={
                                    activeFile
                                }
                                setActiveFile={
                                    setActiveFile
                                }
                                codeContent={
                                    codeContent
                                }
                                setCodeContent={
                                    setCodeContent
                                }
                                onCreateFile={
                                    handleCreateFile
                                }
                                onDeleteFile={
                                    handleDeleteFile
                                }
                                onFileUpdate={
                                    handleFileUpdate
                                }
                            />
                        )}

                    {activeMode === "whiteboard" && (
                        <WhiteboardPlaceholder
                            roomId={roomId}
                        />
                    )}

                    {activeMode === "split" && (
                        <div className="workspace-split-view">
                            <div className="workspace-split-editor">
                                <CodeEditor
                                    roomId={roomId}
                                    files={files}
                                    setFiles={setFiles}
                                    activeFile={activeFile}
                                    setActiveFile={setActiveFile}
                                    codeContent={codeContent}
                                    setCodeContent={setCodeContent}
                                    onCreateFile={handleCreateFile}
                                    onDeleteFile={handleDeleteFile}
                                />
                            </div>

                            <div className="workspace-split-whiteboard">
                                <WhiteboardPlaceholder
                                    roomId={roomId}
                                />
                            </div>
                        </div>
                    )}
                </main>

                <RightPanel
                    activePanel={activePanel}
                    onPanelChange={setActivePanel}
                    roomId={roomId}
                />

                {isSettingsOpen && (
                    <SettingsModal
                        onClose={() =>
                            setIsSettingsOpen(
                                false
                            )
                        }
                    />
                )}
            </div>

            <StatusBar />
        </div>
    );
}

export default WorkspaceLayout;