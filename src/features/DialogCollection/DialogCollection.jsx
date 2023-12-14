import * as React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import CommonDialog from "../Component/Dialog/CommonDialog";
import { PrimaryButton } from "../Component/Button/CustomButton";

export function DialogCollection() {

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [openDialogPicture, setOpenDialogPicture] = useState(false);
  const handleCloseDialogPicture = () => {
    setOpenDialogPicture(false);
  };
  const handleClickOpenDialogPicture = () => {
    setOpenDialogPicture(true);
  };

  const [openDialogOne, setOpenDialogOne] = useState(false);
  const handleCloseDialogOne = () => {
    setOpenDialogOne(false);
  };
  const handleClickOpenDialogOne = () => {
    setOpenDialogOne(true);
  };  

  return (
    <Stack direction="column" spacing={2} style={{ padding: "10px" }}>
      <div>
        <PrimaryButton
          size="medium"
          disableElevation
          variant="contained"
          onClick={handleClickOpen}
        >
          Show common dialog no pictures
        </PrimaryButton>
        <CommonDialog
          onClose={handleClose}
          open={open}
          title={"Where is bby"}
          content={"I want my bbyyy"}
          primaryActionText="Confirm"
          secondaryActionText="Cancel"
        />
      </div>
      <div>
        <PrimaryButton
          size="medium"
          disableElevation
          variant="contained"
          onClick={handleClickOpenDialogPicture}
        >
          Show common dialog with pictures
        </PrimaryButton>
        <CommonDialog
          onClose={handleCloseDialogPicture}
          src={
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          }
          open={openDialogPicture}
          title={"Where picture is this"}
          content={"will need to use my use memo"}
          primaryActionText="Confirm"
          secondaryActionText="Cancel"
        />
      </div>
      <div>
        <PrimaryButton
          size="medium"
          disableElevation
          variant="contained"
          onClick={handleClickOpenDialogOne}
        >
          Show common dialog 1 action
        </PrimaryButton>
        <CommonDialog
          onClose={handleCloseDialogOne}
          src={
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          }
          open={openDialogOne}
          title={"Where picture is this"}
          content={"will need to use my use memo"}
          secondaryActionText="Close"
        />
      </div>
    </Stack>
  );
}
