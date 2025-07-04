import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/account/all";

// Define the response interface
export interface AccountAllResponse {
  message: string;
  data: Account[];
  pagination: Pagination;
  time: string;
}

export interface Account {
  account_id: string;
  user_id: string;
  name: string;
  email: string;
  approval_status: number | string;
  no_aggreement: string;
  user_mobile_phone: string;
  user_fax_phone: string;
  user_home_phone: string;
  created_at: string;
}

export interface Pagination {
  sorter: string;
  total: number;
  page_size: number;
  current_page: number;
}

type Options = Partial<UseQueryOptions<AccountAllResponse, Error>> &
  Partial<Pagination> & {
    menutype?: string;
  };

// Create the query hook
export const useAccountAll = ({
  current_page,
  page_size,
  ...options
}: Options) => {
  return useQuery({
    queryKey: [ENDPOINT, current_page, page_size],
    queryFn: async () => {
      const { data } = await axios.get<AccountAllResponse>(ENDPOINT, {
        params: {
          current_page,
          page_size,
        },
      });

      return data;
    },
    ...options,
  });
};
