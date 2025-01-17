"use client";

import { Link, Typography, TypographyProps } from "@mui/material";
import { env } from "@/constants/env";

const Copyright = (props: TypographyProps) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={env.NEXT_PUBLIC_BASE_URL}>
        PaNen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
