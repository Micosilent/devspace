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

export interface SideAppBarProps {
  drawerWidth: number;
}

export default function SideAppBar(props: SideAppBarProps) {
  const { drawerWidth } = props;
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
        <ListItem key={"myfeed"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary={"My feed"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"globalfeed"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GlobalIcon />
            </ListItemIcon>
            <ListItemText primary={"Global feed"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"newpost"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"New Post"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"search"} disablePadding>
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
