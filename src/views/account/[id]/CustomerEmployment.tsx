"use client";

import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import { Typography, CircularProgress, Box } from "@mui/material";
import {
  useCustomersUsersEmployment,
  useCustomersUsersEmploymentMutation,
} from "@/hooks/queries/backoffice/customers/users/employment";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { useTranslations } from "next-intl";
import { EditButton, SaveButton } from "@/components";
import { useFormik } from "formik";

// Define the type for form values
interface FormValues {}

// Validation schema using Yup
const validationSchema = Yup.object({});

type CustomerEmploymentProps = React.PropsWithChildren<{
  userId: string;
}>;

const CustomerEmployment = (props: CustomerEmploymentProps) => {
  const { userId } = props;

  const t = useTranslations("Page.Customer.Account.Slug");
  const {
    data,
    isLoading,
    isError,
    refetch: refetchAddress,
  } = useCustomersUsersEmployment({ userId });

  const employment = data?.data;

  const { mutateAsync: updateCustomerAddress } =
    useCustomersUsersEmploymentMutation({
      userId,
    });

  const [editMode, setEditMode] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: employment as any,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateCustomerAddress(values);
        await refetchAddress();
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

    if (employment)
      return (
        <DetailCard
          title={t("customer_employment")}
          data={employment as unknown as DetailCardData}
          editMode={editMode}
          formik={formik}
        />
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, t, editMode, formik]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={1}>
        <EditButton editMode={editMode} setEditMode={setEditMode} />
        {editMode && <SaveButton onClick={() => formik.submitForm()} />}
      </Box>

      {renderByStatus}
    </Box>
  );
};

export default CustomerEmployment;
