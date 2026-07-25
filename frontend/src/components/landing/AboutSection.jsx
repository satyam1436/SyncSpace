import "./AboutSection.css";

function AboutSection() {
  const stats = [
    { number: "40%", label: "Faster technical interviews" },
    { number: "0ms", label: "Sync delay with CRDT merging" },
    { number: "100%", label: "Conflict-free collaboration" },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h2 className="about-heading">Why SyncSpace Exists</h2>
          <p className="about-description">
            Engineering teams conducting technical interviews and design
            reviews are stuck juggling disconnected tools — a whiteboard app
            in one tab, a code editor in another. SyncSpace unifies both into
            a single, real-time collaborative workspace where diagrams and
            code stay perfectly in sync, with zero setup and zero conflicts.
          </p>

          <div className="about-stats">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-illustration">
          <svg viewBox="0 0 300 300" className="illustration-svg">
            <circle cx="150" cy="150" r="120" fill="#1E293B" stroke="#334155" />
            <rect x="70" y="100" width="70" height="50" rx="6" fill="#0EA5E9" opacity="0.4" stroke="#0EA5E9" />
            <rect x="160" y="130" width="70" height="50" rx="6" fill="#6366F1" opacity="0.4" stroke="#6366F1" />
            <line x1="140" y1="125" x2="160" y2="155" stroke="#94A3B8" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;