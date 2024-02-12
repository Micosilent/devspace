import { useSelector } from "react-redux";
import { selectUserInfo } from "../app/loginSlice";
import { Box, List, ListItem, Paper } from "@mui/material";

export default function ANotification() {
  const userInfo = useSelector(selectUserInfo);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List sx={{ width: "100%" }}>
        {userInfo.notifications.length === 0 ? (
          <ListItem sx={{ width: "100%" }}>No notifications</ListItem>
        ) : (
          userInfo.notifications.map((notification: any) => (
            <ListItem key={notification.id} sx={{ width: "100%" }}>
              <Paper
                sx={{
                  width: "100%",
                  margin: "1rem",
                  padding: "0.2rem 1rem 0.2rem 1rem",
                }}
              >
                {notification.message}
              </Paper>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
