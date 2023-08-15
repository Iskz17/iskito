import * as React from "react";
import { useContext} from "react";
import Select from "@mui/material/Select";
import { AppContext } from "../../Context/AppContext";

export function Dropdown({ children, isDarkmode, ...other }) {
  const [state] = useContext(AppContext);

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

  return (
    <Select
    displayEmpty
    style={{
      border: "1px solid rgba(255, 255, 255, 0.125)",
      color: state.isDarkMode
        ? "rgba(255, 255, 255, 0.7)"
        : "rgba(0, 0, 0, 0.7)",
      padding: 0,
    }}
    sx={{
      color: state.isDarkMode ? "white" : "rgba(0, 0, 0, 0.7)",
      ".MuiOutlinedInput-notchedOutline": {
        borderColor:state.isDarkMode
          ? "rgba(228, 219, 233, 0.25)"
          : "(50,50,50, 0.25)",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: state.isDarkMode
          ? "rgba(228, 219, 233, 0.25)"
          : "(50,50,50, 0.25)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: state.isDarkMode
          ? "rgba(228, 219, 233, 0.25)"
          : "(50,50,50, 0.25)",
      },
      ".MuiSvgIcon-root ": {
        fill: state.isDarkMode
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