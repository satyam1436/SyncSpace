import {
    FaCode,
    FaChalkboard,
    FaUsers,
    FaComments,
    FaCog,
    FaFolderOpen,
} from "react-icons/fa";

import "./SidebarNav.css";

function SidebarNav({
    activeMode,
    onModeChange,
    activePanel,
    onPanelChange,
    onSettingsClick,
    isExplorerOpen,
    onExplorerClick,
}) {

    return (
        <aside className="workspace-sidebar-nav">
            <nav
                className="sidebar-nav-list"
                aria-label="Workspace navigation"
            >
                {/* Code */}
                <button
                    type="button"
                    className={`sidebar-nav-item ${activeMode === "code" ? "active" : ""
                        }`}
                    aria-label="Code editor"
                    title="Code editor"
                    onClick={() => onModeChange("code")}
                >
                    <FaCode />
                </button>

                {/* Whiteboard */}
                <button
                    type="button"
                    className={`sidebar-nav-item ${activeMode === "whiteboard" ? "active" : ""
                        }`}
                    aria-label="Whiteboard"
                    title="Whiteboard"
                    onClick={() => onModeChange("whiteboard")}
                >
                    <FaChalkboard />
                </button>

                {/* File Explorer */}
                <button
                    type="button"
                    className={`sidebar-nav-item ${isExplorerOpen ? "active" : ""
                        }`}
                    aria-label="File explorer"
                    title="File explorer"
                    onClick={onExplorerClick}
                >
                    <FaFolderOpen />
                </button>

                {/* Participants */}
                <button
                    type="button"
                    className={`sidebar-nav-item ${activePanel === "participants" ? "active" : ""
                        }`}
                    aria-label="Participants"
                    title="Participants"
                    onClick={() =>
                        onPanelChange("participants")
                    }
                >
                    <FaUsers />
                </button>

                {/* Chat */}
                <button
                    type="button"
                    className={`sidebar-nav-item sidebar-chat-button ${activePanel === "chat" ? "active" : ""
                        }`}
                    aria-label="Chat"
                    title="Chat"
                    onClick={() => onPanelChange("chat")}
                >
                    <FaComments />

                    <span className="sidebar-unread-badge">
                        3
                    </span>
                </button>
            </nav>

            {/* Settings */}
            <div className="sidebar-nav-bottom">
                <button
                    type="button"
                    className="sidebar-nav-item"
                    aria-label="Settings"
                    title="Settings"
                    onClick={onSettingsClick}
                >
                    <FaCog />
                </button>
            </div>
        </aside>
    );
}

export default SidebarNav;


