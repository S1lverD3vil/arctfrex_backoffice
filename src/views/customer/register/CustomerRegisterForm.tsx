"use client";

import React from "react";
import { Box, Button, TextField, Grid, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import { useCustomersUsersRegister } from "@/hooks/queries/backoffice/customers/users/register";
import { useCustomersUsersCheck } from "@/hooks/queries/backoffice/customers/users/check";
import { useDebounce } from "@uidotdev/usehooks";
import { useTranslations } from "next-intl";

// Define the type for form values
interface FormValues {
  customer_name: string;
  email: string;
  mobilephone: string;
  referral_code: string;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  customer_name: Yup.string().required("Customer name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobilephone: Yup.string()
    .matches(
      /^8\d{9,14}$/,
      "Mobile phone must start with 8 and be 10-15 digits long"
    )
    .required("Mobile phone is required"),
});

// Initial form values
const initialValues: FormValues = {
  customer_name: "",
  email: "",
  mobilephone: "",
  referral_code: "",
};

const CustomerRegisterForm = () => {
  const t = useTranslations("Data");
  // Using useFormik hook to manage form state and validation
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await registerUserCustomer(values);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const [mobilePhone] = useDebounce([formik.values.mobilephone], 1000);
  const {
    isSuccess: isMobilePhoneRegistered,
    isFetching: isMobilePhoneFetching,
    isLoading: isMobilePhoneLoading,
    isFetched: isMobilePhoneFetched,
  } = useCustomersUsersCheck({
    mobilePhone: mobilePhone,
    enabled: !!mobilePhone,
  });

  const isCheckMobilePhoneLoading = Boolean(
    isMobilePhoneFetching && isMobilePhoneLoading && isMobilePhoneFetched
  );

  const { mutateAsync: registerUserCustomer } = useCustomersUsersRegister({
    onSuccess: () => {
      enqueueSnackbar("Successfully Create new Customer", {
        variant: "success",
      });

      formik.resetForm();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  return (
    <Box sx={{ width: "50%" }}>
      <Paper component="form" sx={{ p: 4 }} onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="customer_name"
              name="customer_name"
              label={t("customer_name")}
              autoComplete="off"
              value={formik.values.customer_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.customer_name &&
                Boolean(formik.errors.customer_name)
              }
              helperText={
                formik.touched.customer_name &&
                Boolean(formik.errors.customer_name) &&
                formik.errors.customer_name
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label={t("email")}
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email &&
                Boolean(formik.errors.email) &&
                formik.errors.email
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="referral_code"
              name="referral_code"
              label={t("referral_code")}
              autoComplete="off"
              value={formik.values.referral_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.referral_code &&
                Boolean(formik.errors.referral_code)
              }
              helperText={
                formik.touched.referral_code &&
                Boolean(formik.errors.referral_code) &&
                formik.errors.referral_code
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="mobilephone"
              name="mobilephone"
              label={t("mobilephone")}
              autoComplete="off"
              value={formik.values.mobilephone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.mobilephone &&
                  Boolean(formik.errors.mobilephone)) ||
                isMobilePhoneRegistered
              }
              helperText={
                (formik.touched.mobilephone &&
                  Boolean(formik.errors.mobilephone) &&
                  formik.errors.mobilephone) ||
                (isMobilePhoneRegistered && "Mobile phone is already taken")
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={
                !formik.dirty ||
                formik.isSubmitting ||
                !formik.isValid ||
                isMobilePhoneRegistered ||
                isCheckMobilePhoneLoading
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CustomerRegisterForm;
