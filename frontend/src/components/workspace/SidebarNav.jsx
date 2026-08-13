import {
    FaCode,
    FaChalkboard,
    FaUsers,
    FaComments,
    FaCog,
} from "react-icons/fa";

import "./SidebarNav.css";

function SidebarNav({
    activeMode,
    onModeChange,
    activePanel,
    onPanelChange,
}) {
    return (
        <aside className="workspace-sidebar-nav">
            <nav className="sidebar-nav-list" aria-label="Workspace navigation">
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

                <button
                    type="button"
                    className={`sidebar-nav-item ${activePanel === "participants" ? "active" : ""
                        }`}
                    aria-label="Participants"
                    title="Participants"
                    onClick={() => onPanelChange("participants")}
                >
                    <FaUsers />
                </button>

                <button
                    type="button"
                    className={`sidebar-nav-item ${activePanel === "chat" ? "active" : ""
                        }`}
                    aria-label="Chat"
                    title="Chat"
                    onClick={() => onPanelChange("chat")}
                >
                    <FaComments />
                </button>
            </nav>

            <div className="sidebar-nav-bottom">
                <button
                    type="button"
                    className="sidebar-nav-item"
                    aria-label="Settings"
                    title="Settings"
                >
                    <FaCog />
                </button>
            </div>
        </aside>
    );
}

export default SidebarNav;