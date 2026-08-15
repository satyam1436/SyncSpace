// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import {
//     FaChevronDown,
//     FaCopy,
//     FaSignOutAlt,
//     FaUserCircle,
// } from "react-icons/fa";

// import "./TopNav.css";

// function TopNav({
//     activeMode,
//     onModeChange,
//     roomId,
//     roomName,
//     participantCount,
// }) {
//     const navigate = useNavigate();
//     const { logout } = useAuth();

//     const [copied, setCopied] = useState(false);
//     const [isProfileOpen, setIsProfileOpen] = useState(false);

//     const profileRef = useRef(null);


//     useEffect(() => {
//         const handleOutsideClick = (event) => {
//             if (
//                 profileRef.current &&
//                 !profileRef.current.contains(event.target)
//             ) {
//                 setIsProfileOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleOutsideClick);

//         return () => {
//             document.removeEventListener(
//                 "mousedown",
//                 handleOutsideClick
//             );
//         };
//     }, []);

//     const handleCopyRoomId = async () => {
//         try {
//             await navigator.clipboard.writeText(roomId);

//             setCopied(true);

//             setTimeout(() => {
//                 setCopied(false);
//             }, 1500);
//         } catch (error) {
//             console.error("Failed to copy room ID:", error);
//         }
//     };

//     const handleLeaveRoom = async () => {
//         try {
//             await logout();
//         } catch (error) {
//             console.error("Logout failed:", error);
//         } finally {
//             navigate("/");
//         }
//     };

//     return (
//         <header className="top-nav">
//             {/* Brand */}
//             <div className="top-nav-brand">
//                 <div className="top-nav-logo">S</div>

//                 <span className="top-nav-title">
//                     SyncSpace
//                 </span>
//             </div>

//             {/* Room Information */}
//             <div className="top-nav-room">
//                 <span className="top-nav-room-name">
//                     {roomName}
//                 </span>

//                 <span className="top-nav-room-id">
//                     {roomId}
//                 </span>

//                 <button
//                     type="button"
//                     className="top-nav-copy-button"
//                     onClick={handleCopyRoomId}
//                     aria-label={
//                         copied
//                             ? "Room ID copied"
//                             : "Copy room ID"
//                     }
//                 >
//                     <FaCopy />

//                     {copied ? "Copied!" : "Copy"}
//                 </button>

//                 <span className="top-nav-live-status">
//                     <span className="top-nav-live-dot" />

//                     Live · {participantCount} Users
//                 </span>
//             </div>

//             {/* Mode Switcher */}
//             <div
//                 className="top-nav-mode-switcher"
//                 role="tablist"
//                 aria-label="Workspace view mode"
//             >
//                 <button
//                     type="button"
//                     role="tab"
//                     aria-selected={activeMode === "code"}
//                     className={`top-nav-mode ${activeMode === "code" ? "active" : ""
//                         }`}
//                     onClick={() => onModeChange("code")}
//                 >
//                     Code
//                 </button>

//                 <button
//                     type="button"
//                     role="tab"
//                     aria-selected={activeMode === "whiteboard"}
//                     className={`top-nav-mode ${activeMode === "whiteboard"
//                         ? "active"
//                         : ""
//                         }`}
//                     onClick={() => onModeChange("whiteboard")}
//                 >
//                     Whiteboard
//                 </button>

//                 <button
//                     type="button"
//                     role="tab"
//                     aria-selected={activeMode === "split"}
//                     className={`top-nav-mode ${activeMode === "split" ? "active" : ""
//                         }`}
//                     onClick={() => onModeChange("split")}
//                 >
//                     Split
//                 </button>
//             </div>

//             {/* Profile */}
//             <div
//                 className="top-nav-profile"
//                 ref={profileRef}
//             >
//                 <button
//                     type="button"
//                     className="top-nav-profile-button"
//                     onClick={() =>
//                         setIsProfileOpen((prev) => !prev)
//                     }
//                     aria-expanded={isProfileOpen}
//                     aria-label="Open profile menu"
//                 >
//                     <div className="top-nav-avatar">
//                         SK

//                         <span className="top-nav-online-dot" />
//                     </div>

//                     <div className="top-nav-user-info">
//                         <span className="top-nav-user-name">
//                             Satyam Kumar
//                         </span>

//                         <span className="top-nav-user-role">
//                             HOST
//                         </span>
//                     </div>

//                     <FaChevronDown />
//                 </button>

//                 {isProfileOpen && (
//                     <div className="top-nav-profile-menu">
//                         <div className="profile-menu-user">
//                             <FaUserCircle />

//                             <div>
//                                 <strong>Satyam Kumar</strong>
//                                 <span>Host</span>
//                             </div>
//                         </div>

//                         <div className="profile-menu-divider" />

//                         <button
//                             type="button"
//                             className="profile-menu-leave"
//                             onClick={handleLeaveRoom}
//                         >
//                             <FaSignOutAlt />
//                             Leave Room
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </header>
//     );
// }

// export default TopNav;


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {
    FaChevronDown,
    FaCopy,
    FaSignOutAlt,
    FaUserCircle,
} from "react-icons/fa";

import "./TopNav.css";

function TopNav({
    activeMode,
    onModeChange,
    roomId,
    roomName,
    participantCount,
}) {
    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();

    const [copied, setCopied] =
        useState(false);

    const [isProfileOpen, setIsProfileOpen] =
        useState(false);

    const profileRef = useRef(null);

    const userName =
        user?.name ||
        user?.username ||
        user?.fullName ||
        "User";

    const userInitials = userName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    useEffect(() => {
        const handleOutsideClick = (
            event
        ) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target
                )
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    const handleCopyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(
                roomId
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (error) {
            console.error(
                "Failed to copy room ID:",
                error
            );
        }
    };

    const handleLeaveRoom = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );
        } finally {
            navigate("/");
        }
    };

    return (
        <header className="top-nav">
            {/* Brand */}
            <div className="top-nav-brand">
                <div className="top-nav-logo">
                    S
                </div>

                <span className="top-nav-title">
                    SyncSpace
                </span>
            </div>

            {/* Room Information */}
            <div className="top-nav-room">
                <span className="top-nav-room-name">
                    {roomName}
                </span>

                <span className="top-nav-room-id">
                    {roomId}
                </span>

                <button
                    type="button"
                    className="top-nav-copy-button"
                    onClick={
                        handleCopyRoomId
                    }
                    aria-label={
                        copied
                            ? "Room ID copied"
                            : "Copy room ID"
                    }
                >
                    <FaCopy />

                    {copied
                        ? "Copied!"
                        : "Copy"}
                </button>

                <span className="top-nav-live-status">
                    <span className="top-nav-live-dot" />

                    Live ·{" "}
                    {participantCount} Users
                </span>
            </div>

            {/* Mode Switcher */}
            <div
                className="top-nav-mode-switcher"
                role="tablist"
                aria-label="Workspace view mode"
            >
                <button
                    type="button"
                    role="tab"
                    aria-selected={
                        activeMode === "code"
                    }
                    className={`top-nav-mode ${activeMode === "code"
                            ? "active"
                            : ""
                        }`}
                    onClick={() =>
                        onModeChange("code")
                    }
                >
                    Code
                </button>

                <button
                    type="button"
                    role="tab"
                    aria-selected={
                        activeMode ===
                        "whiteboard"
                    }
                    className={`top-nav-mode ${activeMode ===
                            "whiteboard"
                            ? "active"
                            : ""
                        }`}
                    onClick={() =>
                        onModeChange(
                            "whiteboard"
                        )
                    }
                >
                    Whiteboard
                </button>

                <button
                    type="button"
                    role="tab"
                    aria-selected={
                        activeMode === "split"
                    }
                    className={`top-nav-mode ${activeMode === "split"
                            ? "active"
                            : ""
                        }`}
                    onClick={() =>
                        onModeChange("split")
                    }
                >
                    Split
                </button>
            </div>

            {/* Profile */}
            <div
                className="top-nav-profile"
                ref={profileRef}
            >
                <button
                    type="button"
                    className="top-nav-profile-button"
                    onClick={() =>
                        setIsProfileOpen(
                            (prev) => !prev
                        )
                    }
                    aria-expanded={
                        isProfileOpen
                    }
                    aria-label="Open profile menu"
                >
                    <div className="top-nav-avatar">
                        {userInitials}

                        <span className="top-nav-online-dot" />
                    </div>

                    <div className="top-nav-user-info">
                        <span className="top-nav-user-name">
                            {userName}
                        </span>

                        <span className="top-nav-user-role">
                            HOST
                        </span>
                    </div>

                    <FaChevronDown />
                </button>

                {isProfileOpen && (
                    <div className="top-nav-profile-menu">
                        <div className="profile-menu-user">
                            <FaUserCircle />

                            <div>
                                <strong>
                                    {userName}
                                </strong>

                                <span>
                                    Host
                                </span>
                            </div>
                        </div>

                        <div className="profile-menu-divider" />

                        <button
                            type="button"
                            className="profile-menu-leave"
                            onClick={
                                handleLeaveRoom
                            }
                        >
                            <FaSignOutAlt />
                            Leave Room
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default TopNav;