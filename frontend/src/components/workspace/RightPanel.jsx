import ParticipantsPanel from "./ParticipantsPanel";
import ChatPanel from "./ChatPanel";
import "./RightPanel.css";

function RightPanel({
    activePanel,
    onPanelChange,
    roomId,
}) {
    return (
        <aside className="workspace-right-panel-container">
            <div className="right-panel-tabs">
                <button
                    type="button"
                    className={
                        activePanel === "chat"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        onPanelChange("chat")
                    }
                >
                    Chat
                </button>

                <button
                    type="button"
                    className={
                        activePanel ===
                            "participants"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        onPanelChange(
                            "participants"
                        )
                    }
                >
                    Participants
                </button>
            </div>

            <div className="right-panel-content">
                {activePanel === "chat" ? (
                    <ChatPanel
                        roomId={roomId}
                    />
                ) : (
                    <ParticipantsPanel />
                )}
            </div>
        </aside>
    );
}

export default RightPanel;