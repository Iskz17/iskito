import { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import {
  NotificationsOutlined,
  FavoriteBorder,
  ArrowBackIosNew,
  PlayCircleFilled,
  Forward10,
  Replay10,
  SkipNext,
  SkipPrevious,
  Pause,
} from "@mui/icons-material";
import { lifetime, pg, lftc, pgc } from "../../Assets/assets";
import {
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import {
  CustomCardMedia,
  CustomCardMediaShadow,
  lyrics,
} from "./MusicPlayer.Component";
import CardContent from "@material-ui/core/CardContent";
import { CustomSlider } from "../../Component/Component";

export const Player = forwardRef(
  (
    { setShow, show, setTrack, track, matches, secondSlideRef, firstSlideRef },
    ref
  ) => {
    const audioRef = useRef(); // create a ref to access the <audio> element
    const lyricRef = useRef("");

    const [index, setIndex] = useState(0);
    const [currentLyric, setCurrentLyric] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progressValue, setProgressValue] = useState(0);
    const [maxDuration, setMaxDuration] = useState(0);
    const [render, setRender] = useState(false);

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
      handleChangeSong();
      return () => {};
    }, [index]);

    useEffect(()=> {
      if(!render && show){
        setRender(true);
      }
    }, [show])

    useEffect(() => {
      setTrack(tracks[0]);
      setCurrentLyric(lyrics[0]);
      return () => {};
    }, [tracks]);

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

    const getCurrentLine = (time) => {
      let currTime = Math.floor(time);
      if (currentLyric && currentLyric[currTime]) {
        lyricRef.current = currentLyric[currTime];
        return currentLyric[currTime];
      }
      return lyricRef.current;
    };

    const handleChangeSong = () => {
      if (isPlaying) {
        audioRef.current.play();
        lyricRef.current = "";
      }
    };

    const handlePreviousSong = () => {
      setTrack(tracks[index === 0 ? 1 : 0]);
      setIndex(index === 0 ? 1 : 0);
      handleChangeSong();
    };

    const handleForward10 = () => {
      audioRef.current.currentTime += 10;
    };

    const handleRewind10 = () => {
      audioRef.current.currentTime -= 10;
    };

    const handleNextSong = () => {
      setTrack(tracks[index === 0 ? 1 : 0]);
      setIndex(index === 0 ? 1 : 0);
      setCurrentLyric(lyrics[index === 0 ? 1 : 0]);
      handleChangeSong();
    };

    const handleChangeProgress = (e) => {
      audioRef.current.currentTime = e.target.value;
    };

    const updateMax = () => {
      setMaxDuration(audioRef.current.duration);
    };

    const handleEnded = () => {
      lyricRef.current = "";
      handleNextSong();
    };

    const handlePause = () => {
      audioRef.current.pause(); // pause the audio track
    };

    const handlePlay = () => {
      audioRef.current.play();
    };

    const handleTimeUpdate = () => {
      setProgressValue(audioRef.current.currentTime);
    };

    return (
      <div className="absolute100" ref={ref}>
        {render ? (
          <div
            className="relative100"
            style={{
              padding: 20,
            }}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              style={{ marginBottom: "10px" }}>
              <IconButton
                aria-label="go back"
                size="small"
                onClick={() => {
                  setShow(!show);
                }}
                // style={{ backgroundColor: "#4d5051" }}
              >
                <ArrowBackIosNew
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
              onClick={() => {
                if (firstSlideRef.current === "left") {
                  firstSlideRef.current = "right";
                  secondSlideRef.current = "left";
                } else {
                  firstSlideRef.current = "left";
                  secondSlideRef.current = "right";
                }
              }}>
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
              style={{ marginTop: "10px" }}>
              <IconButton
                aria-label="subscribe notification"
                size="small"
                // style={{ backgroundColor: "#4d5051" }}
              >
                <NotificationsOutlined
                  style={{
                    color: "white",
                    fontWeight: "900",
                    fontSize: "20px",
                  }}
                />
              </IconButton>
              <IconButton aria-label="favorite" size="small">
                <FavoriteBorder
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
                style={{ fontFamily: "Gilroy", fontWeight: "900" }}>
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
                style={{ color: "white" }}>
                <div style={{ width: "40px" }}>{formatTime(progressValue)}</div>
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
                <div style={{ width: "40px" }}>{formatTime(maxDuration)}</div>
              </Stack>
              <span style={{ color: "white" }}>
                {getCurrentLine(progressValue)}
              </span>
              <Stack
                direction="row"
                sx={{ px: 2, py: 2 }}
                alignItems="center"
                justifyContent={"space-evenly"}>
                <IconButton
                  aria-label="favorite"
                  size="medium"
                  onClick={handlePreviousSong}>
                  <SkipPrevious
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
                  onClick={handleRewind10}>
                  <Replay10
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
                    }}>
                    <Pause
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
                    }}>
                    <PlayCircleFilled
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
                  onClick={handleForward10}>
                  <Forward10
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
                  onClick={handleNextSong}>
                  <SkipNext
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
        ) : (
          <></>
        )}
      </div>
    );
  }
);
