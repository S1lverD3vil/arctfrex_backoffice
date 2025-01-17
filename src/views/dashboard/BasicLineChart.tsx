import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Paper } from "@mui/material";

export default function BasicLineChart() {
  // Example data: X-axis representing hours of the day, Y-axis representing profit/loss in IDR
  const hours = [0, 4, 8, 12, 16, 20]; // Example time points in hours
  const profitLoss = [100000, 150000, 130000, 180000, 90000, 140000]; // Corresponding profit/loss values in IDR

  return (
    <Paper
      sx={{
        p: 2,
        height: 320,
      }}
    >
      <LineChart
        xAxis={[{ data: hours, label: "Hour of the Day" }]}
        series={[
          {
            data: profitLoss,
            label: "Profit/Loss (IDR)",
          },
        ]}
        margin={{ left: 80 }}
      />
    </Paper>
  );
}
