import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import FeedIcon from "@mui/icons-material/Feed";
import GlobalIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomAppBar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setValue(location.pathname.replace("/", ""));
  }, [location]);

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
          value="feed"
          icon={<FeedIcon />}
          onClick={handleClick("feed")}
        />
        <BottomNavigationAction
          label="Global Feed"
          value="global"
          icon={<GlobalIcon />}
          onClick={handleClick("global")}
        />
        <BottomNavigationAction
          label="New Post"
          value="newpost"
          icon={<AddIcon />}
          onClick={handleClick("newpost")}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon />}
          onClick={handleClick("search")}
        />
      </BottomNavigation>
    </Paper>
  );
}
