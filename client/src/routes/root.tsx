import ResponsiveDrawer from "../components/Drawer";
import { Outlet, useActionData, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { postLogout, selectLoggedIn, selectUserInfo } from "../app/loginSlice";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Root() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/auth/login");
    }
  }, [loggedIn, navigate]);

  const handleClick = () => {
    dispatch(postLogout());
  };

  return (
    <>
      <Button color="primary" variant="contained" onClick={handleClick}>
        Log Off
      </Button>
    </>
  );
}