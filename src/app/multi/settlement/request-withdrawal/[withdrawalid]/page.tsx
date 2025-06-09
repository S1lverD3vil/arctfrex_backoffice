import { Metadata } from "next";
import { Box } from "@mui/material";
import { WithdrawalApprovalAction } from "@/modules/withdrawal/WithdrawalApprovalAction";
import WithdrawalDetail from "@/modules/withdrawal/WithdrawalDetail";

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
      <WithdrawalApprovalAction
        withdrawalId={withdrawalid}
        actions={["approve", "reject"]}
        redirectTo="/multi/settlement/request-withdrawal"
        level={1}
      />

      <WithdrawalDetail withdrawalid={withdrawalid} />
    </Box>
  );
};

export default TransationsWithdrawalDetailsPage;
