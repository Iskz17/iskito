import {
  Stack,
  useMediaQuery,
  Slide,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { AppContext } from "../../Context/AppContext";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  forwardRef
} from "react";
import {
  CustomCard,
  ParticleBackground, NowPlaying, Player
} from "./MusicPlayer.Component/MusicPlayer.Component";
import "./MusicPlayer.css";
import { Title } from "../../components/Component"
// https://blog.logrocket.com/building-audio-player-react/
const MusicPlayer = forwardRef((props, ref) => {
  const [state] = useContext(AppContext);
  const [needToUseDark, setNeedToUseDark] = useState(state.isDarkMode);
  const [track, setTrack] = useState();
  const [show, setShow] = useState(false);
  const containerRef = useRef();
  const firstSlideRef = useRef("right");
  const secondSlideRef = useRef("left");
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

  //green #211145 #66ff00
  //pink #e784b3 #f5c26b

  const stackRef = useRef();

  useEffect(() => {
    setNeedToUseDark(state.isDarkMode);

    let globalAttrPivot = document.getElementsByClassName(
      "blobContainerHeight"
    )[0];

    globalAttrPivot.style.cssText = `--musicplayer-blobContainerHeight: ${containerRef?.current.clientHeight}px;`;

    document.getElementsByClassName("blobContainer")[0].classList.add(
      state.isDarkMode ? "musicPlayerDark" : "musicPlayerLight"
    );
    document.getElementsByClassName("blobContainer")[0].classList.remove(
      state.isDarkMode ? "musicPlayerLight" : "musicPlayerDark"
    );
    return () => { };
  }, [state]);

  return (
    <>
      <div className="blobContainerHeight" />
      <div id="particleGlobalPivot" />
      <div
        className="blobContainer"
        style={{
          position: "absolute",
          background: needToUseDark ? "#0f151a" : "#f0ddf3",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >

        <ParticleBackground />
      </div>
      <div
        ref={containerRef}
        id="arrangeParent"
        className="gilroy"
        style={{
          background: "transparent",
          color: needToUseDark
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)",
          height: "100vh",
          overflowX: "hidden",
          position: "absolute"
        }}
      >
        <Title style={{ width: "100vw", zIndex: 2, position: "relative" }} title="Music Player" description="favorite song collections" />
        <Stack
          style={{
            width: "100vw",
            zIndex: 2,
            marginTop: matches ? "-26px" : 0,
            position: "relative",
          }}
          spacing={1}
          gap={2}
          direction={matches ? "column" : "row"}
          sx={{ py: 2, overflow: "hidden" }}
          alignItems="center"
          justifyContent={"center"}
        >
          <CustomCard isDarkMode={needToUseDark} ref={stackRef} noPadding>
            <Slide
              in={!show}
              direction={firstSlideRef.current}
              container={stackRef.current}
            >
              <NowPlaying track={track} setShow={setShow} show={show} />
            </Slide>
            <Slide
              in={show}
              direction={secondSlideRef.current}
              container={stackRef.current}
            >
              <Player setShow={setShow} show={show} setTrack={setTrack} track={track} matches={matches} secondSlideRef={secondSlideRef} firstSlideRef={firstSlideRef} />
            </Slide>
          </CustomCard>
        </Stack>
      </div>
    </>
  );
});

export default MusicPlayer;
