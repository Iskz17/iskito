import "./App.css";
import Typewriter from "typewriter-effect";
import Kito from "./kito-nobg.png";
import ParticleBackground from "./particle";
import NewmorphismBox from "./Neumorphism/NeumorphismBox";
import GlassmorphismBox from "./Glassmorphism/GlassmorphismBox";
import CommonDialog from "./Component/Dialog/CommonDialog";
import Stack from "@mui/material/Stack";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import "./Particle.css";
import { AppContext, AppContextProvider } from "./Context/AppContext";
import AppTheme from "./Component/ThemeProvider/AppTheme";
import Switch from '@mui/material/Switch';

const App = () => {
  const headerItem = {
    minwidth: "0",
    height: "100%",
    background: "rgba(152, 194, 211, 0.555)",
    color: "white",
    fontSize: "0.6em",
    padding: "13px 3%",
    textAlign: "center",
  };

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    toggleDarkMode();
  };

  const [state, setState] = useContext(AppContext);
  const toggleDarkMode = () => {
    setState({isDarkMode: checked});
  }
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
      <AppTheme>
        <div className="App">
          {/* <div
          id="parents div"
          style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            boxShadow: "0 70px 40px -40px rgba(142, 197, 252, 0.4)",
            zIndex: 50,
            fontSize: "2rem",
          }}
        >
          <div
            id="bubble"
            style={{
              position: "absolute",
              // backgroundColor: "red",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <ParticleBackground />
          </div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div id="blurContainer"></div>
          </div>

          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              fontSize: "1em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              color: "grey",
              paddingLeft: "10%",
              paddingRight: "10%",
              fontWeight: 700,
              //background: "red",
            }}
          >
            <div className="descriptionDiv">
              <span
                id="intro"
                className="introFont"
              >{`Hi, I'm {Iskandar}`}</span>
              <div style={{ marginTop: "10px" }}></div>
              <span style={{ fontSize: "1em" }}>
                <span style={{ fontSize: "0.8em" }}>
                  <Typewriter
                    options={{
                      autoStart: true,
                      loop: true,
                    }}
                    style={{ marginTop: "1000px" }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("I'm a web developer from Malaysia 😁")
                        .pauseFor(1000)
                        .typeString("and currently based in Malaysia")
                        .deleteAll()
                        .typeString(
                          "I have an experience in {C# .net} and {React ⚛️}!! 🛠️🚀 "
                        )
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("This page is for experiment ⚗️🧪")
                        .pauseFor(1000)
                        .typeString("and also keeping important notes ✍️🗒️")
                        .pauseFor(1000)
                        .deleteAll()
                        .start();
                    }}
                  />
                </span>
              </span>
            </div>
            <div className="pictureDiv">
              <img
                src={Kito}
                alt="profile pic"
                style={{
                  width: "23rem",
                  objectFit: "cover",
                  position: "absolute",
                  filter: "drop-shadow(0 30px 0.75rem rgba(0,0,0,0.3))",
                  transition: ".5s ease",
                }}
              />
            </div>
          </div>
          <div
            id="header"
            style={{
              position: "fixed",
              width: "100%",
              height: "55px",
              boxShadow: "0px 30px 50px -20px rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: "10%",
            }}
          >
            <div style={{ ...headerItem }}>Home</div>
            <div style={{ ...headerItem }}>Profile</div>
            <div style={{ ...headerItem }}>Notes</div>
          </div>
          <div
            style={{
              width: "80px",
              marginLeft: "40px",
              //background: "black",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              flexWrap: "wrap",
              position: "absolute",
              zIndex: 10000,
            }}
          >
            <div
              style={{
                background: "red",
                width: "100%",
                height: "50px",
                marginBottom: "5px",
              }}
              onClick={() => {
                alert("first is being clicked");
              }}
            ></div>
            <div
              style={{
                background: "red",
                width: "100%",
                height: "50px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              style={{
                background: "red",
                width: "100%",
                height: "50px",
                marginBottom: "5px",
              }}
            ></div>
            <div
              style={{
                background: "red",
                width: "100%",
                height: "50px",
                marginBottom: "5px",
              }}
            ></div>
          </div>
        </div> */}
          <div
            id="parents div"
            style={{
              width: "100%",
              height: "100vh",
              background: "white",
            }}
          >
            <NewmorphismBox />
          </div>
          <div
            id="parents div"
            style={{
              width: "100%",
              height: "100vh",
              background: "white",
            }}
          >
            <Stack direction="column" spacing={2}>
              <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Show common dialog
                </Button>
                <CommonDialog
                  onClose={handleClose}
                  // src={
                  //   "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                  // }
                  open={open}
                  title={"Where is bby"}
                  content={"I want my bbyyy"}
                  primaryActionText="Confirm"
                  secondaryActionText="Cancel"
                  //primaryAction = {//can pass action here}
                />
              </div>
              <div>
                <Button
                  variant="outlined"
                  onClick={handleClickOpenDialogPicture}
                >
                  Show common dialog with pictures
                </Button>
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
                <Button variant="outlined" onClick={handleClickOpenDialogOne}>
                  Show common dialog 1 action
                </Button>
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
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Stack>
          </div>
        </div>
      </AppTheme>
  );
};

export default App;
