"use client";

import React, { useMemo } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { useDepositPendingDetail } from "@/hooks/queries/backoffice/deposit/pending/detail";
import { approvalStatusToString } from "@/models/account";
import { cleanObject } from "@/utils/objects";
import { Image } from "@/components";

type DepositDetailProps = React.PropsWithChildren<{
  depositid: string;
}>;

const DepositDetail = (props: DepositDetailProps) => {
  const { depositid } = props;

  const { data, isLoading, isError } = useDepositPendingDetail({ depositid });

  const detailData = useMemo(() => {
    const depositDetail = data?.data;

    if (!depositDetail) return {};

    return {
      ...cleanObject(depositDetail),
      approval_status: approvalStatusToString(depositDetail?.approval_status),
      deposit_photo: (
        <Image src={depositDetail?.deposit_photo} alt="Deposite Photo" />
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

export default DepositDetail;
