"use client";

import React, { useMemo } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useCustomersUsersAddress } from "@/hooks/queries/backoffice/customers/users/address";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { cleanObject, cleanObjectKeys, removePrefix } from "@/utils/objects";
import _ from "lodash";
import { useTranslations } from "next-intl";

type CustomerAddressProps = React.PropsWithChildren<{
  userId: string;
}>;

const CustomerAddress = (props: CustomerAddressProps) => {
  const { userId } = props;

  const t = useTranslations("Page.Customer.Account.Slug");
  const {
    data: address,
    isLoading,
    isError,
  } = useCustomersUsersAddress({ userId });

  const detailData = useMemo(() => {
    if (!address) return {};

    return cleanObject(
      removePrefix(address, "dom_"), // remove dom_ prefix
      [
        ...cleanObjectKeys,
        ..._.keys(address).filter((key) => key.startsWith("ktp_")),
      ] // remove ktp_ prefix
    );
  }, [address]);

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
          title={t("customer_address")}
          data={detailData as unknown as DetailCardData}
        />
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, t]);

  return <>{renderByStatus}</>;
};

export default CustomerAddress;
