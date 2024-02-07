import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { StyledDivider } from "../../components/StyledComponents";
import { Link } from "@mui/material";
import { useAppDispatch } from "../../app/store";
import { postLogin, selectErrorMessage } from "../../app/loginSlice";
import { AuthLoginPostRequest } from "../../api";
import { useSelector } from "react-redux";

export default function Login() {
  const dispatch = useAppDispatch();
  const errorMessage = useSelector(selectErrorMessage);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const paramsObject = {
      email: data.get("email"),
      password: data.get("password"),
      longExpiration: data.get("longExpiration"),
    };

    dispatch(postLogin(paramsObject as unknown as AuthLoginPostRequest));
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: "15%" }}>
        <Grid
          container
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
          sx={{ padding: "10%" }}
        >
          <Grid item xs={12}>
            <Grid
              item
              component="form"
              onSubmit={handleSubmit}
              container
              direction="column"
              spacing={3}
            >
              <Grid item>
                <StyledTypography>Email:</StyledTypography>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  name="email"
                  variant="outlined"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item>
                <StyledTypography>Password:</StyledTypography>
                <TextField
                  fullWidth
                  required
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  error={!!errorMessage}
                  helperText={errorMessage}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  id="longExpiration"
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" fullWidth={true}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <StyledDivider />
            <Typography variant="h5" fontSize={"1.5rem"}>
              Don't have an account yet?
            </Typography>
          </Grid>
          <StyledGrid item>
            <Link href="../auth/register" variant="body2">
              Register now!
            </Link>
          </StyledGrid>
        </Grid>
      </Container>
    </>
  );
}

const StyledGrid = styled(Grid)({
  width: "50%",
});

const StyledTypography = styled(Typography)({
  marginBottom: "5%",
});
