"use client";

import { useState, ChangeEvent } from "react";
import {
  Box,
  styled,
  CardMedia,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useStorageUpload } from "@/hooks/queries/backoffice/storage/upload";
import { useSnackbar } from "notistack";
import { useAccountDetailPageContext } from "./AccountDetailPageContext";
import { useTranslations } from "next-intl";
import { FileUpload } from "@/components";
import { Clear } from "@mui/icons-material";

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

type AccountUploadRecordingProps = {
  userId: string;
  accountId: string;
};

const AccountUploadRecording = ({
  userId,
  accountId,
}: AccountUploadRecordingProps) => {
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

  const handleUpload = (file: File) => {
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
    formData.append("accountId", accountId);
    formData.append("userId", userId);

    doStorageUpload(formData);
  };

  return (
    <Box>
      <FileUpload
        accept="video/mp4"
        label={isPending ? `${t("uploading")}...` : t("upload_record")}
        disabled={isPending}
        onUpload={handleUpload}
        renderPreview={(file, url, handleClear) => (
          <Card>
            <CardMedia
              component="video"
              src={url}
              controls
              sx={{ height: 200 }}
            />
            <CardContent>
              <IconButton onClick={handleClear}>
                <Clear />
              </IconButton>
              <Typography variant="body2">{file?.name}</Typography>
            </CardContent>
          </Card>
        )}
      />
    </Box>
  );
};

export default AccountUploadRecording;
