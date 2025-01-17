"use client";

import React, { useMemo } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useCustomersUsersFinance } from "@/hooks/queries/backoffice/customers/users/finance";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { cleanObject } from "@/utils/objects";
import _ from "lodash";
import { useTranslations } from "next-intl";

type CustomerFinanceProps = React.PropsWithChildren<{
  userId: string;
}>;

const CustomerFinance = (props: CustomerFinanceProps) => {
  const { userId } = props;

  const t = useTranslations("Page.Customer.Account.Slug");
  const {
    data: finance,
    isLoading,
    isError,
  } = useCustomersUsersFinance({ userId });

  const detailData = useMemo(() => {
    if (!finance) return {};

    const _finance = _.omit(finance, ["bank_list"]);

    return {
      ...cleanObject(finance),
    };
  }, [finance]);

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
          title={t("customer_finance")}
          data={detailData as unknown as DetailCardData}
        />
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, t]);

  return <>{renderByStatus}</>;
};

export default CustomerFinance;
