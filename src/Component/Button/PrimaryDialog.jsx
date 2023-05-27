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
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  //return <Slide direction="up" ref={ref} {...props} />;
  return <Fade ref={ref} {...props} />;
});

export default function CommonDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            backgroundColor: "rgba(168,168,168,0.4)",
          },
        }}
        sx={{
          backdropFilter: "blur(3px)",
          "& .MuiDialog-container .MuiPaper-root": {
            boxShadow: "0px 45px 25px -25px rgba(0 , 0 ,0, 0.2)",
            borderRadius: "11px",
          },
        }}
      >
        <Stack direction="row-reverse" spacing={1}>
          <IconButton sx={{ cursor: "pointer" }} onClick={props.onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        {false ? (
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
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
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
              <Button
                onClick={props?.secondaryAction ?? props.onClose}
                variant="contained"
                disableElevation
                sx={{
                  textTransform: "none",
                  width: "50%",
                  backgroundColor: "rgb(226,231,238)",
                  "&:hover": {
                    backgroundColor: "rgb(194,197,208)",
                    color: "black",
                  },
                  color: "rgb(93,93,93)",
                }}
              >
                {props?.secondaryActionText ?? "Disagree"}
              </Button>
              <Button
                size="medium"
                disableElevation
                variant="contained"
                onClick={props?.primaryAction ?? props.onClose}
                sx={{
                  backgroundColor: theme.status.primary,
                  textTransform: "none",
                  width: "50%",
                }}
              >
                {/* {props?.primaryActionText ?? "Agree"} */}
                {theme.status.primary ?? "Agree"}
              </Button>
            </Stack>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
