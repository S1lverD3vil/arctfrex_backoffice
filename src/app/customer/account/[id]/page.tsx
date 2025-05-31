import { Metadata } from "next";
import { Box } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import AccountTabs from "@/views/account/[id]/AccountTabs";
import AccountApprovalAction from "@/views/account/[id]/AccountApprovalAction";
import AccountUploadRecording from "@/views/account/[id]/AccountUploadRecording";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Account Details | PaNen",
  description: "PaNen Account Details",
};

const AccountDetailsPage = ({
  params,
  searchParams: { accountid },
}: {
  params: { id: string };
  searchParams: { accountid: string };
}) => {
  const userid = params.id;

  const t = useTranslations("Page.Customer.Account.Slug");

  const breadcrumbItems = [
    { text: t("account"), linkTo: "/customer/account" },
    { text: t("user"), linkTo: "/customer/account/" + userid },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <Breadcrumbs items={breadcrumbItems} />

      {accountid && <AccountApprovalAction />}

      {accountid && (
        <AccountUploadRecording userId={userid} accountId={accountid} />
      )}

      <AccountTabs userId={userid} />
    </Box>
  );
};

export default AccountDetailsPage;
