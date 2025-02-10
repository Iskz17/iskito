import { Title } from "../../components/Component";
import { Stack, createTheme, useMediaQuery } from "@mui/material";
import { useDarkLightTheme } from "../../context/DarkLightThemeContext";
import React, {
  useState,
} from "react";
import { BackgroundContent, CardContent, GlassmorphismBoxConfig, GlassmorphismBoxContent } from "./GlassmorphismBox.Component/GlassmorphismBox.Component";
import "./GlassmorphismBox.css";
import { GlassmorphismBoxLogic } from "./GlassmorphismBox.Component/GlassmorphismBox.Logic"
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();
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
  const [isDarkMode] = useDarkLightTheme();
  const [backgroundColor, setBackgroundColor] = useState([
    "#DF68B9",
    "#53D56D",
    "#92B9DD",
  ]);

  const [cardColor, setCardColor] = useState("#ebebeb");
  const [currentCardType, setCurrentCardType] = useState("creditCard");
  const [currentBackgroundType, setCurrentBackgroundType] = useState("mesh");

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
      <div
        // id="arrangeParent"
        className="glassBg"
        style={{
          fontFamily: "Gilroy",
          // background: needToUseDark ? "#1F2929" : "rgba(227,227,227)",
          color: isDarkMode
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.7)",
            paddingTop: "19px",
          height: "unset",
          minHeight: "699px"
        }}
      >
        <Title title={t('glassmorphism.title')} description={t('glassmorphism.description')} className="glassTitle"/>
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
            needToUseDark={isDarkMode}
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
            needToUseDark={isDarkMode}
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
  );
};

export default GlassmorphismBox;
