"use client";

import { useMemo, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment, { Moment } from "moment";

import { Table } from "@/components";
import {
  ReportCodeItem,
  useReportCode,
} from "@/hooks/queries/backoffice/reports/:code";
import { useTranslations } from "next-intl";
import ReportCodeExport from "./ReportExport";

type ReportCodeTableProps = {
  code: string;
};

const ReportCodeTable = (props: ReportCodeTableProps) => {
  const { code } = props;

  const t = useTranslations("Data");

  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const {
    data,
    isLoading,
    isError,
    refetch: refetchReportCode,
  } = useReportCode({
    code,
    startDate: startDate?.format("YYYY-MM-DD"),
    endDate: endDate?.format("YYYY-MM-DD"),
  });

  const tableData = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data?.data?.data || [];
  }, [data?.data]);

  const columnsToShow = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return (
      (data?.data?.column as Array<keyof ReportCodeItem>) || [
        "name",
        "email",
        "amount",
      ]
    );
  }, [data?.data]);

  const renderByTable = useMemo(() => {
    if (isLoading)
      return (
        <Box
          sx={{
            minHeight: "calc(100vh - 100px);",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );

    if (isError) return <Typography>Error loading data</Typography>;

    return <Table data={tableData} columns={columnsToShow} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, tableData]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {code !== "R_MANIFEST" && (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Box display="flex" gap={2}>
            <DatePicker
              label={t("start_date")}
              value={startDate}
              onChange={(newStartDate) => setStartDate(newStartDate)}
              format="DD/MM/YYYY"
              maxDate={endDate!!}
              disableFuture
              slotProps={{
                actionBar: {
                  actions: ["clear"],
                },
                textField: {
                  inputProps: {
                    style: {
                      backgroundColor: "white",
                    },
                  },
                },
              }}
            />
            <p>-</p>
            <DatePicker
              label={t("end_date")}
              value={endDate}
              onChange={(newEndDate) => setEndDate(newEndDate)}
              format="DD/MM/YYYY"
              minDate={startDate!!}
              disableFuture
              slotProps={{
                actionBar: {
                  actions: ["clear"],
                },
                textField: {
                  inputProps: {
                    style: {
                      backgroundColor: "white",
                    },
                  },
                },
              }}
            />
            <Button
              color="success"
              onClick={() => refetchReportCode()}
              sx={{ width: "100px" }}
              size="small"
              variant="contained"
            >
              {t("search")}
            </Button>
          </Box>
        </LocalizationProvider>
      )}

      <Box>
        <ReportCodeExport
          code={code}
          type="xlsx"
          startDate={startDate}
          endDate={endDate}
        />
        <ReportCodeExport
          code={code}
          type="csv"
          startDate={startDate}
          endDate={endDate}
        />
        <ReportCodeExport
          code={code}
          type="pdf"
          startDate={startDate}
          endDate={endDate}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderByTable}
      </Box>
    </Box>
  );
};

export default ReportCodeTable;
