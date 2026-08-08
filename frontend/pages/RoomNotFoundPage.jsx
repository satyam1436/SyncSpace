import { useEffect } from "react";
import Card from "../components/ui/Card";
import RoomErrorCard from "../components/room/RoomErrorCard";
import "./RoomNotFoundPage.css";

function RoomNotFoundPage() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <div className="room-not-found-page">
      <Card>
        <RoomErrorCard
          title="Room Not Found"
          description="The room code you entered is incorrect, expired, or the room has been closed. Please check the code and try again."
          primaryLabel="Try Joining Again"
          primaryTo="/join-room"
          secondaryLabel="Back to Home"
          secondaryTo="/"
        />
      </Card>
    </div>
  );
}

export default RoomNotFoundPage;