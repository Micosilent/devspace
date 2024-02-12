import { ThemeProvider } from "@emotion/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./loginSlice";
import { createTheme } from "@mui/material";

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const darkThemeEnabled = useSelector(selectDarkMode);

  const defaultTheme = createTheme({
    palette: {
      mode: darkThemeEnabled ? "dark" : "light",
    },
  });

  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
