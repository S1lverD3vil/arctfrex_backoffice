"use client";

import React, { useMemo } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { useWithdrawalPendingDetail } from "@/hooks/queries/backoffice/withdrawal/pending/detail";
import { approvalStatusToString } from "@/models/account";
import { cleanObject } from "@/utils/objects";

type WithdrawalDetailProps = React.PropsWithChildren<{
  withdrawalid: string;
}>;

const WithdrawalDetail = (props: WithdrawalDetailProps) => {
  const { withdrawalid } = props;

  const { data, isLoading, isError } = useWithdrawalPendingDetail({
    withdrawalid,
  });

  const detailData = useMemo(() => {
    const withdrawalDetail = data?.data;

    if (!withdrawalDetail) return {};

    return {
      ...cleanObject(withdrawalDetail),
      approval_status: approvalStatusToString(
        withdrawalDetail?.approval_status
      ),
    };
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

    if (detailData)
      return (
        <DetailCard
          title="Customer Profile"
          data={detailData as unknown as DetailCardData}
        />
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  return <>{renderByStatus}</>;
};

export default WithdrawalDetail;
