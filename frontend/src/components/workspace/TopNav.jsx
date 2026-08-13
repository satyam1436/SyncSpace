import { useState } from "react";
import "./TopNav.css";

function TopNav({
    activeMode,
    onModeChange,
}) {
    const [copied, setCopied] = useState(false);

    const roomId = "SYNC-A7K2";

    const handleCopyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (error) {
            console.error("Failed to copy room ID:", error);
        }
    };
    return (
        <header className="top-nav">
            <div className="top-nav-brand">
                <div className="top-nav-logo">S</div>

                <span className="top-nav-title">
                    SyncSpace
                </span>
            </div>

            <div className="top-nav-room">
                <span className="top-nav-room-name">
                    Frontend Collaboration
                </span>

                <span className="top-nav-room-id">
                    {roomId}
                </span>

                <button
                    type="button"
                    className="top-nav-copy-button"
                    onClick={handleCopyRoomId}
                    aria-label={copied ? "Room ID copied" : "Copy room ID"}
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <div className="top-nav-actions">
                <div className="top-nav-mode-switcher">
                    <button
                        type="button"
                        className={`top-nav-mode ${activeMode === "code" ? "active" : ""
                            }`}
                        onClick={() => onModeChange("code")}
                    >
                        Code
                    </button>

                    <button
                        type="button"
                        className={`top-nav-mode ${activeMode === "whiteboard" ? "active" : ""
                            }`}
                        onClick={() => onModeChange("whiteboard")}
                    >
                        Whiteboard
                    </button>
                </div>

                <div className="top-nav-avatar">
                    SK
                </div>
            </div>
        </header>
    );
}

export default TopNav;