import { Box, Checkbox, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectDarkMode,
  selectUserInfo,
  setDarkMode,
  updateMe,
} from "../app/loginSlice";
import { useAppDispatch } from "../app/store";
import { useEffect, useState } from "react";

export default function Settings() {
  const userInfo = useSelector(selectUserInfo);
  const darkModeState = useSelector(selectDarkMode);
  const dispatch = useAppDispatch();
  const [isPrivate, setIsPrivate] = useState(false);
  const [darkModeLocal, setDarkModeLocal] = useState(false);

  useEffect(() => {
    setIsPrivate(userInfo.isPrivate);
  }, [userInfo]);

  useEffect(() => {
    setDarkModeLocal(darkModeState);
  }, [darkModeState]);

  const handleDarkChange = () => {
    dispatch(setDarkMode(!darkModeLocal));
    localStorage.setItem("darkMode", darkModeLocal ? "false" : "true");
  };

  const handlePrivateChange = () => {
    dispatch(updateMe(!isPrivate));
  };

  return (
    <Box>
      <Box>
        <Checkbox checked={isPrivate} onChange={handlePrivateChange} /> Private
        profile
      </Box>

      <Divider />
      <Box>
        <Checkbox checked={darkModeLocal} onChange={handleDarkChange} /> Dark
        mode
      </Box>

      <Divider />
      <Box>
        <Typography variant="h4">More Settings</Typography>
        <Typography variant="body1">Coming soon...</Typography>
      </Box>
    </Box>
  );
}
