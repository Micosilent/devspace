import {
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useAppDispatch } from "../../app/store";
import { postSignup } from "../../app/loginSlice";
import { AuthSignupPostRequest } from "../../api";

export default function Register() {
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const paramsObject = {
      email: data.get("email"),
      password: data.get("password"),
      passwordValidation: data.get("passwordConfirmation"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      longExpiration: true,
    };
    dispatch(postSignup(paramsObject as unknown as AuthSignupPostRequest));
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: "5%" }}>
        <Grid
          component="form"
          onSubmit={handleSubmit}
          container
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
          sx={{ paddingBottom: "10%" }}
        >
          <Grid item container xs={12} spacing={2} sx={{ width: "70%" }}>
            <Grid item xs={12}>
              <StyledTypography>First Name:</StyledTypography>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTypography>Last Name:</StyledTypography>
              <TextField
                fullWidth
                name="lastName"
                required
                label="Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTypography>Email:</StyledTypography>
              <TextField
                fullWidth
                label="Email"
                name="email"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTypography>Password:</StyledTypography>
              <TextField
                type="password"
                name="password"
                required
                label="Password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTypography>Password Confirmation:</StyledTypography>
              <TextField
                type="password"
                name="passwordConfirmation"
                label="Password Confirmation"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <StyledGrid item xs={12}>
            <Button type="submit" variant="contained" fullWidth={true}>
              Register
            </Button>
          </StyledGrid>
          <Grid item>
            <Typography variant="h5" fontSize={"1.5rem"}>
              Already have an account?
            </Typography>
          </Grid>
          <StyledGrid item>
            <Link href="../auth/login" variant="body2">
              Login
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
