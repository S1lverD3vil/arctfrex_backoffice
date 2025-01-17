import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box, Typography } from "@mui/material";
import { CustomerRegisterForm } from "@/views/customer/register";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Account | PaNen",
  description: "PaNen Account",
};

const CustomerRegisterPage = () => {
  const t = useTranslations("Page.Customer.Register");

  const breadcrumbItems = [
    { text: t("register"), linkTo: "/customer/register" },
  ];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", px: 3, py: 2 }}
      gap={2}
    >
      <Breadcrumbs items={breadcrumbItems} />
      <Typography variant="h5" gutterBottom>
        {t("customer_registration_form")}
      </Typography>
      <CustomerRegisterForm />
    </Box>
  );
};

export default CustomerRegisterPage;
