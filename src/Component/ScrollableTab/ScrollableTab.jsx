import { useMediaQuery } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import { AppContext } from "../../Context/AppContext";
import { useTheme } from "@mui/material/styles";
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState, useContext, useEffect, useMemo, memo} from "react";
import IOSSwitch from "../Switch/IOSSwitch";
import Stack from "@mui/material/Stack";
import '../../index.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const ScrollableTabs = (props) => {
  const {
    value,
    onChange,
    tabs,
    fixed,
    includeDarkModeSwitch,
  } = props;

  const [state, setState] = useContext(AppContext);
  const [checked, setChecked] = useState(state.isDarkMode);
  let updateFromContext = true;
  const theme = useTheme();

  const [themeld, setThemeld] = useState(state.isDarkMode ? "dark" : "light");

  useEffect(() => {
    if(!updateFromContext){
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
    updateFromContext = false;
    setTimeout(()=> {
      updateFromContext = true;
    },500);
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
    <div style={{ fontFamily: "Gilroy" }}>
      <AppBar
        position="fixed"
        color={"inherit"}
        className={fixed && "fixed-search-header"}
        style={{ backgroundColor: theme[themeld].appBar.backgroundColor }}
      >
        <Stack
          style={{ width: "100%" }}
          spacing={2}
          direction="row"
          sx={{ px: 0 }}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Tabs
            value={value}
            onChange={onChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            variant={"scrollable"}
          >
            {tabs?.map((v, index) => (
              <Tab
                label={v.label}
                style={{
                  color: theme[themeld].tab.color,
                  fontFamily: "Gilroy",
                }}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          {includeDarkModeSwitch && ForIOS}
        </Stack>
      </AppBar>
      {tabs?.map((v, index) => (
        <TabPanel value={value} index={index} key={`${index}_tabs`}>
          {v.content}
        </TabPanel>
      ))}
    </div>
  );
};

export default memo(ScrollableTabs);
