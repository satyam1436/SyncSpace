import "./LeftPanel.css";

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <div className="branding">
        <h1 className="logo">SyncSpace</h1>

        <p className="tagline">
          Real-Time Collaborative Engineering
        </p>
      </div>

      {/* Animated Collaboration Preview */}
      <div className="preview-box">
        <div className="preview-header">
          <div className="preview-dots">
            <span />
            <span />
            <span />
          </div>

          <span className="preview-title">
            syncspace.workspace
          </span>

          <div className="preview-live">
            <span className="preview-live-dot" />
            LIVE
          </div>
        </div>

        <div className="preview-content">
          {/* Connection Lines */}
          <div className="connection-line line-one" />
          <div className="connection-line line-two" />
          <div className="connection-line line-three" />

          {/* User Nodes */}
          <div className="user-node user-one">
            <div className="user-avatar">SK</div>
            <span>Satyam</span>
          </div>

          <div className="user-node user-two">
            <div className="user-avatar avatar-purple">
              AK
            </div>
            <span>Alex</span>
          </div>

          <div className="user-node user-three">
            <div className="user-avatar avatar-green">
              JD
            </div>
            <span>John</span>
          </div>

          {/* Central Workspace */}
          <div className="workspace-preview">
            <div className="workspace-preview-header">
              <span className="workspace-file active">
                App.jsx
              </span>

              <span className="workspace-file">
                styles.css
              </span>
            </div>

            <div className="code-preview">
              <div>
                <span className="code-number">01</span>
                <span className="code-keyword">
                  function
                </span>{" "}
                <span className="code-function">
                  SyncSpace
                </span>
                <span className="code-text">() {"{"}</span>
              </div>

              <div>
                <span className="code-number">02</span>
                <span className="code-text">
                  {"  "}
                  const
                </span>{" "}
                <span className="code-variable">
                  room
                </span>{" "}
                <span className="code-text">
                  =
                </span>{" "}
                <span className="code-string">
                  "Live"
                </span>
                <span className="code-text">;</span>
              </div>

              <div>
                <span className="code-number">03</span>
                <span className="code-text">
                  {"  "}
                  return
                </span>{" "}
                <span className="code-function">
                  collaborate
                </span>
                <span className="code-text">
                  ();
                </span>
              </div>

              <div>
                <span className="code-number">04</span>
                <span className="code-text">{"}"}</span>
              </div>

              {/* Animated Cursor */}
              <div className="code-cursor cursor-blue">
                <span />
                <label>SK</label>
              </div>

              <div className="code-cursor cursor-purple">
                <span />
                <label>AK</label>
              </div>
            </div>

            {/* Sync Indicator */}
            <div className="sync-indicator">
              <span className="sync-icon">↻</span>
              <span>Changes synced</span>
            </div>
          </div>

          {/* Floating Activity */}
          <div className="floating-event event-one">
            <span className="event-icon">✦</span>
            File updated
          </div>

          <div className="floating-event event-two">
            <span className="event-icon">●</span>
            3 users online
          </div>
        </div>
      </div>

      <p className="users">
        <span className="users-live-dot">●</span>
        Live Active Sessions: 1,420 Users
      </p>

      <h3 className="quote">
        "The IDE for Remote Engineering Teams"
      </h3>
    </div>
  );
};

export default LeftPanel;