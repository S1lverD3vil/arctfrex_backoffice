import { Metadata } from "next";
import { Box } from "@mui/material";
import { DepositApprovalAction } from "@/modules/deposit";
import CreditOutDetail from "@/modules/deposit/CreditOutDetail";

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
      <CreditOutDetail menu="spa" menutype="finance" depositid={depositid} />
    </Box>
  );
};

export default TransationsDepositDetailsPage;
