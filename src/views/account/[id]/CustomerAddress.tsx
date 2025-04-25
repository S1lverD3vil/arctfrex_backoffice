"use client";

import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import { Typography, CircularProgress, Box } from "@mui/material";
import {
  useCustomersUsersAddress,
  useCustomersUsersAddressMutation,
} from "@/hooks/queries/backoffice/customers/users/address";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { EditButton, SaveButton } from "@/components";
import { cleanObject, cleanObjectKeys, removePrefix } from "@/utils/objects";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";

// Define the type for form values
interface FormValues {}

// Validation schema using Yup
const validationSchema = Yup.object({});

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
    refetch: refetchAddress,
  } = useCustomersUsersAddress({ userId });

  const { mutateAsync: updateCustomerAddress } =
    useCustomersUsersAddressMutation({
      userId,
    });

  const [editMode, setEditMode] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: address as any,
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

    if (address)
      return (
        <DetailCard
          title={t("customer_address")}
          data={address as unknown as DetailCardData}
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

export default CustomerAddress;
