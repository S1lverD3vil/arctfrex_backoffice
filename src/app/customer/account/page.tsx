import { Metadata } from "next";
import { AccountTable } from "@/views/account";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Account | PaNen",
  description: "PaNen Account",
};

const AccountPage = () => {
  const t = useTranslations("Page.Customer.Account");
  const breadcrumbItems = [{ text: t("account"), linkTo: "/customer/account" }];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", px: 3, py: 2 }}
      gap={2}
    >
      <Breadcrumbs items={breadcrumbItems} />
      <AccountTable />
    </Box>
  );
};

export default AccountPage;
