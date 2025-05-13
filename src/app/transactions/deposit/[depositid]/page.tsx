import { Metadata } from "next";
import { Box } from "@mui/material";
import DepositApprovalAction from "@/views/transactions/deposit/[depositid]/DepositApprovalAction";
import DepositDetail from "@/views/transactions/deposit/[depositid]/DepositDetail";

export const metadata: Metadata = {
  title: "Transactions Deposit Details | PaNen",
  description: "PaNen Transactions Deposit Details",
};

const TransationsDepositDetailsPage = ({
  params,
}: {
  params: { depositid: string };
}) => {
  const depositid = params.depositid;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <DepositApprovalAction />

      <DepositDetail depositid={depositid} />
    </Box>
  );
};

export default TransationsDepositDetailsPage;
