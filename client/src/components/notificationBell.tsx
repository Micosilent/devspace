import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotificationBell() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/notifications");
  };
  return (
    <Badge badgeContent={0} color="secondary">
      <Tooltip title="Notifications">
        <NotificationsIcon onClick={handleClick} />
      </Tooltip>
    </Badge>
  );
}
