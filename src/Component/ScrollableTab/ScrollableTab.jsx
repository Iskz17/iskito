import { useMediaQuery } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import { AppContext } from "../../Context/AppContext";
import { useTheme } from "@mui/material/styles";
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState, useContext, useEffect } from "react";

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
    dynamicInfo,
    multiDynamicInfo,
  } = props

  const [state] = useContext(AppContext);
  const theme = useTheme();

  const [themeld, setThemeld] = useState(state.isDarkMode ? "dark" : "light");

  useEffect(() => {
    setThemeld(state.isDarkMode ? "dark" : "light");
  }, [state]);

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })

  return (
    <div>
      <AppBar
        position="static"
        color={"inherit"}
        className={fixed && "fixed-search-header"}
        style={{backgroundColor: theme[themeld].appBar.backgroundColor}}
      >
        <Tabs
          value={value}
          onChange={onChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          //variant={isDesktop ? null : 'fullWidth'}
          variant={"scrollable"}
        >
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
      </AppBar>
      {tabs?.map((v, index) => (
        <TabPanel value={value} index={index}>
          {v.content}
        </TabPanel>
      ))}
    </div>
  );
}
