import { Store, createSlice } from "@reduxjs/toolkit";
import { Configuration, Post, PostsApi } from "../api";
import { Status } from "../util/types";
import { AppThunk, store } from "./store";

interface postSliceInterface {
  status: Status;
  followedPosts: Post[];
  globalPosts: Post[];
  aPost: Post | null;
}

const initialState: postSliceInterface = {
  status: Status.idle,
  followedPosts: [],
  globalPosts: [],
  aPost: null,
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
    setAPost: (state, action) => {
      state.aPost = action.payload;
    },
  },
});

export const fetchFollowedPosts = (): AppThunk => async (dispatch: any) => {
  const postApi = createApi(store);

  dispatch(setStatus(Status.loading));
  const response = await postApi.getFollowedPosts();
  dispatch(setFollowedPosts(response.data));
  dispatch(setStatus(Status.idle));
};

export const fetchGlobalPosts = (): AppThunk => async (dispatch: any) => {
  const postApi = createApi(store);

  dispatch(setStatus(Status.loading));
  const response = await postApi.getAllPosts();
  dispatch(setGlobalPosts(response.data));
  dispatch(setStatus(Status.idle));
};

export const likePost =
  (postId: number, postType?: "global" | "followed"): AppThunk =>
  async (dispatch: any) => {
    const postApi = createApi(store);

    dispatch(setStatus(Status.loading));
    await postApi.likePost(postId);
    dispatch(setStatus(Status.idle));

    if (postType === "global") {
      dispatch(fetchGlobalPosts());
    } else if (postType === "followed") {
      dispatch(fetchFollowedPosts());
    } else {
      dispatch(fetchFollowedPosts());
      dispatch(fetchGlobalPosts());
    }
  };

export const unLikePost =
  (postId: number, postType?: "global" | "followed"): AppThunk =>
  async (dispatch: any) => {
    const postApi = createApi(store);

    dispatch(setStatus(Status.loading));
    await postApi.unlikePost(postId);
    dispatch(setStatus(Status.idle));

    if (postType === "global") {
      dispatch(fetchGlobalPosts());
    } else if (postType === "followed") {
      dispatch(fetchFollowedPosts());
    } else {
      dispatch(fetchFollowedPosts());
      dispatch(fetchGlobalPosts());
    }
  };

export const fetchAPost =
  (postId: number): AppThunk =>
  async (dispatch: any) => {
    const postApi = createApi(store);

    dispatch(setStatus(Status.loading));
    const response = await postApi.getPost(postId);
    dispatch(setAPost(response.data));
    dispatch(setStatus(Status.idle));
  };

export const commentAPost =
  (postId: number, comment: string): AppThunk =>
  async (dispatch: any) => {
    const postApi = createApi(store);

    dispatch(setStatus(Status.loading));
    await postApi.commentPost(postId, { content: comment });
    dispatch(fetchAPost(postId));
    dispatch(setStatus(Status.idle));
  };

export const createPost =
  (title: string, content: string): AppThunk =>
  async (dispatch: any) => {
    const postApi = createApi(store);

    dispatch(setStatus(Status.loading));
    await postApi.createPost({ title, content });
    dispatch(fetchGlobalPosts());
    dispatch(setStatus(Status.idle));
  };

export const updatePost =
  (postId: number, title: string, content: string): AppThunk =>
  async (dispatch: any) => {
    const postApi = createApi(store);

    dispatch(setStatus(Status.loading));
    await postApi.updatePost(postId, { title, content });
    dispatch(fetchAPost(postId));
    dispatch(fetchGlobalPosts());
    dispatch(setStatus(Status.idle));
  };

export const deletePost =
  (postId: number): AppThunk =>
  async (dispatch: any) => {
    const postApi = createApi(store);

    dispatch(setStatus(Status.loading));
    await postApi.deletePost(postId);
    dispatch(setStatus(Status.idle));
  };

export const { setFollowedPosts, setGlobalPosts, setStatus, setAPost } =
  postSlice.actions;

export default postSlice.reducer;

export const selectFollowedPosts = (state: any) => state.post.followedPosts;
export const selectAllPosts = (state: any) => state.post.globalPosts;
export const selectStatus = (state: any) => state.post.status;
export const selectAPost = (state: any) => state.post.aPost;

function createApi(store: Store) {
  return new PostsApi(
    new Configuration({
      basePath: process.env.REACT_APP_BACKEND_URL,
      accessToken: store.getState().login.userInfo.jwt,
    })
  );
}
