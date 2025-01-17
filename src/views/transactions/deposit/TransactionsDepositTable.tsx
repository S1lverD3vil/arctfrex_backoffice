"use client";

import { Table } from "@/components";
import {
  Deposit,
  useDepositPending,
} from "@/hooks/queries/backoffice/deposit/pending";
import { approvalStatusToString } from "@/models/account";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const TransactionsDepositTable = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useDepositPending();

  const tableData = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data.data.map((account) => ({
      ...account,
      approval_status: approvalStatusToString(account.approval_status),
    }));
  }, [data?.data]);

  const columnsToShow: Array<keyof Deposit> = [
    "email",
    "name",
    "amount",
    "approval_status",
  ];

  const handleRowClick = (row: Deposit) => {
    router.push("/transactions/deposit/" + row.depositid);
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

export default TransactionsDepositTable;
