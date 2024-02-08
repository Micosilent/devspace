import { useSelector } from "react-redux";
import {
  fetchFollowedPosts,
  fetchGlobalPosts,
  selectAllPosts,
  selectFollowedPosts,
} from "../app/postSlice";
import { store, useAppDispatch } from "../app/store";
import { useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
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

  console.log(globalPosts);
  return (
    <>
      {props.type === "all" && (
        <List>
          {globalPosts.map((post: Post) => (
            <PostListItem post={post} key={post.id} />
          ))}
        </List>
      )}
      {props.type === "user" && <List></List>}
    </>
  );
}
