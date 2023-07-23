import { AppContext } from "../../Context/AppContext";
import { useState, useContext, useEffect, memo } from "react";
import Slider from "@mui/material/Slider";
import '../../index.css'

const CustomSlider = (props) => {
  const [state] = useContext(AppContext);
  const [needToUseDark, setNeedToUseDark] = useState(state.isDarkMode);

  useEffect(() => {
    setNeedToUseDark(state.isDarkMode);
  }, [state]);

  console.log("slider rerender");

  return (
    <Slider
      sx={{
        color: needToUseDark ? "WHITE" : "#1f2929",
        height: 8,
        "& .MuiSlider-track": {
          border: "none",
        },
        "& .MuiSlider-thumb": {
          height: 18,
          width: 18,
          backgroundColor: needToUseDark ? "WHITE" : "#1f2929",
          border: "2px solid currentColor",
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          "&:before": {
            boxShadow: "0 2px 12px 0 currentColor",
          },
          "&:hover, &.Mui-focusVisible": {
            boxShadow: `0px 0px 0px 8px ${"rgb(82	175	119 / 16%)"}`,
          },
        },
        "& .MuiSlider-valueLabel": {
          lineHeight: 1.2,
          fontSize: 12,
          background: "unset",
          color: !needToUseDark ? "WHITE" : "#1f2929",
          padding: 0,
          width: 32,
          height: 32,
          borderRadius: "50% 50% 50% 0",
          backgroundColor: needToUseDark ? "WHITE" : "#1f2929",
          transformOrigin: "bottom left",
          transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
          "&:before": { display: "none" },
          "&.MuiSlider-valueLabelOpen": {
            transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
          },
          "& > *": {
            transform: "rotate(45deg)",
          },
        },
      }}
      {...props}
    />
  );
};

export default memo(CustomSlider);
