import { useEffect, useRef, useState } from "react";

import {
    FaMousePointer,
    FaPen,
    FaSquare,
    FaCircle,
    FaStickyNote,
    FaFont,
    FaEraser,
    FaSearchPlus,
    FaSearchMinus,
    FaUndo,
    FaRedo,
} from "react-icons/fa";

import {
    Stage,
    Layer,
    Line,
    Rect,
    Circle,
    Text,
} from "react-konva";

import "./WhiteboardPlaceholder.css";
import { socket } from "../../socket/socket";

const tools = [
    {
        id: "select",
        label: "Select",
        icon: FaMousePointer,
    },
    {
        id: "pen",
        label: "Pen",
        icon: FaPen,
    },
    {
        id: "rectangle",
        label: "Rectangle",
        icon: FaSquare,
    },
    {
        id: "circle",
        label: "Circle",
        icon: FaCircle,
    },
    {
        id: "sticky",
        label: "Sticky Note",
        icon: FaStickyNote,
    },
    {
        id: "text",
        label: "Text",
        icon: FaFont,
    },
    {
        id: "eraser",
        label: "Eraser",
        icon: FaEraser,
    },
];

function WhiteboardPlaceholder({ roomId }) {
    const stageContainerRef =
        useRef(null);

    const stageRef =
        useRef(null);

    const currentLineRef =
        useRef(null);

    const [activeTool, setActiveTool] =
        useState("select");

    const [zoom, setZoom] =
        useState(100);

    const [lines, setLines] =
        useState([]);

    const [rectangles, setRectangles] =
        useState([]);

    const [circles, setCircles] =
        useState([]);

    const [texts, setTexts] =
        useState([]);

    const [isDrawing, setIsDrawing] =
        useState(false);

    const [stageSize, setStageSize] =
        useState({
            width: 800,
            height: 600,
        });

    /* =========================================
       RESIZE CANVAS
    ========================================= */

    useEffect(() => {
        const updateSize = () => {
            if (
                !stageContainerRef.current
            ) {
                return;
            }

            setStageSize({
                width:
                    stageContainerRef
                        .current
                        .clientWidth,

                height:
                    stageContainerRef
                        .current
                        .clientHeight,
            });
        };

        updateSize();

        window.addEventListener(
            "resize",
            updateSize
        );

        return () => {
            window.removeEventListener(
                "resize",
                updateSize
            );
        };
    }, []);

    /* =========================================
       RECEIVE WHITEBOARD UPDATES
    ========================================= */

    useEffect(() => {
        if (!roomId) {
            return;
        }

        const handleWhiteboardUpdate = (
            data
        ) => {
            if (!data) {
                return;
            }

            if (data.type === "line") {
                setLines((prev) => [
                    ...prev,
                    data.item,
                ]);
            }

            if (
                data.type ===
                "rectangle"
            ) {
                setRectangles((prev) => [
                    ...prev,
                    data.item,
                ]);
            }

            if (data.type === "circle") {
                setCircles((prev) => [
                    ...prev,
                    data.item,
                ]);
            }

            if (data.type === "text") {
                setTexts((prev) => [
                    ...prev,
                    data.item,
                ]);
            }
        };

        socket.on(
            "whiteboard-update",
            handleWhiteboardUpdate
        );

        return () => {
            socket.off(
                "whiteboard-update",
                handleWhiteboardUpdate
            );
        };
    }, [roomId]);

    /* =========================================
       POINTER POSITION
    ========================================= */

    const getPointerPosition = () => {
        const stage =
            stageRef.current;

        if (!stage) {
            return null;
        }

        return stage.getPointerPosition();
    };

    /* =========================================
       START DRAWING
    ========================================= */

    const handleMouseDown = () => {
        if (
            activeTool !== "pen" &&
            activeTool !== "eraser"
        ) {
            return;
        }

        const position =
            getPointerPosition();

        if (!position) {
            return;
        }

        const newLine = {
            id:
                `${socket.id}-${Date.now()}`,

            points: [
                position.x,
                position.y,
            ],

            color:
                activeTool === "eraser"
                    ? "#020617"
                    : "#f8fafc",

            strokeWidth:
                activeTool === "eraser"
                    ? 14
                    : 3,

            tool: activeTool,
        };

        currentLineRef.current =
            newLine;

        setIsDrawing(true);

        setLines((prev) => [
            ...prev,
            newLine,
        ]);
    };

    /* =========================================
       DRAW
    ========================================= */

    const handleMouseMove = () => {
        if (
            !isDrawing ||
            !currentLineRef.current
        ) {
            return;
        }

        const position =
            getPointerPosition();

        if (!position) {
            return;
        }

        const updatedLine = {
            ...currentLineRef.current,

            points: [
                ...currentLineRef.current
                    .points,

                position.x,
                position.y,
            ],
        };

        currentLineRef.current =
            updatedLine;

        setLines((prev) => {
            if (prev.length === 0) {
                return prev;
            }

            const updated = [
                ...prev,
            ];

            updated[
                updated.length - 1
            ] = updatedLine;

            return updated;
        });
    };

    /* =========================================
       FINISH DRAWING
    ========================================= */

    const handleMouseUp = () => {
        if (
            !isDrawing ||
            !currentLineRef.current
        ) {
            return;
        }

        setIsDrawing(false);

        const completedLine =
            currentLineRef.current;

        if (roomId) {
            socket.emit(
                "whiteboard-draw",
                {
                    roomId,
                    type: "line",
                    item: completedLine,
                }
            );
        }

        currentLineRef.current =
            null;
    };

    /* =========================================
       CREATE SHAPES / TEXT
    ========================================= */

    const handleCanvasClick = () => {
        const position =
            getPointerPosition();

        if (!position || !roomId) {
            return;
        }

        if (
            activeTool ===
            "rectangle"
        ) {
            const rectangle = {
                id:
                    `${socket.id}-${Date.now()}`,

                x:
                    position.x - 60,

                y:
                    position.y - 40,

                width: 120,
                height: 80,
            };

            setRectangles((prev) => [
                ...prev,
                rectangle,
            ]);

            socket.emit(
                "whiteboard-draw",
                {
                    roomId,
                    type: "rectangle",
                    item: rectangle,
                }
            );
        }

        if (
            activeTool === "circle"
        ) {
            const circle = {
                id:
                    `${socket.id}-${Date.now()}`,

                x: position.x,
                y: position.y,
                radius: 45,
            };

            setCircles((prev) => [
                ...prev,
                circle,
            ]);

            socket.emit(
                "whiteboard-draw",
                {
                    roomId,
                    type: "circle",
                    item: circle,
                }
            );
        }

        if (
            activeTool === "text"
        ) {
            const text = {
                id:
                    `${socket.id}-${Date.now()}`,

                x: position.x,
                y: position.y,

                text: "SyncSpace",

                fontSize: 20,
            };

            setTexts((prev) => [
                ...prev,
                text,
            ]);

            socket.emit(
                "whiteboard-draw",
                {
                    roomId,
                    type: "text",
                    item: text,
                }
            );
        }
    };

    /* =========================================
       ZOOM
    ========================================= */

    const increaseZoom = () => {
        setZoom((value) =>
            Math.min(
                value + 10,
                200
            )
        );
    };

    const decreaseZoom = () => {
        setZoom((value) =>
            Math.max(
                value - 10,
                50
            )
        );
    };

    return (
        <section className="whiteboard-placeholder">

            {/* Toolbar */}
            <div className="whiteboard-toolbar">

                <div className="whiteboard-tool-group">

                    {tools.map((tool) => {
                        const Icon =
                            tool.icon;

                        return (
                            <button
                                type="button"
                                key={tool.id}
                                className={`whiteboard-tool ${activeTool ===
                                        tool.id
                                        ? "active"
                                        : ""
                                    }`}
                                title={
                                    tool.label
                                }
                                aria-label={
                                    tool.label
                                }
                                onClick={() =>
                                    setActiveTool(
                                        tool.id
                                    )
                                }
                            >
                                <Icon />
                            </button>
                        );
                    })}

                </div>

                <div className="whiteboard-tool-group">

                    <button
                        type="button"
                        className="whiteboard-tool"
                        title="Undo"
                        aria-label="Undo"
                    >
                        <FaUndo />
                    </button>

                    <button
                        type="button"
                        className="whiteboard-tool"
                        title="Redo"
                        aria-label="Redo"
                    >
                        <FaRedo />
                    </button>

                </div>

                <div className="whiteboard-zoom-controls">

                    <button
                        type="button"
                        className="whiteboard-tool"
                        onClick={
                            decreaseZoom
                        }
                        title="Zoom out"
                        aria-label="Zoom out"
                    >
                        <FaSearchMinus />
                    </button>

                    <span>
                        {zoom}%
                    </span>

                    <button
                        type="button"
                        className="whiteboard-tool"
                        onClick={
                            increaseZoom
                        }
                        title="Zoom in"
                        aria-label="Zoom in"
                    >
                        <FaSearchPlus />
                    </button>

                </div>

            </div>

            {/* Canvas */}
            <div
                ref={
                    stageContainerRef
                }
                className="whiteboard-canvas"
            >

                <div className="whiteboard-grid" />

                <Stage
                    ref={stageRef}
                    width={
                        stageSize.width
                    }
                    height={
                        stageSize.height
                    }
                    scaleX={
                        zoom / 100
                    }
                    scaleY={
                        zoom / 100
                    }
                    onMouseDown={
                        handleMouseDown
                    }
                    onMousemove={
                        handleMouseMove
                    }
                    onMouseup={
                        handleMouseUp
                    }
                    onClick={
                        handleCanvasClick
                    }
                >

                    <Layer>

                        {/* Lines */}
                        {lines.map(
                            (line) => (
                                <Line
                                    key={
                                        line.id
                                    }
                                    points={
                                        line.points
                                    }
                                    stroke={
                                        line.color
                                    }
                                    strokeWidth={
                                        line.strokeWidth
                                    }
                                    lineCap="round"
                                    lineJoin="round"
                                    tension={
                                        0.5
                                    }
                                />
                            )
                        )}

                        {/* Rectangles */}
                        {rectangles.map(
                            (
                                rectangle
                            ) => (
                                <Rect
                                    key={
                                        rectangle.id
                                    }
                                    x={
                                        rectangle.x
                                    }
                                    y={
                                        rectangle.y
                                    }
                                    width={
                                        rectangle.width
                                    }
                                    height={
                                        rectangle.height
                                    }
                                    stroke="#3b82f6"
                                    strokeWidth={
                                        2
                                    }
                                />
                            )
                        )}

                        {/* Circles */}
                        {circles.map(
                            (circle) => (
                                <Circle
                                    key={
                                        circle.id
                                    }
                                    x={
                                        circle.x
                                    }
                                    y={
                                        circle.y
                                    }
                                    radius={
                                        circle.radius
                                    }
                                    stroke="#8b5cf6"
                                    strokeWidth={
                                        2
                                    }
                                />
                            )
                        )}

                        {/* Text */}
                        {texts.map(
                            (text) => (
                                <Text
                                    key={
                                        text.id
                                    }
                                    x={
                                        text.x
                                    }
                                    y={
                                        text.y
                                    }
                                    text={
                                        text.text
                                    }
                                    fontSize={
                                        text.fontSize
                                    }
                                    fill="#f8fafc"
                                    fontStyle="bold"
                                />
                            )
                        )}

                    </Layer>

                </Stage>

            </div>

        </section>
    );
}

export default WhiteboardPlaceholder;