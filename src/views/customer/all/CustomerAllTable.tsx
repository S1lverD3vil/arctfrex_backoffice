"use client";

import { Table } from "@/components";
import { useAccountAll, Account } from "@/hooks/queries/backoffice/account/all";
import { approvalStatusToString } from "@/models/account";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const CustomerAllTable = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useAccountAll();

  const tableData = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data.data.map((account) => ({
      ...account,
      approval_status: approvalStatusToString(account.approval_status),
    }));
  }, [data?.data]);

  const columnsToShow: Array<keyof Account> = [
    "email",
    "name",
    "approval_status",
  ];

  const handleRowClick = (row: Account) => {
    router.push("/customer/account/" + row.userid);
  };

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

    return (
      <Table
        data={tableData}
        columns={columnsToShow}
        onRowClick={handleRowClick}
      />
    );
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
