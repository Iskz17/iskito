import * as React from "react";
import { useContext, useEffect, useState} from "react";
import Select from "@mui/material/Select";
import { AppContext } from "../../Context/AppContext";

export function Dropdown({ children, isDarkMode, overrideDarkmode, ...other }) {
  const [state] = useContext(AppContext);
  const [useDarkMode, setUseDarkMode] = useState(overrideDarkmode? isDarkMode: state.isDarkMode);

  /**
   * you need this to adjust the width
   *   <FormControl
                sx={{
                  width: "100%",
                  padding: 0,
                }}
                size="small"
              >
   */
  useEffect(()=> {
    setUseDarkMode(overrideDarkmode? isDarkMode: state.isDarkMode);
  },[state, isDarkMode, overrideDarkmode])

  return (
    <Select
    displayEmpty
    style={{
      border: "1px solid rgba(255, 255, 255, 0.125)",
      color: useDarkMode
        ? "rgba(255, 255, 255, 0.7)"
        : "rgba(0, 0, 0, 0.7)",
      padding: 0,
    }}
    sx={{
      color: useDarkMode ? "white" : "rgba(0, 0, 0, 0.7)",
      ".MuiOutlinedInput-notchedOutline": {
        borderColor:useDarkMode
          ? "rgba(228, 219, 233, 0.25)"
          : "(50,50,50, 0.25)",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: useDarkMode
          ? "rgba(228, 219, 233, 0.25)"
          : "(50,50,50, 0.25)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: useDarkMode
          ? "rgba(228, 219, 233, 0.25)"
          : "(50,50,50, 0.25)",
      },
      ".MuiSvgIcon-root ": {
        fill: useDarkMode
          ? "white !important"
          : "rgba(0, 0, 0, 0.7) !important",
      },
    }}
    {...other}
  >
    {children}
  </Select>
  );
}