import "./ParticipantsPanel.css";

const participants = [
    {
        id: 1,
        name: "Satyam Kumar",
        initials: "SK",
        status: "online",
    },
    {
        id: 2,
        name: "Vivek",
        initials: "V",
        status: "online",
    },
    {
        id: 3,
        name: "Alex Developer",
        initials: "AD",
        status: "away",
    },
];

function ParticipantsPanel() {
    return (
        <section className="participants-panel">
            <div className="participants-header">
                <h2>Participants</h2>
                <span>{participants.length}</span>
            </div>

            <div className="participants-list">
                {participants.map((participant) => (
                    <div
                        className="participant-item"
                        key={participant.id}
                    >
                        <div className="participant-avatar">
                            {participant.initials}

                            <span
                                className={`participant-status ${participant.status}`}
                            />
                        </div>

                        <div className="participant-info">
                            <span className="participant-name">
                                {participant.name}
                            </span>

                            <span className="participant-state">
                                {participant.status === "online"
                                    ? "Online"
                                    : "Away"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ParticipantsPanel;