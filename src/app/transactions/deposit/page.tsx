import { Metadata } from "next";
import { Box } from "@mui/material";
import { Breadcrumbs } from "@/components";
import TransactionsDepositTable from "@/views/transactions/deposit/TransactionsDepositTable";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Transactions Deposit | PaNen",
  description: "PaNen Transactions Deposit",
};

const TransactionsDepositPage = () => {
  const t = useTranslations("Page.Transactions.Deposit");
  const breadcrumbItems = [
    { text: t("deposit"), linkTo: "/transactions/deposit" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
      <TransactionsDepositTable />
    </Box>
  );
};

export default TransactionsDepositPage;
