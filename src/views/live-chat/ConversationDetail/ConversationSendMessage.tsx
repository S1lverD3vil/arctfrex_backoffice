import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { WebSocketMessage } from "react-use-websocket/dist/lib/types";

const initialMessage = {
  message: "",
};

type ConversationSendMessageProps = {
  onSendMessage: (message: WebSocketMessage) => void;
};

const ConversationSendMessage = (props: ConversationSendMessageProps) => {
  const { onSendMessage: handleSendMessage } = props;
  const [message, setMessage] = useState(initialMessage);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.message.trim()) {
      handleSendMessage(JSON.stringify(message));
      setMessage(initialMessage);
    }
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="row"
      gap={2}
      onSubmit={onSubmit}
    >
      <TextField
        fullWidth
        size="small"
        value={message.message}
        onChange={(e) => setMessage({ message: e.target.value })}
      />
      <Button type="submit" variant="contained">
        Send
      </Button>
    </Box>
  );
};

export default ConversationSendMessage;
