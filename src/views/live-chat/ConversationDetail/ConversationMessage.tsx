"use client";

import React from "react";
import { Box, Typography, Paper, colors } from "@mui/material";
import { ConversationSession } from "@/hooks/queries/backoffice/conversations/:sessionId";
import { CONST } from "@/constants/const";

interface ConversationMessageProps {
  messages: ConversationSession["messages"];
  userType: "OPERATOR" | "USER" | "SYSTEM";
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({
  messages,
  userType,
}) => {
  const isOperator = userType === CONST.OPERATOR;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          overflowY: "auto",
        }}
      >
        {messages.map((message, index) => {
          // Determine alignment
          const isCurrentUser = isOperator
            ? [CONST.OPERATOR, CONST.SYSTEM].includes(message.from_user)
            : message.from_user === userType;
          const align = !isCurrentUser ? "flex-start" : "flex-end";

          // Check if the name/title should be displayed
          const showName =
            index === 0 || message.from_user !== messages[index - 1].from_user;

          return (
            <Box
              key={message.message_id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: align,
              }}
            >
              {/* Show Name/Title */}
              {showName && (
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    fontWeight: "bold",
                    color: isCurrentUser ? colors.blue[500] : colors.green[500],
                    alignSelf: align,
                  }}
                >
                  {isCurrentUser ? userType : message.from_user}
                </Typography>
              )}

              {/* Chat Bubble */}
              <Paper
                elevation={3}
                sx={{
                  p: 1.5,
                  maxWidth: "60%",
                  bgcolor: isCurrentUser ? colors.blue[500] : colors.grey[50],
                  color: isCurrentUser ? colors.grey[50] : colors.grey[900],
                  borderRadius: 2,

                  mt: showName ? 1 : 0.5, // Add space when name is shown
                  ...(isCurrentUser
                    ? {
                        borderTopRightRadius: isCurrentUser ? 2 : 0,
                      }
                    : {
                        borderTopLeftRadius: isCurrentUser ? 0 : 2,
                      }),
                }}
              >
                <Typography variant="body2" whiteSpace="pre-wrap">
                  {message.content}
                </Typography>
              </Paper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ConversationMessage;
