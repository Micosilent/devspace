import {
  Box,
  Button,
  CircularProgress,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { AppAvatar } from "../components/appAvatar";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import {
  followUser,
  getUserWithRelations,
  selectAUser,
  selectStatus,
  unFollowUser,
} from "../app/usersSlice";
import { useEffect } from "react";
import { selectUserInfo } from "../app/loginSlice";
import PostListItem from "../components/postListItem";
import { Post, UserWithRelations } from "../api";
import React from "react";
import { Status } from "../util/types";

export interface ProfileProps {
  selfProfile?: boolean;
}

export default function Profile(props: ProfileProps) {
  const userId = useParams<{ id: string }>().id;
  const [userToDisplay, setUserToDisplay] =
    React.useState<UserWithRelations | null>();
  const aUser = useSelector(selectAUser);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const status = useSelector(selectStatus);
  const selfUser = useSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!props.selfProfile && userId) {
      dispatch(getUserWithRelations(parseInt(userId, 10)));
    } else {
      dispatch(getUserWithRelations(selfUser.id));
    }
  }, []);

  useEffect(() => {
    setUserToDisplay(aUser);
    if (!props.selfProfile) {
      setIsFollowed(
        aUser?.followers?.some((user) => user.id === selfUser.id) || false
      );
    }
  }, [aUser, props.selfProfile, selfUser.id]);

  const handleFollow = () => {
    if (isFollowed) {
      dispatch(unFollowUser(userToDisplay!.id!));
    } else {
      dispatch(followUser(userToDisplay!.id!));
    }
    setIsFollowed((prevState) => !prevState);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {status === Status.loading && (
          <>
            <Typography variant="h3">Loading...</Typography>
            <CircularProgress />
          </>
        )}
        {userToDisplay && status === Status.idle && (
          <>
            <Paper
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    padding: "1rem 1rem",
                  }}
                >
                  <AppAvatar user={userToDisplay!} />
                  <Typography variant="h4" sx={{ ml: "0.8rem" }}>
                    {userToDisplay?.firstName} {userToDisplay?.lastName}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", padding: "1rem 1rem" }}>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      sx={{ ml: "0.8rem", mr: "0.5rem" }}
                    >
                      Following:
                    </Typography>
                    <Typography variant="h6">
                      {userToDisplay?.followed?.length || 0}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      sx={{ ml: "0.8rem", mr: "0.5rem" }}
                    >
                      Followers:{" "}
                    </Typography>
                    <Typography variant="h6">
                      {userToDisplay?.followers?.length || 0}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: `${props.selfProfile ? "none" : "initial"}`,
                      ml: "0.8rem",
                    }}
                  >
                    <Button
                      variant={isFollowed ? "outlined" : "contained"}
                      onClick={handleFollow}
                    >
                      {isFollowed ? "Unfollow" : "Follow"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
            <Box
              sx={{
                width: "75%",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <List>
                {userToDisplay!.posts?.map((post: Post) => (
                  <PostListItem post={post} postType="user" key={post.id} />
                )) || (
                  <Typography variant="h3">
                    This user has no posts yet!
                  </Typography>
                )}
              </List>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
