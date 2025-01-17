import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";
import { useConversationsSessionStart } from "./start";
import { queryClient } from "@/hooks";
import { AxiosError } from "axios";

const ENDPOINT = "/conversations/sessions/active";

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
  operator_id: null;
  messages: Message[];
}

export type ConversationsSessionActiveResponse = {
  data: ConversationSession;
};

type Options = Partial<
  UseQueryOptions<ConversationsSessionActiveResponse, Error>
> & { accessToken: string };

// https://arctfrex.apidog.io/api-10313428
export const useConversationsSessionActive = ({
  accessToken,
  ...options
}: Options) => {
  const { mutate: doConversationSessionStart } = useConversationsSessionStart({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["conversations-session-active", accessToken],
      });
    },
  });

  return useQuery({
    ...options,
    queryKey: ["conversations-session-active", accessToken],
    queryFn: async () => {
      try {
        const { data } = await axios.get<ConversationsSessionActiveResponse>(
          ENDPOINT,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        return data;
      } catch (e) {
        const error = e as AxiosError;
        // do something
        // or just re-throw the error
        if (error.response?.status === 404) {
          doConversationSessionStart({ accessToken });
        }

        throw error;
      }
    },
  });
};
