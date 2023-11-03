import * as React from "react";
import { CheckCircleRounded, OfflineBolt, Pending } from "@mui/icons-material";
import {
  Box,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { PrimaryButton } from "../Component";
import { styled } from "@mui/material/styles";

const iconColor = {
  completed: "white",
  inProgress: "#2F4051", //'neutral90',
  skipped: "#DDE0E3", //'neutral10',
};

const CustomStepperConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 12,
    left: "calc(-100% + 31.8px)",
    right: "calc(100% + 8px)",
  },
  [`& .${stepConnectorClasses.line}.${stepConnectorClasses.lineVertical}`]: {
    width: "2px",
    position: "relative",
    marginBottom: "-1.5px",
  },
  [`& .${stepConnectorClasses.line}.${stepConnectorClasses.lineVertical}::after`]:
    {
      content: "''",
      height: "150%",
      position: "absolute",
      backgroundColor: "inherit",
      zIndex: 1,
      width: "2px",
      top: "-32px",
    },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: "#8B939A", //HelixPalette.neutral50,
    borderRadius: 1,
  },
}));

const CustomStepperIconRoot = styled("div")(({ ownerState }) => ({
  zIndex: 1,
  color: "#fff",
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  background: "#8B939A",
  ...((ownerState.skip || ownerState.active) && {
    background: "white",
  }),
  ...(ownerState.completed && {
    background: "white",
  }),
}));

const stepDemo = [
  {
    titleText: "Create Review",
    helperText: "Review setup",
    completed: false,
    skip: true,
  },
  {
    titleText: "Review Parameter Setup",
    helperText: "Settings for review",
    completed: false,
    skip: true,
  },
  {
    titleText: "Add participant",
    helperText: "Add reviewers, authors",
    completed: true,
  },
  {
    titleText: "Setting Email Reminder",
    helperText: "Hours or Days before",
    completed: true,
  },
  {
    titleText: "Start Review",
    helperText: "Yeay!!",
    completed: true,
  },
  {
    titleText: "Review",
    helperText: "Review in progress",
    completed: true,
  },
  {
    titleText: "Review Ended Notification",
    helperText: "Email review ended",
    completed: false,
  },
];

const icons = (completed, active, skip) => {
  if (skip) {
    return (
      <OfflineBolt
        color={iconColor.skipped}
        style={{ height: "1.65rem", width: "1.65rem" }}
      />
    );
  }

  if (completed) {
    return (
      <CheckCircleRounded
        color={iconColor.completed}
        style={{ height: "1.65rem", width: "1.65rem" }}
      />
    );
  }

  if (active) {
    return (
      <Pending
        color={iconColor.inProgress}
        style={{ height: "1.65rem", width: "1.65rem" }}
      />
    );
  }
  return null;
};

function CustomStepperIcon(props, steps) {
  const { active, completed, className } = props;
  let skip = steps[props.icon - 1]?.skip;
  //skip will affect completed
  //since we need to change different icon and icon color
  let overrideCompleted = skip ? false : completed;

  //props.icon will return step number
  return (
    <CustomStepperIconRoot
      ownerState={{ completed: overrideCompleted, active, skip }}
      className={className}>
      <div
        style={{
          fontSize: "1rem",
          margin: 0,
          fontWeight: 500,
          padding: 0,
          marginTop: 0,
          borderRadius: "50%",
          textAlign: "center",
          color: "white", //HelixPalette.neutral100,
          ...(active && {
            marginTop: 6,
            color: "#8B939A", //HelixPalette.neutral50,
          }),
          ...(skip && {
            marginTop: 6,
            color: "#8B939A", //HelixPalette.neutral50,
          }),
          ...(overrideCompleted && {
            marginTop: 6,
            color: "#08A768", //HelixPalette.green80,
          }),
        }}>
        {icons(overrideCompleted, active, skip) ?? props.icon}
      </div>
    </CustomStepperIconRoot>
  );
}

function ProgressStepper(props) {
  let { isHorizontalOrientation, trailingConnector, active, steps } = props;

  React.useEffect(() => {
    //inject complex css queries
    //because vertical lines is a standalone and does not have 'step' parent
    let allVerticalLines = document.querySelectorAll(
      ".MuiStep-root.MuiStep-vertical.Mui-completed+.MuiStepConnector-root.MuiStepConnector-vertical>.MuiStepConnector-line.MuiStepConnector-lineVertical"
    );
    allVerticalLines.forEach((vert) => {
      vert.setAttribute("style", `background-color:${"#08A768"}`);
    });
  }, []);

  return (
    <Box
      style={{
        // border: `2px solid ${"#DDE0E3"}`,
        borderRadius: "8px",
        backgroundColor: "white",
        padding: `12px ${isHorizontalOrientation ? "16px" : "12px"}`,
        maxWidth: isHorizontalOrientation ? "900px" : "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 0,
      }}>
      <Box
        style={{
          alignItems: "center",
          flexDirection: isHorizontalOrientation ? "row" : "column",
          margin: 0,
          display: "flex",
          flexGrow: 1,
          paddingRight: "-2px",
        }}>
        <Stepper
          sx={{ flexGrow: 1 }}
          alternativeLabel={isHorizontalOrientation}
          activeStep={active}
          connector={<CustomStepperConnector />}
          orientation={isHorizontalOrientation ? "horizontal" : "vertical"}>
          {steps.map((step, index) => {
            let connectorColor = {};
            if (index !== 0) {
              if (steps[index - 1].skip) {
                connectorColor = {
                  "& .MuiStepConnector-root.Mui-disabled .MuiStepConnector-line":
                    {
                      background: "#8B939A", //HelixPalette.neutral50,
                    },
                  "& .MuiStepConnector-root .MuiStepConnector-line": {
                    background: "#8B939A", //HelixPalette.neutral50,
                  },
                };
              } else if (steps[index - 1].completed) {
                connectorColor = {
                  "& .MuiStepConnector-root .MuiStepConnector-line": {
                    background: "#08A768", //HelixPalette.green80,
                  },
                  "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line":
                    {
                      background: "#08A768", //HelixPalette.green80,
                    },
                };
              }
            }

            return (
              <Step
                key={step.titleText}
                disabled={step.skip}
                completed={!step.skip && step.completed}
                sx={{
                  ...connectorColor,
                  height: isHorizontalOrientation ? "unset" : "70px",
                  paddingLeft: 0,
                  textAlign: "start",
                }}>
                <StepLabel
                  sx={{
                    alignItems: "flex-start",
                    textAlign: "start",
                    "& .MuiStepLabel-labelContainer.MuiStepLabel-alternativeLabel":
                      {
                        textAlign: "start",
                        marginTop: "-10px",
                        paddingBottom: 0,
                      },
                    "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
                      textAlign: "start",
                      marginTop: "7px",
                    },
                  }}
                  StepIconComponent={(props) => {
                    return CustomStepperIcon(props, steps);
                  }}
                  optional={
                    step.helperText ? (
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: "0.8125rem",
                          fontWeight: 400,
                          color: "#8B939A", //HelixPalette.neutral70,
                        }}>
                        {step.helperText}
                      </Typography>
                    ) : null
                  }>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#5D6977", // HelixPalette.neutral70
                    }}>
                    {step.titleText}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
          {
            //for trailing connector
            trailingConnector &&
              ["dummy"].map(() => {
                let connectorColor = {};
                if (steps[steps.length - 1].skip) {
                  connectorColor = {
                    "& .MuiStepConnector-root.Mui-disabled .MuiStepConnector-line":
                      {
                        background: "#8B939A", //HelixPalette.neutral50,
                      },
                    "& .MuiStepConnector-root .MuiStepConnector-line": {
                      background: "#8B939A", //HelixPalette.neutral50,
                    },
                  };
                } else if (steps[steps.length - 1].completed) {
                  connectorColor = {
                    "& .MuiStepConnector-root .MuiStepConnector-line": {
                      background: "#08A768", //HelixPalette.green80,
                    },
                    "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line":
                      {
                        background: "#08A768", //HelixPalette.green80,
                      },
                  };
                }

                return (
                  <Step
                    key={"trailing_connector"}
                    sx={{ ...connectorColor, paddingLeft: 0 }}></Step>
                );
              })
          }
        </Stepper>
        {
          <Box
            // className="tw-flex tw-justify-end"
            style={{
              display:'flex',
              flexDirection:"column",
              alignItems:"center",
              justifyContent:"center",
              textAlign:'center',
              marginLeft:
                isHorizontalOrientation && trailingConnector
                  ? "calc(-10% - 110px)"
                  : "unset",
              marginTop: !(isHorizontalOrientation && trailingConnector)
              ? "calc(25px)"
              : "unset",
              width: isHorizontalOrientation ? "unset" : "100%",
            }}>
            {steps.length > 0 && steps[steps.length - 1].completed ? (
              <>
                <CheckCircleRounded
                  style={{
                    height: "1.65rem",
                    width: "1.65rem",
                    color: "#08A768",
                  }}
                />
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  style={{
                    fontFamily: "Gilroy",
                    fontSize: "0.95rem",
                    fontWeight: 400,
                    color: "#5D6977", //HelixPalette.neutral70,
                  }}>
                  {"Completed"}
                </Typography>
              </>
            ) : (
              <>
                <Pending
                  style={{
                    height: "1.65rem",
                    width: "1.65rem",
                    color: "#8B939A",
                  }}
                />
                 <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  style={{
                    fontFamily: "Gilroy",
                    fontSize: "0.95rem",
                    fontWeight: 400,
                    color: "#5D6977", //HelixPalette.neutral70,
                  }}>
                  {"In progress"}
                </Typography>
              </>
            )}
          </Box>
        }
      </Box>
    </Box>
  );
}

export default ProgressStepper;
