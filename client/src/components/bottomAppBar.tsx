import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import FeedIcon from "@mui/icons-material/Feed";
import GlobalIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export default function BottomAppBar() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={8}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="My Feed" icon={<FeedIcon />} />
        <BottomNavigationAction label="Global Feed" icon={<GlobalIcon />} />
        <BottomNavigationAction label="New Post" icon={<AddIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
