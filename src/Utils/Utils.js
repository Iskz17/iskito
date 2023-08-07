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
    return v <= 0.039 ? v / 12.9 : Math.pow((v + 0.05) / 1.05, 2.4);
  });
  return a[0] * 0.21 + a[1] * 0.71 + a[2] * 0.07;
};
const whiteLum = luminance(255, 255, 255);

export const convertHexToRGB = (hex) => {
  const red = parseInt(hex.substr(1, 2), 16);
  const green = parseInt(hex.substr(3, 2), 16);
  const blue = parseInt(hex.substr(5, 2), 16);
  return [red, green, blue];
};

export const needDarkMode = (hex) => {
  const [r, g, b] = convertHexToRGB(hex);
  var lum2 = luminance(r, g, b);
  var brightest = Math.max(whiteLum, lum2);
  var darkest = Math.min(whiteLum, lum2);
  return (brightest + 0.05) / (darkest + 0.05) < 2;
};

export const calculateShadow = async (
  backgroundColor,
  intensity,
  setLightShadow,
  setDarkShadow,
  setLightInnerShadow,
  setDarkInnerShadow
) => {
  const color = backgroundColor ?? "#CAE6E8";
  const [red, green, blue] = convertHexToRGB(color);

  let lightRatio = 1.6;
  let darkRatio = 0.4;
  let lightInnerRatio = 1.1;
  let darkInnerRatio = 0.9;
  let lightIntensity = (intensity / 100) * lightRatio;
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

  const returnRgb = (r, g, b) => `rgb(${r},${g},${b})`;

  const outerLightShadow = () => {
    // const colorGuard = (num) => {
    //   if (num > 255) {
    //     return 255;
    //   }
    //   return num;
    // };

    let r = colorGuard(Math.round(red * lightIntensity));
    let g = colorGuard(Math.round(green * lightIntensity));
    let b = colorGuard(Math.round(blue * lightIntensity));
    return returnRgb(r, g, b);
  };

  const outerDarkShadow = () => {
    // const colorGuard = (num) => {
    //   if (num < 0) {
    //     return 0;
    //   }
    //   return num;
    // };

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
  const arrayAll = [];
  arrayAll.push(new Promise((resolve, reject) => {
    setLightShadow(outerLightShadow());
    resolve();
  }));
  arrayAll.push(new Promise((resolve, reject) => {
    setDarkShadow(outerDarkShadow());
    resolve();
  }));
  arrayAll.push(new Promise((resolve, reject) => {
    setLightInnerShadow(innerLightShadow());
    resolve();
  }));
  arrayAll.push(new Promise((resolve, reject) => {
    setDarkInnerShadow(innerDarkShadow());
    resolve();
  }));

  // return [
  //   outerLightShadow(),
  //   outerDarkShadow(),
  //   innerLightShadow(),
  //   innerDarkShadow(),
  // ];
  // return [
  //   outerLightShadow(),
  //   outerDarkShadow(),
  //   innerLightShadow(),
  //   innerDarkShadow(),
  // ];
};
