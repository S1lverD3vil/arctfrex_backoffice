import { Metadata } from "next";
import { Box } from "@mui/material";
import { NewsTable } from "@/views/news";
import Breadcrumbs from "@/components/Breadcrumbs";
import ModalNewsForm from "@/views/news/ModalNewsForm";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "News | PaNen",
  description: "News",
};

const NewsPage = () => {
  const t = useTranslations("Page.News");
  const breadcrumbItems = [{ text: t("news"), linkTo: "/news" }];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", px: 3, py: 2 }}
      gap={2}
    >
      <Breadcrumbs items={breadcrumbItems} />
      <ModalNewsForm />
      <NewsTable />
    </Box>
  );
};

export default NewsPage;
