import "./HeroPreview.css";

function HeroPreview() {
  return (
    <div className="hero-preview">
      <span className="demo-badge">Visual Demonstration Only</span>

      <div className="preview-window">
        {/* Left side - Mock diagram */}
        <div className="preview-panel diagram-panel">
          <div className="cursor-badge cursor-lead">Satyam [Lead]</div>
          <svg viewBox="0 0 200 150" className="mock-diagram">
            <rect x="20" y="20" width="60" height="30" rx="4" fill="#0EA5E9" opacity="0.3" stroke="#0EA5E9" />
            <rect x="120" y="20" width="60" height="30" rx="4" fill="#6366F1" opacity="0.3" stroke="#6366F1" />
            <rect x="70" y="90" width="60" height="30" rx="4" fill="#0EA5E9" opacity="0.3" stroke="#0EA5E9" />
            <line x1="50" y1="50" x2="90" y2="90" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="150" y1="50" x2="110" y2="90" stroke="#94A3B8" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Right side - Mock code editor */}
        <div className="preview-panel code-panel">
          <div className="cursor-badge cursor-dev">Alex [Dev]</div>
          <pre className="mock-code">
            <code>
{`function syncState(doc) {
  const ydoc = new Y.Doc();
  provider.connect();
  return ydoc.getText();
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default HeroPreview;