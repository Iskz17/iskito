import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const lightTheme = {
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
  dialogPaper: {
    backgroundColor: "rgb(255,255,255)",
    color:"rgb(20,21,21)"
  },
  appBar: {
    color: "white"
  },
  tab: {
    color: "rgb(20,21,21)"
  }
};

const darkTheme = {
  status: {
    danger: orange[500],
  },
  button: {
    primary: {
      main: "#278B85",
      mainText: "white",
      hover: "#216E69",
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
    backgroundColor: "rgba(20,21,21,0.5)",
    borderRadius: "11px",
    blur: "blur(6px)",
  },
  dialogPaper: {
    backgroundColor: "rgb(20,21,21)",
    color: "rgb(255,255,255)"
  },
  appBar: {
    backgroundColor: "rgb(20,21,21)"
  },
  tab: {
    color: "white"
  }
};

export default function AppTheme(props) {
  const theme = createTheme({
    light: { ...lightTheme },
    dark: { ...darkTheme },
  });
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
