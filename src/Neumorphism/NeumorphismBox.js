import { Title } from "../Component/Component";
import { useMediaQuery } from "@mui/material";
import React, { useRef } from "react";
import {
  TopLightBoxes,
  BottomLightBoxes,
  ConfigBox,
} from "./Neumorphism.Component/Neumorphism.Component";
import "./NeumorphismBox.css";
import { createTheme } from "@mui/material/styles";
import NeumorphismLogic from "./Neumorphism.Component/Neumorphism.Logic";

const NeumorphismBox = (props) => {
  let textBoxColorPicker = useRef(null);
  let colorPicker = useRef(null);

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

  let {
    updateDocumentCSS,
    handleChangeSize,
    handleChangeRad,
    handleChangeDistance,
    handleChangeIntensity,
    handleChangeBlur,
    handleColorChange,
    handleLightSource,
    valueRad,
    valueDistance,
    darkAngleValue,
    valueBlur,
    valueSize,
    valueRadMax,
    valueIntensity,
    lightAngleValue,
    lightSourcePos,
    needToUseDark,
  } = NeumorphismLogic(cssParametersObj, colorPicker, textBoxColorPicker);

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

  return (
    <>
      <div id="globalPlacement">
        <div
          id="arrangeParent"
          style={{
            fontFamily: "Gilroy",
            color: `${needToUseDark ? "#001f3f" : "white"}`,
            height: matches ? "unset" : "100vh",
            minHeight: "699px",
          }}
        >
          <Title title={"Neumorphism UI"} description={"soft shadow style"} />
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
                <TopLightBoxes
                  handleLightSource={handleLightSource}
                  lightSourcePos={lightSourcePos}
                  needToUseDark={needToUseDark}
                />
                <div className="insideTargetBox"></div>
                <BottomLightBoxes
                  handleLightSource={handleLightSource}
                  lightSourcePos={lightSourcePos}
                  needToUseDark={needToUseDark}
                />
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
                <ConfigBox
                  updateDocumentCSS={updateDocumentCSS}
                  cssParametersObj={cssParametersObj}
                  handleColorChange={handleColorChange}
                  handleChangeBlur={handleChangeBlur}
                  handleChangeDistance={handleChangeDistance}
                  handleChangeIntensity={handleChangeIntensity}
                  handleChangeRad={handleChangeRad}
                  handleChangeSize={handleChangeSize}
                  colorPicker={colorPicker}
                  textBoxColorPicker={textBoxColorPicker}
                  needToUseDark={needToUseDark}
                  valueSize={valueSize}
                  valueRad={valueRad}
                  valueRadMax={valueRadMax}
                  valueDistance={valueDistance}
                  valueBlur={valueBlur}
                  valueIntensity={valueIntensity}
                  lightAngleValue={lightAngleValue}
                  darkAngleValue={darkAngleValue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NeumorphismBox;
