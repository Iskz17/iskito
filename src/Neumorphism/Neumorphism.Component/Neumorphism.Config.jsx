import {
  CustomSlider,
  PrimaryButton,
  ClipboardCopy,
} from "../../Component/Component";
import { Stack } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import {
  ElementFlat,
  ElementConcave,
  ElementConvex,
  ElementPressed,
} from "./Neumorphism.Component";

export const ConfigBox = ({
  updateDocumentCSS,
  cssParametersObj,
  handleColorChange,
  handleChangeBlur,
  handleChangeDistance,
  handleChangeIntensity,
  handleChangeRad,
  handleChangeSize,
  colorPicker,
  textBoxColorPicker,
  needToUseDark,
  valueSize,
  valueRad,
  valueRadMax,
  valueDistance,
  valueBlur,
  valueIntensity,
  lightAngleValue,
  darkAngleValue,
}) => {
  let firstLoad = useRef(true);

  const [shadowType, setShadowType] = useState("flat");
  const [isCopied, setIsCopied] = useState(false);
  const [clipboardText, setClipboardText] = useState(`
  border-radius: ${valueRad}px;
  background: ${
    shadowType === "flat" || shadowType === "pressed"
      ? `${cssParametersObj.current.backgroundColor};`
      : `linear-gradient(${cssParametersObj.current.shapeColorAngle}, ${cssParametersObj.current.shapeColor});`
  }
  box-shadow: ${`${shadowType === "pressed" ? "inset" : ""} ${
    darkAngleValue[0]
  }${valueDistance}px ${darkAngleValue[1]}${valueDistance}px ${valueBlur}px ${
    cssParametersObj.current.darkShadow
  },`}
  ${shadowType === "pressed" ? "inset" : ""} ${
    lightAngleValue[0]
  }${valueDistance}px ${lightAngleValue[1]}${valueDistance}px ${valueBlur}px ${
    cssParametersObj.current.lightShadow
  };`);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      document.getElementById("clipboardCopy").click();
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
    return null;
  }, [clipboardText]);

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

  const handleClipboardText = () => {
    setClipboardText(`border-radius: ${cssParametersObj.current.valueRad}px;
    background: ${
      cssParametersObj.current.shadowType === "flat" ||
      cssParametersObj.current.shadowType === "pressed"
        ? `${cssParametersObj.current.backgroundColor};`
        : `linear-gradient(${cssParametersObj.current.shapeColorAngle}, ${cssParametersObj.current.shapeColor});`
    }
    box-shadow: ${`${
      cssParametersObj.current.shadowType === "pressed" ? "inset" : ""
    } ${cssParametersObj.current.darkAngleValue[0]}${
      cssParametersObj.current.valueDistance
    }px ${cssParametersObj.current.darkAngleValue[1]}${
      cssParametersObj.current.valueDistance
    }px ${cssParametersObj.current.valueBlur}px ${
      cssParametersObj.current.darkShadow
    },`}
${cssParametersObj.current.shadowType === "pressed" ? "inset" : ""} ${
      cssParametersObj.current.lightAngleValue[0]
    }${cssParametersObj.current.valueDistance}px ${
      cssParametersObj.current.lightAngleValue[1]
    }${cssParametersObj.current.valueDistance}px ${
      cssParametersObj.current.valueBlur
    }px ${cssParametersObj.current.lightShadow};`);
  };

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
              border: "3px solid white",
              textAlign: "center",
              fontSize: "12px",
              borderRadius: "5px",
              fontFamily:'Gilroy'
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
          alignItems="center">
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
          }}>
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
            }}>
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
            }}>
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
            }}>
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
            }}>
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
          }}>
          <div className="wrapCSS">
            {`border-radius: `}
            <span
              style={{
                marginLeft: "5px",
                color: !needToUseDark
                  ? "rgba(0,31,63,1)"
                  : "rgba(255,255,255,1)",
              }}>{`  ${valueRad}px;`}</span>
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
              }}></span>
          </div>
          <div className="wrapCSS">
            {`box-shadow:`}
            <span
              style={{
                marginLeft: "5px",
                color: !needToUseDark
                  ? "rgba(0,31,63,1)"
                  : "rgba(255,255,255,1)",
              }}>{`${`${shadowType === "pressed" ? "inset" : ""} ${
              darkAngleValue[0]
            }${valueDistance}px ${
              darkAngleValue[1]
            }${valueDistance}px ${valueBlur}px ${cssParametersObj.current.darkShadow.toLowerCase()},`}`}</span>
            <span
              style={{
                marginLeft: "100px",
                color: !needToUseDark
                  ? "rgba(0,31,63,1)"
                  : "rgba(255,255,255,1)",
                display: "flex",
              }}>{`${shadowType === "pressed" ? "inset" : ""} 
              ${lightAngleValue[0]}${valueDistance}px ${
              lightAngleValue[1]
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
          }}>
          <PrimaryButton
            onClick={handleClipboardText}
            disableElevation
            variant="contained"
            size="small">
            <span>{isCopied ? "Copied!" : "Copy"}</span>
          </PrimaryButton>
          <ClipboardCopy id="clipboardCopy" copyText={clipboardText} hidden />
        </Stack>
      </div>
    </>
  );
};
