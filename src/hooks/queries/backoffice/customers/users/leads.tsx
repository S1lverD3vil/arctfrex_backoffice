import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/customers/users/leads";

// Define the response interface
export interface CustomerResponse {
  message: string;
  data: Customer[];
  time: string;
}

export interface Customer {
  userid: string;
  name: string;
  email: string;
  mobile_phone: string;
}

export const useCustomerUsersLeads = (
  options: UseQueryOptions<CustomerResponse, Error> = {
    queryKey: ["customer-users-leads"],
  }
) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get<CustomerResponse>(ENDPOINT, {});

      return data;
    },
    ...options,
  });
};
