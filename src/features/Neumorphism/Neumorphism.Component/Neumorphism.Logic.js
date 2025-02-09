import { useState } from "react";
import { needDarkMode, calculateShadow } from "../../../Utils/Utils";

const NeumorphismLogic = (
  cssParametersObj,
  colorPicker,
  textBoxColorPicker
) => {
  const [valueSize, setValueSize] = useState(250);
  const [valueRad, setValueRad] = useState(30);
  const [valueRadMax, setValueRadMax] = useState(120);
  const [valueDistance, setValueDistance] = useState(23);
  const [valueIntensity, setValueIntensity] = useState(71);
  const [valueBlur, setValueBlur] = useState(60);
  const [lightAngleValue, setLightAngleValue] = useState(["-", "-"]);
  const [darkAngleValue, setDarkAngleValue] = useState(["", ""]);
  const [lightSourcePos, setLightSourcePos] = useState("topLeft");
  const [needToUseDark, setNeedToUseDark] = useState(true);

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

    let globalPlacement = document.getElementById("globalPlacement");

    globalPlacement.style.cssText = `
        --neumorph-height-width: ${valueSize}px;
        --neumorph-borderradius: ${valueRad}px;
        --neumorph-background: ${backgroundColor};
        --neumorph-backgroundCSS: "${previewShadow}";
        --neumorph-previewBackground: ${previewShadow};
        --neumorph-boxShadow:  ${shadowType === "pressed" ? "inset" : ""} ${
      darkAngleValue[0]
    }${valueDistance}px ${
      darkAngleValue[1]
    }${valueDistance}px ${valueBlur}px ${darkShadow}, ${
      shadowType === "pressed" ? "inset" : ""
    } ${lightAngleValue[0]}${valueDistance}px ${
      lightAngleValue[1]
    }${valueDistance}px ${valueBlur}px ${lightShadow};
       `;
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
  const handleColorChange = (value) => {
    setNeedToUseDark(needDarkMode(value));
    const [ls, ds, lis, dis] = calculateShadow(value, valueIntensity);

    colorPicker.current.value = value;
    textBoxColorPicker.current.value = value;

    cssParametersObj.current = {
      ...cssParametersObj.current,
      backgroundColor: value,
      lightShadow: ls,
      darkShadow: ds,
      lightInnerShadow: lis,
      darkInnerShadow: dis,
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(()=> {
        updateDocumentCSS(cssParametersObj.current);
      });
    });
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

  return {
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
  };
};

export default NeumorphismLogic;
