import { useState } from "react";
import "./ChatPanel.css";

const initialMessages = [
    {
        id: 1,
        sender: "Vivek",
        initials: "V",
        message: "Hey! The workspace is ready.",
        time: "10:42 AM",
    },
    {
        id: 2,
        sender: "Satyam",
        initials: "SK",
        message: "Great. Let's start collaborating.",
        time: "10:43 AM",
    },
];

function ChatPanel() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(initialMessages);

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return;
        }

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                sender: "You",
                initials: "YO",
                message: trimmedMessage,
                time: "Now",
            },
        ]);

        setMessage("");
    };

    return (
        <section className="chat-panel">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>

            <div className="chat-messages">
                {messages.map((item) => (
                    <div className="chat-message" key={item.id}>
                        <div className="chat-avatar">
                            {item.initials}
                        </div>

                        <div className="chat-message-content">
                            <div className="chat-message-meta">
                                <span>{item.sender}</span>
                                <time>{item.time}</time>
                            </div>

                            <p>{item.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <form
                className="chat-input-area"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type a message..."
                    aria-label="Chat message"
                />

                <button type="submit">
                    Send
                </button>
            </form>
        </section>
    );
}

export default ChatPanel;