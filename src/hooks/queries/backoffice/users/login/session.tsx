import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "@/libs/axios";
import { ROLE_ID } from "@/constants/roles";

const ENDPOINT = "/backoffice/users/login/session";

export interface UserLoginSessionRequest {
  email: string;
  password: string;
}

export interface UserLoginSessionResponse {
  userid: string;
  name: string;
  email: string;
  access_token: string;
  expiration: number;
  role_id: ROLE_ID;
  referral_code: string;
}

// https://arctfrex.apidog.io/api-9662739
export const useUserLoginSession = (
  options: UseMutationOptions<
    UserLoginSessionResponse,
    Error,
    UserLoginSessionRequest
  > = {}
) => {
  return useMutation({
    ...options,
    mutationFn: async (payload: UserLoginSessionRequest) => {
      const { data } = await axios.post<UserLoginSessionResponse>(
        ENDPOINT,
        payload
      );

      return data;
    },
  });
};
