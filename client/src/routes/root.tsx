import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import {  selectLoggedIn } from "../app/loginSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useWindowDimensions from "../app/hooks/useWindowDimensions";
import SideAppBar from "../components/sideAppBar";
import BottomAppBar from "../components/bottomAppBar";
import TopAppBar from "../components/topAppBar";

const drawerWidth = 240;
const topAppBarHeight = 64;

export default function Root() {
  const navigate = useNavigate();
  const loggedIn = useSelector(selectLoggedIn);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/auth/login");
    }
  }, [loggedIn, navigate]);


  return (
    <>
      <Box>
        <TopAppBar height={topAppBarHeight} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {width > 600 && (
          <Box sx={{ flexBasis: { sm: "auto" } }}>
            <SideAppBar drawerWidth={drawerWidth} />
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${width > 600 ? drawerWidth : 0}px)` },
            marginTop: { xs: `${topAppBarHeight}px`},
          }}
        >
          <Outlet />
        </Box>

        {width <= 600 && (
          <Box sx={{ flexBasis: "100%" }}>
            <BottomAppBar />
          </Box>
        )}
      </Box>
    </>
  );
}
