"use client";

import { createContext, useContext } from "react";
import {
  useConversation,
  initialConversationContextState,
} from "./ConversationContextHook";

const ConversationContext = createContext(initialConversationContextState);

export const ConversationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useConversation();

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversationContext = () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error(
      "useConversationContext must be used within a ConversationContextProvider"
    );
  }

  return context;
};

export const ConversationContextConsumer = ConversationContext.Consumer;

export default ConversationContext;
