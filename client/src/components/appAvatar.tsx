import { Avatar } from "@mui/material";
import { User, UserWithRelations } from "../api";

interface AppAvatarProps {
  user: User | UserWithRelations;
}

export function AppAvatar(props: AppAvatarProps) {
  return (
    <Avatar
      alt={`${props.user.firstName} ${props.user.lastName}`}
      src={`/images/${props.user.profilePictureId}`}
    />
  );
}
