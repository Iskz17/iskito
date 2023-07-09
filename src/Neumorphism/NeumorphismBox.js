import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { ElementFlat, ElementConcave, ElementConvex, ElementPressed } from "./Element";
import "./NeumorphismBox.css";
import { pSBC } from "./PBSC";

const NeumorphismBox = () => {
  let flex = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  let relativeLayer = {
    position: "relative",
    height: "100%",
    width: "100%",
  };

  let settingMargin = {
    marginBottom: "0px",
    marginTop: "0px",
    padding: 0,
  };

  function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
  function contrast(rgb1, rgb2) {
    var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  const [valueSize, setValueSize] = useState(300);
  const [backgroundColor, setBackgroundColor] = useState("#CAE6E8");
  const [lightShadow, setLightShadow] = useState("#E8FFFF");
  const [darkShadow, setDarkShadow] = useState("#ACC4C5");
  const [valueRad, setValueRad] = useState(30);
  const [valueRadMax, setValueRadMax] = useState(120);
  const [valueDistance, setValueDistance] = useState(23);
  const [valueIntensity, setValueIntensity] = useState(71);
  const [valueBlur, setValueBlur] = useState(60);
  const [lightAngleValue, setLightAngleValue] = useState(["-", "-"]);
  const [darkAngleValue, setDarkAngleValue] = useState(["", ""]);
  const [lightSourcePos, setLightSourcePos] = useState("topLeft");
  const [shapeColorAngle, setShapeColorAngle] = useState("145deg");
  const [shapeColor, setShapeColor] = useState(""); //light, dark
  const [shadowType, setShadowType] = useState("flat");
  const [needToUseDark, setNeedToUseDark] = useState(true);

  const changeControlFlow = (hexColor) => {
    let rgbConverted = pSBC(0, hexColor, "c");
    let rgbToPass = rgbConverted
      .replaceAll("rgb", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(",");
    if (
      contrast(
        [255, 255, 255],
        [parseInt(rgbToPass[0]), parseInt(rgbToPass[1]), parseInt(rgbToPass[2])]
      ) < 2
    ) {
      setNeedToUseDark(true);
    } else {
      setNeedToUseDark(false);
    }
    let maxRRatio = 1.59;
    let maxGRatio = 1.60344;
    let maxBRatio = 1.59663;

    const colorGuard = (num) => {
      if (num > 255) {
        return 255;
      }
      return num;
    };

    /**
     * chosen intensity
     */
    // let r = colorGuard(parseInt(rgbToPass[0]) * 1.1875);
    // let g = colorGuard(parseInt(rgbToPass[1]) * 1.18681);
    // let b = colorGuard(parseInt(rgbToPass[2]) * 1.18681);
    let r = colorGuard(
      parseInt(rgbToPass[0]) * (maxRRatio * (valueIntensity / 100))
    );
    let g = colorGuard(
      parseInt(rgbToPass[1]) * (maxGRatio * (valueIntensity / 100))
    );
    let b = colorGuard(
      parseInt(rgbToPass[2]) * (maxBRatio * (valueIntensity / 100))
    );
    return pSBC(0, `rgb(${r},${g},${b})`, "c");
  };
  const changeControlFlowDark = (hexColor) => {
    let rgbConverted = pSBC(0, hexColor, "c");
    let rgbToPass = rgbConverted
      .replaceAll("rgb", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(",");

    let maxRRatio = 0.40625;
    let maxGRatio = 0.39655;
    let maxBRatio = 0.403361;
    const colorGuard = (num) => {
      if (num < 0) {
        return 0;
      }
      return num;
    };

    // let r = colorGuard(parseInt(rgbToPass[0]) * 0.8125);
    // let g = colorGuard(parseInt(rgbToPass[1]) * 0.810345);
    // let b = colorGuard(parseInt(rgbToPass[2]) * 0.806723);
    const maxShadowGuard = (num, type) => {
      if (type === "r") {
        // if (num > 0.8125) {
        //   return 1;
        // }
        if (num > 1) {
          return 1;
        }
        return num;
      }
      if (type === "g") {
        // if (num > 0.810345) {
        //   return 1;
        // }
        if (num > 1) {
          return 1;
        }
        return num;
      }
      if (type === "b") {
        // if (num > 0.806723) {
        //   return 1;
        // }
        if (num > 1) {
          return 1;
        }
        return num;
      }
    };
    let r = colorGuard(
      parseInt(rgbToPass[0]) *
        maxShadowGuard(maxRRatio * (100 / (valueIntensity - 25)), "r")
    );
    let g = colorGuard(
      parseInt(rgbToPass[1]) *
        maxShadowGuard(maxGRatio * (100 / (valueIntensity - 25)), "g")
    );
    let b = colorGuard(
      parseInt(rgbToPass[2]) *
        maxShadowGuard(maxBRatio * (100 / (valueIntensity - 25)), "b")
    );
    return pSBC(0, `rgb(${r},${g},${b})`, "c");
  };
  const changeShapeControl = (type, color = null) => {
    setShadowType(type);
    if (type === "flat" || type === "pressed") {
      return;
    }
    let rgbConverted = pSBC(0, color ?? backgroundColor, "c");
    let rgbToPass = rgbConverted
      .replaceAll("rgb", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(",");
    let lightRatio = 1.0714;
    let darkRatio = 0.902;

    const colorGuard = (num) => {
      if (num < 0) {
        return 0;
      }
      if (num > 255) {
        return 255;
      }
      return num;
    };

    // let r = colorGuard(parseInt(rgbToPass[0]) * 0.8125);
    // let g = colorGuard(parseInt(rgbToPass[1]) * 0.810345);
    // let b = colorGuard(parseInt(rgbToPass[2]) * 0.806723);
    let rLight = colorGuard(parseInt(rgbToPass[0]) * lightRatio);
    let gLight = colorGuard(parseInt(rgbToPass[1]) * lightRatio);
    let bLight = colorGuard(parseInt(rgbToPass[2]) * lightRatio);

    let rDark = colorGuard(parseInt(rgbToPass[0]) * darkRatio);
    let gDark = colorGuard(parseInt(rgbToPass[1]) * darkRatio);
    let bDark = colorGuard(parseInt(rgbToPass[2]) * darkRatio);

    switch (type) {
      case "flat": {
        return;
      }
      case "concave": {
        setShapeColor(
          `${pSBC(0, `rgb(${rDark},${gDark},${bDark})`, "c")},  ${pSBC(
            0,
            `rgb(${rLight},${gLight},${bLight})`,
            "c"
          )}`
        );
        return;
      }
      case "convex": {
        setShapeColor(
          ` ${pSBC(0, `rgb(${rLight},${gLight},${bLight})`, "c")}, ${pSBC(
            0,
            `rgb(${rDark},${gDark},${bDark})`,
            "c"
          )}`
        );
        return;
      }
      case "pressed": {
        return;
      }
      default:
        break;
    }
    //return pSBC(0, `rgb(${r},${g},${b})`, "c");
  };
  const handleChangeSize = (newValue) => {
    setValueSize(newValue.target.value);
    setValueRadMax(newValue.target.value / 2);
    setValueDistance(Math.floor(newValue.target.value / 10));
    setValueBlur(Math.floor((newValue.target.value / 10) * 1.75));
  };
  const handleChangeRad = (newValue) => {
    setValueRad(newValue.target.value);
  };
  const handleChangeDistance = (newValue) => {
    setValueDistance(newValue.target.value);
  };
  const handleChangeIntensity = (newValue) => {
    setValueIntensity(newValue.target.value);
    setLightShadow(changeControlFlow(backgroundColor));
    setDarkShadow(changeControlFlowDark(backgroundColor));
  };
  const handleChangeBlur = (newValue) => {
    setValueBlur(newValue.target.value);
  };
  const handleColorChange = (e) => {
    setBackgroundColor(e.target.value);
    setLightShadow(changeControlFlow(e.target.value));
    setDarkShadow(changeControlFlowDark(e.target.value));
    changeShapeControl(shadowType, e.target.value);
  };
  const handleLightSource = (pos) => {
    setLightSourcePos(pos);
    switch (pos) {
      case "topLeft": {
        setLightAngleValue(["-", "-"]);
        setDarkAngleValue(["", ""]);
        setShapeColorAngle("145deg");
        break;
      }
      case "topRight": {
        setLightAngleValue(["", "-"]);
        setDarkAngleValue(["-", ""]);
        setShapeColorAngle("225deg");
        break;
      }
      case "bottomLeft": {
        setLightAngleValue(["-", ""]);
        setDarkAngleValue(["", "-"]);
        setShapeColorAngle("45deg");
        break;
      }
      case "bottomRight": {
        setLightAngleValue(["", ""]);
        setDarkAngleValue(["-", "-"]);
        setShapeColorAngle("315deg");
        break;
      }
      default:
        return null;
    }
  };
  const getSvgToImg = (el) => {
    return URL.createObjectURL(
      new Blob([el], {
        type: "image/svg+xml",
      })
    );
  };

  const configElementBox = () => {
    return (
      <>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            {" "}
            <span>{`Pick a color: `}</span>
            <input
              type="color"
              style={{ border: "none" }}
              value={backgroundColor}
              onChange={(e) => handleColorChange(e)}
            />
            <span>{`or`}</span>
            <input
              type="text"
              value={`${backgroundColor.toUpperCase()}`}
              style={{
                width: "90px",
                height: "30px",
                border: "3px solid black",
                textAlign: "center",
                fontSize: "15px",
              }}
              onChange={(e) => handleColorChange(e)}
            />
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Size:`}</span>
            <Slider
              value={valueSize}
              size="medium"
              onChange={handleChangeSize}
              min={12}
              max={410}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-size"
              sx={{
                color: needToUseDark ? "#001f3f" : "white",
                height: 8,
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  height: 18,
                  width: 18,
                  backgroundColor: "#fff",
                  border: "2px solid currentColor",
                  // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  //   boxShadow: "inherit",
                  // },
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&:before": {
                    boxShadow: "0 2px 12px 0 currentColor",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${
                      //theme.palette.mode === 'dark'
                      //? 'rgb(255 255 255 / 16%)'
                      //:
                      "rgb(82	175	119 / 16%)"
                    }`,
                  },
                },
                "& .MuiSlider-valueLabel": {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: "unset",
                  color: !needToUseDark ? "#001f3f" : "white",
                  padding: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50% 50% 50% 0",
                  backgroundColor: needToUseDark ? "#001f3f" : "white",
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
            />
            <span>{valueSize}px</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Radius:`}</span>
            <Slider
              value={valueRad}
              size="medium"
              onChange={handleChangeRad}
              min={0}
              max={valueRadMax}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-radius"
              sx={{
                color: needToUseDark ? "#001f3f" : "white",
                height: 8,
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  height: 18,
                  width: 18,
                  backgroundColor: "#fff",
                  border: "2px solid currentColor",
                  // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  //   boxShadow: "inherit",
                  // },
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&:before": {
                    boxShadow: "0 2px 12px 0 currentColor",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${
                      //theme.palette.mode === 'dark'
                      //? 'rgb(255 255 255 / 16%)'
                      //:
                      "rgb(82	175	119 / 16%)"
                    }`,
                  },
                },
                "& .MuiSlider-valueLabel": {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: "unset",
                  color: !needToUseDark ? "#001f3f" : "white",
                  padding: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50% 50% 50% 0",
                  backgroundColor: needToUseDark ? "#001f3f" : "white",
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
            />
            <span>{valueRad}px</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Distance:`}</span>
            <Slider
              value={valueDistance}
              size="medium"
              onChange={handleChangeDistance}
              min={0}
              max={50}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-distance"
              sx={{
                color: needToUseDark ? "#001f3f" : "white",
                height: 8,
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  height: 18,
                  width: 18,
                  backgroundColor: "#fff",
                  border: "2px solid currentColor",
                  // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  //   boxShadow: "inherit",
                  // },
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&:before": {
                    boxShadow: "0 2px 12px 0 currentColor",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${
                      //theme.palette.mode === 'dark'
                      //? 'rgb(255 255 255 / 16%)'
                      //:
                      "rgb(82	175	119 / 16%)"
                    }`,
                  },
                },
                "& .MuiSlider-valueLabel": {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: "unset",
                  color: !needToUseDark ? "#001f3f" : "white",
                  padding: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50% 50% 50% 0",
                  backgroundColor: needToUseDark ? "#001f3f" : "white",
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
            />
            <span>{valueDistance}px</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Intensity:`}</span>
            <Slider
              value={valueIntensity}
              size="medium"
              onChange={handleChangeIntensity}
              min={62}
              max={100}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-intensity"
              sx={{
                color: needToUseDark ? "#001f3f" : "white",
                height: 8,
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  height: 18,
                  width: 18,
                  backgroundColor: "#fff",
                  border: "2px solid currentColor",
                  // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  //   boxShadow: "inherit",
                  // },
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&:before": {
                    boxShadow: "0 2px 12px 0 currentColor",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${
                      //theme.palette.mode === 'dark'
                      //? 'rgb(255 255 255 / 16%)'
                      //:
                      "rgb(82	175	119 / 16%)"
                    }`,
                  },
                },
                "& .MuiSlider-valueLabel": {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: "unset",
                  color: !needToUseDark ? "#001f3f" : "white",
                  padding: 0,
                  height: 18,
                  width: 18,
                  borderRadius: "50% 50% 50% 0",
                  backgroundColor: needToUseDark ? "#001f3f" : "white",
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
            />
            <span>{valueIntensity}</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Blur:`}</span>
            <Slider
              value={valueBlur}
              size="medium"
              onChange={handleChangeBlur}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-blur"
              sx={{
                color: needToUseDark ? "#001f3f" : "white",
                height: 8,
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  height: 18,
                  width: 18,
                  backgroundColor: "#fff",
                  border: "2px solid currentColor",
                  // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  //   boxShadow: "inherit",
                  // },
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&:before": {
                    boxShadow: "0 2px 12px 0 currentColor",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${
                      //theme.palette.mode === 'dark'
                      //? 'rgb(255 255 255 / 16%)'
                      //:
                      "rgb(82	175	119 / 16%)"
                    }`,
                  },
                },
                "& .MuiSlider-valueLabel": {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: "unset",
                  color: !needToUseDark ? "#001f3f" : "white",
                  padding: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50% 50% 50% 0",
                  backgroundColor: needToUseDark ? "#001f3f" : "white",
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
            />
            <span>{valueBlur}px</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 0, px: 1 }}
            alignItems="center"
          >
            <span style={{ paddingBottom: "5px" }}>{`Shape:`}</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack
            spacing={0}
            direction="row"
            alignItems="center"
            style={{
              backgroundColor: needToUseDark
                ? "rgba(0,31,63,0.5)"
                : "rgba(255,255,255,0.6)",
              width: "100%",
              flexWrap: "wrap",
              height: "40px",
              borderRadius: "5px",
            }}
          >
            <button
              style={{
                backgroundColor:
                  shadowType === "flat"
                    ? needToUseDark
                      ? "rgba(0,31,63,1)"
                      : "rgba(255,255,255,1)"
                    : "transparent",
                border: "none",
                textDecoration: "none",
                width: "25%",
                height: "100%",
                borderRadius: "5px 0 0 5px",
              }}
              onClick={() => {
                changeShapeControl("flat");
              }}
            >
              <img
                alt={"flat"}
                src={getSvgToImg(ElementFlat(backgroundColor))}
                style={{ width: "55%" }}
              />
            </button>

            <button
              style={{
                backgroundColor:
                  shadowType === "concave"
                    ? needToUseDark
                      ? "rgba(0,31,63,1)"
                      : "rgba(255,255,255,1)"
                    : "transparent",
                border: "none",
                width: "25%",
                height: "100%",
                textDecoration: "none",
              }}
              onClick={() => {
                changeShapeControl("concave");
              }}
            >
              <img
                alt="concave"
                src={getSvgToImg(ElementConcave(backgroundColor))}
                style={{ width: "55%" }}
              />
            </button>
            <button
              style={{
                backgroundColor:
                  shadowType === "convex"
                    ? needToUseDark
                      ? "rgba(0,31,63,1)"
                      : "rgba(255,255,255,1)"
                    : "transparent",
                border: "none",
                width: "25%",
                height: "100%",
                textDecoration: "none",
              }}
              onClick={() => {
                changeShapeControl("convex");
              }}
            >
              <img
                alt="convex"
                src={getSvgToImg(ElementConvex(backgroundColor))}
                style={{ width: "55%" }}
              />
            </button>
            <button
              style={{
                backgroundColor:
                  shadowType === "pressed"
                    ? needToUseDark
                      ? "rgba(0,31,63,1)"
                      : "rgba(255,255,255,1)"
                    : "transparent",
                border: "none",
                width: "25%",
                height: "100%",
                textDecoration: "none",
                borderRadius: "0 5px 5px 0",
              }}
              onClick={() => {
                changeShapeControl("pressed");
              }}
            >
              <img
                alt="pressed"
                src={getSvgToImg(ElementPressed(backgroundColor))}
                style={{ width: "55%" }}
              />
            </button>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin, marginTop: "5px" }}>
          <Stack
            spacing={1}
            direction="column"
            alignItems="flex-start"
            sx={{ px: 3, py: 2 }}
            style={{
              backgroundColor: needToUseDark
                ? "rgba(0,31,63,0.9)"
                : "rgba(255,255,255,0.9)",
              width: "100%",
              flexWrap: "wrap",
              minWidth: "0px",
              borderRadius: "5px",
              color: backgroundColor,
              fontSize: "0.97rem",
              wordSpacing: "5px",
            }}
          >
            <div>
              {`border-radius: `}
              <span
                style={{
                  marginLeft: "5px",
                  color: !needToUseDark
                    ? "rgba(0,31,63,1)"
                    : "rgba(255,255,255,1)",
                }}
              >{`  ${valueRad}px`}</span>
            </div>
            <div>
              {`background:`}
              <span
                style={{
                  marginLeft: "15px",
                  color: !needToUseDark
                    ? "rgba(0,31,63,1)"
                    : "rgba(255,255,255,1)",
                }}
              >{`${
                shadowType === "flat" || shadowType === "pressed"
                  ? `${backgroundColor}`
                  : `linear-gradient(${shapeColorAngle}, ${shapeColor})`
              }`}</span>
            </div>
            <div>
              {`box-shadow:`}
              <span
                style={{
                  marginLeft: "5px",
                  color: !needToUseDark
                    ? "rgba(0,31,63,1)"
                    : "rgba(255,255,255,1)",
                }}
              >{`${`${shadowType === "pressed" ? "inset" : ""} ${
                darkAngleValue[0]
              }${valueDistance}px ${
                darkAngleValue[1]
              }${valueDistance}px ${valueBlur}px ${darkShadow.toLowerCase()},`}`}</span>
              <span
                style={{
                  marginLeft: "100px",
                  color: !needToUseDark
                    ? "rgba(0,31,63,1)"
                    : "rgba(255,255,255,1)",
                  display: "flex",
                }}
              >{`${shadowType === "pressed" ? "inset" : ""} 
              ${lightAngleValue[0]}${valueDistance}px ${
                lightAngleValue[1]
              }${valueDistance}px ${valueBlur}px ${lightShadow.toLowerCase()}`}</span>
            </div>
          </Stack>
        </Box>
      </>
    );
  };
  const backgroundAndShadow = {
    background:
      shadowType === "flat" || shadowType === "pressed"
        ? `${backgroundColor}`
        : `linear-gradient(${shapeColorAngle},${shapeColor})`,
    boxShadow: `${shadowType === "pressed" ? "inset" : ""} ${
      darkAngleValue[0]
    }${valueDistance}px ${
      darkAngleValue[1]
    }${valueDistance}px ${valueBlur}px ${darkShadow},
                ${shadowType === "pressed" ? "inset" : ""} ${
      lightAngleValue[0]
    }${valueDistance}px ${
      lightAngleValue[1]
    }${valueDistance}px ${valueBlur}px ${lightShadow}`,
  };
  const topLightBoxes = (
    <div
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        height: "30px",
      }}
    >
      <div style={{ ...relativeLayer }}>
        <div
          onClick={() => {
            handleLightSource("topLeft");
          }}
          style={{
            position: "absolute",
            width: "30px",
            height: "100%",
            backgroundColor:
              lightSourcePos === "topLeft" ? "yellow" : "lightGrey",
            left: 0,
            borderRadius: "0 0 50px 0",
            border: `2px solid ${
              needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
            }`,
          }}
        ></div>
        <div
          onClick={() => {
            handleLightSource("topRight");
          }}
          style={{
            position: "absolute",
            width: "30px",
            height: "100%",
            backgroundColor:
              lightSourcePos === "topRight" ? "yellow" : "lightGrey",
            right: 0,
            borderRadius: "0 0 0 50px",
            border: `2px solid ${
              needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
            }`,
          }}
        ></div>
      </div>
    </div>
  );
  const bottomLightBoxes = (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "30px",
      }}
    >
      <div style={{ ...relativeLayer }}>
        <div
          onClick={() => {
            handleLightSource("bottomLeft");
          }}
          style={{
            position: "absolute",
            width: "30px",
            height: "100%",
            backgroundColor:
              lightSourcePos === "bottomLeft" ? "yellow" : "lightGrey",
            left: 0,
            borderRadius: "0 50px 0 0",
            border: `2px solid ${
              needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
            }`,
          }}
        ></div>
        <div
          onClick={() => {
            handleLightSource("bottomRight");
          }}
          style={{
            position: "absolute",
            width: "30px",
            height: "100%",
            backgroundColor:
              lightSourcePos === "bottomRight" ? "yellow" : "lightGrey",
            right: 0,
            borderRadius: "50px 0 0 0",
            border: `2px solid ${
              needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
            }`,
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <>
      <div
        id="arrangeParent"
        style={{
          background: `${backgroundColor}`,
          fontFamily: 'Gilroy'
        }}
      >
        <div id="mainBox">
          <div
            style={{
              ...flex,
              width: "100%",
              height: "100%",
            }}
          >
            {topLightBoxes}
            <div
              style={{
                height: `${valueSize}px`,
                width: `${valueSize}px`,
                transition:
                  "width 0.3s cubic-bezier(.47,1.64,.41,.8), border-radius 0.3s cubic-bezier(.47,1.64,.41,.8)",
                borderRadius: `${valueRad}px`,
                ...backgroundAndShadow,
              }}
            ></div>
            {bottomLightBoxes}
          </div>
        </div>
        <div
          id="configBox"
          style={{
            ...flex,
            color: needToUseDark ? "#001f3f" : "white",
          }}
        >
          <div
            style={{
              ...flex,
              flexDirection: "column",
              width: "99%",
              height: "98%",
              borderRadius: "30px",
              ...backgroundAndShadow,
            }}
          >
            {configElementBox()}
          </div>
        </div>
      </div>
    </>
  );
};

export default NeumorphismBox;
