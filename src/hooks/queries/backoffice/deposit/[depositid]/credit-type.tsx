import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = ({ depositId }: any) =>
  `/backoffice/deposit/${depositId}/credit-type`;

export interface RequestUpdateDepositCreditType {
  credit_type_locale_key: "CreditIn";
}

export interface ResponseUpdateDepositCreditType {
  message: string;
  data: ResponseUpdateDepositCreditTypeData;
  time: string;
}

export interface ResponseUpdateDepositCreditTypeData {
  deposit_id: string;
  credit_type_locale_key: string;
}

// https://arctfrex.apidog.io/api-17687580
export const useUpdateDepositCreditTypeMutation = ({
  depositId,
  ...options
}: UseMutationOptions<
  ResponseUpdateDepositCreditType,
  Error,
  RequestUpdateDepositCreditType
> & { depositId: string }) => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.patch<ResponseUpdateDepositCreditType>(
        ENDPOINT({ depositId }),
        payload
      );

      return data;
    },
    ...options,
  });
};
