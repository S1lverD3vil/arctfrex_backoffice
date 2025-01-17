"use client";

import { Table } from "@/components";
import { Report, useReportAll } from "@/hooks/queries/backoffice/reports/all";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const ReportAllTable = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useReportAll();

  const tableData = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data.data.map((report) => ({
      ...report,
      detail: () => {
        return (
          <Button onClick={() => router.push("/report/" + report.code)}>
            Detail
          </Button>
        );
      },
    }));
  }, [data?.data]);

  const columnsToShow: Array<keyof Report | "detail"> = [
    "name",
    "description",
    "detail",
  ];

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

export default ReportAllTable;
