import { useSelector } from "react-redux";
import {
  fetchFollowedPosts,
  fetchGlobalPosts,
  selectAllPosts,
  selectFollowedPosts,
  selectStatus,
} from "../app/postSlice";
import { store, useAppDispatch } from "../app/store";
import { useEffect, useState } from "react";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import { Post } from "../api";
import PostListItem from "../components/postListItem";
import { Status } from "../util/types";

interface PostListProps {
  type: "all" | "user";
}

export default function PostList(props: PostListProps) {
  const dispatch = useAppDispatch();
  const followedPosts = useSelector(selectFollowedPosts);
  const globalPosts = useSelector(selectAllPosts);
  const status = useSelector(selectStatus);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    dispatch(fetchGlobalPosts());
    dispatch(fetchFollowedPosts());
  }, []);

  useEffect(() => {
    const postsToDisplay = props.type === "all" ? globalPosts : followedPosts;
    let sortedPosts: Post[] = [];

    if (postsToDisplay.length > 0) {
      sortedPosts = [...postsToDisplay].sort((a: Post, b: Post) => {
        return b.createdAt! > a.createdAt!
          ? 1
          : b.createdAt! < a.createdAt!
          ? -1
          : 0;
      });
    }
    setPosts(sortedPosts);
  }, [followedPosts, globalPosts, props.type]);

  return (
    <Box
      sx={{
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      {status === Status.loading ? (
        <CircularProgress />
      ) : (
        <>
          {props.type === "all" && (
            <List>
              {posts.map((post: Post) => (
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
                  <Typography
                    textAlign="center"
                    sx={{ color: "text.secondary" }}
                  >
                    There is no content here! Try following some users, or check
                    the global feed
                  </Typography>
                </Box>
              )}
            </List>
          )}
        </>
      )}
    </Box>
  );
}
