import { Metadata } from "next";
import { Box } from "@mui/material";
import WithdrawalApprovalAction from "@/views/transactions/withdrawal/[withdrawalid]/WithdrawalApprovalAction";
import WithdrawalDetail from "@/views/transactions/withdrawal/[withdrawalid]/WithdrawalDetail";

export const metadata: Metadata = {
  title: "Transactions Withdrawal Details | PaNen",
  description: "PaNen Transactions Withdrawal Details",
};

const TransationsWithdrawalDetailsPage = ({
  params,
}: {
  params: { withdrawalid: string };
}) => {
  const withdrawalid = params.withdrawalid;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <WithdrawalApprovalAction />

      <WithdrawalDetail withdrawalid={withdrawalid} />
    </Box>
  );
};

export default TransationsWithdrawalDetailsPage;
