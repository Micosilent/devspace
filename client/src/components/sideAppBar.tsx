import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import FeedIcon from "@mui/icons-material/Feed";
import GlobalIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

export interface SideAppBarProps {
  drawerWidth: number;
}

export default function SideAppBar(props: SideAppBarProps) {
  const { drawerWidth } = props;
  const navigate = useNavigate();

  const handleClick = (to: string) => () => {
    navigate(to);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />

      <Divider />
      <List>
        <ListItem key={"myfeed"} disablePadding onClick={handleClick("feed")}>
          <ListItemButton>
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary={"My feed"} />
          </ListItemButton>
        </ListItem>

        <ListItem
          key={"globalfeed"}
          disablePadding
          onClick={handleClick("global")}
        >
          <ListItemButton>
            <ListItemIcon>
              <GlobalIcon />
            </ListItemIcon>
            <ListItemText primary={"Global feed"} />
          </ListItemButton>
        </ListItem>

        <ListItem
          key={"newpost"}
          disablePadding
          onClick={handleClick("newpost")}
        >
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"New Post"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"search"} disablePadding onClick={handleClick("search")}>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Search"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
