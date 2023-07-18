import { useMediaQuery } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import { AppContext } from "../../Context/AppContext";
import { useTheme } from "@mui/material/styles";
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState, useContext, useEffect, useMemo } from "react";
import IOSSwitch from "../Switch/IOSSwitch";
import Stack from "@mui/material/Stack";

// interface TabPanelProps {
//   children?: React.ReactNode
//   index: any
//   value: any
// }

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
// interface ITabsProps {
//   value?: number
//   onChange?: any
//   tabs?: any
//   fixed?: boolean
//   fontSize?: boolean
//   dynamicInfo?: boolean
//   multiDynamicInfo?: boolean
// }

export default function ScrollableTabs(props) {
  const {
    value,
    onChange,
    tabs,
    fixed,
    fontSize,
    includeDarkModeSwitch, 
    dynamicInfo,
    multiDynamicInfo,
  } = props

  const [state, setState] = useContext(AppContext);
  const [checked, setChecked] = useState(state.isDarkMode);
  const theme = useTheme();

  const [themeld, setThemeld] = useState(state.isDarkMode ? "dark" : "light");

  useEffect(() => {
    setThemeld(state.isDarkMode ? "dark" : "light");
  }, [state]);

  
  useMemo(() => {
    if (checked == state.isDarkMode) {
      return;
    }
    setState({ isDarkMode: checked });
  }, [checked]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });

  const ForIOS = useMemo(() => {
    return <IOSSwitch
      // checked={checked}
      onChange={(e) => {
        handleChange(e);
      }}
      inputProps={{ "aria-label": "controlled" }}
    />
  }, [])

  console.log('scrollable rerender')

  return (
    <div>
      <AppBar
        position="sticky"
        color={"inherit"}
        className={fixed && "fixed-search-header"}
        style={{ backgroundColor: theme[themeld].appBar.backgroundColor }}>
        <Stack
          style={{ width: "100%" }}
          spacing={2}
          direction="row"
          sx={{ px: 0}}
          alignItems="center"
          justifyContent={"space-between"}>
          <Tabs
            value={value}
            onChange={onChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            //variant={isDesktop ? null : 'fullWidth'}
            variant={"scrollable"}>
            {tabs?.map((v, index) => (
              <Tab
                label={v.label}
                style={{ color: theme[themeld].tab.color }}
                className={`${fontSize && "tab-font"}`}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          {includeDarkModeSwitch && ForIOS}
        </Stack>
      </AppBar>
      {tabs?.map((v, index) => (
        <TabPanel value={value} index={index}>
          {v.content}
        </TabPanel>
      ))}
    </div>
  );
}
