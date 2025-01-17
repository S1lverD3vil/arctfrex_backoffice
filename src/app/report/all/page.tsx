import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box } from "@mui/material";
import ReportAllTable from "@/views/report/all/ReportAllTable";

export const metadata: Metadata = {
  title: "Report All | PaNen",
  description: "PaNen Report",
};

const ReportAllPage = () => {
  const breadcrumbItems = [{ text: "Report", linkTo: "/report/all" }];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", px: 3, py: 2 }}
      gap={2}
    >
      <Breadcrumbs items={breadcrumbItems} />
      <ReportAllTable />
    </Box>
  );
};

export default ReportAllPage;
