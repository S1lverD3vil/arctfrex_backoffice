import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import UserTable from "@/views/setting/user/UserTable";
import ModalUserForm from "@/views/setting/user/ModalUserForm";

export const metadata: Metadata = {
  title: "User | PaNen",
  description: "PaNen User",
};

const UserPage = () => {
  const t = useTranslations("Data");
  const breadcrumbItems = [{ text: t("user"), linkTo: "/setting/user" }];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
      <ModalUserForm />
      <UserTable />
    </Box>
  );
};

export default UserPage;
