import React from "react";
import Routes from "./routes";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";

const App = () => {
  const darkTheme = React.useMemo(
    () =>
      createTheme({
        typography: {
          button: {
            textTransform: "none",
          },
        },
        palette: {
          mode: "dark",
          text: {
            primary: "#fff",
            secondary: "rgba(255,255,255,0.7)",
            disabled: "rgba(255,255,255,0.5)",
            icon: "rgba(255,255,255,0.5)",
            linkIcon: "rgba(236,79,79,0.5)",
          },
          primary: {
            main: "#353535",
          },
          secondary: red,
          background: {
            paper: "rgb(59, 58, 48)",
            default: "#212529",
          },
          cardPaper: "#450622",
          tooltip: "#5b5959",
          action: {
            active: "#fff",
            selected: "#fff",
            success: "rgb(217,203,102)",
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
