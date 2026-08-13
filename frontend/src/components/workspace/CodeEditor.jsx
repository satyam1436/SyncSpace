import "./CodeEditor.css";

const codeLines = [
    'import React from "react";',
    "",
    "function Workspace() {",
    "  const room = {",
    '    name: "Frontend Collaboration",',
    '    status: "Connected",',
    "  };",
    "",
    "  return (",
    '    <div className="workspace-container">',
    "      <h1>{room.name}</h1>",
    "      <p>Real-time collaboration is active.</p>",
    "    </div>",
    "  );",
    "}",
    "",
    "export default Workspace;",
];

function CodeEditor() {
    return (
        <section className="code-editor">
            {/* File Tabs */}
            <div className="code-editor-tabs">
                <button
                    type="button"
                    className="code-editor-tab active"
                >
                    Workspace.jsx
                </button>

                <button
                    type="button"
                    className="code-editor-tab"
                >
                    App.jsx
                </button>

                <button
                    type="button"
                    className="code-editor-tab"
                >
                    styles.css
                </button>
            </div>

            {/* Editor */}
            <div className="code-editor-surface">
                <div className="code-editor-lines">
                    {codeLines.map((line, index) => (
                        <div className="code-editor-line" key={index}>
                            <span className="code-editor-line-number">
                                {index + 1}
                            </span>

                            <code className="code-editor-code">
                                {line || "\u00A0"}
                            </code>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CodeEditor;