import { useEffect } from "react";
import Card from "../components/ui/Card";
import JoinRoomForm from "../components/room/JoinRoomForm";
import "./JoinRoomPage.css";

function JoinRoomPage() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <div className="join-room-page">
      <Card>
        <h1 className="page-heading">Join a Room</h1>
        <p className="page-subtext">
          Enter your room code to join an existing collaborative session.
        </p>
        <JoinRoomForm />
      </Card>
    </div>
  );
}

export default JoinRoomPage;