import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import RoomCodeGenerator from "./RoomCodeGenerator";
import "./CreateRoomForm.css";

function CreateRoomForm() {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [roomCode, setRoomCode] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const trimmedName = roomName.trim();
    if (!trimmedName || trimmedName.length < 3 || trimmedName.length > 50) {
      newErrors.roomName = "Room name must be between 3 and 50 characters.";
    }

    if (description.length > 200) {
      newErrors.description = "Description cannot exceed 200 characters.";
    }

    if (!roomCode) {
      newErrors.roomCode = "Please generate a room code before creating.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    navigate("/room-loading", { state: { roomCode, roomName } });
  };

  return (
    <form className="create-room-form" onSubmit={handleSubmit}>
      <Input
        label="Room Name"
        id="roomName"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="e.g., Frontend Architecture Sync"
        error={errors.roomName}
      />

      <Input
        label="Room Description (optional)"
        id="description"
        as="textarea"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Meeting agenda or instructions..."
        error={errors.description}
        maxLength={200}
      />

      <div className="visibility-group">
        <label className="visibility-label">Visibility</label>
        <div className="visibility-options">
          <label className="radio-option">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === "public"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            Public
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={visibility === "private"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            Private (Code Required)
          </label>
        </div>
      </div>

      <RoomCodeGenerator code={roomCode} onGenerate={setRoomCode} />
      {errors.roomCode && (
        <span className="room-code-error" role="alert">
          {errors.roomCode}
        </span>
      )}

      <Button type="submit" variant="primary" className="submit-btn">
        Create Room
      </Button>
    </form>
  );
}

export default CreateRoomForm;