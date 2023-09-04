import Stack from "@mui/material/Stack";
import { AppContext } from "../Context/AppContext";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
} from "react";
import {
  CustomCard,
  CustomCardMedia,
  CustomCardMediaShadow,
} from "./CustomCard";
import { lyrics } from "./Lyrics";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@mui/material/Typography";
import ParticleBackground from "../particle";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Forward10Icon from "@mui/icons-material/Forward10";
import Replay10Icon from "@mui/icons-material/Replay10";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import lifetime from "../Assets/Lifetime.mp3";
import pg from "../Assets/pg.mp3";
import lftc from "../Assets/lftc.png";
import pgc from "../Assets/pgc.png";
import CustomSlider from "../Component/Slider/CustomSlider";
import "./MusicPlayer.css";
// https://blog.logrocket.com/building-audio-player-react/
const MusicPlayer = forwardRef((props, ref) => {
  const [state] = useContext(AppContext);
  const [needToUseDark, setNeedToUseDark] = useState(state.isDarkMode);
  const [progressValue, setProgressValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [maxDuration, setMaxDuration] = useState(0);
  const [track, setTrack] = useState();
  const [index, setIndex] = useState(0);
  const [currentLyric, setCurrentLyric] = useState();
  const [show, setShow] = useState(false);
  const audioRef = useRef(); // create a ref to access the <audio> element
  const lyricRef = useRef("");
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

  const tracks = useMemo(() => {
    return [
      {
        cover: lftc,
        title: "Lifetime - Justin Bieber",
        data: lifetime,
      },
      {
        cover: pgc,
        title: "Perempuan Gila - Nadin Amizah",
        data: pg,
      },
    ];
  }, []);

  useEffect(() => {
    setTrack(tracks[0]);
    setCurrentLyric(lyrics[0]);
    return () => {};
  }, [tracks]);

  //green #211145 #66ff00
  //pink #e784b3 #f5c26b

  const handlePause = () => {
    audioRef.current.pause(); // pause the audio track
  };

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handleChangeProgress = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  const handleEnded = () => {
    // setIsPlaying(false);
    lyricRef.current = "";
    handleNextSong();
  };

  const updateMax = () => {
    setMaxDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setProgressValue(audioRef.current.currentTime);
    // progressRef.current.value = Math.round(audioRef.current.currentTime);
  };

  const stackRef = useRef();

  const getCurrentLine = (time) => {
    let currTime = Math.floor(time);
    if (currentLyric && currentLyric[currTime]) {
      lyricRef.current = currentLyric[currTime];
      return currentLyric[currTime];
    }
    return lyricRef.current;
  };

  const handleForward10 = () => {
    audioRef.current.currentTime += 10;
  };

  const handleRewind10 = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleChangeSong = () => {
    if (isPlaying) {
      audioRef.current.play();
      lyricRef.current = "";
    }
  };

  const handleNextSong = () => {
    setTrack(tracks[index === 0 ? 1 : 0]);
    setIndex(index === 0 ? 1 : 0);
    setCurrentLyric(lyrics[index === 0 ? 1 : 0]);
    handleChangeSong();
  };

  const handlePreviousSong = () => {
    setTrack(tracks[index === 0 ? 1 : 0]);
    setIndex(index === 0 ? 1 : 0);
    handleChangeSong();
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "0:00";
  };

  useEffect(() => {
    setNeedToUseDark(state.isDarkMode);
    document.body.style.cssText = `
    --musicplayer-1stcolor: ${state.isDarkMode ? "#211145" : "#e784b3"};
    --musicplayer-2ndcolor: ${state.isDarkMode ? "#66ff00" : "#f5c26b"};
    --musicplayer-sectioncolor: ${state.isDarkMode ? "#0f151a" : "#f0ddf3"};
    --musicplayer-blobContainerHeight: ${props.blobRef.current.clientHeight}px;
   `;
    return () => {};
  }, [state]);

  useEffect(() => {
    handleChangeSong();
    return () => {};
  }, [index]);

  return (
    <>
      <div
        ref={ref}
        className="blobContainer"
        style={{
          position: "absolute",
          background: needToUseDark ? "#0f151a" : "#f0ddf3",
          width: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <ParticleBackground />
      </div>
      <div
        id="arrangeParent"
        style={{
          fontFamily: "Gilroy",
          background: needToUseDark ? "#0f151a" : "#f0ddf3",
          color: needToUseDark
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)",
          height: matches ? "unset" : "100vh",
          overflowX: "hidden",
          minHeight: "699px",
        }}
      >
        <Stack
          style={{ width: "100vw", zIndex: 2, position: "relative" }}
          spacing={1}
          direction="column"
          sx={{ py: 2 }}
          alignItems="center"
          justifyContent={"center"}
        >
          <span style={{ fontSize: "2em", fontWeight: 900 }}>Music Player</span>
          <span>Favorite song collections</span>
        </Stack>
        <Stack
          style={{
            width: "100vw",
            zIndex: 2,
            marginTop: matches ? "-26px" : 0,
            position: "relative",
          }}
          // ref={stackRef}
          spacing={1}
          gap={2}
          direction={matches ? "column" : "row"}
          sx={{ py: 2, overflow: "hidden" }}
          alignItems="center"
          justifyContent={"center"}
        >
          {/* <Slide in={true} direction="up" container={stackRef.current}> */}
          <CustomCard isDarkMode={needToUseDark} ref={stackRef} noPadding>
            <Slide in={!show} direction="right" container={stackRef.current}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  boxShadow: "0 0px 10px 10px black",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    overflowX: "hidden",
                    width: "100%",
                    height: "240px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomCardMedia
                    component="img"
                    height={240}
                    image={track?.cover}
                    fullWidth
                  />
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 4,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3))",
                    }}
                    onClick={() => {
                      setShow(!show);
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        color: "white",
                        zIndex: 4,
                        bottom: 4,
                        left: 12,
                        fontSize: "30px",
                      }}
                    >
                      Now playing
                    </span>
                  </div>
                </div>
              </div>
            </Slide>
            <Slide in={show} direction="left" container={stackRef.current}>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  padding: 20,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  style={{ marginBottom: "10px" }}
                >
                  <IconButton
                    aria-label="go back"
                    size="small"
                    onClick={() => {
                      setShow(!show);
                    }}
                    // style={{ backgroundColor: "#4d5051" }}
                  >
                    <ArrowBackIosNewOutlinedIcon
                      style={{
                        color: "white",
                        fontWeight: "900",
                        fontSize: "20px",
                        border: "none",
                      }}
                    />
                  </IconButton>
                </Stack>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomCardMedia
                    component="img"
                    height={matches ? 290 : 340}
                    image={track?.cover}
                  />
                  <CustomCardMediaShadow
                    component="img"
                    height={matches ? 290 : 340}
                    image={track?.cover}
                  />
                </div>
                <Stack
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  style={{ marginTop: "10px" }}
                >
                  <IconButton
                    aria-label="subscribe notification"
                    size="small"
                    // style={{ backgroundColor: "#4d5051" }}
                  >
                    <NotificationsOutlinedIcon
                      style={{
                        color: "white",
                        fontWeight: "900",
                        fontSize: "20px",
                      }}
                    />
                  </IconButton>
                  <IconButton aria-label="favorite" size="small">
                    <FavoriteBorderOutlinedIcon
                      style={{
                        color: "white",
                        fontWeight: "900",
                        fontSize: "20px",
                      }}
                    />
                  </IconButton>
                </Stack>
                <CardContent style={{ padding: "10px" }}>
                  <Typography
                    color="white"
                    gutterBottom
                    variant="h7"
                    component="div"
                    style={{ fontFamily: "Gilroy", fontWeight: "900" }}
                  >
                    {track?.title}
                  </Typography>

                  <audio
                    ref={audioRef}
                    src={track?.data}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedData={updateMax}
                    onEnded={handleEnded}
                  />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    style={{ color: "white" }}
                  >
                    <div style={{ width: "40px" }}>
                      {formatTime(progressValue)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <CustomSlider
                        step={0.2}
                        value={progressValue}
                        min={0}
                        max={maxDuration}
                        overridedarkmode={true}
                        darkmodevalue={true}
                        onChange={(e) => {
                          handleChangeProgress(e);
                        }}
                      />
                    </div>
                    <div style={{ width: "40px" }}>
                      {formatTime(maxDuration)}
                    </div>
                  </Stack>
                  <span style={{ color: "white" }}>
                    {getCurrentLine(progressValue)}
                  </span>
                  <Stack
                    direction="row"
                    sx={{ px: 2, py: 2 }}
                    alignItems="center"
                    justifyContent={"space-evenly"}
                  >
                    <IconButton
                      aria-label="favorite"
                      size="medium"
                      onClick={handlePreviousSong}
                    >
                      <SkipPreviousIcon
                        style={{
                          color: "white",
                          fontWeight: "900",
                          fontSize: "30px",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="favorite"
                      size="medium"
                      onClick={handleRewind10}
                    >
                      <Replay10Icon
                        style={{
                          color: "white",
                          fontWeight: "900",
                          fontSize: "30px",
                        }}
                      />
                    </IconButton>
                    {isPlaying ? (
                      <IconButton
                        aria-label="favorite"
                        size="medium"
                        onClick={() => {
                          setIsPlaying(false);
                          handlePause();
                        }}
                      >
                        <PauseIcon
                          style={{
                            color: "white",
                            fontWeight: "900",
                            fontSize: "50px",
                          }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="favorite"
                        size="medium"
                        onClick={() => {
                          setIsPlaying(true);
                          handlePlay();
                        }}
                      >
                        <PlayCircleFilledIcon
                          style={{
                            color: "white",
                            fontWeight: "900",
                            fontSize: "50px",
                          }}
                        />
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="favorite"
                      size="medium"
                      onClick={handleForward10}
                    >
                      <Forward10Icon
                        style={{
                          color: "white",
                          fontWeight: "900",
                          fontSize: "30px",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="favorite"
                      size="medium"
                      onClick={handleNextSong}
                    >
                      <SkipNextIcon
                        style={{
                          color: "white",
                          fontWeight: "900",
                          fontSize: "30px",
                        }}
                      />
                    </IconButton>
                  </Stack>
                </CardContent>
              </div>
            </Slide>
          </CustomCard>
          {/* </Slide> */}
        </Stack>
      </div>
    </>
  );
});

export default MusicPlayer;
