"use client";

import { Table } from "@/components";
import {
  ReportCodeItem,
  useReportCode,
} from "@/hooks/queries/backoffice/reports/:code";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type ReportCodeTableProps = {
  code: string;
};

const ReportCodeTable = (props: ReportCodeTableProps) => {
  const { code } = props;

  const router = useRouter();
  const { data, isLoading, isError } = useReportCode({ code });

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

  const renderByStatus = useMemo(() => {
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {renderByStatus}
    </Box>
  );
};

export default ReportCodeTable;
