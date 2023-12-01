import { Stack, Box, FormControl, MenuItem } from "@mui/material";
import { Dropdown } from "../../../components/Component";
import { useMemo } from "react";

export const GlassmorphismBoxContent = ({
  matches,
  needToUseDark,
  currentCardType,
  handleChange,
  backgroundColor,
  currentBackgroundType,
  blurVal,
  saturationVal,
  cardColor,
  opacityVal,
  convertToRgbWithOpacity,
  children,
}) => {
  const handleRenderMenuItem = () => {
    const cardType = ["Social Media", "Credit Card"];
    return cardType?.map((type) => (
      <MenuItem
        key={`${type}_menuItem`}
        value={type}
        style={{
          height: "30px",
          fontSize: "15px",
          fontFamily: "Gilroy",
        }}>
        {type}
      </MenuItem>
    ));
  };

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
        alignItems="flex-start">
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

  return (
    <div
      className="settingMargin"
      style={{
        width: "80%",
      }}>
      <Stack
        style={{ width: "100%" }}
        gap={"10px"}
        direction={matches ? "column" : "row"}
        sx={{ py: matches ? 1 : 2 }}
        alignItems="space-between"
        justifyContent="space-between">
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
          }}>
          <Stack
            style={{
              width: "100%",
              height: "50px",
            }}
            spacing={2}
            direction="row"
            sx={{ px: 2.5, py: 2 }}
            alignItems="flex-start"
            justifyContent={"space-between"}>
            <Box>
              <FormControl
                sx={{
                  minWidth: "150px",
                }}
                size="small">
                <Dropdown
                  value={currentCardType}
                  onChange={handleChange}
                  displayEmpty
                  style={{
                    height: "30px",
                    fontSize: "15px",
                    fontFamily: "Gilroy",
                  }}>
                  {handleRenderMenuItem()}
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
            justifyContent={"center"}>
            {children}
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
          }}>
          <Stack
            style={{ width: "100%", height: "100%", padding: "15px" }}
            spacing={2}
            direction={"column"}
            sx={{ px: 1 }}
            alignItems="flex-start">
            <Box>CSS</Box>
            <Box style={{ width: "100%" }}>{HandleCSSContent()}</Box>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};
