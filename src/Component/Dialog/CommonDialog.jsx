import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
  //return <Fade ref={ref} {...props} />;
});

export default function CommonDialog(props) {
  const theme = useTheme();
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        fullWidth="sm"
        keepMounted
        onClose={props.onClose}
        aria-describedby="alert-dialog-slide-description"
        BackdropProps={{
          style: {
            backgroundColor: theme.dialog.backgroundColor,
          },
        }}
        sx={{
          backdropFilter: theme.dialog.blur,
          "& .MuiDialog-container .MuiPaper-root": {
            boxShadow: theme.dialog.boxShadow,
            borderRadius: theme.dialog.borderRadius,
          },
        }}
      >
        <Stack direction="row-reverse" spacing={1}>
          <IconButton sx={{ cursor: "pointer" }} onClick={props.onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        {props.src ? (
          <Stack direction="row" justifyContent={"center"} spacing={1}>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
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
          }}
        >
          {props?.title ?? "Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ fontSize: { xs: "13px", md: "14px" } }}
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
                <Button
                  onClick={props?.secondaryAction ?? props.onClose}
                  variant="contained"
                  disableElevation
                  sx={{
                    textTransform: "none",
                    width: "50%",
                    backgroundColor: theme.button.secondary.main,
                    "&:hover": {
                      backgroundColor: theme.button.secondary.hover,
                      color: theme.button.secondary.hoverText,
                    },
                    color: theme.button.secondary.mainText,
                  }}
                >
                  {props?.secondaryActionText ?? "Disagree"}
                </Button>
              ) : null}

              {props?.primaryActionText ? (
                <Button
                  size="medium"
                  disableElevation
                  variant="contained"
                  onClick={props?.primaryAction ?? props.onClose}
                  sx={{
                    backgroundColor: theme.button.primary.main,
                    "&:hover": {
                      backgroundColor: theme.button.primary.hover,
                    },
                    textTransform: "none",
                    width: "50%",
                  }}
                >
                  {props?.primaryActionText ?? "Agree"}
                </Button>
              ) : null}
            </Stack>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
