// components/FileUpload.tsx
"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import {
  Clear,
  CloudUpload,
  UploadFile as MUIUploadFile,
} from "@mui/icons-material";
import { ChangeEvent, useState } from "react";

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

export interface FileUploadProps {
  accept?: string;
  label?: string;
  disabled?: boolean;
  onUpload: (file: File) => void;
  renderPreview?: (
    file: File,
    url: string,
    handleClear: any
  ) => React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = "*/*",
  label = "Upload",
  disabled = false,
  onUpload,
  renderPreview,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    onUpload(file);
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <Box>
      <Button
        component="label"
        variant="contained"
        disabled={disabled}
        startIcon={<CloudUpload />}
      >
        {label}
        <VisuallyHiddenInput
          type="file"
          accept={accept}
          onChange={handleUpload}
        />
      </Button>

      {previewUrl && (
        <Card sx={{ mt: 2, maxWidth: 400 }}>
          {renderPreview && renderPreview(file!, previewUrl, handleClear)}
        </Card>
      )}
    </Box>
  );
};

export default FileUpload;
