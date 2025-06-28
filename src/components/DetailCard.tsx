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

    return cleanObject(removePrefix(data, "dom_"), [
      ...cleanObjectKeys,
      ..._.keys(data).filter((key) => key.startsWith("ktp_")),
    ]);
  }, [data, editMode]);

  const renderField = (
    key: string,
    value: any,
    parentKey: string | null = null
  ): React.ReactNode => {
    const fieldKey = parentKey ? `${parentKey}.${key}` : key;
    const field = _.get(fields, fieldKey);
    const formikValue = _.get(formik?.values, fieldKey);

    if (Array.isArray(value)) {
      return value.map((item, idx) => (
        <Box
          key={`${fieldKey}-${idx}`}
          sx={{ borderLeft: "2px solid #ddd", pl: 2, mb: 2 }}
        >
          {Object.entries(item).map(([childKey, childValue]) => (
            <Grid container marginBottom={1} key={childKey}>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {convertKeyToSpaceSeparated(String(t(childKey)))}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {renderField(childKey, childValue, `${fieldKey}[${idx}]`)}
              </Grid>
            </Grid>
          ))}
        </Box>
      ));
    }

    if (editMode) {
      if (field?.type === "image") {
        return (
          <Box display="flex" flexDirection="column" gap={1}>
            <FileUpload
              accept="image/jpeg,image/jpg,image/png"
              label="Upload Image"
              onUpload={(file) => field.onUpload(file, fieldKey)}
            />
            <Image src={formikValue} alt={key} />
          </Box>
        );
      }

      if (field?.type === "video") {
        return (
          <Box display="flex" flexDirection="column" gap={1}>
            <FileUpload
              accept="video/*"
              label="Upload Video"
              onUpload={(file) => field.onUpload(file, fieldKey)}
            />
            <Video src={formikValue} />
          </Box>
        );
      }

      if (["string", "number"].includes(typeof formikValue)) {
        return (
          <TextField
            size="small"
            fullWidth
            name={fieldKey}
            value={formikValue ?? ""}
            onChange={(e) => formik.setFieldValue(fieldKey, e.target.value)}
          />
        );
      }
    }

    if (field?.type === "image") {
      return (
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => downloadFile(value, `${key}.jpg`)}
          >
            Download
          </Button>
          <Image src={value} alt={key} />
        </Box>
      );
    }

    if (field?.type === "video") {
      return (
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => downloadFile(value, `${key}.mp4`)}
          >
            Download
          </Button>
          <Video src={value} />
        </Box>
      );
    }

    return (
      <Typography component="div" variant="body2">
        {String(value)}
      </Typography>
    );
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
