import { useMediaQuery } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { AppContext } from "../../Context/AppContext";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {
  useState,
  useContext,
  useEffect,
  useMemo,
  memo,
  forwardRef,
} from "react";
import IOSSwitch from "../Switch/IOSSwitch";
import Stack from "@mui/material/Stack";
import "../../index.css";

const TabPanel = forwardRef((props, ref) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      ref={ref}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {<div>{children}</div>}
    </div>
  );
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ScrollableTabs = forwardRef((props, ref) => {
  const { value, onChange, tabs, fixed, includeDarkModeSwitch } = props;

  const [state, setState] = useContext(AppContext);
  const [checked, setChecked] = useState(state.isDarkMode);
  let updateFromContext = true;
  const theme = useTheme();

  const [themeld, setThemeld] = useState(state.isDarkMode ? "dark" : "light");

  useEffect(() => {
    if (!updateFromContext) {
      return;
    }
    setThemeld(state.isDarkMode ? "dark" : "light");
  }, [state]);

  useEffect(() => {
    if (checked === state.isDarkMode) {
      return;
    }
    setState({ ...state, isDarkMode: checked });
    setThemeld(checked ? "dark" : "light");
    document.body.className = checked ? "bodyBgColor darkMode" : "bodyBgColor";
    updateFromContext = false;
    setTimeout(() => {
      updateFromContext = true;
    }, 500);
  }, [checked]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const ForIOS = useMemo(() => {
    return (
      <IOSSwitch
        // checked={checked}
        onChange={(e) => {
          handleChange(e);
        }}
        inputProps={{ "aria-label": "controlled" }}
      />
    );
  }, []);

  return (
    <div ref={ref} style={{ fontFamily: "Gilroy" }}>
      <AppBar
        position="fixed"
        color={"inherit"}
        className={fixed && "fixed-search-header"}
        style={{ backgroundColor: theme[themeld].appBar.backgroundColor }}>
        <Stack
          style={{ width: "100%" }}
          spacing={2}
          direction="row"
          sx={{ px: 1 }}
          alignItems="center"
          justifyContent={"flex-start"}>
          {includeDarkModeSwitch && ForIOS}
          <Tabs
            style={{ cursor: "none" }}
            value={value}
            onChange={onChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            variant={"scrollable"}
            sx={{
              "& .MuiTabs-indicator": {
                height: "calc(100% - 10px)",
                backgroundColor: theme[themeld].button.primary.main,
                zIndex: 0,
                bottom: "5px",
                borderRadius: "5px",
              },
              "& .MuiTabs-flexContainer": {
                position: "relative",
                zIndex: 50,
                background: "transparent",
              },
              "& .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary.Mui-selected":
                {
                  color: theme[themeld].button.primary.mainText,
                },
              ".MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary": {
                color: theme[themeld].tab.color,
              },
            }}>
            {tabs?.map((v, index) => (
              <Tab
                label={v.label}
                style={{
                  cursor:'none',
                  fontFamily: "Gilroy",
                  transition: ".25s ease",
                }}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Stack>
      </AppBar>
      {tabs?.map((v, index) => (
        <TabPanel
          value={value}
          index={index}
          key={`${index}_tabs`}
          style={{ marginTop: "18px" }}>
          {v.content}
        </TabPanel>
      ))}
    </div>
  );
});

export default memo(ScrollableTabs);
