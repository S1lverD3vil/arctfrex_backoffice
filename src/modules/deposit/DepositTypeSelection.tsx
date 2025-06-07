import { Box, MenuItem, Select } from "@mui/material";

type DepositTypeSelectionProps = {
  depositType: number;
  setDepositType: (value: DepositTypeSelectionProps["depositType"]) => void;
  isDisabled?: boolean;
};

export const DepositTypeSelection = ({
  depositType,
  setDepositType,
  isDisabled,
}: DepositTypeSelectionProps) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
      <Select
        value={depositType}
        onChange={(e) => setDepositType(Number(e.target.value))}
        size="small"
        sx={{ width: "200px" }}
        disabled={isDisabled}
      >
        <MenuItem value={1}>Initial Margin</MenuItem>
        <MenuItem value={2}>Normal Deposit</MenuItem>
      </Select>
    </Box>
  );
};
