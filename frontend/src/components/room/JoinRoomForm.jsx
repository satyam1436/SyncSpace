import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import "./JoinRoomForm.css";

function isValidRoomCode(code) {
  const syncFormat = /^SYNC-[A-Z0-9]{4}$/;
  const plainFormat = /^[A-Z0-9]{8}$/;
  return syncFormat.test(code) || plainFormat.test(code);
}

function JoinRoomForm() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const upperValue = e.target.value.toUpperCase();
    setRoomCode(upperValue);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCode = roomCode.trim();

    if (!trimmedCode || !isValidRoomCode(trimmedCode)) {
      setError("Please enter a valid room code (e.g., SYNC-8921).");
      return;
    }

    setError("");
    navigate("/room-loading", { state: { roomCode: trimmedCode } });
  };

  return (
    <form className="join-room-form" onSubmit={handleSubmit}>
      <Input
        label="Room Code"
        id="joinRoomCode"
        value={roomCode}
        onChange={handleChange}
        placeholder="SYNC-8921"
        error={error}
        mono
      />

      <Button type="submit" variant="primary" className="join-submit-btn">
        Join Room
      </Button>
    </form>
  );
}

export default JoinRoomForm;