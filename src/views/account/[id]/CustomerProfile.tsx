"use client";

import React, { useMemo, useState } from "react";
import _ from "lodash";
import * as Yup from "yup";
import { Typography, CircularProgress, Box, Button } from "@mui/material";
import {
  useCustomersUsersProfile,
  useCustomersUsersProfileMutation,
} from "@/hooks/queries/backoffice/customers/users/profile";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { EditButton, Image, SaveButton } from "@/components";
import { cleanObject } from "@/utils/objects";
import Video from "@/components/Video";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import { useAccountDetailPageContext } from "./AccountDetailPageContext";

// Define the type for form values
interface FormValues {}

// Validation schema using Yup
const validationSchema = Yup.object({});

type CustomerProfileProps = React.PropsWithChildren<{
  userId: string;
}>;

const CustomerProfile = (props: CustomerProfileProps) => {
  const { userId } = props;
  const { accountid } = useAccountDetailPageContext();

  const t = useTranslations("Page.Customer.Account.Slug");
  const {
    data: profile,
    isLoading,
    isError,
    refetch: refetchProfile,
  } = useCustomersUsersProfile({ userId });

  const { mutateAsync: updateCustomerProfile } =
    useCustomersUsersProfileMutation({
      userId,
    });

  const [editMode, setEditMode] = useState(false);

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

  const formik = useFormik<FormValues>({
    initialValues: profile as any,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateCustomerProfile(values);
        await refetchProfile();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      setEditMode(false);
    },
  });

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
          editMode={editMode}
          formik={formik}
        />
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, t, editMode, formik]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {accountid && (
        <Box display="flex" gap={1}>
          <EditButton editMode={editMode} setEditMode={setEditMode} />
          {editMode && <SaveButton onClick={() => formik.submitForm()} />}
        </Box>
      )}

      {renderByStatus}
    </Box>
  );
};

export default CustomerProfile;
