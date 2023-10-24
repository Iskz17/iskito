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
  background:'#8B939A',
  ...((ownerState.skip || ownerState.active) && {
    background: "white"
  }),   
  ...(ownerState.completed && {
    background: "white"
  }), 
}));

const icons = (completed, active, skip) => {
  if (skip) {
    return <OfflineBolt color={iconColor.skipped} size={24} />;
  }

  if (completed) {
    return <CheckCircleRounded color={iconColor.completed} size={24} />;
  }

  if (active) {
    return <Pending color={iconColor.inProgress} size={24} />;
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
          padding:0,
          marginTop:6,
          borderRadius:'50%',
          textAlign:'center',
          color: "white", //HelixPalette.neutral100,
          ...((skip || active) && {
            color: "#8B939A", //HelixPalette.neutral50,
          }),   
          ...(overrideCompleted && {
            color: "#08A768", //HelixPalette.green80,
          }),
        }}>
        {icons(overrideCompleted, active, skip) ?? props.icon}
      </div>
    </CustomStepperIconRoot>
  );
}

function ProgressStepper(props) {
  let {
    onClick,
    isHorizontalOrientation,
    trailingConnector,
    active,
    steps,
    buttonText,
  } = props;

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
                          fontSize: "0.8125rem",
                          fontWeight: 400,
                          color: "#5D6977", //HelixPalette.neutral70,
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
          {/* {
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
          } */}
        </Stepper>
        {/* {onClick && (
          <Box
            className="tw-flex tw-justify-end"
            style={{
              marginLeft:
                isHorizontalOrientation && trailingConnector
                  ? "calc(-10% - 15px)"
                  : "unset",
              width: isHorizontalOrientation ? "unset" : "100%",
            }}>
            <PrimaryButton
              dataId="stepper-button"
              iconPosition="right"
              label={buttonText ?? "button"}
              // label={t('dashboard.create-new-template-button')}
              onClick={onClick}
              size="medium"
              theme="primary"
              variant="default"
            />
          </Box>
        )} */}
      </Box>
    </Box>
  );
}

export default ProgressStepper;