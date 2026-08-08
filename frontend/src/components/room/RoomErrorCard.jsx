import { Link, useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "../ui/Button";
import "./RoomErrorCard.css";

function RoomErrorCard({ title, description, primaryLabel, primaryTo, secondaryLabel, secondaryTo }) {
  const navigate = useNavigate();

  return (
    <div className="error-card">
      <div className="error-icon">
        <FiAlertTriangle size={40} />
      </div>
      <h1 className="error-title">{title}</h1>
      <p className="error-description">{description}</p>

      <div className="error-actions">
        <Button variant="primary" onClick={() => navigate(primaryTo)} className="error-btn">
          {primaryLabel}
        </Button>
        <Link to={secondaryTo} className="error-secondary-link">
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}

export default RoomErrorCard;