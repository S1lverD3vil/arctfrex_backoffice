import { Metadata } from "next";
import { Box } from "@mui/material";
import AccountTabs from "@/views/account/[id]/AccountTabs";
import AccountApprovalAction from "@/views/account/[id]/AccountApprovalAction";
import AccountUploadRecording from "@/views/account/[id]/AccountUploadRecording";

export const metadata: Metadata = {
  title: "Account Details | PaNen",
  description: "PaNen Account Details",
};

export default function RequestWPCallPage({
  params,
  searchParams: { accountid },
}: {
  params: { id: string };
  searchParams: { accountid: string };
}) {
  const userid = params.id;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      {accountid && <AccountApprovalAction />}

      {accountid && <AccountUploadRecording />}

      <AccountTabs userId={userid} />
    </Box>
  );
}
