import React, { memo } from "react";
//https://stackoverflow.com/questions/25940741/making-svg-responsive

export const ElementFlat = memo((props) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="100"
    // height="24"
    viewBox="0 0 145 24"
    fill="none"
    // stroke={props.backgroundColor}
  >
    <path
      d="M0 22H7C15.2843 22 22 15.2843 22 7.00001V3C22 2.44772 22.4477 2 23 2H121C121.552 2 122 2.44772 122 3V7.00001C122 15.2843 128.716 22 137 22H145"
      stroke="inherit"
      strokeWidth="6"
    ></path>
  </svg>;
})

export const ElementConvex = memo((props) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="100"
    // height="24"
    viewBox="0 0 145 33"
    fill="none"
    // stroke={props.backgroundColor} using css to apply stroke color
  >
    <path
      d="M0 31H7C15.2843 31 22 24.2843 22 16V11.7329C22 11.2966 22.2898 10.9083 22.7061 10.7779C60.0722 -0.924818 84.913 -0.925978 121.302 10.7745C121.714 10.9071 122 11.2935 122 11.727V16C122 24.2843 128.716 31 137 31H145"
      stroke="inherit"
      strokeWidth="6"
    ></path>
  </svg>;
});

export const ElementConcave = memo((props) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="100"
    // height="24"
    viewBox="0 0 145 24"
    fill="none"
    // stroke={props.backgroundColor}
  >
    <path
      d="M0 22H7C15.2843 22 22 15.2843 22 7.00001V3.39336C22 2.7091 22.6808 2.2299 23.3304 2.44485C59.2066 14.3156 85.7767 12.9047 120.7 2.39438C121.343 2.20072 122 2.67921 122 3.3512V7.00001C122 15.2843 128.716 22 137 22H145"
      stroke="inherit"
      strokeWidth="6"
    ></path>
  </svg>;
})

export const ElementPressed = memo((props) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="100"
    // height="24"
    viewBox="0 0 145 24"
    fill="none"
    // stroke={props.backgroundColor}
  >
    <path
      d="M0 2H22V21C22 21.5523 22.4477 22 23 22H121C121.552 22 122 21.5523 122 21V2H145"
      stroke="inherit"
      strokeWidth="6"
    ></path>
  </svg>;
});