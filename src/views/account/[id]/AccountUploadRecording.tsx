"use client";

import { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  styled,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Clear, CloudUpload } from "@mui/icons-material";
import { useStorageUpload } from "@/hooks/queries/backoffice/storage/upload";
import { useSnackbar } from "notistack";
import { useAccountDetailPageContext } from "./AccountDetailPageContext";
import { useTranslations } from "next-intl";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AccountUploadRecording = () => {
  const { accountid, userid } = useAccountDetailPageContext();
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations("Page.Customer.Account.Slug");

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const { mutate: doStorageUpload, isPending } = useStorageUpload({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar(t("upload_error"), { variant: "error" });
    },
  });

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      enqueueSnackbar(t("no_file_selected"), { variant: "warning" });
      return;
    }

    const file = files[0];

    if (!file.type.includes("mp4")) {
      enqueueSnackbar(t("invalid_file_type"), { variant: "error" });
      return;
    }

    setFileName(file.name);

    // Generate preview URL for the video
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", "realaccount_callrecording");
    formData.append("accountId", accountid);
    formData.append("userId", userid);

    doStorageUpload(formData);
  };

  const handleClearPreview = () => {
    setPreviewUrl(null);
    setFileName(null);
  };

  return (
    <Box>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        disabled={isPending}
      >
        {isPending ? `${t("uploading")}...` : t("upload_record")}
        <VisuallyHiddenInput
          type="file"
          accept=".mp4"
          onChange={handleUpload}
        />
      </Button>

      {previewUrl && (
        <Card sx={{ marginTop: 2, maxWidth: 400 }}>
          <CardMedia
            component="video"
            src={previewUrl}
            controls
            sx={{ height: 200 }}
          />
        </Card>
      )}
    </Box>
  );
};

export default AccountUploadRecording;
