import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Tooltip } from "@mui/material";

export default function NotificationBell() {
  return (
    <Badge badgeContent={4} color="secondary">
      <Tooltip title="Notifications" >
        <NotificationsIcon />
      </Tooltip>
    </Badge>
  );
}
