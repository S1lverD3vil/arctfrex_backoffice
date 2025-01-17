import { Metadata } from "next";
import { Box } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsDetail from "@/views/news/[title]/NewsDetail";

export const metadata: Metadata = {
  title: "News Details | PaNen",
  description: "PaNen News Details",
};

const NewsDetailsPage = ({ params }: { params: { title: string } }) => {
  const title = params.title;

  const breadcrumbItems = [
    { text: "News", linkTo: "/news" },
    { text: "Detail", linkTo: "/news/" + title },
  ];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", px: 3, py: 2 }}
      gap={2}
    >
      <Breadcrumbs items={breadcrumbItems} />

      <NewsDetail title={title} />
    </Box>
  );
};

export default NewsDetailsPage;
