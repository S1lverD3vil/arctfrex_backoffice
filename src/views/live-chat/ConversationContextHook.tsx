"use client";

import { useAppContext } from "@/contexts/AppContext/AppContext";
import { queryClient } from "@/hooks";
import { useConversationsSessionIdEnd } from "@/hooks/queries/backoffice/conversations/:sessionId/end";
import { useConversationsSessionIdTake } from "@/hooks/queries/backoffice/conversations/:sessionId/take";
import { ConversationSession } from "@/models/conversation";
import { useReducer } from "react";

export type ConversationContextState = ConversationSession & {
  setSessionId: (sessionId: string) => void;
  doConversationSessionIdEnd: (...args: any) => void;
  doConversationSessionIdTake: (...arg: any) => void;
};

type ConverastionContextAction = {
  type: string;
  payload: any;
};

const ACTIONS = {
  SET_SESSION_ID: "SET_SESSION_ID",
};

const reducer = (
  state: ConversationContextState,
  action: ConverastionContextAction
) => {
  switch (action.type) {
    case ACTIONS.SET_SESSION_ID:
      return { ...state, session_id: action.payload };
    default:
      return state;
  }
};

export const initialConversationContextState: ConversationContextState = {
  session_id: "",
  user: {
    userid: "",
    customer_name: "",
    email: "",
    mobilephone: "",
    pin: "",
    device: "",
    device_id: "",
    session_id: "",
    session_expiration: "",
    watchlist: null,
    is_active: false,
    CreatedBy: "",
    CreatedAt: "",
    ModifiedBy: "",
    ModifiedAt: "",
  },
  operator_id: null,
  messages: [],
  setSessionId: () => {},
  doConversationSessionIdEnd: () => {},
  doConversationSessionIdTake: () => {},
};

export const useConversation = () => {
  const [{ session_id, user, operator_id, messages }, dispatch] = useReducer(
    reducer,
    initialConversationContextState
  );

  const { userSession } = useAppContext();
  const backOfficeUserId = userSession?.userid;

  const { mutate: doConversationSessionIdEnd } = useConversationsSessionIdEnd({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["conversations-sessions", session_id],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          "conversations-sessions",
          { backoffice_user_id: backOfficeUserId },
        ],
      });
      setSessionId("");
    },
  });

  const { mutate: doConversationSessionIdTake } = useConversationsSessionIdTake(
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["conversations-sessions", session_id],
        });
        await queryClient.invalidateQueries({
          queryKey: ["conversations-sessions", { backoffice_user_id: "" }],
        });
        setSessionId("");
      },
    }
  );

  const setSessionId = (sessionId: string) => {
    dispatch({ type: ACTIONS.SET_SESSION_ID, payload: sessionId });
  };

  return {
    session_id,
    user,
    operator_id,
    messages,
    setSessionId,
    doConversationSessionIdEnd,
    doConversationSessionIdTake,
  };
};
