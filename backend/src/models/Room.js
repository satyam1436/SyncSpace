import { Schema, model } from "mongoose";

const roomSchema = new Schema(
    {
        roomId: {
            type: String,
            required: [true, "Room ID is required"],
            unique: true,
            index: true,
            trim: true,
        },

        roomName: {
            type: String,
            required: [true, "Room name is required"],
            trim: true,
            minlength: [3, "Room name must be at least 3 characters"],
            maxlength: [50, "Room name cannot exceed 50 characters"],
        },

        description: {
            type: String,
            trim: true,
            maxlength: [200, "Description cannot exceed 200 characters"],
            default: "",
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Room owner is required"],
        },

        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        visibility: {
            type: String,
            enum: {
                values: ["public", "private"],
                message: "Visibility must be either public or private",
            },
            default: "public",
        },
    },
    {
        timestamps: true,
    }
);

const Room = model("Room", roomSchema);

export default Room;