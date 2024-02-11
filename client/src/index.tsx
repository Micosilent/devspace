import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./routes/Auth/login";
import Register from "./routes/Auth/register";
import AuthRoot from "./routes/Auth/authRoot";
import { Provider } from "react-redux";
import { store } from "./app/store";
import PostList from "./routes/postList";
import Profile from "./routes/profile";
import PostView from "./routes/post";
import NewPost from "./routes/newPost";
import Search from "./routes/search";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const defaultTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "feed",
        element: <PostList type="user" />,
      },
      {
        path: "global",
        element: <PostList type="all" />,
      },
      {
        path: "me",
        element: <Profile selfProfile />,
      },
      {
        path: "user/:id",
        element: <Profile />,
      },
      {
        path: "post/:id",
        element: <PostView />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "newpost",
        element: <NewPost />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
