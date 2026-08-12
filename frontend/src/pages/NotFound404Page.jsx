import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import RoomErrorCard from "../components/room/RoomErrorCard";
import "./NotFound404Page.css";

function NotFound404Page() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <div className="not-found-404-page">
      <div className="badge-404">404</div>
      <Card>
        <RoomErrorCard
          title="Page Not Found"
          description="The page or workspace route you are looking for does not exist."
          primaryLabel="Return to Safety (Home)"
          primaryTo="/"
          secondaryLabel="Go Back"
          onSecondaryClick={() => navigate(-1)}
        />
      </Card>
    </div>
  );
}

export default NotFound404Page;
