import { Metadata } from "next";
import CustomerLeadTable from "@/views/customer/lead/CustomerLeadTable";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Customer Lead | PaNen",
  description: "PaNen Customer Lead",
};

const CustomerLeadPage = () => {
  const t = useTranslations("Data");
  const breadcrumbItems = [{ text: t("lead"), linkTo: "/customer/lead" }];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
      <CustomerLeadTable />
    </Box>
  );
};

export default CustomerLeadPage;
