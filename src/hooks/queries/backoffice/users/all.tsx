import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/users/all";

export type UserAllResponse = {
  message: string;
  data: User[];
  time: string;
};

export type User = {
  userid: string;
  customer_name: string;
  email: string;
  mobile_phone: string;
  password: string;
  device_id: string;
  session_id: string;
  role_id_type: number;
  role_id: string;
  superior_id: string;
  referral_code: string;
  job_position: number;
  is_active: boolean;
  CreatedBy: string;
  CreatedAt: Date;
  ModifiedBy: string;
  ModifiedAt: Date;
};

// https://arctfrex.apidog.io/api-12693883
export const useUserAll = (
  options: UseQueryOptions<UserAllResponse, Error> = {
    queryKey: ["users-all"],
  }
) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get<UserAllResponse>(ENDPOINT);

      return data;
    },
    ...options,
  });
};
