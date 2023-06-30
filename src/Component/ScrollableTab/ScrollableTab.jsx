import { useMediaQuery } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import { useTheme } from '@material-ui/core/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React from 'react'

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
  const theme = useTheme()

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })

  return (
    <div
      className={`core-tab ${dynamicInfo && 'single-dynamicInfo'}
    ${multiDynamicInfo && 'multi-dynamicInfo'}
    `}
    >
      <AppBar
        position="static"
        className={fixed && 'fixed-search-header'}
      >
        <Tabs
          value={value}
          onChange={onChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          //variant={isDesktop ? null : 'fullWidth'}
          variant={'scrollable'}
        >
          {tabs?.map((v, index) => (
            <Tab
              label={v.label}
              className={`${fontSize && 'tab-font'}`}
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
  )
}
