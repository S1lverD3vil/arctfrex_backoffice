import { Metadata } from "next";
import { Box } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
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

  const breadcrumbItems = [
    { text: "Deposit", linkTo: "/transactions/deposit" },
    { text: "Detail", linkTo: "/transactions/deposit/" + depositid },
  ];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", px: 3, py: 2 }}
      gap={2}
    >
      <Breadcrumbs items={breadcrumbItems} />

      <DepositApprovalAction />

      <DepositDetail depositid={depositid} />
    </Box>
  );
};

export default TransationsDepositDetailsPage;
