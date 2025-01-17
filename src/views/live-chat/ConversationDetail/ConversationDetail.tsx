"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useConversationsSessionId } from "@/hooks/queries/backoffice/conversations/:sessionId";
import ConversationMessage from "./ConversationMessage";
import ConversationSendMessage from "./ConversationSendMessage";
import { env } from "@/constants/env";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { WebSocketMessage } from "react-use-websocket/dist/lib/types";
import ConversationUserInformation from "./ConversationUserInformation";

interface ConversationDetailProps {
  sessionId: string;
  setSessionId: (sessionId: string) => void;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  sessionId,
  setSessionId,
}) => {
  const { data, isLoading, isError, isSuccess } = useConversationsSessionId({
    sessionId,
  });

  const { userSession } = useAppContext();

  const searchParams = new URLSearchParams();
  searchParams.set("access_token", userSession.access_token);

  const [socketUrl] = useState(
    `${env.BASE_SOCKET_URL}/conversations/sessions/${sessionId}/messages/ws`
  );
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl + "?" + searchParams.toString()
  );

  const handleSendMessage = (message: WebSocketMessage) => sendMessage(message);

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

  const session = data?.data;

  // Ref to track the messages container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the message container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onClose = () => {
    setSessionId("");
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.data.messages.length > 0) {
        setMessageHistory(data?.data.messages as Array<any>);
      }
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!!lastMessage) {
      setMessageHistory((prev) => prev.concat(JSON.parse(lastMessage.data)));
    }
  }, [lastMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  if (isLoading) {
    return <Typography>Loading conversation...</Typography>;
  }

  if (isError || !data?.data) {
    return (
      <Typography>Error loading conversation or no data found.</Typography>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <ConversationUserInformation session={session} />
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        overflow="auto"
        marginBottom="88px"
      >
        <ConversationMessage
          messages={messageHistory as Array<any>}
          userType="OPERATOR"
        />
        {/* Marker for the bottom of the messages */}
        <div ref={messagesEndRef} />
      </Box>
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

export default ConversationDetail;
