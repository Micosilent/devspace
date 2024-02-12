import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  commentAPost,
  deletePost,
  fetchAPost,
  selectAPost,
} from "../app/postSlice";
import { useAppDispatch } from "../app/store";
import { useEffect } from "react";
import React from "react";
import { Post } from "../api";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AppAvatar } from "../components/appAvatar";
import { selectUserInfo } from "../app/loginSlice";

export default function PostView() {
  const postId = useParams<{ id: string }>().id;
  const storePost = useSelector(selectAPost);
  const selfUser = useSelector(selectUserInfo);
  const [postToDisplay, setPostToDisplay] = React.useState<Post | null>(null);
  const [newComentText, setNewCommentText] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAPost(parseInt(postId!, 10)));
  }, []);

  useEffect(() => {
    setPostToDisplay(storePost);
  }, [storePost]);

  const handleCommentPost = () => {
    if (newComentText.length > 0) {
      dispatch(commentAPost(postToDisplay!.id!, newComentText));
      setNewCommentText("");
    }
  };

  const handleCancelComment = () => {
    setNewCommentText("");
  };

  const handleDeletePost = () => {
    dispatch(deletePost(postToDisplay!.id!));
    navigate("/global");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        margin: "auto",
        minWidth: "330px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Paper>
          <Box sx={{ margin: "1rem" }}>
            <Box
              sx={{ display: "flex", alignItems: "center", paddingTop: "1rem" }}
            >
              {postToDisplay?.createdBy && (
                <AppAvatar user={postToDisplay?.createdBy!} />
              )}
              <Typography
                variant="subtitle2"
                sx={{ mb: "0.2rem", ml: "0.3rem" }}
              >
                {postToDisplay?.createdBy?.firstName}{" "}
                {postToDisplay?.createdBy?.lastName}
              </Typography>
            </Box>
            <Divider sx={{ mb: "0.3rem" }} />
            <Typography variant="h4">{postToDisplay?.title}</Typography>
            <Typography variant="body1">{postToDisplay?.content}</Typography>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ width: "100%" }}>
        {postToDisplay?.createdBy?.id === selfUser?.id && (
          <Box>
            <Button onClick={() => navigate("edit")}>Edit</Button>
            <Button color="warning" onClick={handleDeletePost}>
              Delete
            </Button>
          </Box>
        )}
        <TextField
          label="Add a comment..."
          fullWidth
          multiline
          value={newComentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          InputProps={{
            endAdornment: (
              <>
                <Button
                  variant="contained"
                  onClick={handleCommentPost}
                  sx={{
                    display: `${newComentText.length > 0 ? "inherit" : "none"}`,
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancelComment}
                  sx={{
                    display: `${newComentText.length > 0 ? "inherit" : "none"}`,
                    ml: "0.5rem",
                  }}
                >
                  Cancel
                </Button>
              </>
            ),
          }}
          sx={{
            mb: "1rem",
          }}
        />
        <Box>
          {postToDisplay?.comments?.map((comment) => (
            <Paper>
              <Box sx={{ margin: "1rem" }}>
                <Box sx={{ display: "flex", mb: "0.3rem" }}>
                  <AppAvatar user={comment.createdBy!} small />
                  <Typography variant="subtitle2" sx={{ ml: "0.5rem" }}>
                    {comment.createdBy?.firstName} {comment.createdBy?.lastName}
                  </Typography>
                </Box>
                <Divider sx={{ mb: "0.3rem" }} />
                <Typography variant="body1">{comment.content}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
