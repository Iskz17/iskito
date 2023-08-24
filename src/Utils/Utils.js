import React, { useCallback } from "react";

export function IsNullOrUndefined(input) {
  return Object.is(input, undefined) || Object.is(input, null);
}

export const getSvgToImg = (el) => {
  return URL.createObjectURL(
    new Blob([el], {
      type: "image/svg+xml",
    })
  );
};

const luminance = (r, g, b) => {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};
const whiteLum = luminance(255, 255, 255);

export const convertHexToRGB = (hex) => {
  const red = parseInt(hex.substr(1, 2), 16);
  const green = parseInt(hex.substr(3, 2), 16);
  const blue = parseInt(hex.substr(5, 2), 16);
  return [red, green, blue];
};

export const convertRgbToHex = (r, g, b) => {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

export const needDarkMode = (hex) => {
  const [r, g, b] = convertHexToRGB(hex);
  var lum2 = luminance(r, g, b);
  var brightest = Math.max(whiteLum, lum2);
  var darkest = Math.min(whiteLum, lum2);
  return (brightest + 0.05) / (darkest + 0.05) < 2;
};

export const calculateShadow = (
  backgroundColor,
  intensity
) => {
  const color = backgroundColor ?? "#CAE6E8";
  const [red, green, blue] = convertHexToRGB(color);

  let maxRRatioL = 1.59;
  let maxGRatioL = 1.60344;
  let maxBRatioL = 1.59663;
  let darkRatio = 0.4;
  let lightInnerRatio = 1.0714;
  let darkInnerRatio = 0.902;
  let darkIntensity = (100 / (intensity - 25)) * darkRatio;

  const colorGuard = (num) => {
    if (num < 0) {
      return 0;
    }
    if (num > 255) {
      return 255;
    }
    return num;
  };

  // const returnRgb = (r, g, b) => `rgb(${r},${g},${b})`;
  const returnRgb = (r, g, b) => convertRgbToHex(r,g,b);

  const outerLightShadow = () => {

    let r = colorGuard(Math.round(red * (intensity / 100) * maxRRatioL));
    let g = colorGuard(Math.round(green * (intensity / 100) * maxGRatioL));
    let b = colorGuard(Math.round(blue * (intensity / 100) * maxBRatioL));
    return returnRgb(r, g, b);
  };

  const outerDarkShadow = () => {
    const maxShadowGuard = (num) => {
      if (num > 1) {
        return 1;
      }
      return num;
    };

    let checkedIntensity = maxShadowGuard(darkIntensity);

    let r = Math.round(colorGuard(red * checkedIntensity));
    let g = Math.round(colorGuard(green * checkedIntensity));
    let b = Math.round(colorGuard(blue * checkedIntensity));
    return returnRgb(r, g, b);
  };

  const innerLightShadow = () => {
    let r = Math.round(colorGuard(red * lightInnerRatio));
    let g = Math.round(colorGuard(green * lightInnerRatio));
    let b = Math.round(colorGuard(blue * lightInnerRatio));
    return returnRgb(r, g, b);
  };

  const innerDarkShadow = () => {
    let r = Math.round(colorGuard(red * darkInnerRatio));
    let g = Math.round(colorGuard(green * darkInnerRatio));
    let b = Math.round(colorGuard(blue * darkInnerRatio));
    return returnRgb(r, g, b);
  };


  return [
    outerLightShadow(),
    outerDarkShadow(),
    innerLightShadow(),
    innerDarkShadow(),
  ];
};
