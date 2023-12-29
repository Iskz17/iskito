import "./App.css";
// import Typewriter from "typewriter-effect";
// import Kito from "./kito-nobg.png";
import DotRing from "./components/CustomCursor/CustomCursor";
import { QuillPlayground, GlassmorphismBox, LazyLoading, MusicPlayer, NeumorphismBox, ExcelReader } from "./features/features";
import { useState, useRef } from "react";
import AppTheme from "./components/ThemeProvider/AppTheme";
import ScrollableTabs from "./components/ScrollableTab/ScrollableTab";
import { Section } from "./components/Section/Section";
import './locales/i18n';
// import 'react-quill/dist/quill.snow.css';
// import stg from "./Assets/SPACETYPEGENERATOR.gif"
import worker_script from './worker';

var myWorker = new Worker(worker_script);

const App = () => {

  //#region for tab demo
  const [tabValue, setTabValue] = useState(0);

  const blobRef = useRef(null);
  const sectionRef = useRef(null);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    myWorker.onmessage = (m) => {
      console.log("msg from worker: ", m.data);
    };
    myWorker.postMessage('im from main');
  };
  const prepareTabs = () => {
    return [
      {
        label: "Neumorphism",
        key: 0,
        content: (
          <Section ref={sectionRef}>
            <NeumorphismBox sectionRef={sectionRef} />
          </Section>
        ),
      },
      // {
      //   label: "Dialog",
      //   key: 1,
      //   content: (
      //     <Section>
      //      <DialogCollection />
      //     </Section>
      //   ),
      // },
      {
        label: "Glassmorphism",
        key: 2,
        content: (
          <Section>
            <GlassmorphismBox />
          </Section>
        ),
      },
      {
        label: "Lazy Loading",
        key: 3,
        content: (
          <Section>
            <LazyLoading />
          </Section>
        ),
      },
      {
        label: "Music Player",
        key: 4,
        content: (
          <Section ref={blobRef}>
            <MusicPlayer blobRef={blobRef} />
          </Section>
        ),
      },
      {
        label: "Quill",
        key: 5,
        content: (
          <Section>
            <QuillPlayground/>
          </Section>
        ),
      },
      {
        label: "Excel",
        key: 6,
        content: (
          <Section>
            <ExcelReader/>
          </Section>
        ),
      },
    ];

  };
  //#endregion

  return (
    <AppTheme>
      <div className="App">
        {/* 
        //#region not used
        <div
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
        </div> 
        //#endregion
        */}
        <div id="curPos"><DotRing /></div>
        <Section>
          <ScrollableTabs
            value={tabValue}
            onChange={handleChangeTab}
            tabs={prepareTabs()}
            includeDarkModeSwitch={true}
          />
        </Section>
      </div>
    </AppTheme>
  );
};

export default App;
