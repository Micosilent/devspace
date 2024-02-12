import { useSelector } from "react-redux";
import { getUsers, selectUsers } from "../app/usersSlice";
import React, { MouseEventHandler, useEffect } from "react";
import { useAppDispatch } from "../app/store";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { AppAvatar } from "../components/appAvatar";
import { useNavigate } from "react-router-dom";
import { matchSorter } from "match-sorter";

export default function Search() {
  const userList = useSelector(selectUsers);
  const [displayUserList, setDisplayUserList] = React.useState(userList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Dispatch the getUsers actions, and set it as the displayUserList
  // once on the first render

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setDisplayUserList(userList);
  }, [userList]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    if (searchValue === "") {
      setDisplayUserList(userList);
      return;
    }
    setDisplayUserList(
      matchSorter(userList, searchValue, { keys: ["firstName", "lastName"] })
    );
  };

  const handleClick: MouseEventHandler = (event) => {
    const userId = event.currentTarget.id;
    console.log("User Id from the search component: ", userId);
    navigate(`/user/${userId}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Paper sx={{ mb: "2rem" }}>
        <TextField
          sx={{ width: "100%" }}
          label="Search for a user..."
          onChange={handleSearchChange}
        />
      </Paper>
      <Paper>
        <List>
          {displayUserList.map((user) => (
            <Box key={user.id}>
              <ListItem key={user.id}>
                <Button
                  fullWidth
                  sx={{ textAlign: "start" }}
                  id={user.id?.toString()}
                  onClick={handleClick}
                >
                  <AppAvatar user={user} />
                  <ListItemText
                    sx={{ ml: "2rem" }}
                    primary={`${user.firstName} ${user.lastName}`}
                  />
                </Button>
              </ListItem>
              <Divider sx={{ mb: "0.3rem" }} />
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
