import { Metadata } from "next";
import { Box } from "@mui/material";
import { ConversationLayout } from "@/views/live-chat";

export const metadata: Metadata = {
  title: "Live Chat | PaNen",
  description: "PaNen Live Chat",
};

const LiveChatPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <ConversationLayout />
    </Box>
  );
};

export default LiveChatPage;
