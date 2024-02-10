import { Copyright } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { StyledDivider } from "../../components/StyledComponents";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../app/loginSlice";
import { useEffect } from "react";

export default function AuthRoot() {
  const loggedIn = useSelector(selectLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      return navigate("/feed");
    }
  });

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
      direction="column"
      spacing={5}
    >
      <Grid
        item
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
      >
        <Typography variant="h1" fontSize={"4.5rem"}>
          DevSpace
          <StyledDivider />
        </Typography>
        <Grid item>
          <Outlet />
        </Grid>
      </Grid>
      <Grid item>
        <Copyright />
      </Grid>
    </Grid>
  );
}
