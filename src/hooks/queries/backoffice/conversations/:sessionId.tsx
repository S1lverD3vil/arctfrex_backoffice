import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/conversations/sessions";

interface User {
  userid: string;
  customer_name: string;
  email: string;
  mobilephone: string;
  pin: string;
  device: string;
  device_id: string;
  session_id: string;
  session_expiration: string;
  watchlist: null;
  is_active: boolean;
  CreatedBy: string;
  CreatedAt: string;
  ModifiedBy: string;
  ModifiedAt: string;
}

interface Message {
  message_id: string;
  content: string;
  session_id: string;
  user_id: string;
  from_user: string;
}

export interface ConversationSession {
  session_id: string;
  user: User;
  backoffice_user_id: string;
  messages: Message[];
}

export type ConversationsSessionsResponse = {
  data: ConversationSession;
};

type Options = Partial<
  UseQueryOptions<ConversationsSessionsResponse, Error>
> & { sessionId: string };

// https://arctfrex.apidog.io/api-10313428
export const useConversationsSessionId = ({
  sessionId,
  ...options
}: Options) => {
  return useQuery({
    ...options,
    queryKey: ["conversations-sessions", sessionId],
    queryFn: async () => {
      const { data } = await axios.get<ConversationsSessionsResponse>(
        ENDPOINT + "/" + sessionId
      );

      return data;
    },
  });
};
