import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import "./GlassmorphismBox.css";

const GlassmorphismBox = () => {
  return (
    <svg
      // viewbox="0 0 900 700"
      width="1000"
      height="1000"
      style={{ border: "1px red solid" }}
    >
      <clipPath id="textClip" class="filled-heading">
        <text y="70">We are</text>
        <text y="140">Creators</text>
        <text y="210">+Innovators</text>
      </clipPath>
      {/* <filter id="blur">
        <feGaussianBlur stdDeviation="10"></feGaussianBlur>
      </filter> */}
      <foreignObject width="1000" height="1000" clip-path="url(#textClip)">
        <div
          style={{
            border: "1px green solid",
            display: "block",
            width: "1000px",
            height: "1000px",
            backdropFilter: "blur(10px) saturate(100%)",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
        ></div>
      </foreignObject>
      {/* <g filter="url(#blur)">
        <g clip-path="url(#textClip)">
          <rect
            x="10"
            y="10"
            width="800"
            height="800"
            style={{
              fillOpacity: 0.25,
              backdropFilter: "blur(10px) saturate(100%)",
            }}
          />
        </g>
      </g> */}
    </svg>
  );
};

export default GlassmorphismBox;
