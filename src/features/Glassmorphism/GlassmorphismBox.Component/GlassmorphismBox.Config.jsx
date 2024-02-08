import { CustomSlider, Dropdown } from "../../../components/Component";
import { Stack, Box, FormControl, MenuItem } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const GlassmorphismBoxConfig = ({
  matches,
  needToUseDark,
  backgroundColor,
  convertToRgbWithOpacity,
  handleColorChange,
  handleChangeBackground,
  currentBackgroundType,
  blurVal,
  saturationVal,
  opacityVal,
  handleChangeBlur,
  handleChangeOpacity,
  handleChangeSaturation,
  cardColor,
}) => {
  const backgroundType = ["solid", "mesh", "image"];
  const { t } = useTranslation();
  const handleRenderMenuItemBg = () =>
    backgroundType?.map((type) => (
      <MenuItem
        key={`${type}_menuItem`}
        value={type}
        style={{
          height: "30px",
          fontSize: "15px",
          fontFamily: "Gilroy",
        }}>
        {t(`glassmorphism.config.backgroundTypeList.${type}`)}
      </MenuItem>
    ));

  return (
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
      }}>
      <Stack
        className="boxFullWidth"
        gap={"5px"}
        sx={{ px: 1, py: 1 }}
        direction={matches ? "column" : "row"}
        alignItems={matches ? "space-between" : "center"}
        justifyContent={"space-evenly"}>
        <div
          className="settingMargin"
          style={{
            height: matches ? "10%" : "100%",
            width: matches ? "100%" : "14%",
          }}>
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={1}
            direction="column"
            alignItems="flex-start">
            <Box>{t("glassmorphism.config.backgroundColor")}</Box>
            <Stack
              className="boxFullWidth"
              style={{ padding: "5px" }}
              spacing={1}
              direction="row"
              alignItems="flex-start">
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
                }}>
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
                }}>
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
                }}>
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
          }}>
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={1}
            direction="column"
            sx={{ px: 1 }}
            alignItems="flex-start">
            <Box>{t("glassmorphism.config.backgroundType")}</Box>
            <Box className="boxFullWidth">
              <FormControl
                sx={{
                  width: "100%",
                  padding: 0,
                }}
                size="small">
                <Dropdown
                  value={currentBackgroundType}
                  onChange={handleChangeBackground}
                  displayEmpty
                  style={{
                    height: "30px",
                    fontSize: "15px",
                    fontFamily: "Gilroy",
                  }}>
                  {handleRenderMenuItemBg()}
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
          }}>
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={1}
            direction="column"
            alignItems="flex-start">
            <Box>{t("glassmorphism.config.cardColor")}</Box>
            <Stack
              className="boxFullWidth"
              style={{ padding: "5px" }}
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent={"center"}>
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
                }}>
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
          }}>
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={2}
            direction="column"
            sx={{ px: 1 }}
            alignItems="flex-start">
            <Box className="boxFullWidth">
              <span>{`${t(
                "glassmorphism.config.blurValue"
              )} ${blurVal}px`}</span>
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
          }}>
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={2}
            direction="column"
            sx={{ px: 1 }}
            alignItems="flex-start">
            <Box className="boxFullWidth">
              <span>{`${t(
                "glassmorphism.config.opacity"
              )} ${opacityVal}%`}</span>
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
          }}>
          <Stack
            className="boxFullWidth"
            style={{ padding: matches ? "10px" : "15px" }}
            spacing={2}
            direction="column"
            sx={{ px: 1 }}
            alignItems="flex-start">
            <Box className="boxFullWidth">
              <span>{`${t(
                "glassmorphism.config.saturation"
              )} ${saturationVal}%`}</span>
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
};
