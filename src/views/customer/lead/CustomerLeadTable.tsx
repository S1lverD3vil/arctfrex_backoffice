"use client";

import { Table } from "@/components";
import {
  Customer,
  useCustomerUsersLeads,
} from "@/hooks/queries/backoffice/customers/users/leads";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const CustomerAllTable = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useCustomerUsersLeads();

  const tableData = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data.data;
  }, [data?.data]);

  const columnsToShow: Array<keyof Customer> = [
    "email",
    "name",
    "mobile_phone",
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

export default CustomerAllTable;
