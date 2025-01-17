import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/account/all";

// Define the response interface
export interface Account {
  accountid: string;
  userid: string;
  name: string;
  email: string;
  approval_status: number | string;
}

export type AccountAllResponse = {
  data: Account[];
  message: string;
};

// Create the query hook
export const useAccountAll = (
  options: UseQueryOptions<AccountAllResponse, Error> = {
    queryKey: ["account-all"],
  }
) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get<AccountAllResponse>(ENDPOINT, {});

      return data;
    },
    ...options,
  });
};
