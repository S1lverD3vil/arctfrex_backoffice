"use client";

import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import ModalForm from "@/components/ModalForm";
import NewsForm from "./NewsForm";
import { enqueueSnackbar } from "notistack";
import { queryClient } from "@/hooks";
import { useTranslations } from "next-intl";

const ModalNewsForm = () => {
  const t = useTranslations("Data");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = useMemo(
    () => decodeURIComponent(searchParams.get("title") || ""),
    [searchParams]
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.delete("title");

    router.push("/news?" + _searchParams.toString());

    setIsOpen(false);
  };

  useEffect(() => {
    if (title) {
      handleOpen();
    }
  }, [title]);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <ModalForm
        buttonTitle={t("add")}
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <NewsForm
          title={title}
          onSuccess={async () => {
            enqueueSnackbar("Successfully Create new News", {
              variant: "success",
            });

            await queryClient.invalidateQueries({ queryKey: ["news"] });

            handleClose();
          }}
        />
      </ModalForm>
    </Box>
  );
};

export default ModalNewsForm;
