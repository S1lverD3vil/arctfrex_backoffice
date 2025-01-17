import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Paper } from "@mui/material";

// Example forex trading data
const forexDataset = [
  { month: "Jan", EURUSD: 1.1, GBPUSD: 1.3, USDJPY: 1.1, AUDUSD: 0.7 },
  { month: "Feb", EURUSD: 1.11, GBPUSD: 1.28, USDJPY: 1.12, AUDUSD: 0.72 },
  { month: "Mar", EURUSD: 1.09, GBPUSD: 1.27, USDJPY: 1.09, AUDUSD: 0.71 },
  { month: "Apr", EURUSD: 1.12, GBPUSD: 1.25, USDJPY: 1.11, AUDUSD: 0.73 },
  { month: "May", EURUSD: 1.08, GBPUSD: 1.26, USDJPY: 1.08, AUDUSD: 0.74 },
  { month: "Jun", EURUSD: 1.13, GBPUSD: 1.29, USDJPY: 1.13, AUDUSD: 0.75 },
  // Add more data as needed
];

const chartSetting = {
  yAxis: [
    {
      label: "Exchange Rate",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const valueFormatter = (value: number | null) => `${value}`;

export default function ForexBarChart() {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        height: 320,
      }}
    >
      <BarChart
        dataset={forexDataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          { dataKey: "EURUSD", label: "EUR/USD", valueFormatter },
          { dataKey: "GBPUSD", label: "GBP/USD", valueFormatter },
          { dataKey: "USDJPY", label: "USD/JPY", valueFormatter },
          { dataKey: "AUDUSD", label: "AUD/USD", valueFormatter },
        ]}
        {...chartSetting}
      />
    </Paper>
  );
}
