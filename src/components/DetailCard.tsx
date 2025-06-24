import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { convertKeyToSpaceSeparated } from "@/utils/strings";
import { useTranslations } from "next-intl";
import { cleanObject, cleanObjectKeys, removePrefix } from "@/utils/objects";
import _ from "lodash";
import { FileUpload, Image } from "@/components";
import Video from "./Video";
import { Download as DownloadIcon } from "@mui/icons-material";
import { downloadFile } from "@/utils/download";

export type DetailCardData = Record<
  string,
  string | number | boolean | null | undefined | Array<Record<string, any>>
>;

interface DetailCardProps {
  title: string;
  data: DetailCardData;
  editMode?: boolean;
  formik?: any;
  fields?: Record<string, any>;
}

const DetailCard: React.FC<DetailCardProps> = ({
  title,
  data,
  editMode = false,
  formik,
  fields = {},
}) => {
  const t = useTranslations("Data");

  const filteredData = useMemo(() => {
    if (editMode) return cleanObject(data);

    return cleanObject(
      removePrefix(data, "dom_"), // remove dom_ prefix
      [
        ...cleanObjectKeys,
        ..._.keys(data).filter((key) => key.startsWith("ktp_")),
      ]
    );
  }, [data, editMode]);

  const renderField = (key: string, value: any) => {
    if (Array.isArray(value)) {
      return value.map((item, index) =>
        Object.entries(item).map(([subKey, subValue]) => (
          <Grid container key={subKey} marginBottom={1}>
            <Grid item xs={4}>
              <Typography
                variant="body2"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {convertKeyToSpaceSeparated(String(t(subKey)))}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography component="div" variant="body2">
                {subValue as string}
              </Typography>
            </Grid>
          </Grid>
        ))
      );
    }

    const field = fields[key];

    // EDIT MODE
    if (editMode && field && field.type === "image") {
      return (
        <Box display="flex" flexDirection="column" gap={1}>
          <FileUpload
            accept="image/jpeg,image/jpg,image/png"
            label="Upload Image"
            onUpload={field.onUpload}
          />
          <Image src={value} alt="Selfie" />
        </Box>
      );
    }

    if (editMode && field && field.type === "video") {
      return (
        <Box display="flex" flexDirection="column" gap={1}>
          <FileUpload
            accept="video/*"
            label="Upload Video"
            onUpload={field.onUpload}
          />
          <Video src={formik.values[key]} />
        </Box>
      );
    }

    if (editMode && ["string", "number"].includes(typeof formik.values[key])) {
      return (
        <TextField
          size="small"
          fullWidth
          name={key}
          value={formik.values[key] ?? ""}
          onChange={(e) => formik.setFieldValue(key, e.target.value)}
        />
      );
    }

    if (field && field.type === "image") {
      return (
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {
              const url = formik.values[key]; // this could be a blob or remote URL
              downloadFile(url, key); // change filename as needed
            }}
          >
            Download
          </Button>
          <Image src={value} alt={key} />
        </Box>
      );
    }

    if (field && field.type === "video") {
      return (
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {
              const url = formik.values[key]; // this could be a blob or remote URL
              downloadFile(url, key); // change filename as needed
            }}
          >
            Download
          </Button>
          <Video src={value} />
        </Box>
      );
    }

    // NOT EDIT MODE
    return value;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        {Object.entries(filteredData).map(([key, value]) => (
          <Grid item xs={12} key={key}>
            <Grid container marginBottom={1}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {convertKeyToSpaceSeparated(String(t(key)))}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {renderField(key, value)}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
};

export default DetailCard;
