import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "@/libs/axios";
import { AxiosError } from "axios";

const ENDPOINT = "/backoffice/customers/users/check";

// Generated by https://quicktype.io
export type CustomersUsersCheckData = {};

export type CustomersUsersCheckVariables = {
  customer_name: string;
  email: string;
  mobilephone: string;
};

type Options = Partial<UseQueryOptions<CustomersUsersCheckData, Error>> & {
  mobilePhone?: string;
};

// https://arctfrex.apidog.io/api-10313428
export const useCustomersUsersCheck = ({
  mobilePhone,
  ...options
}: Options) => {
  return useQuery({
    ...options,
    queryKey: ["customers-users-check", mobilePhone],
    queryFn: async () => {
      try {
        const { data } = await axios.get<CustomersUsersCheckData>(
          ENDPOINT + "/" + mobilePhone
        );

        return data;
      } catch (err) {
        // 400 will be use for already register but never set pin
        const error = err as AxiosError;
        if (error.response?.status === 400) {
          return error.response?.data;
        }

        throw error;
      }
    },
  });
};
