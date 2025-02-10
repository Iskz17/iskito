import * as React from "react";
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import { useDarkLightTheme } from "../../context/DarkLightThemeContext";

export function Dropdown({ children, isDarkMode, overrideDarkmode, ...other }) {
  const [isDarkModeFromContext] = useDarkLightTheme();
  const [useDarkMode, setUseDarkMode] = useState(
    overrideDarkmode ? isDarkMode : isDarkModeFromContext
  );

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
  useEffect(() => {
    setUseDarkMode(overrideDarkmode ? isDarkMode : isDarkModeFromContext);
  }, [isDarkModeFromContext, isDarkMode, overrideDarkmode]);

  return (
    <Select
      displayEmpty
      style={{
        border: "1px solid rgba(255, 255, 255, 0.125)",
        color: useDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        padding: 0,
      }}
      sx={{
        color: useDarkMode ? "white" : "rgba(0, 0, 0, 0.7)",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: useDarkMode
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
        fieldset: {
          border: "none",
        },
      }}
      {...other}
    >
      {children}
    </Select>
  );
}
