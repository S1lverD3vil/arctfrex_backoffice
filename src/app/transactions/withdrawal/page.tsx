import { Metadata } from "next";
import { Box } from "@mui/material";
import { Breadcrumbs } from "@/components";
import TransactionsWithdrawalTable from "@/views/transactions/withdrawal/TransactionsWithdrawalTable";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Transactions Withdrawal | PaNen",
  description: "PaNen Transactions Withdrawal",
};

const TransactionsWithdrawalPage = () => {
  const t = useTranslations("Page.Transactions.Withdraw");
  const breadcrumbItems = [
    { text: t("withdraw"), linkTo: "/transactions/withdrawal" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
      <TransactionsWithdrawalTable />
    </Box>
  );
};

export default TransactionsWithdrawalPage;
