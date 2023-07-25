import Box from "@mui/material/Box";
import CustomSlider from "../Component/Slider/CustomSlider";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled, createTheme } from "@mui/material/styles";
import { AppContext } from "../Context/AppContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { PrimaryButton } from "../Component/Button/CustomButton";
import { pSBC } from "../Neumorphism/PBSC";
import "./GlassmorphismBox.css";
import CroppedCC from "../Assets/cropedcc.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IsNullOrUndefined } from "../Utils/Utils";

//might need browserfs for this

const GlassmorphismBox = () => {
  let settingMargin = {
    marginBottom: "0px",
    marginTop: "0px",
    borderRadius: "15px",
    padding: 0,
  };

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

  const [state] = useContext(AppContext);
  const matches = useMediaQuery(theme.breakpoints.down("tablet"));

  const [blurVal, setBlurVal] = useState(10);
  const [opacityVal, setOpacityVal] = useState(50);
  const [saturationVal, setSaturationVal] = useState(120);
  const [needToUseDark, setNeedToUseDark] = useState(state.isDarkMode);
  const [backgroundColor, setBackgroundColor] = useState([
    "#DF68B9",
    "#53D56D",
    "#92B9DD",
  ]);

  useEffect(() => {
    setNeedToUseDark(state.isDarkMode);
  }, [state]);

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

  const SocialMediaCard = useCallback(() => {
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
  }, [blurVal, cardColor, opacityVal, saturationVal]);

  const CreditCard = useCallback(() => {
    console.log("rerender this cc");
    return (
      <Box
        style={{
          height: matches ? "70%" : "50%",
          width: matches ? "80%" : "65%",
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
              width: matches ? "46px" : "60px",
              height: matches ? "40%" : "50%",
              background: "rgba(255,255,255,0.9)",
              opacity: ".6",
              borderRadius: "8px",
            }}
          />
          <span
            style={{
              letterSpacing: "5px",
              fontWeight: "800",
              fontSize: matches ? "13px" : "20px",
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
  }, [blurVal, cardColor, matches, opacityVal, saturationVal]);

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
  }, [currentCardType, CreditCard, SocialMediaCard]);

  const MeshGradientBackground = useCallback(() => {
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
  }, [HandleCardContent, backgroundColor]);

  const SolidBackground = useCallback(() => {
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
  }, [backgroundColor, HandleCardContent]);

  const ImageBackground = useCallback(() => {
    return (
      <Box
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2)`,
          backgroundPosition: "center" /* Center the image */,
          backgroundRepeat: "no-repeat" /* Do not repeat the image */,
          backgroundSize:
            "cover" /* Resize the background image to cover the entire container */,
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
  }, [HandleCardContent]);

  const HandleBackgroundContent = useMemo(() => {
    switch (currentBackgroundType) {
      case "Mesh Gradient": {
        return <>{MeshGradientBackground()}</>;
      }
      case "Solid": {
        return <>{SolidBackground()}</>;
      }
      case "Image": {
        return <>{ImageBackground()}</>;
      }
      default:
        <></>;
    }
  }, [
    currentBackgroundType,
    ImageBackground,
    SolidBackground,
    MeshGradientBackground,
  ]);

  const HandleBackgroundCSS = () => {
    const attributeColor = "#0ac7c4";
    switch (currentBackgroundType) {
      case "Mesh Gradient": {
        return (
          <>
            <span>
              <span
                style={{ color: attributeColor }}
              >{`background-image `}</span>
              <span>{`: `}</span>
            </span>
            <span>
              <span style={{ color: attributeColor }}>{`radial-gradient`}</span>
              <span>{`(`}</span>
              <span
                style={{ color: "#fa55fb" }}
              >{`at 47% 33%, ${backgroundColor[0]} 0, transparent 59%`}</span>
              <span>{`),`}</span>
            </span>
            <span>
              <span style={{ color: attributeColor }}>{`radial-gradient`}</span>
              <span>{`(`}</span>
              <span style={{ color: "#fa55fb" }}>
                {`at 82% 65%, ${backgroundColor[1]} 0, transparent 55%`}
              </span>
              <span>{`);`}</span>
            </span>
          </>
        );
      }

      case "Solid": {
        return (
          <>
            <span>
              <span
                style={{ color: attributeColor }}
              >{`background-image `}</span>
              <span>{`: `}</span>
              <span
                style={{ color: attributeColor }}
              >{`${backgroundColor[0]}`}</span>
              <span>{`;`}</span>
            </span>
          </>
        );
      }

      case "Image": {
        return (
          <>
            <span>
              <span
                style={{ color: attributeColor }}
              >{`background-image `}</span>
              <span>{`: `}</span>
              <span
                style={{ color: attributeColor }}
              >{`url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2)`}</span>
              <span>{`;`}</span>
            </span>
          </>
        );
      }

      default:
        return null;
    }
  };

  const HandleCSSContent = () => {
    const attributeColor = "#0ac7c4";
    return (
      <Stack
        style={{
          width: "100%",
          height: "50%",
          padding: "8px",
          fontSize: matches ? "15px" : "19px",
          color: needToUseDark
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)",
        }}
        spacing={2}
        direction={"column"}
        sx={{ px: 1 }}
        alignItems="flex-start"
      >
        <span>
          <span style={{ color: "#53d56d" }}>{`body `}</span>
          <span>{`{`}</span>
        </span>
        <span>
          <span style={{ color: attributeColor }}>{` background-color `}</span>
          <span>{`: `}</span>
          <span style={{ color: "#fa55fb" }}>{`${backgroundColor[2]}`}</span>
          <span>;</span>
        </span>

        {HandleBackgroundCSS()}

        <span>{`}`}</span>

        <span>
          <span style={{ color: "#53d56d" }}>{`.card `}</span>
          <span>{`{`}</span>
        </span>
        <span>
          <span style={{ color: attributeColor }}>{`backdrop-filter `}</span>
          <span>{`: `}</span>
          <span style={{ color: attributeColor }}>{`blur`}</span>
          <span>{`(`}</span>
          <span style={{ color: "#fa55fb" }}>{`${blurVal}px`}</span>
          <span>{`) `}</span>
          <span style={{ color: attributeColor }}>{`saturate`}</span>
          <span>{`(`}</span>
          <span style={{ color: "#fa55fb" }}>{`${saturationVal}%`}</span>
          <span>{`); `}</span>
        </span>
        <span>
          <span
            style={{ color: attributeColor }}
          >{`-webkit-backdrop-filter `}</span>
          <span>{`: `}</span>
          <span style={{ color: attributeColor }}>{`blur`}</span>
          <span>{`(`}</span>
          <span style={{ color: "#fa55fb" }}>{`${blurVal}px`}</span>
          <span>{`) `}</span>
          <span style={{ color: attributeColor }}>{`saturate`}</span>
          <span>{`(`}</span>
          <span style={{ color: "#fa55fb" }}>{`${saturationVal}%`}</span>
          <span>{`); `}</span>
        </span>
        <span>
          {" "}
          <span style={{ color: attributeColor }}>{`background-color `}</span>
          <span>{`: `}</span>
          <span style={{ color: "#fa55fb" }}>{` ${convertToRgbWithOpacity(
            cardColor,
            opacityVal
          )}`}</span>
          <span>{`;`}</span>
        </span>

        <span>
          <span style={{ color: attributeColor }}>{`border-radius `}</span>
          <span>{`: `}</span>
          <span style={{ color: "#fa55fb" }}>{`12px`}</span>
          <span>{`;`}</span>
        </span>

        <span>
          <span style={{ color: attributeColor }}>{`border `}</span>
          <span>{`: `}</span>
          <span
            style={{ color: "#fa55fb" }}
          >{`1px solid rgba(255, 255, 255, 0.25)`}</span>
          <span>{`;`}</span>
        </span>

        <span>{`}`}</span>
      </Stack>
    );
  };

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

  const configBox = (
    <Box
      style={{
        width: "80%",
        height: matches ? "100%" : "140px",
        backgroundColor: needToUseDark
          ? "rgba(255,255,255, 0.1)"
          : "rgba(255,255,255, 0.5)",
        backdropFilter: "blur(16px)",
        border: needToUseDark
          ? "1px solid rgba(255, 255, 255, 0.125)"
          : "1px solid rgba(0, 0, 0, 0.125)",
        ...settingMargin,
        marginBottom: "20px",
      }}
    >
      <Stack
        style={{ width: "100%", height: "100%" }}
        gap={"5px"}
        sx={{ px: 1, py: 1 }}
        direction={matches ? "column" : "row"}
        alignItems={matches ? "space-between" : "center"}
        justifyContent={"space-evenly"}
      >
        <Box
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
            ...settingMargin,
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
              spacing={1}
              direction="row"
              alignItems="flex-start"
            >
              <Box
                style={{
                  borderRadius: "5px",
                  height: "100%",
                  width: "33%",
                  padding: "none",
                  border: needToUseDark
                    ? "1px solid rgba(255, 255, 255, 0.125)"
                    : "1px solid rgba(0, 0, 0, 0.125)",
                  backgroundColor: `${backgroundColor[0]}`,
                  boxShadow: needToUseDark
                    ? `rgb(52 54 57 / 82%) 5px 9px 10px`
                    : `${convertToRgbWithOpacity(
                        backgroundColor[0],
                        70
                      )} 5px 9px 10px`,
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
                  borderRadius: "5px",
                  height: "100%",
                  width: "33%",
                  padding: "none",
                  border: needToUseDark
                    ? "1px solid rgba(255, 255, 255, 0.125)"
                    : "1px solid rgba(0, 0, 0, 0.125)",
                  backgroundColor: `${backgroundColor[1]}`,
                  boxShadow: needToUseDark
                    ? `rgb(52 54 57 / 82%) 5px 9px 10px`
                    : `${convertToRgbWithOpacity(
                        backgroundColor[1],
                        70
                      )} 5px 9px 10px`,
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
                  borderRadius: "5px",
                  height: "100%",
                  width: "33%",
                  padding: "none",
                  border: needToUseDark
                    ? "1px solid rgba(255, 255, 255, 0.125)"
                    : "1px solid rgba(0, 0, 0, 0.125)",
                  backgroundColor: `${backgroundColor[2]}`,
                  boxShadow: needToUseDark
                    ? `rgb(52 54 57 / 82%) 5px 9px 10px`
                    : `${convertToRgbWithOpacity(
                        backgroundColor[2],
                        70
                      )} 5px 9px 10px`,
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
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
            ...settingMargin,
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
            <Box style={{ width: "inherit" }}>
              <FormControl
                sx={{
                  width: "100%",
                  padding: 0,
                }}
                size="small"
              >
                <Select
                  value={currentBackgroundType}
                  onChange={handleChangeBackground}
                  displayEmpty
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.125)",
                    color: needToUseDark
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(0, 0, 0, 0.7)",
                    padding: 0,
                  }}
                  sx={{
                    color: needToUseDark ? "white" : "rgba(0, 0, 0, 0.7)",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: needToUseDark
                        ? "rgba(228, 219, 233, 0.25)"
                        : "(50,50,50, 0.25)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: needToUseDark
                        ? "rgba(228, 219, 233, 0.25)"
                        : "(50,50,50, 0.25)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: needToUseDark
                        ? "rgba(228, 219, 233, 0.25)"
                        : "(50,50,50, 0.25)",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: needToUseDark
                        ? "white !important"
                        : "rgba(0, 0, 0, 0.7) !important",
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
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
            ...settingMargin,
          }}
        >
          <Stack
            style={{ width: "100%", height: "100%", padding: "15px" }}
            spacing={1}
            direction="column"
            alignItems="flex-start"
          >
            <Box>Card Color: </Box>
            <Stack
              style={{ width: "100%", height: "100%", padding: "5px" }}
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <Box
                style={{
                  borderRadius: "5px",
                  height: "100%",
                  width: "33%",
                  padding: "none",
                  border: needToUseDark
                    ? "1px solid rgba(255, 255, 255, 0.125)"
                    : "1px solid rgba(0, 0, 0, 0.125)",
                  backgroundColor: `${cardColor}`,
                  boxShadow: needToUseDark
                    ? `rgb(52 54 57 / 82%) 5px 9px 10px`
                    : `${convertToRgbWithOpacity(cardColor, 70)} 5px 9px 10px`,
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
          </Stack>
        </Box>
        <Box
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
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
            <Box style={{ width: "100%" }}>
              <span>{`Blur Value:`}</span>
              <CustomSlider
                value={blurVal}
                size="medium"
                onChange={handleChangeBlur}
                max={25}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider-size"
              />
              <span>{blurVal}px</span>
            </Box>
          </Stack>
        </Box>
        <Box
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
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
            <Box style={{ width: "100%" }}>
              <span>{`Opacity:`}</span>
              <CustomSlider
                value={opacityVal}
                size="medium"
                onChange={handleChangeOpacity}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider-size"
              />
              <span>{opacityVal}%</span>
            </Box>
          </Stack>
        </Box>
        <Box
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
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
            <Box style={{ width: "100%" }}>
              <span>{`Saturation:`}</span>
              <CustomSlider
                value={saturationVal}
                size="medium"
                onChange={handleChangeSaturation}
                min={0}
                max={200}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider-size"
              />
              <span>{saturationVal}%</span>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );

  const contentBox = (
    <Box
      style={{
        width: "80%",
        ...settingMargin,
      }}
    >
      <Stack
        style={{ width: "100%" }}
        gap={"10px"}
        direction={matches ? "column" : "row"}
        sx={{ py: matches ? 1 : 2 }}
        alignItems="space-between"
        justifyContent="space-between"
      >
        <Box
          style={{
            width: matches ? "100%" : "50%",
            height: matches ? "450px" : "700px",
            ...settingMargin,
            backgroundColor: needToUseDark
              ? "rgba(255,255,255, 0.1)"
              : "rgba(255,255,255, 0.5)",
            border: needToUseDark
              ? "1px solid rgba(255, 255, 255, 0.125)"
              : "1px solid rgba(0, 0, 0, 0.125)",
          }}
        >
          <Stack
            style={{
              width: "100%",
              height: "50px",
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
                    color: needToUseDark
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(0, 0, 0, 0.7)",
                    padding: 0,
                  }}
                  sx={{
                    color: needToUseDark ? "white" : "rgba(0, 0, 0, 0.7)",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: needToUseDark
                        ? "rgba(228, 219, 233, 0.25)"
                        : "(50,50,50, 0.25)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: needToUseDark
                        ? "rgba(228, 219, 233, 0.25)"
                        : "(50,50,50, 0.25)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: needToUseDark
                        ? "rgba(228, 219, 233, 0.25)"
                        : "(50,50,50, 0.25)",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: needToUseDark
                        ? "white !important"
                        : "rgba(0, 0, 0, 0.7) !important",
                    },
                  }}
                >
                  {handleRenderMenuItem}
                </Select>
              </FormControl>
            </Box>
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
            width: matches ? "100%" : "40%",
            height: "100%",
            backgroundColor: needToUseDark
              ? "rgba(255,255,255, 0.1)"
              : "rgba(255,255,255, 0.5)",
            backdropFilter: "blur(16px)",
            border: needToUseDark
              ? "1px solid rgba(255, 255, 255, 0.125)"
              : "1px solid rgba(0, 0, 0, 0.125)",
            ...settingMargin,
          }}
        >
          <Stack
            style={{ width: "100%", height: "100%", padding: "15px" }}
            spacing={2}
            direction={"column"}
            sx={{ px: 1 }}
            alignItems="flex-start"
          >
            <Box>CSS</Box>
            <Box style={{ width: "100%" }}>{HandleCSSContent()}</Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );

  return (
    <>
      <div
        id="arrangeParent"
        style={{
          fontFamily: "Gilroy",
          background: needToUseDark ? "#1F2929" : "rgba(227,227,227)",
          color: needToUseDark
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)",
          height: "unset",
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
        <Stack
          style={{ width: "100%" }}
          spacing={1}
          direction={"column"}
          sx={{ py: 2 }}
          alignItems="center"
          justifyContent={"center"}
        >
          {configBox}
          {contentBox}
        </Stack>
      </div>
    </>
  );
};

export default GlassmorphismBox;
