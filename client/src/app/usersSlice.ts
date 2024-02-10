import { Store, createSlice } from "@reduxjs/toolkit";
import { Configuration, User, UserWithRelations, UsersApi } from "../api";
import { Status } from "../util/types";
import { AppThunk, store } from "./store";

interface userState {
  status: Status;
  error: string | null;
  users: User[];
  userWithRelations: UserWithRelations | null;
}

const initialState: userState = {
  status: Status.idle,
  error: null,
  users: [],
  userWithRelations: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserWithRelations: (state, action) => {
      state.userWithRelations = action.payload;
    },
  },
});

export const getUsers = (): AppThunk => async (dispatch) => {
  const api = createApi(store);

  dispatch(setStatus(Status.loading));
  try {
    const response = await api.usersGet();
    dispatch(setUsers(response.data));
    dispatch(setStatus(Status.idle));
  } catch (error) {
    dispatch(setError((error as Error).message));
    dispatch(setStatus(Status.idle));
  }
};

export const getUserWithRelations =
  (userId: number): AppThunk =>
  async (dispatch) => {
    const api = createApi(store);

    dispatch(setStatus(Status.loading));
    try {
      const response = await api.usersIdGet(userId);
      dispatch(setUserWithRelations(response));
      dispatch(setStatus(Status.idle));
    } catch (error) {
      dispatch(setError((error as Error).message));
      dispatch(setStatus(Status.idle));
    }
  };

export const followUser =
  (userId: number): AppThunk =>
  async (dispatch) => {
    const api = createApi(store);

    dispatch(setStatus(Status.loading));
    try {
      await api.usersIdFollowPost(userId);
      dispatch(getUsers());
    } catch (error) {
      dispatch(setError((error as Error).message));
      dispatch(setStatus(Status.idle));
    }
  };

export const unFollowUser =
  (userId: number): AppThunk =>
  async (dispatch) => {
    const api = createApi(store);

    dispatch(setStatus(Status.loading));
    try {
      await api.usersIdFollowDelete(userId);
      dispatch(getUsers());
    } catch (error) {
      dispatch(setError((error as Error).message));
      dispatch(setStatus(Status.idle));
    }
  };

export const { setUsers, setStatus, setError, setUserWithRelations } =
  usersSlice.actions;

export default usersSlice.reducer;

export const selectUsers = (state: { users: userState }) => state.users.users;
export const selectAUser = (state: { users: userState }) =>
  state.users.userWithRelations;
export const selectStatus = (state: { users: userState }) => state.users.status;
export const selectError = (state: { users: userState }) => state.users.error;

function createApi(store: Store) {
  const configuration = new Configuration({
    basePath: process.env.REACT_APP_BACKEND_URL,
    accessToken: store.getState().login.userInfo.jwt,
  });
  return new UsersApi(configuration);
}
