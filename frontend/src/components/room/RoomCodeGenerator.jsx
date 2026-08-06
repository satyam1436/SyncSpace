import { useState } from "react";
import { FiCopy, FiCheck, FiRefreshCw } from "react-icons/fi";
import Button from "../ui/Button";
import "./RoomCodeGenerator.css";

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SYNC-${code}`;
}

function RoomCodeGenerator({ code, onGenerate }) {
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newCode = generateCode();
    onGenerate(newCode);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-generator">
      <label className="code-label">Room Code</label>
      <div className="code-row">
        <div className="code-display" aria-live="polite">
          {code || "Not generated yet"}
        </div>
        {code && (
          <button
            type="button"
            className="copy-btn"
            onClick={handleCopy}
            aria-label="Copy room code"
          >
            {copied ? <FiCheck /> : <FiCopy />}
          </button>
        )}
      </div>
      <Button variant="secondary" onClick={handleGenerate} className="generate-btn">
        <FiRefreshCw style={{ marginRight: "8px" }} />
        Generate Room Code
      </Button>
    </div>
  );
}

export default RoomCodeGenerator;