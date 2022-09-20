import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const theme = createTheme({
  status: {
    danger: orange[500],
  },
  button: {
    primary: {
      main: "rgb(217,2,125)",
      mainText: "white",
      hover: "rgb(189, 2, 109)",
    },
    secondary: {
      main: "rgb(226,231,238)",
      mainText: "rgb(93,93,93)",
      hover: "rgb(194,197,208)",
      hoverText: "black",
    },
  },
  dialog: {
    boxShadow: "0px 45px 25px -25px rgba(0 , 0 ,0, 0.2)",
    backgroundColor: "rgba(168,168,168,0.5)",
    borderRadius: "11px",
    blur: "blur(6px)",
  },
});

export default function AppTheme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
