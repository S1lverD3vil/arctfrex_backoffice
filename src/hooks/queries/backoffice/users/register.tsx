import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/users/register";

export interface RegisterUserRequest {
  customer_name: string;
  email: string;
  mobile_phone: string;
  password: string;
  role_id_type: string;
  superior_id: string;
  job_position: number;
}

export interface RegisterUserResponse {
  message: string;
  data: {
    id: string;
    customer_name: string;
    email: string;
    mobile_phone: string;
    role_id_type: string;
    superior_id: string;
    job_position: number;
    created_at: string;
    updated_at: string;
  };
}

export const useRegisterUserMutation = (
  options: UseMutationOptions<RegisterUserResponse, Error, RegisterUserRequest>
) => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post<RegisterUserResponse>(
        ENDPOINT,
        payload
      );

      return data;
    },
    ...options,
  });
};
