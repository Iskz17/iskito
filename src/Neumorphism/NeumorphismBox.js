import CustomSlider from "../Component/Slider/CustomSlider";
import Stack from "@mui/material/Stack";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  ElementFlat,
  ElementConcave,
  ElementConvex,
  ElementPressed,
} from "./Element";
import "./NeumorphismBox.css";
import { ClipboardCopy } from "../CopyToClipboard/Clipboard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";
import { needDarkMode, calculateShadow } from "../Utils/Utils";

const NeumorphismBox = () => {
  let flex = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [valueSize, setValueSize] = useState(300);
  const [backgroundColor, setBackgroundColor] = useState("#CAE6E8");
  const [lightShadow, setLightShadow] = useState("#E8FFFF");
  const [darkShadow, setDarkShadow] = useState("#ACC4C5");
  const [lightInnerShadow, setLightInnerShadow] = useState("#E8FFFF");
  const [darkInnerShadow, setDarkInnerShadow] = useState("#ACC4C5");
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

  useEffect(() => {
    setNeedToUseDark(needDarkMode(backgroundColor));
    const [ls, ds, lis, dis] = calculateShadow(backgroundColor, valueIntensity);
    setLightShadow(ls);
    setDarkShadow(ds);
    setLightInnerShadow(lis);
    setDarkInnerShadow(dis);
  }, [backgroundColor, valueIntensity]);

  useEffect(() => {
    if (shadowType === "flat" || shadowType === "pressed") {
      return;
    }

    switch (shadowType) {
      case "flat": {
        return;
      }
      case "concave": {
        setShapeColor(`${darkInnerShadow}, ${lightInnerShadow}`);
        return;
      }
      case "convex": {
        setShapeColor(`${lightInnerShadow}, ${darkInnerShadow}`);
        return;
      }
      case "pressed": {
        return;
      }
      default:
        break;
    }
  }, [shadowType, darkInnerShadow, lightInnerShadow]);

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

  const configElementBox = useCallback(() => {
    return (
      <>
        <div className="configChildRow">
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
        </div>
        <div className="configChildRow">
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Size:`}</span>
            <CustomSlider
              overridedarkmode={true}
              darkmodevalue={!needToUseDark}
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
        </div>
        <div className="configChildRow">
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Radius:`}</span>
            <CustomSlider
              overridedarkmode={true}
              darkmodevalue={!needToUseDark}
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
        </div>
        <div className="configChildRow">
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Distance:`}</span>
            <CustomSlider
              overridedarkmode={true}
              darkmodevalue={!needToUseDark}
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
        </div>
        <div className="configChildRow">
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Intensity:`}</span>
            <CustomSlider
              overridedarkmode={true}
              darkmodevalue={!needToUseDark}
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
        </div>
        <div className="configChildRow">
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Blur:`}</span>
            <CustomSlider
              overridedarkmode={true}
              darkmodevalue={!needToUseDark}
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
        </div>
        <div className="configChildRow">
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 0, px: 1 }}
            alignItems="center"
          >
            <span style={{ paddingBottom: "5px" }}>{`Shape:`}</span>
          </Stack>
        </div>
        <div className="configChildRow">
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={() => {
                setShadowType("flat");
              }}
            >
              <div style={{ width: "55%" }}>
                <ElementFlat backgroundColor={backgroundColor} />
              </div>
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={() => {
                setShadowType("concave");
              }}
            >
              <div style={{ width: "55%" }}>
                <ElementConcave backgroundColor={backgroundColor} />
              </div>
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={() => {
                setShadowType("convex");
              }}
            >
              <div style={{ width: "55%" }}>
                <ElementConvex backgroundColor={backgroundColor} />
              </div>
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={() => {
                setShadowType("pressed");
              }}
            >
              <div style={{ width: "55%" }}>
                <ElementPressed backgroundColor={backgroundColor} />
              </div>
            </button>
          </Stack>
        </div>
        <div className="configChildRow" style={{ marginTop: "5px" }}>
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
              >{`${shadowType === "flat" || shadowType === "pressed"
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
              >{`${`${shadowType === "pressed" ? "inset" : ""} ${darkAngleValue[0]
                }${valueDistance}px ${darkAngleValue[1]
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
              ${lightAngleValue[0]}${valueDistance}px ${lightAngleValue[1]
                }${valueDistance}px ${valueBlur}px ${lightShadow.toLowerCase()};`}</span>
            </div>
          </Stack>
        </div>
        <div className="configChildRow" style={{ marginTop: "5px" }}>
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
              background: ${shadowType === "flat" || shadowType === "pressed"
                  ? `${backgroundColor};`
                  : `linear-gradient(${shapeColorAngle}, ${shapeColor});`
                }
              box-shadow: ${`${shadowType === "pressed" ? "inset" : ""} ${darkAngleValue[0]
                }${valueDistance}px ${darkAngleValue[1]
                }${valueDistance}px ${valueBlur}px ${darkShadow.toLowerCase()},`}
              ${shadowType === "pressed" ? "inset" : ""} 
              ${lightAngleValue[0]}${valueDistance}px ${lightAngleValue[1]
                }${valueDistance}px ${valueBlur}px ${lightShadow.toLowerCase()};`}
            />
          </Stack>
        </div>
      </>
    );
  }, [
    backgroundColor,
    valueSize,
    valueRad,
    valueRadMax,
    valueDistance,
    valueIntensity,
    valueBlur,
    needToUseDark,
    shadowType,
    shapeColorAngle,
    shapeColor,
    darkAngleValue,
    darkShadow,
    lightAngleValue,
    lightShadow,
  ]);

  document.body.style.cssText = `
  --neumorph-height-width: ${valueSize}px;
  --neumorph-borderradius: ${valueRad}px;
  --neumorph-background: ${backgroundColor};
  --neumorph-previewBackground: ${shadowType === "flat" || shadowType === "pressed"
      ? `${backgroundColor};`
      : `linear-gradient(${shapeColorAngle},${shapeColor});`
    }
  --neumorph-boxShadow:  ${shadowType === "pressed" ? "inset" : ""} ${darkAngleValue[0]
    }${valueDistance}px 
                         ${darkAngleValue[1]
    }${valueDistance}px ${valueBlur}px ${darkShadow},
                         ${shadowType === "pressed" ? "inset" : ""} ${lightAngleValue[0]
    }${valueDistance}px ${lightAngleValue[1]
    }${valueDistance}px ${valueBlur}px ${lightShadow};
 `;

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
        <div className="relativeLayer">
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
              border: `2px solid ${needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
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
              border: `2px solid ${needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
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
        <div className="relativeLayer">
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
              border: `2px solid ${needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
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
              border: `2px solid ${needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
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
          fontFamily: "Gilroy",
          color: `${needToUseDark ? "#001f3f" : "white"}`,
          height: matches ? "unset" : "100vh",
        }}
      >
        <Stack
          style={{ width: "100%" }}
          spacing={1}
          direction="column"
          sx={{ py: 2 }}
          alignItems="center"
          justifyContent={"center"}
        >
          <span style={{ fontSize: "2em", fontWeight: 900 }}>
            Neumorphism.io clone
          </span>
          <span>from scratch project</span>
        </Stack>
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
              <div className="insideTargetBox"></div>
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
