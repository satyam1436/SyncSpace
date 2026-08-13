import "./WhiteboardPlaceholder.css";

function WhiteboardPlaceholder() {
    return (
        <section className="whiteboard-placeholder">
            <div className="whiteboard-grid" />

            <div className="whiteboard-content">
                <div className="whiteboard-icon">W</div>

                <h2>Whiteboard</h2>

                <p>
                    Collaborative whiteboard workspace will appear here.
                </p>

                <span>
                    Canvas tools coming soon
                </span>
            </div>
        </section>
    );
}

export default WhiteboardPlaceholder;