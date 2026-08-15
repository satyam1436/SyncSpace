import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { createRoom } from "../../api/room.api";

import "./CreateRoomForm.css";

function CreateRoomForm() {
  const navigate = useNavigate();

  const [roomName, setRoomName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [visibility, setVisibility] =
    useState("public");

  const [errors, setErrors] =
    useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const validate = () => {
    const newErrors = {};

    const trimmedName =
      roomName.trim();

    if (
      !trimmedName ||
      trimmedName.length < 3 ||
      trimmedName.length > 50
    ) {
      newErrors.roomName =
        "Room name must be between 3 and 50 characters.";
    }

    if (description.length > 200) {
      newErrors.description =
        "Description cannot exceed 200 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors =
      validate();

    if (
      Object.keys(
        validationErrors
      ).length > 0
    ) {
      setErrors(
        validationErrors
      );
      return;
    }

    try {
      setErrors({});
      setIsSubmitting(true);

      const response =
        await createRoom({
          roomName:
            roomName.trim(),

          description:
            description.trim(),

          visibility,
        });

      const room =
        response?.data?.room;

      if (!room?.roomId) {
        throw new Error(
          "Room was created but room ID was not returned."
        );
      }

      console.log(
        "✅ Room created:",
        room
      );

      /*
       * Directly open the newly
       * created workspace.
       */
      navigate(
        `/workspace/${room.roomId}`
      );
    } catch (error) {
      console.error(
        "❌ CREATE ROOM ERROR:",
        error
      );

      setErrors({
        submit:
          error.response?.data
            ?.error?.message ||
          error.response?.data
            ?.message ||
          error.message ||
          "Unable to create room.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="create-room-form"
      onSubmit={handleSubmit}
    >
      <Input
        label="Room Name"
        id="roomName"
        value={roomName}
        onChange={(event) =>
          setRoomName(
            event.target.value
          )
        }
        placeholder="e.g., Frontend Architecture Sync"
        error={errors.roomName}
      />

      <Input
        label="Room Description (optional)"
        id="description"
        as="textarea"
        rows={3}
        value={description}
        onChange={(event) =>
          setDescription(
            event.target.value
          )
        }
        placeholder="Meeting agenda or instructions..."
        error={errors.description}
        maxLength={200}
      />

      <div className="visibility-group">
        <label className="visibility-label">
          Visibility
        </label>

        <div className="visibility-options">
          <label className="radio-option">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={
                visibility ===
                "public"
              }
              onChange={(event) =>
                setVisibility(
                  event.target.value
                )
              }
            />

            Public
          </label>

          <label className="radio-option">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={
                visibility ===
                "private"
              }
              onChange={(event) =>
                setVisibility(
                  event.target.value
                )
              }
            />

            Private (Code Required)
          </label>
        </div>
      </div>

      {errors.submit && (
        <span
          className="room-code-error"
          role="alert"
        >
          {errors.submit}
        </span>
      )}

      <Button
        type="submit"
        variant="primary"
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Creating Room..."
          : "Create Room"}
      </Button>
    </form>
  );
}

export default CreateRoomForm;