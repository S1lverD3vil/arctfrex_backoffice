import { WorkflowDepositType } from "@/hooks/queries/backoffice/workflow-approver/approve-reject";
import { Box, MenuItem, Select } from "@mui/material";

type DepositTypeSelectionProps = {
  depositType: WorkflowDepositType;
  setDepositType: (value: DepositTypeSelectionProps["depositType"]) => void;
  isDisabled?: boolean;
};

export const DepositTypeSelection = ({
  depositType,
  setDepositType,
  isDisabled,
}: DepositTypeSelectionProps) => {
  console.log(depositType);

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
      <Select
        value={depositType}
        onChange={(e) => setDepositType(e.target.value as WorkflowDepositType)}
        size="small"
        sx={{ width: "200px" }}
        disabled={isDisabled}
      >
        <MenuItem value={"initial-margin"}>Initial Margin</MenuItem>
        <MenuItem value={"normal-deposit"}>Normal Deposit</MenuItem>
      </Select>
    </Box>
  );
};
