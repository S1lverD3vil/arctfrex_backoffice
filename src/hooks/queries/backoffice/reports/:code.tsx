import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";

const ENDPOINT = "/backoffice/reports";

export interface ReportCodeItem {
  depositid: string;
  accountid: string;
  userid: string;
  name: string;
  email: string;
  amount: number;
  amount_usd: number;
  approval_status: number;
}

export interface ReportCode {
  code: string;
  column: Array<string>;
  data: ReportCodeItem[];
}

export interface ReportCodeResponse {
  message: string;
  data: ReportCode;
  time: string;
}

type UseReportCodePendingOptions = Omit<
  UseQueryOptions<ReportCodeResponse, Error>,
  "queryKey"
> & {
  code: string;
  startDate?: string;
  endDate?: string;
};

// https://arctfrex.apidog.io/api-12057240
export const useReportCode = ({
  code,
  startDate,
  endDate,
  ...restOptions
}: UseReportCodePendingOptions) => {
  const params = new URLSearchParams();
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);

  return useQuery({
    ...restOptions,
    queryKey: ["report-code", code],
    queryFn: async () => {
      const { data } = await axios.get<ReportCodeResponse>(
        ENDPOINT + "/" + code,
        { params }
      );

      return data;
    },
  });
};
