import { useEffect, useState } from "react";
import {
    FaCrown,
    FaMicrophone,
    FaMicrophoneSlash,
    FaUserPlus,
} from "react-icons/fa";

import "./ParticipantsPanel.css";

import { socket } from "../../socket/socket";

function ParticipantsPanel() {
    const [participants, setParticipants] =
        useState([]);

    const [isInviteOpen, setIsInviteOpen] =
        useState(false);

    const [inviteCopied, setInviteCopied] =
        useState(false);

    const inviteLink =
        "https://syncspace.app/join/SYNC-A7K2";

    useEffect(() => {
        // const handleParticipantsUpdate = (
        //     updatedParticipants
        // ) => {
        //     console.log(
        //         "👥 Participants updated:",
        //         updatedParticipants
        //     );

        //     setParticipants(
        //         updatedParticipants || []
        //     );
        // };

        const handleParticipants = (participants) => {
            setParticipants(participants);
        };

        socket.on(
            "room-participants",
            handleParticipants
        );

        // socket.on(
        //     "room-participants",
        //     handleParticipantsUpdate
        // );

        // Ask backend for current list
        if (socket.connected) {
            socket.emit(
                "request-participants"
            );
        }

        return () => {
            // socket.off(
            //     "room-participants",
            //     handleParticipantsUpdate
            // );
            socket.off(
                "room-participants",
                handleParticipants
            );
        };
    }, []);

    useEffect(() => {
        if (!isInviteOpen) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsInviteOpen(false);
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [isInviteOpen]);

    const handleCopyInvite = async () => {
        try {
            await navigator.clipboard.writeText(
                inviteLink
            );

            setInviteCopied(true);

            setTimeout(() => {
                setInviteCopied(false);
            }, 1500);
        } catch (error) {
            console.error(
                "Failed to copy invite link:",
                error
            );
        }
    };

    return (
        <section className="participants-panel">
            <div className="participants-header">
                <div>
                    <h2>Participants</h2>

                    <span className="participants-subtitle">
                        {participants.length} people
                        in this room
                    </span>
                </div>

                <button
                    type="button"
                    className="invite-button"
                    onClick={() =>
                        setIsInviteOpen(true)
                    }
                    title="Invite collaborators"
                >
                    <FaUserPlus />
                    Invite
                </button>
            </div>

            <div className="participants-list">
                {participants.length === 0 ? (
                    <div className="chat-system-message">
                        No participants found.
                    </div>
                ) : (
                    participants.map(
                        (participant) => (
                            <div
                                className="participant-item"
                                key={
                                    participant.id
                                }
                            >
                                <div className="participant-avatar">
                                    {
                                        participant.initials
                                    }

                                    <span
                                        className={`participant-status ${participant.status}`}
                                    />
                                </div>

                                <div className="participant-info">
                                    <div className="participant-name-row">
                                        <span className="participant-name">
                                            {
                                                participant.name
                                            }
                                        </span>

                                        {participant.role ===
                                            "Host" && (
                                                <FaCrown
                                                    className="participant-host-icon"
                                                    title="Host"
                                                />
                                            )}
                                    </div>

                                    <span className="participant-role">
                                        {
                                            participant.role
                                        }
                                    </span>
                                </div>

                                <div
                                    className={`participant-mute ${participant.muted
                                        ? "muted"
                                        : ""
                                        }`}
                                    title={
                                        participant.muted
                                            ? "Muted"
                                            : "Microphone active"
                                    }
                                >
                                    {participant.muted ? (
                                        <FaMicrophoneSlash />
                                    ) : (
                                        <FaMicrophone />
                                    )}
                                </div>
                            </div>
                        )
                    )
                )}
            </div>

            {isInviteOpen && (
                <div
                    className="invite-overlay"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            setIsInviteOpen(
                                false
                            );
                        }
                    }}
                >
                    <div className="invite-modal">
                        <div className="invite-modal-header">
                            <div>
                                <h3>
                                    Invite
                                    Collaborators
                                </h3>

                                <p>
                                    Share this room
                                    link with your
                                    team.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="invite-close"
                                onClick={() =>
                                    setIsInviteOpen(
                                        false
                                    )
                                }
                            >
                                ×
                            </button>
                        </div>

                        <div className="invite-link-box">
                            <span>
                                {inviteLink}
                            </span>

                            <button
                                type="button"
                                onClick={
                                    handleCopyInvite
                                }
                            >
                                {inviteCopied
                                    ? "Copied!"
                                    : "Copy"}
                            </button>
                        </div>

                        <div className="invite-modal-footer">
                            <button
                                type="button"
                                onClick={() =>
                                    setIsInviteOpen(
                                        false
                                    )
                                }
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ParticipantsPanel;