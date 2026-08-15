import {
    FaCodeBranch,
    FaCheckCircle,
    FaExclamationTriangle,
    FaTimesCircle,
} from "react-icons/fa";

import "./StatusBar.css";

function StatusBar() {
    return (
        <footer className="workspace-status-bar-content">
            <div className="status-bar-left">
                <div className="status-item status-connected">
                    <FaCheckCircle />
                    <span>Connected</span>
                </div>

                <div className="status-item status-sync">
                    <span className="status-sync-dot" />
                    <span>Synced</span>
                </div>

                <div className="status-item">
                    <FaCodeBranch />
                    <span>main</span>
                </div>
            </div>

            <div className="status-bar-center">
                <span>Ln 12, Col 8</span>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
                <span>TypeScript React</span>
            </div>

            <div className="status-bar-right">
                <div className="status-item status-warning">
                    <FaExclamationTriangle />
                    <span>0</span>
                </div>

                <div className="status-item status-error">
                    <FaTimesCircle />
                    <span>0</span>
                </div>

                <div className="status-item status-latency">
                    <span className="status-latency-dot" />
                    <span>42ms</span>
                </div>
            </div>
        </footer>
    );
}

export default StatusBar;