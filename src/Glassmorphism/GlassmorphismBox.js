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
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { PrimaryButton } from "../Component/Button/CustomButton";
import "./GlassmorphismBox.css";
import CroppedCC from "../Assets/cropedcc.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Dropdown } from "../Component/Dropdown/Dropdown";
import { IsNullOrUndefined, convertHexToRGB } from "../Utils/Utils";

//might need browserfs for this

const GlassmorphismBox = () => {
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
    const [r, g, b] = convertHexToRGB(hexColor);
    return `rgba(${r},${g},${b}, ${opacity / 100})`;
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
    return (
      <div
        className="socialMediaCard"
        style={{
          backdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
          WebkitBackdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
          backgroundColor: `${convertToRgbWithOpacity(cardColor, opacityVal)}`,
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
      </div>
    );
  }, [blurVal, cardColor, opacityVal, saturationVal]);

  const CreditCard = useCallback(() => {
    return (
      <div
        className="creditCard"
        style={{
          height: matches ? "200px" : "50%",
          width: matches ? "300px" : "65%",
          backdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
          WebkitBackdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
          backgroundColor: `${convertToRgbWithOpacity(cardColor, opacityVal)}`,
          transform: matches ? "rotateZ(90deg)" : null,
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
      </div>
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
      <div
        className="backgroundSetting"
        style={{
          backgroundColor: `${backgroundColor[2]}`,
          backgroundImage: ` radial-gradient(at 47% 33%, ${backgroundColor[0]} 0, transparent 59%), 
      radial-gradient(at 82% 65%, ${backgroundColor[1]} 0, transparent 55%)`,
        }}
      >
        {HandleCardContent}
      </div>
    );
  }, [HandleCardContent, backgroundColor]);

  const SolidBackground = useCallback(() => {
    return (
      <div
        className="backgroundSetting"
        style={{
          backgroundColor: `${backgroundColor[0]}`,
        }}
      >
        {HandleCardContent}
      </div>
    );
  }, [backgroundColor, HandleCardContent]);

  const ImageBackground = useCallback(() => {
    return (
      <div className="backgroundSetting imageBackgroundSetting">
        {HandleCardContent}
      </div>
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
    switch (currentBackgroundType) {
      case "Mesh Gradient": {
        return (
          <>
            <span>
              <span className="attributeColor">{`background-image `}</span>
              <span>{`: `}</span>
            </span>
            <span>
              <span className="attributeColor">{`radial-gradient`}</span>
              <span>{`(`}</span>
              <span className="valueColor">{`at 47% 33%, ${backgroundColor[0]} 0, transparent 59%`}</span>
              <span>{`),`}</span>
            </span>
            <span>
              <span className="attributeColor">{`radial-gradient`}</span>
              <span>{`(`}</span>
              <span className="valueColor">
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
              <span className="attributeColor">{`background-image `}</span>
              <span>{`: `}</span>
              <span className="attributeColor">{`${backgroundColor[0]}`}</span>
              <span>{`;`}</span>
            </span>
          </>
        );
      }

      case "Image": {
        return (
          <>
            <span>
              <span className="attributeColor">{`background-image `}</span>
              <span>{`: `}</span>
              <span className="attributeColor">{`url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2)`}</span>
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
          <span className="attributeColor">{` background-color `}</span>
          <span>{`: `}</span>
          <span className="valueColor">{`${backgroundColor[2]}`}</span>
          <span>;</span>
        </span>

        {HandleBackgroundCSS()}

        <span>{`}`}</span>

        <span>
          <span style={{ color: "#53d56d" }}>{`.card `}</span>
          <span>{`{`}</span>
        </span>
        <span>
          <span className="attributeColor">{`backdrop-filter `}</span>
          <span>{`: `}</span>
          <span className="attributeColor">{`blur`}</span>
          <span>{`(`}</span>
          <span className="valueColor">{`${blurVal}px`}</span>
          <span>{`) `}</span>
          <span className="attributeColor">{`saturate`}</span>
          <span>{`(`}</span>
          <span className="valueColor">{`${saturationVal}%`}</span>
          <span>{`); `}</span>
        </span>
        <span>
          <span className="attributeColor">{`-webkit-backdrop-filter `}</span>
          <span>{`: `}</span>
          <span className="attributeColor">{`blur`}</span>
          <span>{`(`}</span>
          <span className="valueColor">{`${blurVal}px`}</span>
          <span>{`) `}</span>
          <span className="attributeColor">{`saturate`}</span>
          <span>{`(`}</span>
          <span className="valueColor">{`${saturationVal}%`}</span>
          <span>{`); `}</span>
        </span>
        <span>
          {" "}
          <span className="attributeColor">{`background-color `}</span>
          <span>{`: `}</span>
          <span className="valueColor">{` ${convertToRgbWithOpacity(
            cardColor,
            opacityVal
          )}`}</span>
          <span>{`;`}</span>
        </span>

        <span>
          <span className="attributeColor">{`border-radius `}</span>
          <span>{`: `}</span>
          <span className="valueColor">{`12px`}</span>
          <span>{`;`}</span>
        </span>

        <span>
          <span className="attributeColor">{`border `}</span>
          <span>{`: `}</span>
          <span className="valueColor">{`1px solid rgba(255, 255, 255, 0.25)`}</span>
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
        <MenuItem
          key={`${type}_menuItem`}
          value={type}
          style={{
            height: "30px",
            fontSize: "15px",
            fontFamily: "Gilroy",
          }}
        >
          {type}
        </MenuItem>
      )),
    []
  );

  const handleRenderMenuItemBg = useMemo(
    () =>
      backgroundType?.map((type) => (
        <MenuItem
          key={`${type}_menuItem`}
          value={type}
          style={{
            height: "30px",
            fontSize: "15px",
            fontFamily: "Gilroy",
          }}
        >
          {type}
        </MenuItem>
      )),
    []
  );

  const configBox = (
    <div
      className="settingMargin"
      style={{
        width: "80%",
        height: matches ? "100%" : "115px",
        backgroundColor: needToUseDark
          ? "rgba(255,255,255, 0.1)"
          : "rgba(255,255,255, 0.5)",
        backdropFilter: "blur(16px)",
        border: needToUseDark
          ? "1px solid rgba(255, 255, 255, 0.125)"
          : "1px solid rgba(0, 0, 0, 0.125)",
        marginBottom: "20px",
      }}
    >
      <Stack
        className="boxFullWidth"
        gap={"5px"}
        sx={{ px: 1, py: 1 }}
        direction={matches ? "column" : "row"}
        alignItems={matches ? "space-between" : "center"}
        justifyContent={"space-evenly"}
      >
        <div
          className="settingMargin"
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
          }}
        >
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={1}
            direction="column"
            alignItems="flex-start"
          >
            <Box>Background Color:</Box>
            <Stack
              className="boxFullWidth"
              style={{ padding: "5px" }}
              spacing={1}
              direction="row"
              alignItems="flex-start"
            >
              <Box
                style={{
                  borderRadius: "5px",
                  height: "100%",
                  width: "33%",
                  cursor: "pointer",
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
                htmlFor="color"
                onClick={() => {
                  document.getElementById("color0").click();
                }}
              >
                <input
                  id="color0"
                  type="color"
                  style={{
                    opacity: 0,
                    cursor: "pointer",
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  document.getElementById("color1").click();
                }}
              >
                <input
                  id="color1"
                  type="color"
                  style={{
                    opacity: 0,
                    cursor: "pointer",
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  document.getElementById("color2").click();
                }}
              >
                <input
                  id="color2"
                  type="color"
                  style={{
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  value={backgroundColor[2]}
                  onChange={(e) => handleColorChange(e, 2)}
                />
              </Box>
            </Stack>
          </Stack>
        </div>
        <div
          className="settingMargin"
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
          }}
        >
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={1}
            direction="column"
            sx={{ px: 1 }}
            alignItems="flex-start"
          >
            <Box>Background Type:</Box>
            <Box className="boxFullWidth">
              <FormControl
                sx={{
                  width: "100%",
                  padding: 0,
                }}
                size="small"
              >
                <Dropdown
                  value={currentBackgroundType}
                  onChange={handleChangeBackground}
                  displayEmpty
                  style={{
                    height: "30px",
                    fontSize: "15px",
                    fontFamily: "Gilroy",
                  }}
                >
                  {handleRenderMenuItemBg}
                </Dropdown>
              </FormControl>
            </Box>
          </Stack>
        </div>
        <div
          className="settingMargin"
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
          }}
        >
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={1}
            direction="column"
            alignItems="flex-start"
          >
            <Box>Card Color: </Box>
            <Stack
              className="boxFullWidth"
              style={{ padding: "5px" }}
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <Box
                style={{
                  borderRadius: "5px",
                  position: "relative",
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  document.getElementById("color3").click();
                }}
              >
                <input
                  id="color3"
                  type="color"
                  style={{
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  value={cardColor}
                  onChange={(e) => handleColorChange(e)}
                />
              </Box>
            </Stack>
          </Stack>
        </div>
        <div
          className="settingMargin"
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
          }}
        >
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={2}
            direction="column"
            sx={{ px: 1 }}
            alignItems="flex-start"
          >
            <Box className="boxFullWidth">
              <span>{`Blur Value: ${blurVal}px`}</span>
              <CustomSlider
                value={blurVal}
                size="medium"
                onChange={handleChangeBlur}
                max={25}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider-size"
              />
            </Box>
          </Stack>
        </div>
        <div
          className="settingMargin"
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
          }}
        >
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={2}
            direction="column"
            sx={{ px: 1 }}
            alignItems="flex-start"
          >
            <Box className="boxFullWidth">
              <span>{`Opacity: ${opacityVal}%`}</span>
              <CustomSlider
                value={opacityVal}
                size="medium"
                onChange={handleChangeOpacity}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider-size"
              />
            </Box>
          </Stack>
        </div>
        <div
          className="settingMargin"
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
          }}
        >
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={2}
            direction="column"
            sx={{ px: 1 }}
            alignItems="flex-start"
          >
            <Box className="boxFullWidth">
              <span>{`Saturation: ${saturationVal}%`}</span>
              <CustomSlider
                value={saturationVal}
                size="medium"
                onChange={handleChangeSaturation}
                min={0}
                max={200}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider-size"
              />
            </Box>
          </Stack>
        </div>
      </Stack>
    </div>
  );

  const contentBox = (
    <div
      className="settingMargin"
      style={{
        width: "80%",
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
        <div
          className="settingMargin"
          style={{
            width: matches ? "100%" : "50%",
            height: matches ? "450px" : "700px",
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
                <Dropdown
                  value={currentCardType}
                  onChange={handleChange}
                  displayEmpty
                  style={{
                    height: "30px",
                    fontSize: "15px",
                    fontFamily: "Gilroy",
                  }}
                >
                  {handleRenderMenuItem}
                </Dropdown>
              </FormControl>
            </Box>
          </Stack>
          <Stack
            style={{
              width: "100%",
              height: "90%",
            }}
            direction="row"
            sx={{ px: 2, py: 1 }}
            alignItems="center"
            justifyContent={"center"}
          >
            {HandleBackgroundContent}
          </Stack>
        </div>
        <div
          className="settingMargin"
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
        </div>
      </Stack>
    </div>
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
          <span>frosted glass style</span>
        </Stack>
        <Stack
          style={{ width: "100%", marginTop: matches ? "-26px" : 0 }}
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
