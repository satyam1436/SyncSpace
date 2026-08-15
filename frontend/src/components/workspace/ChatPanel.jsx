import { useEffect, useState } from "react";
import {
    FaPaperclip,
    FaPaperPlane,
    FaCode,
    FaSmile,
} from "react-icons/fa";

import "./ChatPanel.css";

import { socket } from "../../socket/socket";

import useAuth from "../../hooks/useAuth";

function ChatPanel({ roomId }) {
    const [message, setMessage] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const { user } = useAuth();

    useEffect(() => {
        const handleChatMessage = (
            chatMessage
        ) => {
            setMessages((prev) => [
                ...prev,
                chatMessage,
            ]);
        };

        socket.on(
            "chat-message",
            handleChatMessage
        );

        return () => {
            socket.off(
                "chat-message",
                handleChatMessage
            );
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedMessage =
            message.trim();

        if (
            !trimmedMessage ||
            !roomId
        ) {
            return;
        }

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
            "send-message",
            {
                roomId,

                message:
                    trimmedMessage,

                sender,

                initials,
            }
        );

        setMessage("");
    };

    return (
        <section className="chat-panel">
            <div className="chat-header">
                <div>
                    <h2>Chat</h2>

                    <span>
                        Room discussion
                    </span>
                </div>

                <span className="chat-online">
                    ● Live
                </span>
            </div>

            <div className="chat-messages">
                {messages.length ===
                    0 ? (
                    <div className="chat-system-message">
                        <span>
                            No messages yet.
                            Start the
                            conversation.
                        </span>
                    </div>
                ) : (
                    messages.map(
                        (item) => {
                            if (
                                item.type ===
                                "system"
                            ) {
                                return (
                                    <div
                                        className="chat-system-message"
                                        key={
                                            item.id
                                        }
                                    >
                                        <span>
                                            {
                                                item.message
                                            }
                                        </span>

                                        <time>
                                            {
                                                item.time
                                            }
                                        </time>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    className="chat-message"
                                    key={
                                        item.id
                                    }
                                >
                                    <div className="chat-avatar">
                                        {
                                            item.initials
                                        }
                                    </div>

                                    <div className="chat-message-content">
                                        <div className="chat-message-meta">
                                            <span>
                                                {
                                                    item.sender
                                                }
                                            </span>

                                            <time>
                                                {
                                                    item.time
                                                }
                                            </time>
                                        </div>

                                        <p>
                                            {
                                                item.message
                                            }
                                        </p>

                                        {item.type ===
                                            "code" && (
                                                <div className="chat-code-card">
                                                    <div className="chat-code-header">
                                                        <span>
                                                            <FaCode />
                                                            JavaScript
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(
                                                                    item.code
                                                                )
                                                            }
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>

                                                    <code>
                                                        {
                                                            item.code
                                                        }
                                                    </code>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            );
                        }
                    )
                )}
            </div>

            <form
                className="chat-input-area"
                onSubmit={
                    handleSubmit
                }
            >
                <button
                    type="button"
                    className="chat-input-action"
                    title="Attach file"
                    aria-label="Attach file"
                >
                    <FaPaperclip />
                </button>

                <button
                    type="button"
                    className="chat-input-action"
                    title="Add emoji"
                    aria-label="Add emoji"
                >
                    <FaSmile />
                </button>

                <input
                    type="text"
                    value={message}
                    onChange={(
                        event
                    ) =>
                        setMessage(
                            event.target
                                .value
                        )
                    }
                    placeholder="Type a message..."
                    aria-label="Chat message"
                />

                <button
                    type="submit"
                    className="chat-send-button"
                    aria-label="Send message"
                >
                    <FaPaperPlane />
                </button>
            </form>
        </section>
    );
}

export default ChatPanel;