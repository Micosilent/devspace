import { Link, Typography } from "@mui/material";

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://tutrastero.com/">
        Tu Trastero Tu Otro Espacio S.L
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
