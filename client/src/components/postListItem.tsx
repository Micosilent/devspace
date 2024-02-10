import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  ListItem,
  styled,
  Typography,
} from "@mui/material";
import { Post } from "../api";
import MessageIcon from "@mui/icons-material/Message";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";
import { likePost, unLikePost } from "../app/postSlice";
import { useAppDispatch } from "../app/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../app/loginSlice";

interface PostListItemProps {
  post: Post;
  postType: "all" | "user";
}

export default function PostListItem(props: PostListItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  // On component mount, set the number of likes
  // and whether the user has liked the post
  useEffect(() => {
    setNumberOfLikes(props.post.likedBy?.length || 0);
    setLiked(props.post.likedBy?.includes(userInfo) || false);
  }, []);

  const handleLike = () => {
    if (!liked) {
      // Instant feedback to the user
      setLiked(true);
      setNumberOfLikes(numberOfLikes + 1);
      // Dispatch the call to the API
      dispatch(likePost(props.post.id as number));
    }
    // If the user has already liked the post, unlike it
    else {
      setLiked(false);
      setNumberOfLikes(numberOfLikes - 1);

      dispatch(unLikePost(props.post.id as number));
    }
  };

  const handlePostClick = () => {
    navigate(`/post/${props.post.id}`);
  };
  const handleUserClick = () => {
    navigate(`/user/${props.post.createdBy?.id}`);
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "1rem",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Button onClick={handleUserClick} sx={{ textTransform: "none" }}>
        <Typography
          gutterBottom
          sx={{ textAlign: "left", width: "100%" }}
          variant="body2"
          component="div"
          color="text.secondary"
        >
          {props.post.createdBy?.firstName} {props.post.createdBy?.lastName}
        </Typography>
      </Button>
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardActionArea sx={{ mb: "0.8rem" }} onClick={handlePostClick}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.post.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {props.post.content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <StyledGrid item>
            <Button onClick={handleLike}>
              <StyledTypography variant="body2" color="text.secondary">
                {numberOfLikes}
              </StyledTypography>

              {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            </Button>
          </StyledGrid>
          <StyledGrid item>
            <Button onClick={handlePostClick}>
              <StyledTypography variant="body2" color="text.secondary">
                {props.post.comments?.length || 0}
              </StyledTypography>
              <MessageIcon />
            </Button>
          </StyledGrid>
        </Grid>
      </Card>
    </ListItem>
  );
}

const StyledGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "auto",
  marginBottom: "0.8rem",
  marginRight: "0.8rem",
});
const StyledTypography = styled(Typography)({
  padding: "0 0.5rem",
});
