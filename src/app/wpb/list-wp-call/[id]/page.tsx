import { Metadata } from "next";
import { Box } from "@mui/material";
import AccountTabs from "@/views/account/[id]/AccountTabs";

export const metadata: Metadata = {
  title: "Account Details | PaNen",
  description: "PaNen Account Details",
};

export default function ListWPCallPage({ params }: { params: { id: string } }) {
  const userid = params.id;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <AccountTabs userId={userid} />
    </Box>
  );
}
