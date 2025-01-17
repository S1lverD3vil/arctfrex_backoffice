"use client";

import React, { useMemo } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useCustomersUsersEmployment } from "@/hooks/queries/backoffice/customers/users/employment";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { cleanObject } from "@/utils/objects";
import { useTranslations } from "next-intl";

type CustomerEmploymentProps = React.PropsWithChildren<{
  userId: string;
}>;

const CustomerEmployment = (props: CustomerEmploymentProps) => {
  const { userId } = props;

  const t = useTranslations("Page.Customer.Account.Slug");
  const {
    data: employment,
    isLoading,
    isError,
  } = useCustomersUsersEmployment({ userId });

  const detailData = useMemo(() => {
    if (!employment) return {};

    return {
      ...cleanObject(employment),
    };
  }, [employment]);

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
          title={t("customer_employment")}
          data={detailData as unknown as DetailCardData}
        />
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, t]);

  return <>{renderByStatus}</>;
};

export default CustomerEmployment;
