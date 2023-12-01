import { memo } from "react";

export const BottomLightBoxes = memo(
  ({ handleLightSource, lightSourcePos, needToUseDark }) => {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "30px",
        }}>
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
              border: `2px solid ${
                needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
              }`,
            }}></div>
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
              border: `2px solid ${
                needToUseDark ? "rgba(0,31,63,0.5)" : "rgba(255,255,255,0.6)"
              }`,
            }}></div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    //if false, then render new. If true return the old render
    return (
      prevProps.lightSourcePos === nextProps.lightSourcePos &&
      prevProps.needToUseDark === nextProps.needToUseDark
    );
  }
);
