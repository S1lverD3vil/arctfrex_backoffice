import React from "react";
import { Box, CardMedia } from "@mui/material";

type VideoProps = React.PropsWithChildren<{ src: string }>;

const Video = (props: VideoProps) => {
  const { src = "" } = props;

  if (!src) return <Box>No Video</Box>;

  return (
    <Box position="relative" width="auto">
      <CardMedia component="video" src={src} controls sx={{ height: 400 }} />
    </Box>
  );
};

export default Video;
