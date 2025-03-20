import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/users/roles";

export interface Response {
  message: string;
  data: User[];
  time: string;
}

export interface User {
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
  Role: Role;
  Superior: null;
  is_active: boolean;
  CreatedBy: string;
  CreatedAt: Date;
  ModifiedBy: string;
  ModifiedAt: Date;
}

export interface Role {
  id: string;
  name: string;
  commission_rate: number;
  parent_role_id: null;
  ParentRole: null;
  is_active: boolean;
  CreatedBy: string;
  CreatedAt: Date;
  ModifiedBy: string;
  ModifiedAt: Date;
}

type Options = Partial<UseQueryOptions<Response, Error>> & {
  role_id: string;
};

// https://arctfrex.apidog.io/api-12693883
export const useUsersRolesByRolesId = ({
  role_id,
  queryKey = ["users-roles"],
  ...options
}: Options) => {
  return useQuery({
    queryKey: ["users-roles", role_id],
    ...options,
    queryFn: async () => {
      const { data } = await axios.get<Response>(ENDPOINT + "/" + role_id);

      return data;
    },
  });
};
