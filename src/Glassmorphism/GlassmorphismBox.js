import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { PrimaryButton } from "../Component/Button/CustomButton";
import { pSBC } from "../Neumorphism/PBSC";
import "./GlassmorphismBox.css";
import CroppedCC from "../Assets/croped cc.png";
import MenuItem from "@mui/material/MenuItem";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//might need browserfs for this

const GlassmorphismBox = () => {
  let settingMargin = {
    marginBottom: "0px",
    marginTop: "0px",
    borderRadius: "15px",
    padding: 0,
  };

  const [blurVal, setBlurVal] = useState(10);
  const [opacityVal, setOpacityVal] = useState(50);
  const [saturationVal, setSaturationVal] = useState(120);
  const [needToUseDark, setNeedToUseDark] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState([
    "#DF68B9",
    "#53D56D",
    "#92B9DD",
  ]);
  const [cardColor, setCardColor] = useState("#ebebeb");
  const [currentCardType, setCurrentCardType] = useState("Credit Card");
  const [currentBackgroundType, setCurrentBackgroundType] =
    useState("Mesh Gradient");

  const backgroundColorInputEl0 = useRef(null);
  const backgroundColorInputEl1 = useRef(null);
  const backgroundColorInputEl2 = useRef(null);
  const cardColorInputEl = useRef(null);

  const StyledBadge = useMemo(() => {
    return styled(Badge)(({ theme }) => ({
      "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
          position: "absolute",
          top: -1,
          left: -0.7,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation: "ripple 1.2s infinite ease-in-out",
          border: "1px solid currentColor",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    }));
  }, []);

  const IOSSwitch = useMemo(() => {
    return styled((props) => (
      <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
      />
    ))(({ theme }) => ({
      width: 42,
      height: 26,
      padding: 0,
      "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + .MuiSwitch-track": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
            opacity: 1,
            border: 0,
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.5,
          },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
          color: "#33cf4d",
          border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
          color:
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
      },
      "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
      },
      "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
          duration: 500,
        }),
      },
    }));
  }, []);

  const backgroundType = ["Solid", "Mesh Gradient", "Image"];
  const cardType = ["Social Media", "Credit Card"];

  const convertToRgbWithOpacity = (hexColor, opacity) => {
    let rgbConverted = pSBC(0, hexColor, "c");
    if (!rgbConverted) {
      return "transparent";
    }
    let rgbToPass = rgbConverted
      .replaceAll("rgb", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(",");

    return `rgba(${rgbToPass[0]},${rgbToPass[1]},${rgbToPass[2]}, ${
      opacity / 100
    })`;
  };

  const IsNullOrUndefined = (input) => {
    return Object.is(input, undefined) || Object.is(input, null);
  };

  const handleColorChange = (e, index = null) => {
    if (IsNullOrUndefined(index)) {
      setCardColor(e.target.value);
      return;
    }
    let bgColorArr = [...backgroundColor];
    bgColorArr[index] = e.target.value;
    setBackgroundColor([...bgColorArr]);
  };
  const handleChangeBlur = useCallback((newValue) => {
    setBlurVal(newValue.target.value);
  }, []);
  const handleChangeOpacity = useCallback((newValue) => {
    setOpacityVal(newValue.target.value);
  }, []);
  const handleChangeSaturation = useCallback((newValue) => {
    setSaturationVal(newValue.target.value);
  }, []);

  const SocialMediaCard = () => {
    console.log("rerender this social media");
    return (
      <Box
        style={{
          height: "86%",
          width: "60%",
          borderRadius: "15px",
          backdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
          WebkitBackdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
          backgroundColor: `${convertToRgbWithOpacity(cardColor, opacityVal)}`,
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          transition: ".5s ease",
        }}
      >
        <Stack
          style={{
            width: "100%",
            height: "100%",
          }}
          spacing={2}
          direction="column"
          sx={{ px: 2, py: 2 }}
          alignItems="center"
          justifyContent={"center"}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt="Aqilah Iskandar"
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              sx={{ width: 150, height: 150 }}
            />
          </StyledBadge>
          <span>Aqilah Iskandar</span>
          <PrimaryButton size="medium" disableElevation variant="contained">
            {"Follow"}
          </PrimaryButton>
          <span style={{ color: "white", width: "90%", textAlign: "center" }}>
            A card that symbolize a social media account. This is how it looks
            for a long freaking text.
          </span>
        </Stack>
      </Box>
    );
  };

  const CreditCard = () => {
    console.log("rerender this cc");
    return (
      <Box
        style={{
          height: "50%",
          width: "65%",
          backdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
          WebkitBackdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
          backgroundColor: `${convertToRgbWithOpacity(cardColor, opacityVal)}`,
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          transition: ".5s ease",
          // transition: "0.5s cubic-bezier(.47,1.64,.41,.8)"
        }}
        sx={{
          "&:hover": {
            transform: "rotateY(35deg) translateX(20px) ",
          },
        }}
      >
        <Stack
          style={{
            width: "100%",
            height: "20%",
          }}
          spacing={2}
          direction="column"
          sx={{ px: 2, py: 2, my: 2 }}
          alignItems="flex-end"
          justifyContent={"center"}
        >
          <img
            alt="Mastercard logo"
            src={CroppedCC}
            style={{ width: "80px" }}
          />
        </Stack>
        <Stack
          style={{
            width: "100%",
            height: "35%",
          }}
          spacing={2}
          direction="column"
          sx={{ px: 4, py: 1 }}
          alignItems="flex-start"
          justifyContent={"center"}
        >
          <div
            // src={CardChip}
            style={{
              width: "60px",
              height: "50%",
              background: "rgba(255,255,255,0.9)",
              opacity: ".6",
              borderRadius: "8px",
            }}
          />
          <span
            style={{
              letterSpacing: "5px",
              fontWeight: "800",
              fontSize: "20px",
              color: "white",
            }}
          >
            6216 6102 0001 6587 010
          </span>
        </Stack>
        <Stack
          style={{
            position: "absolute",
            width: "100%",
            height: "20%",
            bottom: 5,
          }}
          spacing={2}
          direction="row"
          sx={{ px: 4, py: 2 }}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <span style={{ color: "white", textAlign: "center" }}>02/12</span>
          <span style={{ color: "white", textAlign: "center" }}>
            Aqilah Iskandar
          </span>
        </Stack>
      </Box>
    );
  };

  const MeshGradientBackground = () => {
    return (
      <Box
        style={{
          backgroundColor: `${backgroundColor[2]}`,
          backgroundImage: ` radial-gradient(at 47% 33%, ${backgroundColor[0]} 0, transparent 59%), 
      radial-gradient(at 82% 65%, ${backgroundColor[1]} 0, transparent 55%)`,
          height: "98%",
          width: "98%",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "600px",
        }}
      >
        {HandleCardContent}
      </Box>
    );
  };

  const SolidBackground = () => {
    return (
      <Box
        style={{
          backgroundColor: `${backgroundColor[0]}`,
          height: "98%",
          width: "98%",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "600px",
        }}
      >
        {HandleCardContent}
      </Box>
    );
  };

  const ImageBackground = () => {
    return (
      <Box
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2)`,
          backgroundPosition: "center", /* Center the image */
          backgroundRepeat: "no-repeat", /* Do not repeat the image */
          backgroundSize: "cover", /* Resize the background image to cover the entire container */
          height: "98%",
          width: "98%",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "600px",
        }}
      >
        {HandleCardContent}
      </Box>
    );
  };

  const HandleCardContent = useMemo(() => {
    switch (currentCardType) {
      case "Credit Card": {
        return <>{CreditCard()}</>;
      }
      case "Social Media": {
        return <>{SocialMediaCard()}</>;
      }
      default:
        return null;
    }
  }, [opacityVal, cardColor, blurVal, saturationVal, currentCardType]);

  const HandleBackgroundContent = useMemo(() => {
    switch (currentBackgroundType) {
      case "Mesh Gradient": {
        return <>{MeshGradientBackground()}</>;
      }
      case "Solid": {
        return <>{SolidBackground()}</>;
      }
      case "Image": {
        return <>{ImageBackground()}</>
      }
      default:
        <></>;
    }
  }, [
    currentBackgroundType,
    backgroundColor,
    opacityVal,
    cardColor,
    blurVal,
    saturationVal,
    currentCardType,
  ]);

  const HandleCSSContent = () => {
    return (
      <Stack
        style={{
          width: "100%",
          height: "100%",
          padding: "8px",
          fontSize: "19px",
          color: "white"
        }}
        spacing={2}
        direction="column"
        sx={{ px: 1 }}
        alignItems="flex-start"
      >
        <span>
          <span style={{ color: "#53d56d" }}>{`body `}</span>
          <span>{`{`}</span>
        </span>
        <span>
          <span style={{ color: "#00fff5" }}>{` background-color `}</span>
          <span>{`: `}</span>
          <span style={{ color: "#fa55fb" }}>{`${backgroundColor[2]}`}</span>
          <span>;</span>
        </span>
        <span>
          <span style={{ color: "#00fff5" }}>{`background-image `}</span>
          <span>{`: `}</span>
        </span>

        <span>
          <span style={{ color: "#00fff5" }}>{`radial-gradient`}</span>
          <span>{`(`}</span>
          <span
            style={{ color: "#fa55fb" }}
          >{`at 47% 33%, ${backgroundColor[0]} 0, transparent 59%`}</span>
          <span>{`),`}</span>
        </span>
        <span>
          <span style={{ color: "#00fff5" }}>{`radial-gradient`}</span>
          <span>{`(`}</span>
          <span style={{ color: "#fa55fb" }}>
            {`at 82% 65%, ${backgroundColor[1]} 0, transparent 55%`}
          </span>
          <span>{`);`}</span>
        </span>
        <span>{`}`}</span>

        <span>
          <span style={{ color: "#53d56d" }}>{`.card `}</span>
          <span style={{ color: "white" }}>{`{`}</span>
        </span>
        <span>
          <span style={{ color: "#00fff5" }}>{`backdrop-filter `}</span>
          <span>{`: `}</span>
          <span style={{ color: "#00fff5" }}>{`blur`}</span>
          <span>{`(`}</span>
          <span style={{ color: "#fa55fb" }}>{`${blurVal}px`}</span>
          <span>{`) `}</span>
          <span style={{ color: "#00fff5" }}>{`saturate`}</span>
          <span>{`(`}</span>
          <span style={{ color: "#fa55fb" }}>{`${saturationVal}%`}</span>
          <span>{`); `}</span>
        </span>
        <span>
          <span style={{ color: "#00fff5" }}>{`-webkit-backdrop-filter `}</span>
          <span>{`: `}</span>
          <span style={{ color: "#00fff5" }}>{`blur`}</span>
          <span>{`(`}</span>
          <span style={{ color: "#fa55fb" }}>{`${blurVal}px`}</span>
          <span>{`) `}</span>
          <span style={{ color: "#00fff5" }}>{`saturate`}</span>
          <span>{`(`}</span>
          <span style={{ color: "#fa55fb" }}>{`${saturationVal}%`}</span>
          <span>{`); `}</span>
        </span>
        <span>
          {" "}
          <span style={{ color: "#00fff5" }}>{`background-color `}</span>
          <span>{`: `}</span>
          <span style={{ color: "#fa55fb" }}>{` ${convertToRgbWithOpacity(
            cardColor,
            opacityVal
          )}`}</span>
          <span>{`;`}</span>
        </span>

        <span>
          <span style={{ color: "#00fff5" }}>{`border-radius `}</span>
          <span>{`: `}</span>
          <span style={{ color: "#fa55fb" }}>{`12px`}</span>
          <span>{`;`}</span>
        </span>

        <span>
          <span style={{ color: "#00fff5" }}>{`border `}</span>
          <span>{`: `}</span>
          <span
            style={{ color: "#fa55fb" }}
          >{`1px solid rgba(255, 255, 255, 0.25)`}</span>
          <span>{`;`}</span>
        </span>

        <span>{`}`}</span>
      </Stack>
    );
  }

  const handleChange = (event) => {
    setCurrentCardType(event.target.value);
  };

  const handleChangeBackground = (event) => {
    setCurrentBackgroundType(event.target.value);
  };

  const handleRenderMenuItem = useMemo(
    () =>
      cardType?.map((type) => (
        <MenuItem key={`${type}_menuItem`} value={type}>
          {type}
        </MenuItem>
      )),
    []
  );

  const handleRenderMenuItemBg = useMemo(
    () =>
      backgroundType?.map((type) => (
        <MenuItem key={`${type}_menuItem`} value={type}>
          {type}
        </MenuItem>
      )),
    []
  );

  return (
    <>
      <div
        id="arrangeParent"
        style={{
          fontFamily: "Gilroy",
          background: "#1F2929",
          color: "rgba(255, 255, 255, 0.7)",
          height: "unset"
        }}
      >
        <Stack
          style={{ width: "100%" }}
          spacing={1}
          direction="column"
          sx={{ py: 2 }}
          alignItems="center"
          justifyContent={"center"}
        >
          <span style={{ fontSize: "2em", fontWeight: 900 }}>Glass UI</span>
          <span>from scratch project</span>
        </Stack>
        <Box
          style={{
            width: "80%",
            height: "140px",
            backgroundColor: "rgba(255,255,255, 0.1)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.125)",
            ...settingMargin,
            marginBottom: "20px",
          }}
        >
          <Stack
            style={{ width: "100%", height: "100%" }}
            spacing={2}
            direction="row"
            sx={{ px: 1, py: 2 }}
            alignItems="center"
            justifyContent={"space-evenly"}
          >
            <Box
              style={{
                height: "100%",
                width: "14%",
                ...settingMargin,
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }}
            >
              <Stack
                style={{ width: "100%", height: "100%", padding: "15px" }}
                spacing={1}
                direction="column"
                alignItems="flex-start"
              >
                <Box>Background Color:</Box>
                <Stack
                  style={{ width: "100%", height: "100%", padding: "5px" }}
                  spacing={2}
                  direction="row"
                  alignItems="flex-start"
                >
                  <Box
                    style={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      padding: "none",
                      border: "none",
                      backgroundColor: `${backgroundColor[0]}`,
                      boxShadow: `rgb(52 54 57 / 82%) 5px 9px 10px`,
                    }}
                    onClick={() => {
                      backgroundColorInputEl0.current.click();
                    }}
                  >
                    <input
                      ref={backgroundColorInputEl0}
                      type="color"
                      style={{
                        WebkitAppearance: "none",
                        visibility: "hidden",
                      }}
                      value={backgroundColor[0]}
                      onChange={(e) => handleColorChange(e, 0)}
                    />
                  </Box>
                  <Box
                    style={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      padding: "none",
                      border: "none",
                      backgroundColor: `${backgroundColor[1]}`,
                      boxShadow: `rgb(52 54 57 / 82%) 5px 9px 10px`,
                    }}
                    onClick={() => {
                      backgroundColorInputEl1.current.click();
                    }}
                  >
                    <input
                      ref={backgroundColorInputEl1}
                      type="color"
                      style={{
                        WebkitAppearance: "none",
                        visibility: "hidden",
                      }}
                      value={backgroundColor[1]}
                      onChange={(e) => handleColorChange(e, 1)}
                    />
                  </Box>
                  <Box
                    style={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      padding: "none",
                      border: "none",
                      backgroundColor: `${backgroundColor[2]}`,
                      boxShadow: `rgb(52 54 57 / 82%) 5px 9px 10px`,
                    }}
                    onClick={() => {
                      backgroundColorInputEl2.current.click();
                    }}
                  >
                    <input
                      ref={backgroundColorInputEl2}
                      type="color"
                      style={{
                        WebkitAppearance: "none",
                        visibility: "hidden",
                      }}
                      value={backgroundColor[2]}
                      onChange={(e) => handleColorChange(e, 2)}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Box>
            <Box
              style={{
                height: "100%",
                width: "14%",
                ...settingMargin,
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }}
            >
              <Stack
                style={{ width: "100%", height: "100%", padding: "15px" }}
                spacing={1}
                direction="column"
                sx={{ px: 1 }}
                alignItems="flex-start"
              >
                <Box>Background Type:</Box>
                <Box>
                  <FormControl
                    sx={{
                      minWidth: "150px",
                    }}
                    size="small"
                  >
                    <Select
                      value={currentBackgroundType}
                      onChange={handleChangeBackground}
                      displayEmpty
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.125)",
                        color: "rgba(255, 255, 255, 0.7)",
                        padding: 0,
                      }}
                      sx={{
                        color: "white",
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(228, 219, 233, 0.25)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(228, 219, 233, 0.25)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(228, 219, 233, 0.25)",
                        },
                        ".MuiSvgIcon-root ": {
                          fill: "white !important",
                        },
                      }}
                    >
                      {handleRenderMenuItemBg}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Box>
            <Box
              style={{
                height: "100%",
                width: "12%",
                ...settingMargin,
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }}
            >
              <Stack
                style={{ width: "100%", height: "100%", padding: "15px" }}
                spacing={2}
                direction="column"
                sx={{ px: 1 }}
                alignItems="flex-start"
              >
                <Box>
                  Card Color:
                  <Stack
                    style={{ width: "100%", height: "100%", padding: "5px" }}
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    justifyContent={"center"}
                  >
                    <Box>{`${cardColor}`}</Box>
                    <Box
                      style={{
                        borderRadius: "50%",
                        height: "40px",
                        width: "40px",
                        padding: "none",
                        border: "none",
                        backgroundColor: `${cardColor}`,
                        boxShadow: `rgb(52 54 57 / 82%) 5px 9px 10px`,
                      }}
                      onClick={() => {
                        cardColorInputEl.current.click();
                      }}
                    >
                      <input
                        ref={cardColorInputEl}
                        type="color"
                        style={{
                          WebkitAppearance: "none",
                          visibility: "hidden",
                        }}
                        value={cardColor}
                        onChange={(e) => handleColorChange(e)}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box
              style={{
                height: "100%",
                width: "20%",
                ...settingMargin,
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }}
            >
              <Stack
                style={{ width: "100%", height: "100%", padding: "15px" }}
                spacing={2}
                direction="column"
                sx={{ px: 1 }}
                alignItems="flex-start"
              >
                <Box style={{ width: "100%" }}>
                  <span>{`Blur Value:`}</span>
                  <Slider
                    value={blurVal}
                    size="medium"
                    onChange={handleChangeBlur}
                    max={25}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider-size"
                    sx={{
                      color: "WHITE",
                      height: 8,
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        height: 18,
                        width: 18,
                        backgroundColor: "#fff",
                        border: "2px solid currentColor",
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:before": {
                          boxShadow: "0 2px 12px 0 currentColor",
                        },
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: `0px 0px 0px 8px ${"rgb(82	175	119 / 16%)"}`,
                        },
                      },
                      "& .MuiSlider-valueLabel": {
                        lineHeight: 1.2,
                        fontSize: 12,
                        background: "unset",
                        color: "#001f3f",
                        padding: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50% 50% 50% 0",
                        backgroundColor: "white",
                        transformOrigin: "bottom left",
                        transform:
                          "translate(50%, -100%) rotate(-45deg) scale(0)",
                        "&:before": { display: "none" },
                        "&.MuiSlider-valueLabelOpen": {
                          transform:
                            "translate(50%, -100%) rotate(-45deg) scale(1)",
                        },
                        "& > *": {
                          transform: "rotate(45deg)",
                        },
                      },
                    }}
                  />
                  <span>{blurVal}px</span>
                </Box>
              </Stack>
            </Box>
            <Box
              style={{
                height: "100%",
                width: "20%",
                ...settingMargin,
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }}
            >
              <Stack
                style={{ width: "100%", height: "100%", padding: "15px" }}
                spacing={2}
                direction="column"
                sx={{ px: 1 }}
                alignItems="flex-start"
              >
                <Box style={{ width: "100%" }}>
                  <span>{`Opacity:`}</span>
                  <Slider
                    value={opacityVal}
                    size="medium"
                    onChange={handleChangeOpacity}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider-size"
                    sx={{
                      color: "WHITE",
                      height: 8,
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        height: 18,
                        width: 18,
                        backgroundColor: "#fff",
                        border: "2px solid currentColor",
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:before": {
                          boxShadow: "0 2px 12px 0 currentColor",
                        },
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: `0px 0px 0px 8px ${"rgb(82	175	119 / 16%)"}`,
                        },
                      },
                      "& .MuiSlider-valueLabel": {
                        lineHeight: 1.2,
                        fontSize: 12,
                        background: "unset",
                        color: "#001f3f",
                        padding: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50% 50% 50% 0",
                        backgroundColor: "white",
                        transformOrigin: "bottom left",
                        transform:
                          "translate(50%, -100%) rotate(-45deg) scale(0)",
                        "&:before": { display: "none" },
                        "&.MuiSlider-valueLabelOpen": {
                          transform:
                            "translate(50%, -100%) rotate(-45deg) scale(1)",
                        },
                        "& > *": {
                          transform: "rotate(45deg)",
                        },
                      },
                    }}
                  />
                  <span>{opacityVal}%</span>
                </Box>
              </Stack>
            </Box>
            <Box
              style={{
                height: "100%",
                width: "20%",
                ...settingMargin,
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }}
            >
              <Stack
                style={{ width: "100%", height: "100%", padding: "15px" }}
                spacing={2}
                direction="column"
                sx={{ px: 1 }}
                alignItems="flex-start"
              >
                <Box style={{ width: "100%" }}>
                  <span>{`Saturation:`}</span>
                  <Slider
                    value={saturationVal}
                    size="medium"
                    onChange={handleChangeSaturation}
                    min={0}
                    max={200}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider-size"
                    sx={{
                      color: "WHITE",
                      height: 8,
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        height: 18,
                        width: 18,
                        backgroundColor: "#fff",
                        border: "2px solid currentColor",
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:before": {
                          boxShadow: "0 2px 12px 0 currentColor",
                        },
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: `0px 0px 0px 8px ${"rgb(82	175	119 / 16%)"}`,
                        },
                      },
                      "& .MuiSlider-valueLabel": {
                        lineHeight: 1.2,
                        fontSize: 12,
                        background: "unset",
                        color: "#001f3f",
                        padding: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50% 50% 50% 0",
                        backgroundColor: "white",
                        transformOrigin: "bottom left",
                        transform:
                          "translate(50%, -100%) rotate(-45deg) scale(0)",
                        "&:before": { display: "none" },
                        "&.MuiSlider-valueLabelOpen": {
                          transform:
                            "translate(50%, -100%) rotate(-45deg) scale(1)",
                        },
                        "& > *": {
                          transform: "rotate(45deg)",
                        },
                      },
                    }}
                  />
                  <span>{saturationVal}%</span>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box
          style={{
            width: "80%",
            height: "700px",
            ...settingMargin,
          }}
        >
          <Stack
            style={{ width: "100%", height: "100%" }}
            spacing={2}
            direction="row"
            sx={{ py: 2 }}
            alignItems="space-between"
            justifyContent="space-between"
          >
            <Box
              style={{
                width: "50%",
                height: "100%",
                ...settingMargin,
                backgroundColor: "rgba(255,255,255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }}
            >
              <Stack
                style={{
                  width: "100%",
                  height: "10%",
                }}
                spacing={2}
                direction="row"
                sx={{ px: 2.5, py: 2 }}
                alignItems="flex-start"
                justifyContent={"space-between"}
              >
                <Box>
                  <FormControl
                    sx={{
                      minWidth: "150px",
                    }}
                    size="small"
                  >
                    <Select
                      value={currentCardType}
                      onChange={handleChange}
                      displayEmpty
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.125)",
                        color: "rgba(255, 255, 255, 0.7)",
                        padding: 0,
                      }}
                      sx={{
                        color: "white",
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(228, 219, 233, 0.25)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(228, 219, 233, 0.25)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(228, 219, 233, 0.25)",
                        },
                        ".MuiSvgIcon-root ": {
                          fill: "white !important",
                        },
                      }}
                    >
                      {handleRenderMenuItem}
                    </Select>
                  </FormControl>
                </Box>
                <Box>{<IOSSwitch />}</Box>
              </Stack>
              <Stack
                style={{
                  width: "100%",
                  height: "90%",
                }}
                direction="row"
                sx={{ px: 2, py: 2 }}
                alignItems="center"
                justifyContent={"center"}
              >
                {HandleBackgroundContent}
              </Stack>
            </Box>
            <Box
              style={{
                width: "40%",
                height: "100%",
                backgroundColor: "rgba(255,255,255, 0.1)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                ...settingMargin,
              }}
            >
              <Stack
                style={{ width: "100%", height: "100%", padding: "15px" }}
                spacing={2}
                direction="column"
                sx={{ px: 1 }}
                alignItems="flex-start"
              >
                <Box>CSS</Box>
                <Box style={{ width: "100%" }}>{HandleCSSContent()}</Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default GlassmorphismBox;
