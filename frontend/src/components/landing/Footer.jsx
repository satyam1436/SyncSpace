import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-column">
          <div className="footer-logo">SyncSpace</div>
          <p className="footer-tagline">
            Real-Time Collaborative Engineering Workspace for Distributed
            Teams.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <li><a href="#hero">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Documentation</h4>
          <ul className="footer-list">
            <li><a href="#">System Architecture</a></li>
            <li><a href="#">CRDT Mechanics</a></li>
            <li><a href="#">API Specs</a></li>
            <li><a href="#">Security Protocol</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-list">
            <li>support@syncspace.io</li>
            <li>Jamshedpur, IN</li>
          </ul>
        </div>
      </div>

      <div className="footer-social">
        <a href="#" aria-label="GitHub">GitHub</a>
        <a href="#" aria-label="LinkedIn">LinkedIn</a>
        <a href="#" aria-label="Twitter/X">Twitter/X</a>
      </div>

      <div className="footer-bottom">
        <p>SyncSpace © 2026 Axlero Solutions Inc. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;