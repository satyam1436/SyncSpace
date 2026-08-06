import Card from "../components/ui/Card";
import CreateRoomForm from "../components/room/CreateRoomForm";
import "./CreateRoomPage.css";

function CreateRoomPage() {
  return (
    <div className="create-room-page">
      <Card>
        <h1 className="page-heading">Create a Room</h1>
        <p className="page-subtext">
          Set up a new collaborative session for your team.
        </p>
        <CreateRoomForm />
      </Card>
    </div>
  );
}

export default CreateRoomPage;