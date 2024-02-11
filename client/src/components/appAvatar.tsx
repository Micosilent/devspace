import { Avatar } from "@mui/material";
import { User, UserWithRelations } from "../api";

interface AppAvatarProps {
  user: User | UserWithRelations;
  small?: boolean;
}

export function AppAvatar(props: AppAvatarProps) {
  return (
    <Avatar
      alt={`${props.user.firstName} ${props.user.lastName}`}
      src={`/images/${props.user.profilePictureId}`}
      sx={{
        width: props.small ? "24px" : "42px",
        height: props.small ? "24px" : "42px",
      }}
    />
  );
}
