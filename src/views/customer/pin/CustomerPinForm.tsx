"use client";

import React, { useRef } from "react";
import { Box, Button, TextField, Grid, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import { useCustomersUsersPin } from "@/hooks/queries/backoffice/customers/users/pin";
import { useCustomersUsersCheck } from "@/hooks/queries/backoffice/customers/users/check";
import { PinInput } from "@/components";
import _ from "lodash";
import { useDebounce } from "@uidotdev/usehooks";
import { useTranslations } from "next-intl";

// Define the type for form values
interface FormValues {
  mobilephone: string;
  pin: string[];
}

// Validation schema using Yup
const validationSchema = Yup.object({
  mobilephone: Yup.string()
    .matches(
      /^8\d{9,14}$/,
      "Mobile phone must start with 8 and be 10-15 digits long"
    )
    .required("Mobile phone is required"),
  pin: Yup.array().min(6).of(Yup.string().required("PIN is required")),
});

// Initial form values
const initialValues: FormValues = {
  mobilephone: "",
  pin: ["", "", "", "", "", ""],
};

const CustomerPinForm = () => {
  const t = useTranslations("Data");
  // Using useFormik hook to manage form state and validation
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const pin = values.pin.join("");
        await pinUserCustomer({ ...values, pin });
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

  const { mutateAsync: pinUserCustomer } = useCustomersUsersPin({
    onSuccess: () => {
      enqueueSnackbar("Successfully Create new Pin", {
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
              id="mobilephone"
              name="mobilephone"
              label={t("mobilephone")}
              value={formik.values.mobilephone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.mobilephone &&
                  Boolean(formik.errors.mobilephone)) ||
                !isMobilePhoneRegistered
              }
              helperText={
                (formik.touched.mobilephone &&
                  Boolean(formik.errors.mobilephone) &&
                  formik.errors.mobilephone) ||
                (!isMobilePhoneRegistered && "Mobile phone is already taken")
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              {t("enter")} 6-digit {t("pin")}
            </Typography>
            <PinInput
              pin={formik.values.pin}
              setPin={(value) => formik.setFieldValue("pin", value)}
              error={Boolean(_.some(formik.errors.pin))}
              helperText={
                Boolean(_.some(formik.errors.pin)) &&
                _.find(formik.errors.pin, (error) => !!error)
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
                isCheckMobilePhoneLoading ||
                !isMobilePhoneRegistered
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

export default CustomerPinForm;
