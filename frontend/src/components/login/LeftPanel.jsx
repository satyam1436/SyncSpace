const LeftPanel = () => {
  return (
    <div className="left-panel">
      <div className="branding">
        <h1 className="logo">SyncSpace</h1>
        <p className="tagline">
          Real-Time Collaborative Engineering
        </p>
      </div>

      <div className="preview-box">
        <p>Animated Vector Canvas Preview</p>
      </div>

      <p className="users">
        ● Live Active Sessions: 1,420 Users
      </p>

      <h3 className="quote">
        "The IDE for Remote Engineering Teams"
      </h3>
    </div>
  );
};

export default LeftPanel;
