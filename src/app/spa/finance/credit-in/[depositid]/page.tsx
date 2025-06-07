import { Metadata } from "next";
import { Box } from "@mui/material";
import { DepositApprovalAction } from "@/modules/deposit";
import DepositDetail from "@/modules/deposit/DepositDetail";

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
      <DepositApprovalAction
        depositId={depositid}
        actions={["approve", "reject"]}
        redirectTo="/spa/finance/credit-in"
      />

      <DepositDetail depositid={depositid} />
    </Box>
  );
};

export default TransationsDepositDetailsPage;
