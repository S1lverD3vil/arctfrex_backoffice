"use client";

import { Table } from "@/components";
import {
  useDepositPendingSpaQuery,
  Deposit,
  Pagination,
} from "@/hooks/queries/backoffice/deposit/pending/spa";
import { approvalStatusToString } from "@/models/account";
import {
  Box,
  CircularProgress,
  Pagination as MUIPagination,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Props = {
  type: string;
};

const DepositSpaTable = (props: Props) => {
  const { type } = props;

  const router = useRouter();
  const [pagination, setPagination] = useState<Partial<Pagination>>({
    current_page: 1,
    page_size: 10,
  });

  const { data, isLoading, isError } = useDepositPendingSpaQuery({
    menutype: type,
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

  const columnsToShow: Array<keyof Deposit> = [
    "email",
    "name",
    "amount",
    "approval_status",
  ];

  const handleRowClick = (row: Deposit) => {
    router.push(`/spa/${type}/request-deposit/${row.deposit_id}`);
  };

  const RenderTable = () => {
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
  };

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
      <RenderTable />
    </Box>
  );
};

export default DepositSpaTable;
