import { useSelector } from "react-redux";
import {
  fetchFollowedPosts,
  fetchGlobalPosts,
  selectAllPosts,
  selectFollowedPosts,
} from "../app/postSlice";
import {  useAppDispatch } from "../app/store";
import { useEffect } from "react";
import { Box, List, Typography } from "@mui/material";
import { Post } from "../api";
import PostListItem from "../components/postListItem";

interface PostListProps {
  type: "all" | "user";
}

export default function PostList(props: PostListProps) {
  const dispatch = useAppDispatch();
  const followedPosts = useSelector(selectFollowedPosts);
  const globalPosts = useSelector(selectAllPosts);

  useEffect(() => {
    if (props.type === "all") dispatch(fetchGlobalPosts());
    if (props.type === "user") dispatch(fetchFollowedPosts());
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      {props.type === "all" && (
        <List>
          {globalPosts.map((post: Post) => (
            <PostListItem post={post} postType="all" key={post.id} />
          ))}
        </List>
      )}
      {props.type === "user" && (
        <List>
          {followedPosts.map((post: Post) => (
            <PostListItem post={post} postType="user" key={post.id} />
          ))}
          {followedPosts.length === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{ color: "text.secondary", mb: "2rem" }}
              >
                Whops!
              </Typography>
              <Typography textAlign="center" sx={{ color: "text.secondary" }}>
                There is no content here! Try following some users, or check the
                global feed
              </Typography>
            </Box>
          )}
        </List>
      )}
    </Box>
  );
}
