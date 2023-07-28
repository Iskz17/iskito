import Box from "@mui/material/Box";
import CustomSlider from "../Component/Slider/CustomSlider";
import Stack from "@mui/material/Stack";
import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  ElementFlat,
  ElementConcave,
  ElementConvex,
  ElementPressed,
} from "./Element";
import "./NeumorphismBox.css";
import { pSBC } from "./PBSC";
import { ClipboardCopy } from "../CopyToClipboard/Clipboard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, createTheme } from "@mui/material/styles";

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

  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 940,
        laptop: 1024,
        desktop: 1200,
      },
    },
  });
  const matches = useMediaQuery(theme.breakpoints.down("tablet"));

  let PBSCCal = useCallback((p0, color) => {
    return pSBC(p0, color, "c");
  }, []);

  useMemo(() => {
    let luminance = (r, g, b) => {
      var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.039 ? v / 12.9 : Math.pow((v + 0.05) / 1.05, 2.4);
      });
      return a[0] * 0.21 + a[1] * 0.71 + a[2] * 0.07;
    };

    let contrast = (rgb1, rgb2) => {
      var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
      var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
      var brightest = Math.max(lum1, lum2);
      var darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    };

    const changeControlFlow = () => {
      let rgbConverted = PBSCCal(0, backgroundColor, "c");
      let rgbToPass = rgbConverted
        .replaceAll("rgb", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .split(",");
      if (
        contrast(
          [255, 255, 255],
          [
            parseInt(rgbToPass[0]),
            parseInt(rgbToPass[1]),
            parseInt(rgbToPass[2]),
          ]
        ) < 2
      ) {
        setNeedToUseDark(true);
      } else {
        setNeedToUseDark(false);
      }
      let maxRRatio = 1.59;
      let maxGRatio = 1.6;
      let maxBRatio = 1.59;

      const colorGuard = (num) => {
        if (num > 255) {
          return 255;
        }
        return num;
      };

      let r = colorGuard(
        parseInt(rgbToPass[0]) * (maxRRatio * (valueIntensity / 100))
      );
      let g = colorGuard(
        parseInt(rgbToPass[1]) * (maxGRatio * (valueIntensity / 100))
      );
      let b = colorGuard(
        parseInt(rgbToPass[2]) * (maxBRatio * (valueIntensity / 100))
      );
      return PBSCCal(0, `rgb(${r},${g},${b})`);
    };

    const changeControlFlowDark = () => {
      let rgbConverted = PBSCCal(0, backgroundColor);
      let rgbToPass = rgbConverted
        .replaceAll("rgb", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .split(",");

      let maxRRatio = 0.4;
      let maxGRatio = 0.39;
      let maxBRatio = 0.4;
      const colorGuard = (num) => {
        if (num < 0) {
          return 0;
        }
        return num;
      };

      const maxShadowGuard = (num, type) => {
        if (type === "r") {
          if (num > 1) {
            return 1;
          }
          return num;
        }
        if (type === "g") {
          if (num > 1) {
            return 1;
          }
          return num;
        }
        if (type === "b") {
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
      return PBSCCal(0, `rgb(${r},${g},${b})`, "c");
    };

    setLightShadow(changeControlFlow());
    setDarkShadow(changeControlFlowDark());
  }, [backgroundColor, valueIntensity]);

  useMemo(() => {
    if (shadowType === "flat" || shadowType === "pressed") {
      return;
    }
    let rgbConverted = PBSCCal(0, backgroundColor);
    let rgbToPass = rgbConverted
      .replaceAll("rgb", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(",");
    let lightRatio = 1.07;
    let darkRatio = 0.9;

    const colorGuard = (num) => {
      if (num < 0) {
        return 0;
      }
      if (num > 255) {
        return 255;
      }
      return num;
    };

    let rLight = colorGuard(parseInt(rgbToPass[0]) * lightRatio);
    let gLight = colorGuard(parseInt(rgbToPass[1]) * lightRatio);
    let bLight = colorGuard(parseInt(rgbToPass[2]) * lightRatio);

    let rDark = colorGuard(parseInt(rgbToPass[0]) * darkRatio);
    let gDark = colorGuard(parseInt(rgbToPass[1]) * darkRatio);
    let bDark = colorGuard(parseInt(rgbToPass[2]) * darkRatio);

    switch (shadowType) {
      case "flat": {
        return;
      }
      case "concave": {
        setShapeColor(
          `${PBSCCal(0, `rgb(${rDark},${gDark},${bDark})`)},  ${PBSCCal(
            0,
            `rgb(${rLight},${gLight},${bLight})`,
            "c"
          )}`
        );
        return;
      }
      case "convex": {
        setShapeColor(
          ` ${PBSCCal(0, `rgb(${rLight},${gLight},${bLight})`)}, ${PBSCCal(
            0,
            `rgb(${rDark},${gDark},${bDark})`
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
  }, [shadowType, backgroundColor]);

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
  };
  const handleChangeBlur = (newValue) => {
    setValueBlur(newValue.target.value);
  };
  const handleColorChange = (e) => {
    setBackgroundColor(e.target.value);
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

  const configElementBox = useCallback(() => {
    return (
      <>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Pick a color: `}</span>
            <input
              type="color"
              style={{ border: "none", borderRadius: "5px", padding: "none" }}
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
                fontSize: "12px",
                borderRadius: "5px",
              }}
              onChange={(e) => handleColorChange(e)}
            />
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Size:`}</span>
            <CustomSlider
              value={valueSize}
              size="medium"
              onChange={handleChangeSize}
              min={12}
              max={410}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-size"
            />
            <span>{valueSize}px</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Radius:`}</span>
            <CustomSlider
              value={valueRad}
              size="medium"
              onChange={handleChangeRad}
              min={0}
              max={valueRadMax}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-radius"
            />
            <span>{valueRad}px</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Distance:`}</span>
            <CustomSlider
              value={valueDistance}
              size="medium"
              onChange={handleChangeDistance}
              min={0}
              max={50}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-distance"
            />
            <span>{valueDistance}px</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Intensity:`}</span>
            <CustomSlider
              value={valueIntensity}
              size="medium"
              onChange={handleChangeIntensity}
              min={62}
              max={100}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-intensity"
            />
            <span>{valueIntensity}</span>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin }}>
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Blur:`}</span>
            <CustomSlider
              value={valueBlur}
              size="medium"
              onChange={handleChangeBlur}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider-blur"
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
                setShadowType("flat");
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
                setShadowType("concave");
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
                setShadowType("convex");
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
                setShadowType("pressed");
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
              >{`  ${valueRad}px;`}</span>
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
                  ? `${backgroundColor};`
                  : `linear-gradient(${shapeColorAngle}, ${shapeColor});`
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
              }${valueDistance}px ${valueBlur}px ${lightShadow.toLowerCase()};`}</span>
            </div>
          </Stack>
        </Box>
        <Box style={{ width: "80%", ...settingMargin, marginTop: "5px" }}>
          <Stack
            spacing={0}
            direction="column"
            alignItems="flex-start"
            style={{
              width: "100%",
              flexWrap: "wrap",
              minWidth: "0px",
              borderRadius: "5px",
              color: backgroundColor,
              fontSize: "0.97rem",
              wordSpacing: "5px",
            }}
          >
            <ClipboardCopy
              copyText={`
              border-radius: ${valueRad}px;
              background: ${
                shadowType === "flat" || shadowType === "pressed"
                  ? `${backgroundColor};`
                  : `linear-gradient(${shapeColorAngle}, ${shapeColor});`
              }
              box-shadow: ${`${shadowType === "pressed" ? "inset" : ""} ${
                darkAngleValue[0]
              }${valueDistance}px ${
                darkAngleValue[1]
              }${valueDistance}px ${valueBlur}px ${darkShadow.toLowerCase()},`}
              ${shadowType === "pressed" ? "inset" : ""} 
              ${lightAngleValue[0]}${valueDistance}px ${
                lightAngleValue[1]
              }${valueDistance}px ${valueBlur}px ${lightShadow.toLowerCase()};`}
            />
          </Stack>
        </Box>
      </>
    );
  }, [
    backgroundColor,
    shadowType,
    valueDistance,
    valueBlur,
    valueIntensity,
    valueSize,
    valueRad,
  ]);

  document.body.style.cssText = `
     --neumorph-height-width: ${valueSize}px;
     --neumorph-borderradius: ${valueRad}px;
     --neumorph-background: ${
       shadowType === "flat" || shadowType === "pressed"
         ? `${backgroundColor};`
         : `linear-gradient(${shapeColorAngle},${shapeColor});`
     }
     --neumorph-boxShadow:  ${shadowType === "pressed" ? "inset" : ""} ${darkAngleValue[0]}${valueDistance}px 
                            ${darkAngleValue[1]}${valueDistance}px ${valueBlur}px ${darkShadow},
                            ${shadowType === "pressed" ? "inset" : ""} ${lightAngleValue[0]}${valueDistance}px ${lightAngleValue[1]}${valueDistance}px ${valueBlur}px ${lightShadow};
    `;
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

  const topLightBoxes = useMemo(
    () => (
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
    ),
    [lightSourcePos, needToUseDark]
  );
  const bottomLightBoxes = useMemo(
    () => (
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
    ),
    [lightSourcePos, needToUseDark]
  );

  return (
    <>
      <div
        id="arrangeParent"
        style={{
          background: `${backgroundColor}`,
          fontFamily: "Gilroy",
        }}
      >
        <div
          id="title"
          style={{
            ...flex,
            flexDirection: "column",
            color: `${needToUseDark ? "#001f3f" : "white"}`,
            width: "100%",
            paddingTop: "20px",
          }}
        >
          <span style={{ fontSize: "2em", fontWeight: 900 }}>
            Neumorphism.io clone
          </span>
          <span>from scratch project</span>
        </div>
        <div
          id="content"
          style={{
            ...flex,
            width: "100%",
            height: "100%",
            marginTop: "-20px",
            gap: "20px",
            flexDirection: matches ? "column" : "row",
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
              className="insideTargetBox"
              ></div>
              {bottomLightBoxes}
            </div>
          </div>
          <div
            id="configBox"
            style={{
              ...flex,
              color: needToUseDark ? "#001f3f" : "white"
            }}
          >
            <div
            className="insideConfigBox"
              style={{
                ...flex,
              }}
            >
              {configElementBox()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NeumorphismBox;
