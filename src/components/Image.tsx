"use client";

import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import NextImage, { ImageProps } from "next/image";
import { ensureHttps } from "@/utils/strings";
import CloseIcon from "@mui/icons-material/Close";

const Image = (props: Partial<ImageProps>) => {
  const { src = "", alt = "" } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const safeSrc = String(src).startsWith("blob:")
    ? src
    : ensureHttps(String(src));

  if (!src) return <Box>No Image</Box>;

  return (
    <>
      {/* Thumbnail Image with Hover Effect */}
      <Box
        position="relative"
        width="auto"
        sx={{
          cursor: "pointer",
          "&:hover .overlay": { opacity: 1 }, // Show overlay on hover
        }}
        onClick={handleOpen}
      >
        <NextImage
          src={safeSrc}
          alt={alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "400px",
            objectFit: "contain",
          }}
        />

        {/* Hover Overlay */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <Typography variant="body1">Preview Image</Typography>
        </Box>
      </Box>

      {/* Modal with Full Image */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box display="flex" justifyContent="center">
            <NextImage
              src={safeSrc}
              alt={alt}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Image;
