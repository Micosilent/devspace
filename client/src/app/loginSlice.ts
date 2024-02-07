import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../util/types";
import {
  AuthLoginPostRequest,
  AuthSignupPostRequest,
  AuthenticationApi,
  Configuration,
} from "../api";
import { AppThunk } from "./store";
import { Axios, AxiosError } from "axios";

interface loginState {
  loggedIn: boolean;
  status: Status;
  error: string | null;
  userInfo: {
    firstName: string;
    jwt: string;
  };
}

const initialState: loginState = {
  loggedIn: false,
  status: Status.idle,
  error: null,
  userInfo: {
    firstName: "",
    jwt: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userInfo.jwt = action.payload;
    },
    logoff: (state) => {
      state.loggedIn = false;
      state.userInfo = initialState.userInfo;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

const api = new AuthenticationApi(
  new Configuration({
    basePath: process.env.REACT_APP_BACKEND_URL,
  })
);

export const postLogin =
  (params: AuthLoginPostRequest): AppThunk =>
  async (dispatch) => {
    let response;
    try {
      dispatch(setStatus(Status.loading));
      response = await api.authLoginPost(params);

      dispatch(login(response.data.token));
      await addJWT(response.data.token || "");

      dispatch(setError(""));
      dispatch(setStatus(Status.succeeded));
    } catch (error) {
      dispatch(setStatus(Status.failed));
      const errorMessage = "Invalid email or password";
      dispatch(setError(errorMessage));
    }
  };

export const postSignup =
  (params: AuthSignupPostRequest): AppThunk =>
  async (dispatch) => {
    let response;
    console.log(params);
    try {
      dispatch(setStatus(Status.loading));
      response = await api.authSignupPost(params);

      dispatch(postLogin({ email: params.email, password: params.password }));
    } catch (error) {
      dispatch(setStatus(Status.failed));
      const errorMessage = "Change this pls";
      dispatch(setError(errorMessage));
    }
  };

export const postLogout = (): AppThunk => async (dispatch) => {
  localStorage.removeItem("jwt");
  sessionStorage.removeItem("jwt");
  dispatch(logoff());
  await api.authLogoutGet();
};

const addJWT = async (token: string) => {
  localStorage.setItem("jwt", token);
};

export const { login, logoff, setStatus, setError } = loginSlice.actions;

export default loginSlice.reducer;

export const selectLoggedIn = (state: { login: loginState }) =>
  state.login.loggedIn;

export const selectUserInfo = (state: { login: loginState }) =>
  state.login.userInfo;

export const selectErrorMessage = (state: { login: loginState }) =>
  state.login.error;
