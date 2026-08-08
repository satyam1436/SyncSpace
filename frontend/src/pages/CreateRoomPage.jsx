import { useEffect } from "react";
import Card from "../components/ui/Card";
import CreateRoomForm from "../components/room/CreateRoomForm";
import "./CreateRoomPage.css";

// logout test
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function CreateRoomPage() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  // logout test
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="create-room-page">
      <Card>
        <h1 className="page-heading">Create a Room</h1>
        <p className="page-subtext">
          Set up a new collaborative session for your team.
        </p>

        {/* logout test */}
        <p>Welcome, {user?.name}</p>

        <CreateRoomForm />
        {/* logout test */}
        <button
          onClick={async () => {
            await logout();
            navigate("/login");
          }}
        >
          Logout
        </button>

      </Card>
    </div>
  );
}


export default CreateRoomPage;
