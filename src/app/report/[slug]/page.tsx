import { Metadata } from "next";
import { Box } from "@mui/material";
import { Breadcrumbs } from "@/components";
import ReportCodeTable from "@/views/report/code/ReportCodeTable";
import ReportCodeExport from "@/views/report/code/ReportExport";

export const metadata: Metadata = {
  title: "Report | PaNen",
  description: "PaNen Report",
};

const ReportPage = ({ params }: { params: { slug: string } }) => {
  const breadcrumbItems = [
    { text: "Report All", linkTo: "/report/all" },
    { text: "Report Detail", linkTo: "/report/" + params.slug },
  ];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", px: 3, py: 2 }}
      gap={2}
    >
      <Breadcrumbs items={breadcrumbItems} />

      <ReportCodeTable code={params.slug} />
    </Box>
  );
};

export default ReportPage;
