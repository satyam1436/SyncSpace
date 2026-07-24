import "./CTASection.css";

function CTASection() {
  return (
    <section className="cta-section">
      <h2 className="cta-heading">
        Ready to Transform How Your Team Collaborates?
      </h2>
      <p className="cta-subtext">
        Join engineering teams already using SyncSpace for real-time
        collaboration — no setup, no installs, just instant sync.
      </p>
      <a href="/register" className="cta-button-large">
        Get Started Free
      </a>
    </section>
  );
}

export default CTASection;