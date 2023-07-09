import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import React, { useState, useRef } from "react";
import "./GlassmorphismBox.css";

const GlassmorphismBox = () => {
  let settingMargin = {
    marginBottom: "0px",
    marginTop: "0px",
    borderRadius:"15px",
    padding: 0,
  };

  const [blurVal, setBlurVal] = useState(300);
  const [opacityVal, setOpacityVal] = useState(20);
  const [saturationVal, setSaturationVal] = useState(30);
  const [needToUseDark, setNeedToUseDark] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#CAE6E8");
  const inputElement = useRef(null);

  const handleColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };
  const handleChangeBlur = (newValue) => {
    setBlurVal(newValue.target.value);
  };
  const handleChangeOpacity = (newValue) => {
    setOpacityVal(newValue.target.value);
  }
  const handleChangeSaturation = (newValue) => {
    setSaturationVal(newValue.target.value);
  }

  return (
    <>
      <div
        id="arrangeParent"
        style={{
          fontFamily: "Gilroy",
        }}
      >
        <Box
          style={{
            width: "80%",
            height: "140px",
            backgroundColor:"#605d65",
            ...settingMargin,
          }}
        >
          <Stack
            style={{ width: "100%", height: "100%", padding: "15px" }}
            spacing={2}
            direction="row"
            sx={{ px: 1 }}
            alignItems="center"
          >
            <Box
              style={{
                width: "25%",
                height: "100%",
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
                <Box>Background Color</Box>
                <Stack
                  style={{ width: "100%", height: "100%", padding:"5px" }}
                  spacing={2}
                  direction="row"
                  sx={{ px: 1 }}
                  alignItems="flex-start"
                >
                  <Box
                    style={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      padding: "none",
                      border: "none",
                      backgroundColor: `${backgroundColor}`,
                    }}
                    onClick={() => {
                      console.log("hello", inputElement);
                      inputElement.current.click();
                    }}
                  >
                    <input
                      ref={inputElement}
                      type="color"
                      style={{
                        WebkitAppearance: "none",
                        visibility: "hidden",
                      }}
                      value={backgroundColor}
                      onChange={(e) => handleColorChange(e)}
                    />
                  </Box>
                  <Box
                    style={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      padding: "none",
                      border: "none",
                      backgroundColor: `${backgroundColor}`,
                    }}
                    onClick={() => {
                      console.log("hello", inputElement);
                      inputElement.current.click();
                    }}
                  >
                    <input
                      ref={inputElement}
                      type="color"
                      style={{
                        WebkitAppearance: "none",
                        visibility: "hidden",
                      }}
                      value={backgroundColor}
                      onChange={(e) => handleColorChange(e)}
                    />
                  </Box>
                  <Box
                    style={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      padding: "none",
                      border: "none",
                      backgroundColor: `${backgroundColor}`,
                    }}
                    onClick={() => {
                      console.log("hello", inputElement);
                      inputElement.current.click();
                    }}
                  >
                    <input
                      ref={inputElement}
                      type="color"
                      style={{
                        WebkitAppearance: "none",
                        visibility: "hidden",
                      }}
                      value={backgroundColor}
                      onChange={(e) => handleColorChange(e)}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Box>
            <Box
              style={{
                width: "25%",
                height: "100%",
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
                <Box>Background Type</Box>
                <Box>content</Box>
              </Stack>
            </Box>
            <Box
              style={{
                width: "25%",
                height: "100%",
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
                <Box>
                  Card Color
                  <Stack
                    style={{ width: "100%", height: "100%", padding: "5px" }}
                    spacing={2}
                    direction="row"
                    sx={{ px: 1 }}
                    alignItems="center"
                    justifyContent={"center"}
                  >
                    <Box>{`${backgroundColor}`}</Box>
                    <Box
                      style={{
                        borderRadius: "50%",
                        height: "40px",
                        width: "40px",
                        padding: "none",
                        border: "none",
                        backgroundColor: `${backgroundColor}`,
                      }}
                      onClick={() => {
                        console.log("hello", inputElement);
                        inputElement.current.click();
                      }}
                    >
                      <input
                        ref={inputElement}
                        type="color"
                        style={{
                          WebkitAppearance: "none",
                          visibility: "hidden",
                        }}
                        value={backgroundColor}
                        onChange={(e) => handleColorChange(e)}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box
              style={{
                width: "25%",
                height: "100%",
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
                  <Slider
                    value={blurVal}
                    size="medium"
                    onChange={handleChangeBlur}
                    min={12}
                    max={410}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider-size"
                    sx={{
                      color: needToUseDark ? "#001f3f" : "white",
                      height: 8,
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        height: 18,
                        width: 18,
                        backgroundColor: "#fff",
                        border: "2px solid currentColor",
                        // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                        //   boxShadow: "inherit",
                        // },
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:before": {
                          boxShadow: "0 2px 12px 0 currentColor",
                        },
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: `0px 0px 0px 8px ${
                            //theme.palette.mode === 'dark'
                            //? 'rgb(255 255 255 / 16%)'
                            //:
                            "rgb(82	175	119 / 16%)"
                          }`,
                        },
                      },
                      "& .MuiSlider-valueLabel": {
                        lineHeight: 1.2,
                        fontSize: 12,
                        background: "unset",
                        color: !needToUseDark ? "#001f3f" : "white",
                        padding: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50% 50% 50% 0",
                        backgroundColor: needToUseDark ? "#001f3f" : "white",
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
                width: "25%",
                height: "100%",
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
                  <Slider
                    value={opacityVal}
                    size="medium"
                    onChange={handleChangeOpacity}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider-size"
                    sx={{
                      color: needToUseDark ? "#001f3f" : "white",
                      height: 8,
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        height: 18,
                        width: 18,
                        backgroundColor: "#fff",
                        border: "2px solid currentColor",
                        // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                        //   boxShadow: "inherit",
                        // },
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:before": {
                          boxShadow: "0 2px 12px 0 currentColor",
                        },
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: `0px 0px 0px 8px ${
                            //theme.palette.mode === 'dark'
                            //? 'rgb(255 255 255 / 16%)'
                            //:
                            "rgb(82	175	119 / 16%)"
                          }`,
                        },
                      },
                      "& .MuiSlider-valueLabel": {
                        lineHeight: 1.2,
                        fontSize: 12,
                        background: "unset",
                        color: !needToUseDark ? "#001f3f" : "white",
                        padding: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50% 50% 50% 0",
                        backgroundColor: needToUseDark ? "#001f3f" : "white",
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
                width: "25%",
                height: "100%",
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
                  <Slider
                    value={saturationVal}
                    size="medium"
                    onChange={handleChangeSaturation}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider-size"
                    sx={{
                      color: needToUseDark ? "#001f3f" : "white",
                      height: 8,
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        height: 18,
                        width: 18,
                        backgroundColor: "#fff",
                        border: "2px solid currentColor",
                        // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                        //   boxShadow: "inherit",
                        // },
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:before": {
                          boxShadow: "0 2px 12px 0 currentColor",
                        },
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: `0px 0px 0px 8px ${
                            //theme.palette.mode === 'dark'
                            //? 'rgb(255 255 255 / 16%)'
                            //:
                            "rgb(82	175	119 / 16%)"
                          }`,
                        },
                      },
                      "& .MuiSlider-valueLabel": {
                        lineHeight: 1.2,
                        fontSize: 12,
                        background: "unset",
                        color: !needToUseDark ? "#001f3f" : "white",
                        padding: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50% 50% 50% 0",
                        backgroundColor: needToUseDark ? "#001f3f" : "white",
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
            style={{ width: "100%", height: "100%", padding: "15px" }}
            spacing={2}
            direction="row"
            sx={{ px: 1 }}
            alignItems="center"
          >
            <Box
              style={{
                width: "50%",
                height: "100%",
                ...settingMargin,
                background: "blue",
              }}
            >
              <Stack
                style={{ width: "100%", height: "100%", padding: "15px" }}
                spacing={2}
                direction="column"
                sx={{ px: 1 }}
                alignItems="flex-start"
              >
                <Box>Background Color</Box>
                <Box>content</Box>
              </Stack>
            </Box>
            <Box
              style={{
                width: "50%",
                height: "100%",
                ...settingMargin,
                background: "blue",
              }}
            >
              <Stack
                style={{ width: "100%", height: "100%", padding: "15px" }}
                spacing={2}
                direction="column"
                sx={{ px: 1 }}
                alignItems="flex-start"
              >
                <Box>Background Type</Box>
                <Box>content</Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default GlassmorphismBox;
