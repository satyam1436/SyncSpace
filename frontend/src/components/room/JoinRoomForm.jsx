import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { joinRoom } from "../../api/room.api";

import "./JoinRoomForm.css";

function isValidRoomCode(code) {
  const syncFormat =
    /^SYNC-[A-Z0-9]{4}$/;

  const plainFormat =
    /^[A-Z0-9]{8}$/;

  return (
    syncFormat.test(code) ||
    plainFormat.test(code)
  );
}

function JoinRoomForm() {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] =
    useState("");

  const [error, setError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (event) => {
    const upperValue =
      event.target.value.toUpperCase();

    setRoomCode(upperValue);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const trimmedCode =
      roomCode.trim();

    if (
      !trimmedCode ||
      !isValidRoomCode(
        trimmedCode
      )
    ) {
      setError(
        "Please enter a valid room code (e.g., SYNC-8921)."
      );

      return;
    }

    try {
      setError("");
      setIsSubmitting(true);

      await joinRoom(
        trimmedCode
      );

      console.log(
        "✅ Successfully joined:",
        trimmedCode
      );

      navigate(
        `/workspace/${trimmedCode}`
      );
    } catch (error) {
      console.error(
        "❌ JOIN ROOM ERROR:",
        error
      );

      setError(
        error.response?.data
          ?.error?.message ||
        error.response?.data
          ?.message ||
        "Unable to join room."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="join-room-form"
      onSubmit={handleSubmit}
    >
      <Input
        label="Room Code"
        id="joinRoomCode"
        value={roomCode}
        onChange={handleChange}
        placeholder="SYNC-8921"
        error={error}
        mono
      />

      <Button
        type="submit"
        variant="primary"
        className="join-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Joining..."
          : "Join Room"}
      </Button>

      {/* Create Room Option */}
      <div className="join-create-room">
        <span>
          Don't have a room?
        </span>

        <button
          type="button"
          className="join-create-room-button"
          onClick={() =>
            navigate(
              "/create-room"
            )
          }
        >
          Create a new room
        </button>
      </div>
    </form>
  );
}

export default JoinRoomForm;