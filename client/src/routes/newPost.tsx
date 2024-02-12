import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../app/store";
import React, { useEffect } from "react";
import {
  createPost,
  selectAPost,
  updatePost,
} from "../app/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NewPost() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newPostText, setNewPostText] = React.useState("");
  const [newPostTitle, setNewPostTitle] = React.useState("");
  const aPost = useSelector(selectAPost);

  useEffect(() => {
    if (id) {
      setNewPostText(aPost.content);
      setNewPostTitle(aPost.title);
    }
  }, [aPost, id]);

  const handleCreatePost = () => {
    if (newPostText === "" || newPostTitle === "") return;

    dispatch(createPost(newPostTitle, newPostText));
    setNewPostText("");
    setNewPostTitle("");
    navigate("/global");
  };

  const handleUpdatePost = () => {
    if (newPostText === "" || newPostTitle === "") return;
    if (!id) return;

    dispatch(updatePost(parseInt(id), newPostTitle, newPostText));
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
      {id ? (
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleUpdatePost}
        >
          Update
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreatePost}
        >
          Create
        </Button>
      )}
    </Box>
  );
}
