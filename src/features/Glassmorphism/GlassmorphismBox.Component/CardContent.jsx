import { Stack } from "@mui/material";
import { CustomAvatar, PrimaryButton } from "../../../components/Component";
import CroppedCC from "../../../assets/cropedcc.png";
import { memo } from "react";

export const CardContent = memo(
  ({
    currentCardType,
    blurVal,
    cardColor,
    opacityVal,
    matches,
    saturationVal,
    convertToRgbWithOpacity,
  }) => {
    const SocialMediaCard = () => {
      return (
        <div
          className="socialMediaCard"
          style={{
            backdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
            WebkitBackdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
            backgroundColor: `${convertToRgbWithOpacity(
              cardColor,
              opacityVal
            )}`,
          }}>
          <Stack
            style={{
              width: "100%",
              height: "100%",
            }}
            spacing={2}
            direction="column"
            sx={{ px: 2, py: 2 }}
            alignItems="center"
            justifyContent={"center"}>
            <CustomAvatar
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              dotColor="yellow"
              avatarsrc="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              avatarsx={{
                width: matches ? 100 : 120,
                height: matches ? 100 : 120,
              }}
              avataralt="Aqilah Iskandar"
            />
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
    };

    const CreditCard = () => {
      return (
        <div
          className="creditCard"
          style={{
            height: matches ? "200px" : "50%",
            width: matches ? "300px" : "65%",
            backdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
            WebkitBackdropFilter: `blur(${blurVal}px) saturate(${saturationVal}%)`,
            backgroundColor: `${convertToRgbWithOpacity(
              cardColor,
              opacityVal
            )}`,
            transform: matches ? "rotateZ(90deg)" : null,
          }}>
          <Stack
            style={{
              width: "100%",
              height: "20%",
            }}
            spacing={2}
            direction="column"
            sx={{ px: 2, py: 2, my: 2 }}
            alignItems="flex-end"
            justifyContent={"center"}>
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
            justifyContent={"center"}>
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
              }}>
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
            justifyContent={"space-between"}>
            <span style={{ color: "white", textAlign: "center" }}>02/12</span>
            <span style={{ color: "white", textAlign: "center" }}>
              Aqilah Iskandar
            </span>
          </Stack>
        </div>
      );
    };

    console.log("render card?");

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
  },
  (prevProps, nextProps) => {
    //if false, then render new. If true return the old render
    console.log(
      (prevProps.matches && !nextProps.matches) ||
        (!prevProps.matches && nextProps.matches),
      prevProps.matches,
      nextProps.matches
    );
    if (
      (prevProps.matches && !nextProps.matches) ||
      (!prevProps.matches && nextProps.matches)
    ) {
      return false;
    }

    return (
      prevProps.currentCardType === nextProps.currentCardType &&
      prevProps.blurVal === nextProps.blurVal &&
      prevProps.cardColor === nextProps.cardColor &&
      prevProps.opacityVal === nextProps.opacityVal &&
      prevProps.saturationVal === nextProps.saturationVal
    );
  }
);
