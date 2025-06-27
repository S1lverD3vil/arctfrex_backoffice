"use client";

import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import { Typography, CircularProgress, Box } from "@mui/material";
import {
  useCustomersUsersFinance,
  useCustomersUsersFinanceMutation,
} from "@/hooks/queries/backoffice/customers/users/finance";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { cleanObject } from "@/utils/objects";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { EditButton, SaveButton } from "@/components";
import { useFormik } from "formik";

// Define the type for form values
interface FormValues {}

// Validation schema using Yup
const validationSchema = Yup.object({});

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
    refetch: refetchFinance,
  } = useCustomersUsersFinance({ userId });

  const { mutateAsync: updateCustomerFinance } =
    useCustomersUsersFinanceMutation({
      userId,
    });

  const [editMode, setEditMode] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: finance as any,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateCustomerFinance(values);
        await refetchFinance();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      setEditMode(false);
    },
  });

  const detailData = useMemo(() => {
    if (!finance) return {};

    const _finance = _.omit(finance);

    return {
      ...cleanObject(_finance),
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

export default CustomerFinance;
