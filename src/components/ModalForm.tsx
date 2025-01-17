"use client";

import React from "react";
import {
  Modal,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  maxHeight: "calc(100vh - 100px)",
  overflowY: "auto",
};

type ModalFormProps = React.PropsWithChildren<{
  buttonTitle?: string;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}>;

const ModalForm = ({
  buttonTitle = "Open Modal",
  isOpen = false,
  onOpen,
  onClose,
  children,
}: ModalFormProps) => {
  return (
    <Box>
      <Button onClick={onOpen} variant="contained">
        {buttonTitle}
      </Button>

      <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: "relative" }}>
          <IconButton
            onClick={onClose}
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
          {children}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ModalForm;
