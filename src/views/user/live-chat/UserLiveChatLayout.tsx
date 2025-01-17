"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useConversationsSessionActive } from "@/hooks/queries/conversations/sesesion/active";
import UserLiveChat from "./UserLiveChat";

const UserLiveChatLayout = () => {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token") || "";

  const {
    data: conversationSession,
    isFetching: isConversationSessionFetching,
    isError: isConversationSessionError,
  } = useConversationsSessionActive({
    accessToken,
  });

  const session = conversationSession?.data;

  if (isConversationSessionError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Not Found Conversation</Typography>
      </Box>
    );
  }

  if (isConversationSessionFetching) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f9f9f9",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f9f9f9",
      }}
    >
      {session && session.session_id && <UserLiveChat session={session} />}
    </Box>
  );
};

export default UserLiveChatLayout;
