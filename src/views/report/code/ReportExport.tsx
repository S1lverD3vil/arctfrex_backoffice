"use client";

import { useReportCodeByTypeDownloadMutation } from "@/hooks/queries/backoffice/reports/:code/xlsx";
import { Button } from "@mui/material";
import { Moment } from "moment";

type ReportCodeExportProps = {
  code: string;
  type: string;
  startDate?: Moment | null;
  endDate?: Moment | null;
};

const ReportCodeExport = (props: ReportCodeExportProps) => {
  const { code, type, startDate, endDate } = props;

  const { mutate: doReportCodeXlsxDownload } =
    useReportCodeByTypeDownloadMutation();

  return (
    <Button
      onClick={() =>
        doReportCodeXlsxDownload({
          code,
          type,
          startDate: startDate?.format("YYYY-MM-DD"),
          endDate: endDate?.format("YYYY-MM-DD"),
        })
      }
      sx={{ textTransform: "uppercase" }}
    >
      {type}
    </Button>
  );
};

export default ReportCodeExport;
