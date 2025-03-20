import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/roles/all";

export interface Response {
  message: string;
  data: Role[];
  time: string;
}

export interface Role {
  id: string;
  name: string;
  commission_rate: number;
  parent_role_id: null | string;
  ParentRole: null;
  is_active: boolean;
  CreatedBy: string;
  CreatedAt: Date;
  ModifiedBy: string;
  ModifiedAt: Date;
}

// https://arctfrex.apidog.io/api-12693883
export const useRolesAll = (
  options: UseQueryOptions<Response, Error> = {
    queryKey: ["roles-all"],
  }
) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get<Response>(ENDPOINT);

      return data;
    },
    ...options,
  });
};
