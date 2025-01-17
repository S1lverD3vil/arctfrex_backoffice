"use client";

import React, { useMemo } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useCustomersUsersEmergencyContact } from "@/hooks/queries/backoffice/customers/users/emergencycontact";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { cleanObject } from "@/utils/objects";
import { useTranslations } from "next-intl";

type CustomerEmergencyContactProps = React.PropsWithChildren<{
  userId: string;
}>;

const CustomerEmergencyContact = (props: CustomerEmergencyContactProps) => {
  const { userId } = props;

  const t = useTranslations("Page.Customer.Account.Slug");
  const {
    data: emergencyContact,
    isLoading,
    isError,
  } = useCustomersUsersEmergencyContact({ userId });

  const detailData = useMemo(() => {
    if (!emergencyContact) return {};

    return {
      ...cleanObject(emergencyContact),
    };
  }, [emergencyContact]);

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
          title={t("customer_emergency_contact")}
          data={detailData as unknown as DetailCardData}
        />
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, t]);

  return <>{renderByStatus}</>;
};

export default CustomerEmergencyContact;
