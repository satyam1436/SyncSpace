import { useEffect, useState } from "react";
import "./SettingsModal.css";

function SettingsModal({ onClose }) {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [compactMode, setCompactMode] = useState(false);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
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
    }, [onClose]);

    return (
        <div
            className="settings-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="settings-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-title"
            >
                <div className="settings-header">
                    <div>
                        <h2 id="settings-title">
                            Workspace Settings
                        </h2>

                        <p>
                            Manage your workspace preferences.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="settings-close"
                        onClick={onClose}
                        aria-label="Close settings"
                    >
                        ×
                    </button>
                </div>

                <div className="settings-body">
                    <label className="settings-row">
                        <div>
                            <strong>Notification Sounds</strong>
                            <span>
                                Play sounds for workspace activity.
                            </span>
                        </div>

                        <input
                            type="checkbox"
                            checked={soundEnabled}
                            onChange={(event) =>
                                setSoundEnabled(event.target.checked)
                            }
                        />
                    </label>

                    <label className="settings-row">
                        <div>
                            <strong>Compact Mode</strong>
                            <span>
                                Reduce spacing across workspace panels.
                            </span>
                        </div>

                        <input
                            type="checkbox"
                            checked={compactMode}
                            onChange={(event) =>
                                setCompactMode(event.target.checked)
                            }
                        />
                    </label>
                </div>

                <div className="settings-footer">
                    <button
                        type="button"
                        className="settings-cancel"
                        onClick={onClose}
                    >
                        Close
                    </button>

                    <button
                        type="button"
                        className="settings-save"
                        onClick={onClose}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsModal;