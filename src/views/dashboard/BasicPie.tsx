import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Paper } from "@mui/material";

export default function BasicPie() {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        height: 320,
      }}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
        width={420}
      />
    </Paper>
  );
}
