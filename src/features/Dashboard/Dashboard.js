import { Title } from "../../components/Component";
import { useMediaQuery, Box } from "@mui/material";
import React from "react";
import { createTheme } from "@mui/material/styles";
import {
  Gauge,
  gaugeClasses,
  LineChart,
  BarChart,
  axisClasses,
} from "@mui/x-charts";
import { useTranslation } from "react-i18next";

const dataset = [
  [3, -7, "First"],
  [0, -5, "Second"],
  [10, 0, "Third"],
  [9, 6, "Fourth"],
].map(([high, low, order]) => ({
  high,
  low,
  order,
}));
const chartSettingsH = {
  dataset,
  height: 300,
  yAxis: [{ scaleType: "band", dataKey: "order" }],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
  slotProps: {
    legend: {
      direction: "row",
      position: { vertical: "bottom", horizontal: "middle" },
      padding: -5,
    },
  },
};
const chartSettingsV = {
  ...chartSettingsH,
  xAxis: [{ scaleType: "band", dataKey: "order" }],
  yAxis: undefined,
};

const Dashboard = (props) => {
  const { t } = useTranslation();

  let radius = 10;
  let layout = 'vertical';

  let flex = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const settings = {
    width: 160,
    height: 160,
    value: 60,
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 940,
        laptop: 1024,
        desktop: 1200,
      },
    },
  });
  const matches = useMediaQuery(theme.breakpoints.down("tablet"));
  const GaugeSection = () => (
    <>
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#52b202",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#52b202",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#52b202",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#52b202",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
    </>
  );

  return (
    <div id="globalPlacement">
      <div
        id="arrangeParent"
        style={{
          fontFamily: "Gilroy",
          color: `${true ? "#001f3f" : "white"}`,
          height: matches ? "unset" : "100vh",
          minHeight: "699px",
        }}
      >
        <Title
          title={t("dashboard.title")}
          description={t("dashboard.description")}
        />
        <div
          id="content"
          style={{
            ...flex,
            width: "100%",
            height: "100%",
            marginTop: "-20px",
            gap: "20px",
            flexDirection: matches ? "column" : "row",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                width: "calc(90% - 20px)",
                background: "red",
                height: "800px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  background: "white",
                  width: "200px",
                  height: "100%",
                  borderRadius: "0 15px 15px 0",
                }}
              ></Box>
              <Box>
                {/**
                 * Gauge container
                 */}
                <Box style={{ flexDirection: "row", display: "flex" }}>
                  <GaugeSection />
                </Box>
                {/**
                 * Line chart container
                 */}
                <Box>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        area: true,
                      },
                    ]}
                    width={500}
                    height={300}
                  />
                </Box>
                {/**
                 * Bar chart
                 */}
                <Box>
                  <BarChart
                    series={[
                      {
                        dataKey: "high",
                        label: "High",
                        layout,
                        stack: "stack",
                      },
                      { dataKey: "low", label: "Low", layout, stack: "stack" },
                    ]}
                    {...(layout === "vertical"
                      ? chartSettingsV
                      : chartSettingsH)}
                    borderRadius={radius}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
