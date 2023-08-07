/* eslint-disable no-restricted-globals */
const workercode = () => {

    self.onmessage = function(e) {
        console.log('Message received from main script');
        var workerResult = 'Received from main: ' + (e.data);
        console.log('Posting message back to main script');
        self.postMessage(workerResult);
    }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;

// const { parentPort } = require("worker_threads");

// const colorGuard = (num) => {
//     if (num < 0) {
//       return 0;
//     }
//     if (num > 255) {
//       return 255;
//     }
//     return num;
//   };
  
//   const returnRgb = (r, g, b) => `rgb(${r},${g},${b})`;
  
//   const outerLightShadow = ({ red, green, blue, lightIntensity }) => {
//     let r = colorGuard(Math.round(red * lightIntensity));
//     let g = colorGuard(Math.round(green * lightIntensity));
//     let b = colorGuard(Math.round(blue * lightIntensity));
//     return returnRgb(r, g, b);
//   };
  
//   const outerDarkShadow = ({ red, green, blue, darkIntensity }) => {
//     const maxShadowGuard = (num) => {
//       if (num > 1) {
//         return 1;
//       }
//       return num;
//     };
  
//     let checkedIntensity = maxShadowGuard(darkIntensity);
  
//     let r = Math.round(colorGuard(red * checkedIntensity));
//     let g = Math.round(colorGuard(green * checkedIntensity));
//     let b = Math.round(colorGuard(blue * checkedIntensity));
//     return returnRgb(r, g, b);
//   };
  
//   const innerLightShadow = ({ red, green, blue, lightInnerRatio }) => {
//     let r = Math.round(colorGuard(red * lightInnerRatio));
//     let g = Math.round(colorGuard(green * lightInnerRatio));
//     let b = Math.round(colorGuard(blue * lightInnerRatio));
//     return returnRgb(r, g, b);
//   };
  
//   const innerDarkShadow = ({ red, green, blue, darkInnerRatio }) => {
//     let r = Math.round(colorGuard(red * darkInnerRatio));
//     let g = Math.round(colorGuard(green * darkInnerRatio));
//     let b = Math.round(colorGuard(blue * darkInnerRatio));
//     return returnRgb(r, g, b);
//   };
//   // eslint-disable-next-line import/no-anonymous-default-export
//   export default () => {
//     // eslint-disable-next-line no-restricted-globals
//     self.addEventListener(
//       "message",
//       function (workerData) {
//         console.log(workerData);
//         let lightRatio = 1.6;
//         let darkRatio = 0.4;
//         let lightInnerRatio = 1.1;
//         let darkInnerRatio = 0.9;
//         const { id, intensity, red, green, blue } = workerData;
//         let lightIntensity = (intensity / 100) * lightRatio;
//         let darkIntensity = (100 / (intensity - 25)) * darkRatio;
//         //   for (let job of jobs) {
//         //     let count = 0;
//         //     for (let i = 0; i < job; i++) {
//         //       count++;
//         //     }
//         //   }
//         let work = {
//           red,
//           green,
//           blue,
//           lightInnerRatio,
//           darkInnerRatio,
//           lightIntensity,
//           darkIntensity,
//         };
//         switch (id) {
//           case 1: {
//             // eslint-disable-next-line no-restricted-globals
//             self.postMessage({ id, data: outerLightShadow(work) });
//             break;
//           }
//           case 2: {
//             // eslint-disable-next-line no-restricted-globals
//             self.postMessage({ id, data: outerDarkShadow(work) });
//             break;
//           }
//           case 3: {
//             // eslint-disable-next-line no-restricted-globals
//             self.postMessage({ id, data: innerLightShadow(work) });
//             break;
//           }
//           case 4: {
//             // eslint-disable-next-line no-restricted-globals
//             self.postMessage({ id, data: innerDarkShadow(work) });
//             break;
//           }
//           default:
//             return null;
//         }
//       },
//       false
//     );
    //   self.onmessage = (workerData) => {
    //     console.log(workerData);
    //     let lightRatio = 1.6;
    //     let darkRatio = 0.4;
    //     let lightInnerRatio = 1.1;
    //     let darkInnerRatio = 0.9;
    //     const { id, intensity, red, green, blue } = workerData;
    //     let lightIntensity = (intensity / 100) * lightRatio;
    //     let darkIntensity = (100 / (intensity - 25)) * darkRatio;
    //     //   for (let job of jobs) {
    //     //     let count = 0;
    //     //     for (let i = 0; i < job; i++) {
    //     //       count++;
    //     //     }
    //     //   }
    //     let work = {
    //       red,
    //       green,
    //       blue,
    //       lightInnerRatio,
    //       darkInnerRatio,
    //       lightIntensity,
    //       darkIntensity,
    //     };
    //     switch (id) {
    //       case 1: {
    //         // eslint-disable-next-line no-restricted-globals
    //         self.postMessage({ id, data: outerLightShadow(work) });
    //         break;
    //       }
    //       case 2: {
    //         // eslint-disable-next-line no-restricted-globals
    //         self.postMessage({ id, data: outerDarkShadow(work) });
    //         break;
    //       }
    //       case 3: {
    //         // eslint-disable-next-line no-restricted-globals
    //         self.postMessage({ id, data: innerLightShadow(work) });
    //         break;
    //       }
    //       case 4: {
    //         // eslint-disable-next-line no-restricted-globals
    //         self.postMessage({ id, data: innerDarkShadow(work) });
    //         break;
    //       }
    //       default:
    //         return null;
    //     }
    //   };
//   };
  