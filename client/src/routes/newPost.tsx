import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../app/store";
import React from "react";
import { createPost } from "../app/postSlice";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newPostText, setNewPostText] = React.useState("");
  const [newPostTitle, setNewPostTitle] = React.useState("");

  const handleCreatePost = () => {
    if (newPostText === "" || newPostTitle === "") return;

    dispatch(createPost(newPostTitle, newPostText));
    setNewPostText("");
    setNewPostTitle("");
    navigate("/global");
  };

  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Share your thoughts!
      </Typography>
      <TextField
        label="Title"
        value={newPostTitle}
        multiline
        onChange={(e) => setNewPostTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Post"
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
        multiline
        rows={4}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" fullWidth onClick={handleCreatePost}>
        Post
      </Button>
    </Box>
  );
}
