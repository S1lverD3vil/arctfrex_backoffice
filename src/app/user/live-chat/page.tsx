import { Metadata } from "next";
import { Box, CircularProgress } from "@mui/material";
import UserLiveChatLayout from "@/views/user/live-chat/UserLiveChatLayout";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Live Chat | PaNen",
  description: "PaNen Live Chat",
};

const UserLiveChatPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <Suspense fallback={<CircularProgress />}>
        <UserLiveChatLayout />
      </Suspense>
    </Box>
  );
};

export default UserLiveChatPage;
