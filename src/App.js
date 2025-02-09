import "./App.css";
import DotRing from "./components/CustomCursor/CustomCursor";
import {
  QuillPlayground,
  GlassmorphismBox,
  LazyLoading,
  MusicPlayer,
  NeumorphismBox,
  ExcelReader,
  Dashboard,
} from "./features";
import { useState, useEffect, useRef } from "react";
import AppTheme from "./components/ThemeProvider/AppTheme";
import ScrollableTabs from "./components/ScrollableTab/ScrollableTab";
import { Section } from "./components/Section/Section";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./locales/i18n";

import worker_script from "./worker";

var myWorker = new Worker(worker_script);

const App = () => {
  const [tabValue, setTabValue] = useState(0);

  const blobRef = useRef(null);
  const sectionRef = useRef(null);

  const CallingRoute = (props) => {
    const { keyValue } = props;
    useEffect(() => {
      handleChangeTab(null, keyValue);
    }, []); // This will run once when the component mounts

    return <Section></Section>;
  };

  // Worker logic
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    myWorker.onmessage = (m) => {
      console.log("msg from worker: ", m.data);
    };
    myWorker.postMessage("im from main");
  };

  // Function to prepare tabs
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
        route: "iskito/neumorphism",
      },
      {
        label: "Glassmorphism",
        key: 1,
        content: (
          <Section>
            <GlassmorphismBox />
          </Section>
        ),
        route: "iskito/glassmorphism",
      },
      {
        label: "Lazy Loading",
        key: 2,
        content: (
          <Section>
            <LazyLoading />
          </Section>
        ),
        route: "iskito/lazyloading",
      },
      {
        label: "Music Player",
        key: 3,
        content: (
          <Section ref={blobRef}>
            <MusicPlayer blobRef={blobRef} />
          </Section>
        ),
        route: "iskito/musicplayer",
      },
      {
        label: "Quill",
        key: 4,
        content: (
          <Section>
            <QuillPlayground />
          </Section>
        ),
        route: "iskito/quill",
      },
      {
        label: "Excel",
        key: 5,
        content: (
          <Section>
            <ExcelReader />
          </Section>
        ),
        route: "iskito/excel",
      },
      {
        label: "Dashboard",
        key: 6,
        content: (
          <Section>
            <Dashboard />
          </Section>
        ),
        route: "iskito/dashboard",
      },
    ];
  };

  return (
    <AppTheme>
      <div className="App">
        <div id="curPos">
          <DotRing />
        </div>

        <Router>
          <Section>
            <ScrollableTabs
              value={tabValue}
              onChange={handleChangeTab}
              tabs={prepareTabs()}
              includeDarkModeSwitch={true}
            />
          </Section>
          <Routes>
            <Route
              path="iskito/neumorphism"
              element={<CallingRoute keyValue={0} />}
            />
            <Route
              path="iskito/glassmorphism"
              element={<CallingRoute keyValue={1} />}
            />
            <Route
              path="iskito/lazyloading"
              element={<CallingRoute keyValue={2} />}
            />
            <Route
              path="iskito/musicplayer"
              element={<CallingRoute keyValue={3} />}
            />
            <Route
              path="iskito/quill"
              element={<CallingRoute keyValue={4} />}
            />
            <Route
              path="iskito/excel"
              element={<CallingRoute keyValue={5} />}
            />
            <Route
              path="iskito/dashboard"
              element={<CallingRoute keyValue={6} />}
            />
          </Routes>
        </Router>
      </div>
    </AppTheme>
  );
};

export default App;
