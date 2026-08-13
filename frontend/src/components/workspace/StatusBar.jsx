import {
    FaCircle,
    FaCodeBranch,
    FaBolt,
} from "react-icons/fa";

import "./StatusBar.css";

function StatusBar() {
    return (
        <footer className="workspace-status-bar-content">
            <div className="status-bar-left">
                <div className="status-item status-connected">
                    <FaCircle />
                    <span>Connected</span>
                </div>

                <div className="status-item">
                    <FaBolt />
                    <span>Synced</span>
                </div>
            </div>

            <div className="status-bar-center">
                <span>Latency: 42ms</span>
            </div>

            <div className="status-bar-right">
                <div className="status-item">
                    <FaCodeBranch />
                    <span>main</span>
                </div>

                <span className="status-git-clean">
                    Git: Clean
                </span>
            </div>
        </footer>
    );
}

export default StatusBar;