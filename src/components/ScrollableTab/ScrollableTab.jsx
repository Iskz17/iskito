import { useMediaQuery } from "@material-ui/core";
import { Dropdown } from "../Component";
import AppBar from "@material-ui/core/AppBar";
import { Stack, Box, FormControl, MenuItem } from "@mui/material";
import { useDarkLightTheme } from "../../context/DarkLightThemeContext";
import { useTheme } from "@mui/material/styles";
import { US, CN, FR, ES, JP } from "country-flag-icons/react/3x2";
import { useNavigate } from "react-router-dom";
import i18n from "./../../locales/i18n";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {
  useState,
  useEffect,
  useMemo,
  memo,
  forwardRef,
} from "react";
import IOSSwitch from "../Switch/IOSSwitch";
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
      {...other}
    >
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
  const navigate = useNavigate(); // Get navigate function
  const [isDarkMode, setIsDarkMode] = useDarkLightTheme();
  const [checked, setChecked] = useState(isDarkMode);
  let updateFromContext = true;
  const theme = useTheme();

  const [themeld, setThemeld] = useState(isDarkMode? "dark" : "light");
  const [currentLangSelected, setCurrentLangSelected] = useState("en");
  const handleChangeLang = (event) => {
    setCurrentLangSelected(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  useEffect(() => {
    if (!updateFromContext) {
      return;
    }
    setThemeld(isDarkMode? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    if (checked === isDarkMode) {
      return;
    }
    setIsDarkMode(checked);
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

  const handleRenderMenuItemBg = useMemo(
    () => [
      <MenuItem
        key={`us_menuItem`}
        value={"en"}
        style={{
          height: "30px",
          fontSize: "15px",
          fontFamily: "Gilroy",
        }}
      >
        {
          <US
            title="United States"
            style={{ width: "25px", marginTop: "5px" }}
          />
        }
      </MenuItem>,
      <MenuItem
        key={`cn_menuItem`}
        value={"cn"}
        style={{
          height: "30px",
          fontSize: "15px",
          fontFamily: "Gilroy",
        }}
      >
        {<CN title="China" style={{ width: "25px", marginTop: "5px" }} />}
      </MenuItem>,
      <MenuItem
        key={`fr_menuItem`}
        value={"fr"}
        style={{
          height: "30px",
          fontSize: "15px",
          fontFamily: "Gilroy",
        }}
      >
        {<FR title="France" style={{ width: "25px", marginTop: "5px" }} />}
      </MenuItem>,
      <MenuItem
        key={`es_menuItem`}
        value={"es"}
        style={{
          height: "30px",
          fontSize: "15px",
          fontFamily: "Gilroy",
        }}
      >
        {<ES title="Spain" style={{ width: "25px", marginTop: "5px" }} />}
      </MenuItem>,
      <MenuItem
        key={`jp_menuItem`}
        value={"jp"}
        style={{
          height: "30px",
          fontSize: "15px",
          fontFamily: "Gilroy",
        }}
      >
        {<JP title="Japan" style={{ width: "25px", marginTop: "5px" }} />}
      </MenuItem>,
    ],
    []
  );

  return (
    <div ref={ref} style={{ fontFamily: "Gilroy" }}>
      <AppBar
        position="fixed"
        color={"inherit"}
        className={fixed && "fixed-search-header"}
        elevation={0}
        style={{ backgroundColor: theme[themeld].appBar.backgroundColor }}
      >
        <Stack
          style={{ width: "100%" }}
          spacing={2}
          direction="row"
          sx={{ px: 1 }}
          alignItems="center"
          justifyContent={"flex-start"}
        >
          {includeDarkModeSwitch && ForIOS}
          <Tabs
            style={{ cursor: "none" }}
            value={value}
            onChange={(ev, val) => {
              navigate(tabs.filter((loc) => loc.key === val)[0].route, {
                replace: true,
              });
              onChange(ev, val);
            }}
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
            }}
          >
            {tabs?.map((v, index) => (
              <Tab
                label={v.label}
                style={{
                  cursor: "none",
                  fontFamily: "Gilroy",
                  transition: ".25s ease",
                }}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          <Stack
            style={{
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControl
              sx={{
                width: "80px",
                padding: 0,
                border: "none",
              }}
              size="small"
            >
              <Dropdown
                value={currentLangSelected}
                onChange={handleChangeLang}
                displayEmpty
                style={{
                  height: "30px",
                  fontSize: "15px",
                  fontFamily: "Gilroy",
                }}
              >
                {handleRenderMenuItemBg}
              </Dropdown>
            </FormControl>
          </Stack>
        </Stack>
      </AppBar>
      {tabs?.map((v, index) => (
        <TabPanel
          value={value}
          index={index}
          key={`${index}_tabs`}
          style={{ marginTop: "18px" }}
        >
          {v.content}
        </TabPanel>
      ))}
    </div>
  );
});

export default memo(ScrollableTabs);
