"use client";

import React, { useTransition } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/utils/locale";

interface LocaleSwitcherSelectProps {
  defaultValue: string;
  items: { value: string; label: string }[];
  label: string;
}

const LocaleSwitcherSelect: React.FC<LocaleSwitcherSelectProps> = ({
  defaultValue,
  items,
  label,
}) => {
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const locale = event.target.value as Locale;

    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <FormControl
      variant="outlined"
      size="small"
      sx={{ minWidth: 150, width: "100%" }}
      disabled={isPending}
    >
      <InputLabel id="locale-switcher-label">{label}</InputLabel>
      <Select
        labelId="locale-switcher-label"
        defaultValue={defaultValue}
        onChange={handleChange}
        label={label}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocaleSwitcherSelect;
