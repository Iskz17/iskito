import { CustomCardMedia } from "./CustomCard";
import { forwardRef } from "react";

export const NowPlaying = forwardRef((props, ref) => {
  const { track, setShow, show } = props;
  return (
    <div className="relative100" ref={ref}>
      <div
        className="relative100"
        style={{
          display: "flex",
          overflowX: "hidden",
          height: "240px",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <CustomCardMedia
          component="img"
          height={240}
          image={track?.cover}
          fullWidth
        />
        <div
          className="absolute100"
          style={{
            zIndex: 4,
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3))",
          }}
          onClick={() => {
            setShow(!show);
          }}>
          <span
            style={{
              position: "absolute",
              color: "white",
              zIndex: 4,
              bottom: 4,
              left: 12,
              fontSize: "30px",
            }}>
            Now playing
          </span>
        </div>
      </div>
    </div>
  );
});
