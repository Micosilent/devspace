import {
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
  const [liked, setLiked] = useState(
    props.post.likedBy?.some((user) => user.id === userInfo.id) || false
  );
  const [numberOfLikes, setNumberOfLikes] = useState(
    props.post.likedBy?.length || 0
  );

  useEffect(() => {
    setLiked(
      props.post.likedBy?.some((user) => user.id === userInfo.id) || false
    );
    setNumberOfLikes(props.post.likedBy?.length || 0);
  }, [props.post.likedBy, userInfo.id]);

  const handleLike = () => {
    if (!liked) {
      setNumberOfLikes(numberOfLikes + 1);
      dispatch(likePost(props.post.id as number));
    }
    // If the user has already liked the post, unlike it
    else {
      setNumberOfLikes(numberOfLikes - 1);
      dispatch(unLikePost(props.post.id as number));
    }
    setLiked((prevState) => !prevState);
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
      <Button
        onClick={handleUserClick}
        sx={{
          textTransform: "none",
          display: `${props.postType === "user" ? "none" : "block"}`,
        }}
      >
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
