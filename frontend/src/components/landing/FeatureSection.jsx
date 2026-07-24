import "./FeatureSection.css";
import FeatureCard from "./FeatureCard";

function FeatureSection() {
  const features = [
    {
      icon: "🔄",
      title: "CRDT Conflict Resolution",
      description:
        "Zero-latency document convergence powered by Yjs. Multiple users edit the same content simultaneously without ever overwriting each other's work.",
    },
    {
      icon: "🖊️",
      title: "High-Performance Vector Stage",
      description:
        "Low-overhead 2D canvas drawing built on Konva.js, delivering smooth, responsive shapes, lines, and text even during heavy concurrent use.",
    },
    {
      icon: "⏱️",
      title: "Temporal Session Replay",
      description:
        "Time-travel through any collaborative session. Scrub back and forth to review exactly how a whiteboard or codebase evolved over time.",
    },
  ];

  return (
    <section id="features" className="feature-section">
      <h2 className="feature-heading">Core Platform Capabilities</h2>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;