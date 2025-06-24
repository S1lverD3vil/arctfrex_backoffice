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

type CreditInDetailProps = React.PropsWithChildren<{
  menu: "spa" | "multi";
  depositid: string;
  menutype: "finance" | "settlement";
}>;

const CreditInDetail = (props: CreditInDetailProps) => {
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
    const creditInDetail = data?.data;

    if (!creditInDetail) return {};

    return {
      ...cleanObject(creditInDetail),
      approval_status: approvalStatusToString(creditInDetail?.approval_status),
      deposit_photo: (
        <Image src={creditInDetail?.deposit_photo} alt="Deposite Photo" />
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
            actions={
              data?.data?.approval_status === 3 ? ["approve", "reject"] : []
            }
            redirectTo="/spa/finance/credit-in"
            level={1}
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

export default CreditInDetail;
