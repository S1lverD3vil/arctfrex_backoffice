"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Table } from "@/components";
import {
  useAccountPending,
  Account,
  Pagination,
} from "@/hooks/queries/backoffice/account/pending";
import { approvalStatusToString } from "@/models/account";
import {
  Box,
  CircularProgress,
  Pagination as MUIPagination,
  Typography,
} from "@mui/material";

const AccountTable = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState<Partial<Pagination>>({
    current_page: 1,
    page_size: 10,
  });
  const { data, isLoading, isError } = useAccountPending({
    ...pagination,
  });

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
    "no_aggreement",
    "name",
    "user_mobile_phone",
    "email",
    "created_at",
    "approval_status",
  ];

  const handleRowClick = (row: Account) => {
    router.push(
      "/customer/account/" + row.user_id + "?accountid=" + row.account_id
    );
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
      <>
        <Table
          data={tableData}
          columns={columnsToShow}
          onRowClick={handleRowClick}
        />
        <MUIPagination
          page={pagination.current_page ?? 1}
          count={
            data?.pagination?.total ??
            Math.ceil(
              (data?.pagination?.total ?? 0) / (pagination.page_size ?? 10)
            )
          }
          onChange={(_, newPage) =>
            setPagination((prev) => ({
              ...prev,
              current_page: newPage,
            }))
          }
        />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, tableData]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      {renderByStatus}
    </Box>
  );
};

export default AccountTable;
