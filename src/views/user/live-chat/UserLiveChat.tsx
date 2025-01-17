/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebSocketMessage } from "react-use-websocket/dist/lib/types";
import { env } from "@/constants/env";
import ConversationMessage from "@/views/live-chat/ConversationDetail/ConversationMessage";
import ConversationSendMessage from "@/views/live-chat/ConversationDetail/ConversationSendMessage";
import { ConversationSession } from "@/hooks/queries/conversations/sesesion/active";

type UserLiveChatProps = {
  session: ConversationSession;
};

const UserLiveChat = (props: UserLiveChatProps) => {
  const { session } = props;

  const searchParams = useSearchParams();
  const router = useRouter();
  const accessToken = searchParams.get("access_token") || "";

  const socketUrl = useMemo(
    () =>
      `${env.BASE_SOCKET_URL}/conversations/sessions/${session?.session_id}/messages/ws?access_token=${accessToken}`,
    [session]
  );
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // Ref to track the messages container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the message container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (session.messages.length > 0) {
      setMessageHistory(session.messages as Array<any>);
    }
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => [...prev, JSON.parse(lastMessage.data)]);
      scrollToBottom();
    }
  }, [lastMessage]);

  const handleSendMessage = (message: WebSocketMessage) => sendMessage(message);

  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  // if (errorMessage) {
  //   return (
  //     <Box
  //       sx={{
  //         height: "100vh",
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         textAlign: "center",
  //         bgcolor: "#f9f9f9",
  //       }}
  //     >
  //       <Typography variant="h5" color="error">
  //         {errorMessage}
  //       </Typography>
  //       <Button variant="contained" onClick={() => router.push("/")}>
  //         Back to Home
  //       </Button>
  //     </Box>
  //   );
  // }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f9f9f9",
      }}
    >
      {/* Message List */}
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        overflow="auto"
        marginBottom="88px"
      >
        <ConversationMessage
          messages={messageHistory as Array<any>}
          userType="USER"
        />
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Section */}
      <Box
        position="absolute"
        width="100%"
        bottom={0}
        p={2}
        bgcolor="#fff"
        boxShadow="0 -1px 2px 0 rgba(0,0,0,.1)"
      >
        <ConversationSendMessage onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default UserLiveChat;
