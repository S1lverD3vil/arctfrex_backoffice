import { Metadata } from "next";
import CustomerAllTable from "@/views/customer/all/CustomerAllTable";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "All | PaNen",
  description: "PaNenCustomerAll",
};

const CustomerAllPage = () => {
  const t = useTranslations("Data");
  const breadcrumbItems = [{ text: t("all"), linkTo: "/customer/all" }];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
      <CustomerAllTable />
    </Box>
  );
};

export default CustomerAllPage;
