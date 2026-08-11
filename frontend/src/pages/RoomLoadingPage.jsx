import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RoomLoadingPage.css";

function RoomLoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const roomCode = location.state?.roomCode || "Unknown Room";

  useEffect(() => {
    document.body.style.overflow = "auto";

    // Simulate session initialization (dummy timeout, per SRS - no real backend calls)
    const timer = setTimeout(() => {
      navigate("/room-not-found");
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "hidden";
    };
  }, [navigate]);

  return (
    <div className="room-loading-page">
      <div className="spinner-ring"></div>
      <p className="loading-status">Setting up your collaboration space...</p>
      <p className="loading-subtext">Room: {roomCode}</p>
    </div>
  );
}

export default RoomLoadingPage;