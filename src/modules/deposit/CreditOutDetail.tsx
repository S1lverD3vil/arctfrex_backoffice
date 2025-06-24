"use client";

import React, { useMemo } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { approvalStatusToString } from "@/models/account";
import { cleanObject } from "@/utils/objects";
import { Image } from "@/components";
import { useDepositCreditSpaMenuTypeDepositIdQuery } from "@/hooks/queries/backoffice/deposit/credit/spa/[menutype]/[depositid]";
import { useDepositCreditMultiMenuTypeDepositIdQuery } from "@/hooks/queries/backoffice/deposit/credit/multi/[menutype]/[depositid]";
import { DepositApprovalAction } from "./DepositApprovalAction";

type CreditOutDetailProps = React.PropsWithChildren<{
  menu: "spa" | "multi";
  depositid: string;
  menutype: "finance" | "settlement";
}>;

const CreditOutDetail = (props: CreditOutDetailProps) => {
  const { menu, menutype, depositid } = props;

  const isSPA = menu === "spa";

  const {
    data: spa,
    isLoading,
    isError,
  } = useDepositCreditSpaMenuTypeDepositIdQuery({
    enabled: isSPA,
    menutype,
    depositid,
  });

  const { data: multi } = useDepositCreditMultiMenuTypeDepositIdQuery({
    enabled: !isSPA,
    menutype,
    depositid,
  });

  const data = isSPA ? spa : multi;

  const detailData = useMemo(() => {
    const creditOutDetail = data?.data;

    if (!creditOutDetail) return {};

    return {
      ...cleanObject(creditOutDetail),
      approval_status: approvalStatusToString(creditOutDetail?.approval_status),
      deposit_photo: (
        <Image src={creditOutDetail?.deposit_photo} alt="Deposite Photo" />
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
        <>
          <DepositApprovalAction
            depositId={depositid}
            redirectTo="/spa/settlement/credit-out"
          />
          <DetailCard
            title="Customer Profile"
            data={detailData as unknown as DetailCardData}
          />
        </>
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  return <>{renderByStatus}</>;
};

export default CreditOutDetail;
