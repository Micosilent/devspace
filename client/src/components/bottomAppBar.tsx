import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import FeedIcon from "@mui/icons-material/Feed";
import GlobalIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function BottomAppBar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleClick = (to: string) => () => {
    navigate(to);
  };
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
        <BottomNavigationAction
          label="My Feed"
          icon={<FeedIcon />}
          onClick={handleClick("feed")}
        />
        <BottomNavigationAction
          label="Global Feed"
          icon={<GlobalIcon />}
          onClick={handleClick("global")}
        />
        <BottomNavigationAction
          label="New Post"
          icon={<AddIcon />}
          onClick={handleClick("newpost")}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          onClick={handleClick("search")}
        />
      </BottomNavigation>
    </Paper>
  );
}
