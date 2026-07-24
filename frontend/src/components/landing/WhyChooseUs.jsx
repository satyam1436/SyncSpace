import "./WhyChooseUs.css";
import FeatureCard from "./FeatureCard";

function WhyChooseUs() {
  const differentiators = [
    {
      icon: "⚡",
      title: "Sub-millisecond State Sync",
      description:
        "Changes propagate across all connected clients in under a millisecond, keeping every collaborator perfectly in sync.",
    },
    {
      icon: "🔒",
      title: "Secure Isolated Rooms",
      description:
        "Every session runs in a fully isolated room, ensuring your architecture diagrams and code stay private and protected.",
    },
    {
      icon: "📜",
      title: "Immutability Audit Logs",
      description:
        "Every change is recorded in an immutable log, giving teams complete traceability over collaborative sessions.",
    },
    {
      icon: "🌐",
      title: "Zero Installation (Browser Native)",
      description:
        "No downloads, no extensions, no setup. SyncSpace runs entirely in the browser, ready the moment you open a link.",
    },
  ];

  return (
    <section className="why-choose-section">
      <h2 className="why-choose-heading">Why Choose SyncSpace</h2>
      <div className="why-choose-grid">
        {differentiators.map((item, index) => (
          <FeatureCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;