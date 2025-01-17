"use client";

import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import {
  Chat as ChatIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { useConversationsSessions } from "@/hooks/queries/backoffice/conversations/sessions";
import { useAppContext } from "@/contexts/AppContext/AppContext";

type ConversationAvaliableProps = {
  setSessionId: (sessionId: string) => void;
};

const ConversationActive = (props: ConversationAvaliableProps) => {
  const { setSessionId } = props;
  const { userSession } = useAppContext();

  const backOfficeUserId = userSession?.userid;

  const { data } = useConversationsSessions({
    backOfficeUserId,
    enabled: Boolean(backOfficeUserId),
    refetchOnMount: "always",
    refetchIntervalInBackground: true,
    refetchInterval: 5000,
  });

  const sessions = data?.data || [];

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      <List>
        {sessions.map((room) => (
          <ListItem
            key={room.session_id}
            sx={{
              backgroundColor: "white",
              borderBottom: "1px solid #e0e0e0",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#fafafa", // Light gray color on hover
              },
              borderRadius: "8px",
              mb: 1, // Margin between list items
              cursor: "pointer",
            }}
            onClick={() => setSessionId(room.session_id)}
          >
            <ListItemAvatar>
              <Avatar>
                <ChatIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={room.user.customer_name}
              secondary={room.user.customer_name}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="join"
                onClick={() => console.log(`Joining room: ${room.session_id}`)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConversationActive;
