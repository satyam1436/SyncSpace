import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : "transparent"}`}>
      <div className="logo">SyncSpace</div>

      <div className="desktop-links">
        <a href="#hero" className="nav-link">Home</a>
        <a href="#features" className="nav-link">Features</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
        <a href="/login" className="nav-link">Login</a>
        <a href="/register" className="cta-button">Get Started</a>
      </div>

      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <div className={`mobile-drawer ${isMenuOpen ? "open" : ""}`}>
        <a href="#hero" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a>
        <a href="#features" className="nav-link" onClick={() => setIsMenuOpen(false)}>Features</a>
        <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
        <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
        <a href="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</a>
        <a href="/register" className="cta-button" onClick={() => setIsMenuOpen(false)}>Get Started</a>
      </div>
    </nav>
  );
}

export default Navbar;