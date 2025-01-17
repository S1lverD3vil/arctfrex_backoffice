"use client";

import React, { useRef } from "react";
import { Grid, TextField, TextFieldProps, Typography } from "@mui/material";

type PinInputProps = {
  pin: string[];
  setPin: (value: string[]) => void;
} & TextFieldProps;

const PinInput: React.FC<PinInputProps> = ({
  pin,
  setPin,
  error,
  helperText,
}) => {
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle input change for each digit
  const handlePinChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = event.target.value;
    const newPin = [...pin];

    if (/^\d$/.test(value)) {
      newPin[index] = value;
      setPin(newPin);

      // Move to the next input if current is filled
      if (index < 5 && value) {
        pinRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // Clear the current input value
      newPin[index] = "";
      setPin(newPin);
    }
  };

  const handleBackspace = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const newPin = [...pin];
      if (newPin[index] === "" && index > 0) {
        pinRefs.current[index - 1]?.focus(); // Move focus to the previous input
        pinRefs.current[index - 1]?.select(); // Select the previous input's value
      } else {
        // Clear the current field if it's not empty
        newPin[index] = "";
        setPin(newPin);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      {pin.map((_, index) => (
        <Grid item key={index} xs={2}>
          <TextField
            inputRef={(el) => (pinRefs.current[index] = el)} // Attach refs to each input
            value={pin[index]}
            onChange={(e) => handlePinChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            inputProps={{
              maxLength: 1,
              style: { textAlign: "center" }, // Center the digit
            }}
            error={error}
          />
        </Grid>
      ))}
      <Typography variant="caption" color="#d32f2f" ml={3.5} mt={0.5}>
        {helperText}
      </Typography>
    </Grid>
  );
};

export default PinInput;
