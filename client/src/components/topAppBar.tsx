import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationBell from "./notificationBell";
import {useSelector} from "react-redux";
import { postLogout, selectUserInfo } from "../app/loginSlice";
import { useAppDispatch } from "../app/store";
import { AppAvatar } from "./appAvatar";

interface TopAppBarProps {
  height: number;
}

function TopAppBar(props: TopAppBarProps) {
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(postLogout());
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="absolute"
      sx={{ zIndex: 1600, height: `${props.height}px` }}
    >
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            marginLeft: "1rem",
            mr: 2,
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          DevSpace
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "right",
            padding: "1rem",
          }}
        >
          <NotificationBell />
        </Box>

        <Box sx={{ flexGrow: 0, mr: "2rem" }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AppAvatar user={userInfo} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{"Profile"}</Typography>
            </MenuItem>
            <MenuItem key={"settings"} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{"Settings"}</Typography>
            </MenuItem>
            <MenuItem key={"logout"} onClick={handleLogout}>
              <Typography textAlign="center">{"Logout"}</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default TopAppBar;
