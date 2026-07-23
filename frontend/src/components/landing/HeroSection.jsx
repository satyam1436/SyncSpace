import "./HeroSection.css";
import HeroPreview from "./HeroPreview";

function HeroSection() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <h1 className="hero-headline">
        Real-Time Collaboration for Distributed Engineering Teams.
      </h1>
      <p className="hero-subheadline">
        Draw architecture diagrams and write code concurrently without state
        divergence or race conditions.
      </p>

      <div className="hero-buttons">
        <a href="/register" className="btn-primary">
          Get Started Free
        </a>
        <button onClick={scrollToAbout} className="btn-secondary">
          Learn More
        </button>
      </div>

      <HeroPreview />
    </section>
  );
}

export default HeroSection;