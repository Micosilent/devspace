import { Store, createSlice } from "@reduxjs/toolkit";
import { Configuration, Post, PostsApi } from "../api";
import { Status } from "../util/types";
import { store } from "./store";

interface postSlice {
  status: Status;
  followedPosts: Post[];
  globalPosts: Post[];
}

const initialState: postSlice = {
  status: Status.idle,
  followedPosts: [],
  globalPosts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setFollowedPosts: (state, action) => {
      state.followedPosts = action.payload;
    },
    setGlobalPosts: (state, action) => {
      state.globalPosts = action.payload;
    },
  },
});

export const fetchFollowedPosts = () => async (dispatch: any) => {
  const postApi = createApi(store);

  dispatch(setStatus(Status.loading));
  const response = await postApi.getFollowedPosts();
  dispatch(setFollowedPosts(response.data));
  dispatch(setStatus(Status.idle));
};

export const fetchGlobalPosts = () => async (dispatch: any) => {
  const postApi = createApi(store);

  dispatch(setStatus(Status.loading));
  const response = await postApi.getAllPosts();
  dispatch(setGlobalPosts(response.data));
  dispatch(setStatus(Status.idle));
};

export const { setFollowedPosts, setGlobalPosts, setStatus } =
  postSlice.actions;

export default postSlice.reducer;

export const selectFollowedPosts = (state: any) => state.post.followedPosts;
export const selectAllPosts = (state: any) => state.post.globalPosts;
export const selectStatus = (state: any) => state.post.status;

function createApi(store: Store) {
  return new PostsApi(
    new Configuration({
      basePath: process.env.REACT_APP_BACKEND_URL,
      accessToken: store.getState().login.userInfo.jwt,
    })
  );
}
