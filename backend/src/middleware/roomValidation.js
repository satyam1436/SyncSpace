export const validateCreateRoom = (req, res, next) => {
    const { roomName, description, visibility } = req.body;

    const errors = [];

    if (!roomName || typeof roomName !== "string") {
        errors.push({
            field: "roomName",
            message: "Room name is required",
        });
    } else {
        const trimmedName = roomName.trim();

        if (trimmedName.length < 3) {
            errors.push({
                field: "roomName",
                message: "Room name must be at least 3 characters",
            });
        }

        if (trimmedName.length > 50) {
            errors.push({
                field: "roomName",
                message: "Room name cannot exceed 50 characters",
            });
        }
    }

    if (description !== undefined && description !== null) {
        if (typeof description !== "string") {
            errors.push({
                field: "description",
                message: "Description must be a string",
            });
        } else if (description.trim().length > 200) {
            errors.push({
                field: "description",
                message: "Description cannot exceed 200 characters",
            });
        }
    }

    if (
        visibility !== undefined &&
        visibility !== "public" &&
        visibility !== "private"
    ) {
        errors.push({
            field: "visibility",
            message: "Visibility must be either public or private",
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Invalid request data",
                details: errors,
            },
        });
    }

    next();
};

export const validateJoinRoom = (req, res, next) => {
    const { roomId } = req.body;

    const errors = [];

    if (!roomId || typeof roomId !== "string") {
        errors.push({
            field: "roomId",
            message: "Room ID is required",
        });
    } else if (!/^SYNC-[A-Z0-9]{4}$/.test(roomId.trim().toUpperCase())) {
        errors.push({
            field: "roomId",
            message: "Room ID must follow SYNC-XXXX format",
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Invalid request data",
                details: errors,
            },
        });
    }

    req.body.roomId = roomId.trim().toUpperCase();

    next();
};

export const validateRoomIdParam = (req, res, next) => {
    const { roomId } = req.params;

    if (
        !roomId ||
        !/^SYNC-[A-Z0-9]{4}$/.test(roomId.trim().toUpperCase())
    ) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Invalid room ID",
                details: [
                    {
                        field: "roomId",
                        message: "Room ID must follow SYNC-XXXX format",
                    },
                ],
            },
        });
    }

    req.params.roomId = roomId.trim().toUpperCase();

    next();
};