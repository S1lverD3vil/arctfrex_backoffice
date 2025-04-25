"use client";

import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import { Typography, CircularProgress, Box } from "@mui/material";
import {
  useCustomersUsersEmergencyContact,
  useCustomersUsersEmergencyContactMutation,
} from "@/hooks/queries/backoffice/customers/users/emergencycontact";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { cleanObject } from "@/utils/objects";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import { EditButton, SaveButton } from "@/components";

// Define the type for form values
interface FormValues {}

// Validation schema using Yup
const validationSchema = Yup.object({});

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
    refetch: refetchEmergencyContact,
  } = useCustomersUsersEmergencyContact({ userId });

  const { mutateAsync: updateCustomerEmergencyContact } =
    useCustomersUsersEmergencyContactMutation({
      userId,
    });

  const [editMode, setEditMode] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: emergencyContact as any,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateCustomerEmergencyContact(values);
        await refetchEmergencyContact();
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

    if (emergencyContact)
      return (
        <DetailCard
          title={t("customer_emergency_contact")}
          data={emergencyContact as unknown as DetailCardData}
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

export default CustomerEmergencyContact;
