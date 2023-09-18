import { CustomSlider, PrimaryButton, ClipboardCopy } from "../Component/Component";
import { Stack, useMediaQuery } from "@mui/material";
import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  ElementFlat,
  ElementConcave,
  ElementConvex,
  ElementPressed,
} from "./Element";
import "./NeumorphismBox.css";
import { createTheme } from "@mui/material/styles";
import { needDarkMode, calculateShadow } from "../Utils/Utils";

const NeumorphismBox = (props) => {
  let flex = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  let cssParametersObj = useRef({
    backgroundColor: "#CAE6E8",
    valueSize: "250",
    valueRad: "30",
    valueBlur: "60",
    valueDistance: "23",
    shapeColorAngle: "145deg",
    shapeColor: "",
    shadowType: "flat",
    darkAngleValue: ["", ""],
    lightAngleValue: ["-", "-"],
    lightShadow: "#E8FFFF",
    darkShadow: "#ACC4C5",
    lightInnerShadow: "#E8FFFF",
    darkInnerShadow: "#ACC4C5",
  });

  const [valueSize, setValueSize] = useState(250);
  const [valueRad, setValueRad] = useState(30);
  const [valueRadMax, setValueRadMax] = useState(120);
  const [valueDistance, setValueDistance] = useState(23);
  const [valueIntensity, setValueIntensity] = useState(71);
  const [valueBlur, setValueBlur] = useState(60);
  const [lightAngleValue, setLightAngleValue] = useState(["-", "-"]);
  const [darkAngleValue, setDarkAngleValue] = useState(["", ""]);
  const [lightSourcePos, setLightSourcePos] = useState("topLeft");
  const [shadowType, setShadowType] = useState("flat");
  const [needToUseDark, setNeedToUseDark] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

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
  let textBoxColorPicker = useRef(null);
  let colorPicker = useRef(null);
  let firstLoad = useRef(true);

  const [clipboardText, setClipboardText] = useState(`
  border-radius: ${valueRad}px;
  background: ${shadowType === "flat" || shadowType === "pressed"
      ? `${cssParametersObj.current.backgroundColor};`
      : `linear-gradient(${cssParametersObj.current.shapeColorAngle}, ${cssParametersObj.current.shapeColor});`
    }
  box-shadow: ${`${shadowType === "pressed" ? "inset" : ""} ${darkAngleValue[0]
    }${valueDistance}px ${darkAngleValue[1]}${valueDistance}px ${valueBlur}px ${cssParametersObj.current.darkShadow
    },`}
  ${shadowType === "pressed" ? "inset" : ""} ${lightAngleValue[0]
    }${valueDistance}px ${lightAngleValue[1]}${valueDistance}px ${valueBlur}px ${cssParametersObj.current.lightShadow
    };`);

  useEffect(() => {
    cssParametersObj.current = {
      ...cssParametersObj.current,
      shadowType: shadowType,
    };
    updateDocumentCSS(cssParametersObj.current);
    return () => {
      cssParametersObj = null;
    };
  }, [shadowType]);

  const updateDocumentCSS = ({
    backgroundColor,
    valueSize,
    valueRad,
    valueBlur,
    valueDistance,
    shapeColorAngle,
    shadowType,
    darkAngleValue,
    lightAngleValue,
    lightShadow,
    darkShadow,
    lightInnerShadow,
    darkInnerShadow,
  }) => {
    const getInsetShadowColor = (type) => {
      let lis = lightInnerShadow;
      let dis = darkInnerShadow;

      switch (type) {
        case "flat": {
          return;
        }
        case "concave": {
          let sc = `${dis},${lis}`;
          cssParametersObj.current = {
            ...cssParametersObj.current,
            shadowType: shadowType,
            shapeColor: sc,
          };
          return sc;
        }
        case "convex": {
          let sc = `${lis},${dis}`;
          cssParametersObj.current = {
            ...cssParametersObj.current,
            shadowType: shadowType,
            shapeColor: sc,
          };
          return sc;
        }
        case "pressed": {
          return;
        }
        default:
          break;
      }
    };

    let previewShadow =
      shadowType === "flat" || shadowType === "pressed"
        ? backgroundColor
        : `linear-gradient(${shapeColorAngle},${getInsetShadowColor(
          shadowType
        )})`;

    document.body.style.cssText = `
    --neumorph-height-width: ${valueSize}px;
    --neumorph-borderradius: ${valueRad}px;
    --neumorph-background: ${backgroundColor};
    --neumorph-backgroundCSS: "${previewShadow}";
    --neumorph-previewBackground: ${previewShadow};
    --neumorph-boxShadow:  ${shadowType === "pressed" ? "inset" : ""} ${darkAngleValue[0]
      }${valueDistance}px ${darkAngleValue[1]
      }${valueDistance}px ${valueBlur}px ${darkShadow}, ${shadowType === "pressed" ? "inset" : ""
      } ${lightAngleValue[0]}${valueDistance}px ${lightAngleValue[1]
      }${valueDistance}px ${valueBlur}px ${lightShadow};
   `;
  };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      document.getElementById('clipboardCopy').click();
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
    return null;
  }, [clipboardText])

  const handleClipboardText = () => {
    setClipboardText(`border-radius: ${cssParametersObj.current.valueRad}px;
    background: ${cssParametersObj.current.shadowType === "flat" || cssParametersObj.current.shadowType === "pressed"
        ? `${cssParametersObj.current.backgroundColor};`
        : `linear-gradient(${cssParametersObj.current.shapeColorAngle}, ${cssParametersObj.current.shapeColor});`
      }
    box-shadow: ${`${cssParametersObj.current.shadowType === "pressed" ? "inset" : ""} ${cssParametersObj.current.darkAngleValue[0]
      }${cssParametersObj.current.valueDistance}px ${cssParametersObj.current.darkAngleValue[1]}${cssParametersObj.current.valueDistance}px ${cssParametersObj.current.valueBlur}px ${cssParametersObj.current.darkShadow
      },`}
${cssParametersObj.current.shadowType === "pressed" ? "inset" : ""} ${cssParametersObj.current.lightAngleValue[0]
      }${cssParametersObj.current.valueDistance}px ${cssParametersObj.current.lightAngleValue[1]
      }${cssParametersObj.current.valueDistance}px ${cssParametersObj.current.valueBlur}px ${cssParametersObj.current.lightShadow
      };`);
  };

  const handleChangeSize = (newValue) => {
    let ValueSize = newValue.target.value;
    let RadMax = newValue.target.value / 2;
    let Distance = Math.floor(newValue.target.value / 10);
    let Blur = Math.floor((newValue.target.value / 10) * 1.75);

    setValueSize(ValueSize);
    setValueRadMax(RadMax);
    setValueDistance(Distance);
    setValueBlur(Blur);
    cssParametersObj.current = {
      ...cssParametersObj.current,
      valueSize: ValueSize,
      valueDistance: Distance,
      valueBlur: Blur,
    };
    updateDocumentCSS(cssParametersObj.current);
  };
  const handleChangeRad = (newValue) => {
    setValueRad(newValue.target.value);
    cssParametersObj.current = {
      ...cssParametersObj.current,
      valueRad: newValue.target.value,
    };
    updateDocumentCSS(cssParametersObj.current);
  };
  const handleChangeDistance = (newValue) => {
    cssParametersObj.current = {
      ...cssParametersObj.current,
      valueDistance: newValue.target.value,
    };
    updateDocumentCSS(cssParametersObj.current);
    setValueDistance(newValue.target.value);
  };
  const handleChangeIntensity = (newValue) => {
    const [ls, ds, lis, dis] = calculateShadow(
      cssParametersObj.current.backgroundColor,
      newValue.target.value
    );
    cssParametersObj.current = {
      ...cssParametersObj.current,
      valueIntensity: newValue.target.value,
      lightShadow: ls,
      darkShadow: ds,
      lightInnerShadow: lis,
      darkInnerShadow: dis,
    };
    updateDocumentCSS(cssParametersObj.current);
    setValueIntensity(newValue.target.value);
  };
  const handleChangeBlur = (newValue) => {
    cssParametersObj.current = {
      ...cssParametersObj.current,
      valueBlur: newValue.target.value,
    };
    updateDocumentCSS(cssParametersObj.current);
    setValueBlur(newValue.target.value);
  };
  const handleColorChange = (e) => {
    setNeedToUseDark(needDarkMode(e.target.value));
    const [ls, ds, lis, dis] = calculateShadow(e.target.value, valueIntensity);

    colorPicker.current.value = e.target.value;
    textBoxColorPicker.current.value = e.target.value;

    cssParametersObj.current = {
      ...cssParametersObj.current,
      backgroundColor: e.target.value,
      lightShadow: ls,
      darkShadow: ds,
      lightInnerShadow: lis,
      darkInnerShadow: dis,
    };
    updateDocumentCSS(cssParametersObj.current);
  };
  const handleLightSource = (pos) => {
    setLightSourcePos(pos);
    switch (pos) {
      case "topLeft": {
        let lightAngleValue = ["-", "-"];
        let darkAngleValue = ["", ""];
        let shapeColorAngle = "145deg";
        setLightAngleValue(lightAngleValue);
        setDarkAngleValue(darkAngleValue);
        cssParametersObj.current = {
          ...cssParametersObj.current,
          lightAngleValue,
          darkAngleValue,
          shapeColorAngle,
        };
        updateDocumentCSS(cssParametersObj.current);
        break;
      }
      case "topRight": {
        let lightAngleValue = ["", "-"];
        let darkAngleValue = ["-", ""];
        let shapeColorAngle = "225deg";
        setLightAngleValue(lightAngleValue);
        setDarkAngleValue(darkAngleValue);
        cssParametersObj.current = {
          ...cssParametersObj.current,
          lightAngleValue,
          darkAngleValue,
          shapeColorAngle,
        };
        updateDocumentCSS(cssParametersObj.current);
        break;
      }
      case "bottomLeft": {
        let lightAngleValue = ["-", ""];
        let darkAngleValue = ["", "-"];
        let shapeColorAngle = "45deg";
        setLightAngleValue(lightAngleValue);
        setDarkAngleValue(darkAngleValue);
        cssParametersObj.current = {
          ...cssParametersObj.current,
          lightAngleValue,
          darkAngleValue,
          shapeColorAngle,
        };
        updateDocumentCSS(cssParametersObj.current);
        break;
      }
      case "bottomRight": {
        let lightAngleValue = ["", ""];
        let darkAngleValue = ["-", "-"];
        let shapeColorAngle = "315deg";
        setLightAngleValue(lightAngleValue);
        setDarkAngleValue(darkAngleValue);
        cssParametersObj.current = {
          ...cssParametersObj.current,
          lightAngleValue,
          darkAngleValue,
          shapeColorAngle,
        };
        updateDocumentCSS(cssParametersObj.current);
        break;
      }
      default:
        return null;
    }
  };
  const configElementBox = () => {
    return (
      <>
        <div className="configChildRow">
          <Stack spacing={2} direction="row" sx={{ px: 1 }} alignItems="center">
            <span>{`Pick a color: `}</span>
            <input
              ref={colorPicker}
              defaultValue="#CAE6E8"
              type="color"
              style={{ border: "none", borderRadius: "5px", padding: "none" }}
              onChange={(e) => handleColorChange(e)}
            />
            <span>{`or`}</span>
            <input
              type="text"
              ref={textBoxColorPicker}
              defaultValue="#CAE6E8"
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
              onChange={(e) => {
                handleChangeSize(e);
              }}
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setShadowType("flat");
              }}
            >
              <div style={{ width: "55%" }}>
                <ElementFlat />
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setShadowType("concave");
              }}
            >
              <div style={{ width: "55%" }}>
                <ElementConcave />
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setShadowType("convex");
              }}
            >
              <div style={{ width: "55%" }}>
                <ElementConvex />
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setShadowType("pressed");
              }}
            >
              <div style={{ width: "55%" }}>
                <ElementPressed />
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
            id="ClipboardCSS"
            style={{
              backgroundColor: needToUseDark
                ? "rgba(0,31,63,0.9)"
                : "rgba(255,255,255,0.9)",
              width: "100%",
              flexWrap: "wrap",
              minWidth: "0px",
              borderRadius: "5px",
              fontSize: "0.97rem",
              wordSpacing: "5px",
            }}
          >
            <div className="wrapCSS">
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
            <div className="wrapCSS">
              {`background:`}
              <span
                id="ClipboardCSSBackgroundValue"
                style={{
                  marginLeft: "15px",
                  color: !needToUseDark
                    ? "rgba(0,31,63,1)"
                    : "rgba(255,255,255,1)",
                }}
              ></span>
            </div>
            <div className="wrapCSS">
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
                }${valueDistance}px ${valueBlur}px ${cssParametersObj.current.darkShadow.toLowerCase()},`}`}</span>
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
                }${valueDistance}px ${valueBlur}px ${cssParametersObj.current.lightShadow.toLowerCase()};`}</span>
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
              fontSize: "0.97rem",
              wordSpacing: "5px",
            }}
          >
            <PrimaryButton
              onClick={handleClipboardText}
              disableElevation
              variant="contained"
              size="small"
            >
              <span>{isCopied ? "Copied!" : "Copy"}</span>
            </PrimaryButton>
            <ClipboardCopy id="clipboardCopy" copyText={clipboardText} hidden />
          </Stack>
        </div>
      </>
    );
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
          minHeight: "699px"
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
            Neumorphism UI
          </span>
          <span>soft shadow style</span>
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
