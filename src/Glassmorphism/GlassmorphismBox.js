import { Title } from "../Component/Component"
import { Stack, createTheme, useMediaQuery } from "@mui/material";
import { AppContext } from "../Context/AppContext";
import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { BackgroundContent, CardContent, GlassmorphismBoxConfig, GlassmorphismBoxContent } from "./GlassmorphismBox.Component/GlassmorphismBox.Component";
import "./GlassmorphismBox.css";
import { GlassmorphismBoxLogic } from "./GlassmorphismBox.Component/GlassmorphismBox.Logic"

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

  //   $(function() { 
  //     $("#btnSave").click(function() { 
  //         html2canvas($("#widget"), {
  //             onrendered: function(canvas) {
  //                 theCanvas = canvas;
  //                 document.body.appendChild(canvas);

  //                 canvas.toBlob(function(blob) {
  // 					saveAs(blob, "Dashboard.png"); 
  // 				});
  //             }
  //         });
  //     });
  // }); 

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
  const [currentBackgroundType, setCurrentBackgroundType] = useState("Mesh Gradient");

  let {
    handleChange,
    handleChangeBackground,
    handleChangeSaturation,
    handleChangeBlur,
    handleChangeOpacity,
    handleColorChange,
    convertToRgbWithOpacity
  } = GlassmorphismBoxLogic({
    setCardColor,
    setBackgroundColor,
    setBlurVal,
    setOpacityVal,
    setSaturationVal,
    setCurrentCardType,
    setCurrentBackgroundType,
    backgroundColor
  })

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
          minHeight: "699px"
        }}
      >
        <Title title="Glass UI" description="frosted glass style" />
        <Stack
          style={{ width: "100%", marginTop: matches ? "-26px" : 0 }}
          spacing={1}
          direction={"column"}
          sx={{ py: 2 }}
          alignItems="center"
          justifyContent={"center"}
        >
          <GlassmorphismBoxConfig
            matches={matches}
            needToUseDark={needToUseDark}
            backgroundColor={backgroundColor}
            convertToRgbWithOpacity={convertToRgbWithOpacity}
            currentBackgroundType={currentBackgroundType}
            handleChangeBackground={handleChangeBackground}
            handleColorChange={handleColorChange}
            handleChangeBlur={handleChangeBlur}
            handleChangeOpacity={handleChangeOpacity}
            handleChangeSaturation={handleChangeSaturation}
            cardColor={cardColor}
            blurVal={blurVal}
            opacityVal={opacityVal}
            saturationVal={saturationVal}
          />
          <GlassmorphismBoxContent
            matches={matches}
            needToUseDark={needToUseDark}
            currentCardType={currentCardType}
            handleChange={handleChange}
            backgroundColor={backgroundColor}
            blurVal={blurVal}
            saturationVal={saturationVal}
            cardColor={cardColor}
            opacityVal={opacityVal}
            currentBackgroundType={currentBackgroundType}
            convertToRgbWithOpacity={convertToRgbWithOpacity}
          >
            <BackgroundContent
              backgroundColor={backgroundColor}
              currentBackgroundType={currentBackgroundType}>
              <CardContent
                currentCardType={currentCardType}
                blurVal={blurVal}
                cardColor={cardColor}
                opacityVal={opacityVal}
                matches={matches}
                saturationVal={saturationVal}
                convertToRgbWithOpacity={convertToRgbWithOpacity}
              />
            </BackgroundContent>
          </GlassmorphismBoxContent>
        </Stack>
      </div>
    </>
  );
};

export default GlassmorphismBox;
