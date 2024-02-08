import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../util/types";
import {
  AuthLoginPostRequest,
  AuthSignupPostRequest,
  AuthenticationApi,
  Configuration,
  UsersApi,
} from "../api";
import { AppThunk } from "./store";

interface loginState {
  loggedIn: boolean;
  status: Status;
  error: string | null;
  userInfo: {
    firstName: string;
    lastName: string;
    jwt: string;
  };
}

const initialState: loginState = {
  loggedIn: false,
  status: Status.idle,
  error: null,
  userInfo: {
    firstName: "",
    lastName: "",
    jwt: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userInfo.jwt = action.payload.jwt;
      state.userInfo.firstName = action.payload.firstName;
      state.userInfo.lastName = action.payload.lastName;
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

const authApi = new AuthenticationApi(
  new Configuration({
    basePath: process.env.REACT_APP_BACKEND_URL,
  })
);

export const postLogin =
  (params: AuthLoginPostRequest): AppThunk =>
  async (dispatch) => {
    let response, userResponse;
    try {
      dispatch(setStatus(Status.loading));
      response = await authApi.authLoginPost(params);

      await addJWT(response.data.token || "");

      // Get user info
      const userApi = new UsersApi(
        new Configuration({
          basePath: process.env.REACT_APP_BACKEND_URL,
          accessToken: response.data.token,
        })
      );

      userResponse = await userApi.usersMeGet();

      dispatch(
        login({
          jwt: response.data.token,
          firstName: userResponse.data.firstName,
          lastName: userResponse.data.lastName,
        })
      );
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
      response = await authApi.authSignupPost(params);

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
  await authApi.authLogoutGet();
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
