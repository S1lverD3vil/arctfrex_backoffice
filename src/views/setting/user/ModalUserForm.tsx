"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import ModalForm from "@/components/ModalForm";
import UserForm from "./UserForm";
import { enqueueSnackbar } from "notistack";
import { queryClient } from "@/hooks";
import { useTranslations } from "next-intl";

const ModalUserForm = () => {
  const t = useTranslations("Data");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    router.push("/setting/user?");

    setIsOpen(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <ModalForm
        buttonTitle={t("add")}
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <UserForm
          onSuccess={async () => {
            enqueueSnackbar("Successfully Create new News", {
              variant: "success",
            });

            await queryClient.invalidateQueries({ queryKey: ["users-all"] });

            handleClose();
          }}
          onError={async (error) => {
            enqueueSnackbar(error.message, {
              variant: "error",
            });
          }}
        />
      </ModalForm>
    </Box>
  );
};

export default ModalUserForm;
