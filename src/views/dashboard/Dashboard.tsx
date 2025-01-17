"use client";

import React from "react";
import { Box, Container, Grid } from "@mui/material";

import BasicLineChart from "./BasicLineChart";
import BasicPie from "./BasicPie";
import ForexBarChart from "./ForexBarChart";
import { useAppContext } from "@/contexts/AppContext/AppContext";

export default function Dashboard() {
  const { userSession } = useAppContext();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box textAlign="right">
            Referral Code: <b>{userSession?.referral_code}</b>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <BasicLineChart />
        </Grid>
        <Grid item xs={4}>
          <BasicPie />
        </Grid>
        <Grid item xs={8}>
          <ForexBarChart />
        </Grid>
      </Grid>
    </Container>
  );
}
