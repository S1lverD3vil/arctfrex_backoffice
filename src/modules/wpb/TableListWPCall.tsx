"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  CircularProgress,
  IconButton,
  Pagination as MUIPagination,
  Typography,
} from "@mui/material";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { Table } from "@/components";
import {
  useAccountAll,
  Account,
  Pagination,
} from "@/hooks/queries/backoffice/account/all";
import { approvalStatusToString } from "@/models/account";
import moment from "moment";

export const TableListWPCall = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState<Partial<Pagination>>({
    current_page: 1,
    page_size: 10,
  });

  const { data, isLoading, isError } = useAccountAll({ ...pagination });

  const tableData = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data.data.map((account) => ({
      ...account,
      approval_status: approvalStatusToString(account.approval_status),
      created_at: moment(account.created_at).format("YYYY-MM-DD HH:mm:ss"),
      actions: (
        <IconButton
          color="primary"
          onClick={() => {
            router.push("/wpb/list-wp-call/" + account.user_id);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    }));
  }, [data?.data]);

  const columnsToShow: Array<keyof Account | "actions"> = [
    "no_aggreement",
    "name",
    "user_mobile_phone",
    "email",
    "created_at",
    "approval_status",
    "actions",
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

    return (
      <>
        <Table data={tableData} columns={columnsToShow} />
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
