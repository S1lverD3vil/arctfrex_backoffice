import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/conversations/sessions/start";

export interface ConversationsSessionStartRequest {
  accessToken: string;
}

interface DataSuccess {
  session_id: string;
  user_id: string;
  backoffice_user_id: string;
  messages: null;
  current_step_id: string;
  user: null;
  backoffice_user: null;
  is_active: boolean;
  CreatedBy: string;
  CreatedAt: string;
  ModifiedBy: string;
  ModifiedAt: string;
}

interface DataFailure {
  session_id: string;
}

export interface ConversationsSessionStartResponse {
  message: string;
  data: DataSuccess | DataFailure;
  time: string;
}

export const useConversationsSessionStart = (
  options?: UseMutationOptions<
    ConversationsSessionStartResponse,
    Error,
    ConversationsSessionStartRequest
  >
) => {
  return useMutation({
    mutationFn: async (payload) => {
      const { accessToken } = payload;

      const { data } = await axios.post<ConversationsSessionStartResponse>(
        ENDPOINT,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return data;
    },
    ...options,
  });
};
