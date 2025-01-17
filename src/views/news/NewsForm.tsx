"use client";

import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  News,
  useCreateNewsMutation,
  useGetNews,
  useUpdateNewsMutation,
} from "@/hooks/queries/backoffice/news";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import _ from "lodash";
import { useTranslations } from "next-intl";

// Define the type for form values
interface FormValues extends News {}

// Validation schema using Yup
const validationSchema = Yup.object({
  news_title: Yup.string().required("News Title is required"),
  news_link: Yup.string().required("News Link is required"),
  news_image_link: Yup.string().required("News Image Link is required"),
  news_ticker: Yup.string().required("News Ticker is required"),
  news_date: Yup.string().required("News Date Link is required"),
});

// Initial form values
type NewsFormProps = React.PropsWithChildren<{
  title?: string;
  onSuccess: () => void;
}>;

const NewsForm = ({ title = "", onSuccess }: NewsFormProps) => {
  const t = useTranslations("Data");
  const isEditMode = Boolean(title);

  const { mutateAsync: createNews } = useCreateNewsMutation({
    onSuccess,
  });

  const { mutateAsync: updateNews } = useUpdateNewsMutation({
    onSuccess,
  });

  const { data } = useGetNews({
    ...(title && { params: { title } }),
    enabled: isEditMode,
  });

  const initialValues: FormValues = useMemo(() => {
    const defaultValues: FormValues = {
      news_title: title,
      news_link: "",
      news_image_link: "",
      news_impact: "",
      news_source: "",
      news_source_link: "",
      news_time_ago: "",
      news_preview: "",
      news_type: "",
      news_category: "",
      news_ticker: "",
      news_date: new Date(),
      is_active: true,
    };

    if (data?.data) {
      return {
        ...defaultValues,
        ...data.data,
      };
    }

    return defaultValues;
  }, [data]);

  // Using useFormik hook to manage form state and validation
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          await updateNews({ payload: values, config: { params: { title } } });
          return;
        }
        await createNews(values);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <Box>
      <Typography variant="h6" gutterBottom mb={2}>
        {isEditMode ? t("edit_news") : t("create_news")}
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={formik.handleSubmit}
        gap={2}
      >
        <TextField
          fullWidth
          required
          id="news_title"
          name="news_title"
          label={t("news_title")}
          value={formik.values.news_title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.news_title && Boolean(formik.errors.news_title)}
          helperText={
            formik.touched.news_title &&
            Boolean(formik.errors.news_title) &&
            formik.errors.news_title
          }
        />

        <TextField
          fullWidth
          required
          id="news_link"
          name="news_link"
          label={t("news_link")}
          value={formik.values.news_link}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.news_link && Boolean(formik.errors.news_link)}
          helperText={
            formik.touched.news_link &&
            Boolean(formik.errors.news_link) &&
            formik.errors.news_link
          }
        />

        <TextField
          fullWidth
          required
          id="news_image_link"
          name="news_image_link"
          label={t("news_image_link")}
          value={formik.values.news_image_link}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.news_image_link &&
            Boolean(formik.errors.news_image_link)
          }
          helperText={
            formik.touched.news_image_link &&
            Boolean(formik.errors.news_image_link) &&
            formik.errors.news_image_link
          }
        />

        <TextField
          fullWidth
          id="news_impact"
          name="news_impact"
          label={t("news_impact")}
          value={formik.values.news_impact}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.news_impact && Boolean(formik.errors.news_impact)
          }
          helperText={
            formik.touched.news_impact &&
            Boolean(formik.errors.news_impact) &&
            formik.errors.news_impact
          }
        />

        <TextField
          fullWidth
          id="news_source"
          name="news_source"
          label={t("news_source")}
          value={formik.values.news_source}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.news_source && Boolean(formik.errors.news_source)
          }
          helperText={
            formik.touched.news_source &&
            Boolean(formik.errors.news_source) &&
            formik.errors.news_source
          }
        />

        <TextField
          fullWidth
          id="news_source_link"
          name="news_source_link"
          label={t("news_source_link")}
          value={formik.values.news_source_link}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.news_source_link &&
            Boolean(formik.errors.news_source_link)
          }
          helperText={
            formik.touched.news_source_link &&
            Boolean(formik.errors.news_source_link) &&
            formik.errors.news_source_link
          }
        />

        <TextField
          fullWidth
          id="news_time_ago"
          name="news_time_ago"
          label={t("news_time_ago")}
          value={formik.values.news_time_ago}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.news_time_ago && Boolean(formik.errors.news_time_ago)
          }
          helperText={
            formik.touched.news_time_ago &&
            Boolean(formik.errors.news_time_ago) &&
            formik.errors.news_time_ago
          }
        />

        <TextField
          fullWidth
          id="news_preview"
          name="news_preview"
          label={t("news_preview")}
          value={formik.values.news_preview}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.news_preview && Boolean(formik.errors.news_preview)
          }
          helperText={
            formik.touched.news_preview &&
            Boolean(formik.errors.news_preview) &&
            formik.errors.news_preview
          }
        />

        <TextField
          fullWidth
          id="news_type"
          name="news_type"
          label={t("news_type")}
          value={formik.values.news_type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.news_type && Boolean(formik.errors.news_type)}
          helperText={
            formik.touched.news_type &&
            Boolean(formik.errors.news_type) &&
            formik.errors.news_type
          }
        />

        <TextField
          fullWidth
          id="news_category"
          name="news_category"
          label={t("news_category")}
          value={formik.values.news_category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.news_category && Boolean(formik.errors.news_category)
          }
          helperText={
            formik.touched.news_category &&
            Boolean(formik.errors.news_category) &&
            formik.errors.news_category
          }
        />

        <TextField
          fullWidth
          required
          id="news_ticker"
          name="news_ticker"
          label={t("news_ticker")}
          value={formik.values.news_ticker}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.news_ticker && Boolean(formik.errors.news_ticker)
          }
          helperText={
            formik.touched.news_ticker &&
            Boolean(formik.errors.news_ticker) &&
            formik.errors.news_ticker
          }
        />

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label={t("news_date")}
            value={moment(formik.values.news_date)}
            onChange={(date) => {
              formik.setFieldValue("news_date", date ? date : "");
            }}
            slotProps={{
              textField: {
                required: true,
                variant: "outlined",
                error:
                  formik.touched.news_date && Boolean(formik.errors.news_date),
                helperText:
                  formik.touched.news_date &&
                  Boolean(formik.errors.news_date) &&
                  formik.errors.news_date,
              },
            }}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!formik.dirty || formik.isSubmitting}
        >
          {t("submit")}
        </Button>
      </Box>
    </Box>
  );
};

export default NewsForm;
