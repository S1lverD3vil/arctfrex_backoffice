import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box, Typography } from "@mui/material";
import { CustomerPinForm } from "@/views/customer/pin";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Account | PaNen",
  description: "PaNen Account",
};

const CustomerPinPage = () => {
  const t = useTranslations("Page.Customer.Pin");
  const breadcrumbItems = [{ text: t("pin"), linkTo: "/customer/Pin" }];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
      <Typography variant="h5" gutterBottom>
        {t("customer_pin_form")}
      </Typography>
      <CustomerPinForm />
    </Box>
  );
};

export default CustomerPinPage;
