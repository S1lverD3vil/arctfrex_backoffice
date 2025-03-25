import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "@/libs/axios";
import { generateReportFilename } from "@/utils/filename";
import { saveAs } from "file-saver";

const ENDPOINT = "/backoffice/reports";

interface ReportCodeXlsx {}

interface ReportCodeXlsxResponse {}

interface ReportCodeXlsxRequest {
  code: string;
  type: string;
  startDate?: string;
  endDate?: string;
}

// Download report using mutation
export const useReportCodeByTypeDownloadMutation = (
  options?: UseMutationOptions<
    ReportCodeXlsxResponse,
    Error,
    ReportCodeXlsxRequest
  >
) => {
  return useMutation({
    mutationFn: async (payload: ReportCodeXlsxRequest) => {
      const { code, type, startDate, endDate } = payload;

      const params = new URLSearchParams();
      if (startDate) params.append("start_date", startDate);
      if (endDate) params.append("end_date", endDate);

      const response = await axios.get(`${ENDPOINT}/${code}/${type}`, {
        params,
        responseType: "blob", // Ensure binary response
      });

      const filename = generateReportFilename(code, startDate, endDate);

      saveAs(response.data, filename);
    },
  });
};
