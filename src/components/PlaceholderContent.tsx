"use client";

import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

type PlaceholderContentProps = React.ComponentPropsWithoutRef<"div"> & {
  text: string;
};

function PlaceholderContent(props: PlaceholderContentProps) {
  const { text } = props;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textTransform: "capitalize" }}
        >
          {text}
        </Typography>
      </Box>
    </Container>
  );
}

export default PlaceholderContent;
