import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/customers/users/pin";

// Generated by https://quicktype.io
export type CustomersUsersPinData = {};

export type CustomersUsersPinVariables = {
  mobilephone: string;
  pin: string;
};

type Options = Partial<
  UseMutationOptions<CustomersUsersPinData, Error, CustomersUsersPinVariables>
>;

// https://arctfrex.apidog.io/api-10313428
export const useCustomersUsersPin = (options: Options = {}) => {
  return useMutation({
    ...options,
    mutationFn: async (payload: CustomersUsersPinVariables) => {
      const { data } = await axios.patch<CustomersUsersPinData>(
        ENDPOINT,
        payload
      );

      return data;
    },
  });
};
