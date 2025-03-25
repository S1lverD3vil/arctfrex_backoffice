"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useRegisterUserMutation } from "@/hooks/queries/backoffice/users/register";
import { useTranslations } from "next-intl";
import { useRolesAll } from "@/hooks/queries/backoffice/roles/all";
import { useUsersRolesByRolesId } from "@/hooks/queries/backoffice/users/roles";

// Define the type for form values
interface FormValues {
  customer_name: string;
  email: string;
  mobile_phone: string;
  password: string;
  role_id: string;
  superior_id: string;
  job_position: number;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  customer_name: Yup.string().required("Customer Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile_phone: Yup.string().required("Mobile Phone is required"),
  password: Yup.string().required("Password is required"),
  role_id: Yup.string().required("Role ID Type is required"),
  superior_id: Yup.string(),
  job_position: Yup.number().required("Job Position is required"),
});

type UserFormProps = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

const UserForm = ({ onSuccess, onError }: UserFormProps) => {
  const t = useTranslations("Data");

  const { mutateAsync: registerUser } = useRegisterUserMutation({
    onSuccess,
    onError,
  });

  // Using useFormik hook to manage form state and validation
  const formik = useFormik<FormValues>({
    initialValues: {
      customer_name: "",
      email: "",
      mobile_phone: "",
      password: "",
      role_id: "",
      superior_id: "",
      job_position: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await registerUser(values);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const { data: rolesData } = useRolesAll();
  const roles = rolesData?.data;

  const selectedRole = roles?.find((r) => r.id === formik.values.role_id);

  const { data: usersData } = useUsersRolesByRolesId({
    role_id: String(selectedRole?.parent_role_id),
    enabled: !!selectedRole?.parent_role_id,
  });
  const superiorUsers = usersData?.data;

  const selectedSuperiorUser = superiorUsers?.find(
    (s) => s.userid === formik.values.superior_id
  );

  useEffect(() => {
    formik.setFieldValue("superior_id", "");
  }, [formik.values.role_id]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom mb={2}>
        {t("register_user")}
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
          id="customer_name"
          name="customer_name"
          label={t("customer_name")}
          value={formik.values.customer_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.customer_name && Boolean(formik.errors.customer_name)
          }
          helperText={
            formik.touched.customer_name &&
            Boolean(formik.errors.customer_name) &&
            formik.errors.customer_name
          }
        />

        <TextField
          fullWidth
          required
          id="email"
          name="email"
          label={t("email")}
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

        <TextField
          fullWidth
          required
          id="mobile_phone"
          name="mobile_phone"
          label={t("mobile_phone")}
          value={formik.values.mobile_phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.mobile_phone && Boolean(formik.errors.mobile_phone)
          }
          helperText={
            formik.touched.mobile_phone &&
            Boolean(formik.errors.mobile_phone) &&
            formik.errors.mobile_phone
          }
        />

        <TextField
          fullWidth
          required
          id="password"
          name="password"
          label={t("password")}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            formik.touched.password &&
            Boolean(formik.errors.password) &&
            formik.errors.password
          }
        />

        <FormControl
          fullWidth
          required
          error={formik.touched.role_id && Boolean(formik.errors.role_id)}
        >
          <InputLabel id="role_id-label">{t("role_id")}</InputLabel>
          <Select
            labelId="role_id-label"
            id="role_id"
            name="role_id"
            value={selectedRole?.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={t("role_id")}
          >
            {roles?.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.role_id && formik.errors.role_id && (
            <Typography variant="caption" color="error">
              {formik.errors.role_id}
            </Typography>
          )}
        </FormControl>

        <FormControl
          fullWidth
          required
          error={
            formik.touched.superior_id && Boolean(formik.errors.superior_id)
          }
        >
          <InputLabel id="superior_id-label">{t("superior_id")}</InputLabel>
          <Select
            labelId="superior_id-label"
            id="superior_id"
            name="superior_id"
            value={
              selectedSuperiorUser ? selectedSuperiorUser.customer_name : ""
            }
            renderValue={(value) => value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={t("superior_id")}
            disabled={!formik.values.role_id}
          >
            {superiorUsers && superiorUsers.length > 0 ? (
              superiorUsers.map((user) => (
                <MenuItem key={user.userid} value={user.userid}>
                  {user.customer_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                {t("no_options_available")}
              </MenuItem>
            )}
          </Select>
          {formik.touched.superior_id && formik.errors.superior_id && (
            <Typography variant="caption" color="error">
              {formik.errors.superior_id}
            </Typography>
          )}
        </FormControl>

        <FormControl
          fullWidth
          required
          error={
            formik.touched.job_position && Boolean(formik.errors.job_position)
          }
        >
          <InputLabel id="job_position-label">{t("job_position")}</InputLabel>
          <Select
            labelId="job_position-label"
            id="job_position"
            name="job_position"
            value={formik.values.job_position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={t("job_position")}
          >
            <MenuItem value={1}>JobPositionTypeAdmin</MenuItem>
            <MenuItem value={2}>JobPositionTypeMarketing</MenuItem>
            <MenuItem value={3}>JobPositionTypeTeamLeader</MenuItem>
            <MenuItem value={4}>JobPositionTypeSalesManager</MenuItem>
            <MenuItem value={5}>JobPositionTypeMarketingGroup</MenuItem>
          </Select>
          {formik.touched.job_position && formik.errors.job_position && (
            <Typography variant="caption" color="error">
              {formik.errors.job_position}
            </Typography>
          )}
        </FormControl>

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

export default UserForm;
