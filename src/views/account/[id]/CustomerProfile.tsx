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
import { useStorageUpload } from "@/hooks/queries/backoffice/storage/upload";
import { enqueueSnackbar } from "notistack";

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

  const { mutate: doStorageUpload, isPending } = useStorageUpload({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar(t("upload_error"), { variant: "error" });
    },
  });

  const [editMode, setEditMode] = useState(false);

  const fields = {
    selfie_photo: {
      type: "image",
      label: t("selfie_photo"),
      onUpload: (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        formik.setFieldValue("selfie_photo", previewUrl);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", "selfie");
        formData.append("accountId", accountid);
        formData.append("userId", userId);
        doStorageUpload(formData);
      },
    },
    npwp_photo: {
      type: "image",
      label: t("npwp_photo"),
      onUpload: (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        formik.setFieldValue("npwp_photo", previewUrl);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", "npwp");
        formData.append("accountId", accountid);
        formData.append("userId", userId);
        doStorageUpload(formData);
      },
    },
    additional_document_photo: {
      type: "image",
      label: t("additional_document_photo"),
      onUpload: (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        formik.setFieldValue("additional_document_photo", previewUrl);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", "additional_doc");
        formData.append("accountId", accountid);
        formData.append("userId", userId);
        doStorageUpload(formData);
      },
    },
    declaration_video: {
      type: "video",
      label: t("declaration_video"),
      onUpload: (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        formik.setFieldValue("declaration_video", previewUrl);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", "declaration");
        formData.append("accountId", accountid);
        formData.append("userId", userId);
        doStorageUpload(formData);
      },
    },
  };

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
          fields={fields}
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
