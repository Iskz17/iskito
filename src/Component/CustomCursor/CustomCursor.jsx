import { useEffect } from "react";
import swordPng from "../../assets/sword.png";
import { useMousePosition } from "../../utils/utils";

const DotRing = () => {
  // 1.
  const { x, y } = useMousePosition();
  useEffect(() => {
    let ring = document.getElementById("curPos");
    requestAnimationFrame(() => {
      ring.style.cssText = `
            --glassMorph-X: ${x}px;
            --glassMorph-Y: ${y}px;
            position: absolute;
            z-index: 2000;
            `;
    });
  }, [x, y]);
  return (
    <>
      {/* 2. */}
      <div className="ring"></div>
      {/* 3. */}
      <div className="dot">
        <img
          src={swordPng}
          alt={"sword as cursor"}
          style={{ width: 40, position: "absolute", left: "-32px" }}
        />
      </div>
    </>
  );
};

export default DotRing;
