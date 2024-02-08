import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loginReducer from "./loginSlice";
import postReducer from "./postSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    post: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
