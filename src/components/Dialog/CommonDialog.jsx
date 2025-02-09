import * as React from "react";
import { PrimaryButton, SecondaryButton } from "../Button/CustomButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useState, useContext, useEffect } from "react";
import { useDarkLightTheme } from "../../Context/DarkLightThemeContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
  //return <Fade ref={ref} {...props} />;
});

export default function CommonDialog(props) {
  const [isDarkMode] = useDarkLightTheme();
  const [themeld, setThemeld] = useState("light");

  useEffect(() => {
    setThemeld(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const theme = useTheme();
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
        aria-describedby="alert-dialog-slide-description"
        BackdropProps={{
          style: {
            backgroundColor: theme[themeld].dialog.backgroundColor,
          },
        }}
        sx={{
          backdropFilter: theme[themeld].dialog.blur,
          "& .MuiDialog-container .MuiPaper-root": {
            boxShadow: theme[themeld].dialog.boxShadow,
            borderRadius: theme[themeld].dialog.borderRadius,
            backgroundColor: theme[themeld].dialogPaper.backgroundColor,
          },
        }}
      >
        <Stack direction="row-reverse" spacing={1}>
          <IconButton
            sx={{ cursor: "pointer", color: theme[themeld].dialogPaper.color }}
            onClick={props.onClose}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        {props.src ? (
          <Stack
            direction="row"
            justifyContent={"center"}
            spacing={1}
            style={{ padding: "10px" }}
          >
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                borderRadius: "5px",
              }}
              alt="The house from the offer."
              src={props?.src}
            />
          </Stack>
        ) : (
          <></>
        )}

        <DialogTitle
          sx={{
            fontWeight: "760",
            letterSpacing: "-1px",
            fontSize: { xs: "18px", md: "20px" },
            color: theme[themeld].dialogPaper.color,
          }}
        >
          {props?.title ?? "Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{
              fontSize: { xs: "13px", md: "14px" },
              color: theme[themeld].dialogPaper.color,
            }}
          >
            {props?.content ??
              `Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.`}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"center"}
              sx={{
                width: "100%",
                //margin: "7px"
              }}
            >
              {props?.secondaryActionText ? (
                <SecondaryButton
                  onClick={props?.secondaryAction ?? props.onClose}
                  variant="contained"
                  disableElevation
                >
                  {props?.secondaryActionText ?? "Disagree"}
                </SecondaryButton>
              ) : null}

              {props?.primaryActionText ? (
                <PrimaryButton
                  size="medium"
                  disableElevation
                  variant="contained"
                  onClick={props?.primaryAction ?? props.onClose}
                >
                  {props?.primaryActionText ?? "Agree"}
                </PrimaryButton>
              ) : null}
            </Stack>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
