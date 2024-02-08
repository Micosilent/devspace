import { ListItem, ListItemText } from "@mui/material";
import { Post } from "../api";

interface PostListItemProps {
  post: Post;
}

export default function PostListItem(props: PostListItemProps) {
  console.log(props.post);

  return (
    <ListItem>
      <ListItemText
        primary={props.post.title}
        secondary={`${props.post.createdBy?.firstName} ${props.post.createdBy?.lastName}`}
      />
    </ListItem>
  );
}
