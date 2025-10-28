import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// style UI kit
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";

const theme = createTheme({ palette: { mode: "light" } });

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App /> 
  </ThemeProvider>
);   