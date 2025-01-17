"use client";

import React, { useMemo } from "react";
import _ from "lodash";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useCustomersUsersProfile } from "@/hooks/queries/backoffice/customers/users/profile";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { Image } from "@/components";
import { cleanObject } from "@/utils/objects";
import Video from "@/components/Video";
import { useTranslations } from "next-intl";

type CustomerProfileProps = React.PropsWithChildren<{
  userId: string;
}>;

const CustomerProfile = (props: CustomerProfileProps) => {
  const { userId } = props;

  const t = useTranslations("Page.Customer.Account.Slug");
  const {
    data: profile,
    isLoading,
    isError,
  } = useCustomersUsersProfile({ userId });

  const detailData = useMemo(() => {
    if (!profile) return {};

    return {
      ...cleanObject(profile),
      ktp_photo: <Image src={profile?.ktp_photo} alt="Ktp Photo" />,
      selfie_photo: <Image src={profile?.selfie_photo} alt="Selfie" />,
      npwp_photo: <Image src={profile?.npwp_photo} alt="NPWP" />,
      additional_document_photo: (
        <Image
          src={profile?.additional_document_photo}
          alt="Additional Document"
        />
      ),
      declaration_video: <Video src={profile?.declaration_video} />,
    };
  }, [profile]);

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
          title={t("customer_profile")}
          data={detailData as unknown as DetailCardData}
        />
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, t]);

  return <>{renderByStatus}</>;
};

export default CustomerProfile;
