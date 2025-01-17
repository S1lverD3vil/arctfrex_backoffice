"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { Container, Box, TextField, Button } from "@mui/material";
import { Copyright } from "@/components";
import { useUserLoginSession } from "@/hooks/queries/backoffice/users/login/session";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { LOCAL_STORAGE_KEYS, setLocalStorage } from "@/utils/local-storage";
import { useTranslations } from "next-intl";

const SignIn = () => {
  const router = useRouter();
  const { setUserSession } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations("Page.Index");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: loginSession, isPending } = useUserLoginSession({
    onSuccess: (data) => {
      if (!data.role_id) {
        enqueueSnackbar("Roles not found", { variant: "error" });
        router.replace("/");
        return;
      }

      setUserSession(data);
      setLocalStorage(LOCAL_STORAGE_KEYS.SESSION, data);
      setFormData({ email: "", password: "" });
      router.replace("/dashboard");
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleFormDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = formData;

    loginSession({ email, password });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box width={296} height={142} position="relative">
          <Image src="/assets/images/logo.jpeg" alt="Logo" fill />
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label={t("email")}
            type="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={(e) => handleFormDataChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label={t("password")}
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(e) => handleFormDataChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isPending}
          >
            {t("sign_in")}
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2, mb: 4 }} />
    </Container>
  );
};

export default SignIn;
