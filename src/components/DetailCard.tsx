import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { convertKeyToSpaceSeparated } from "@/utils/strings";
import { useTranslations } from "next-intl";
import { cleanObject, cleanObjectKeys, removePrefix } from "@/utils/objects";
import _ from "lodash";

export type DetailCardData = Record<
  string,
  string | number | boolean | null | undefined | Array<Record<string, any>>
>;

interface DetailCardProps {
  title: string;
  data: DetailCardData;
  editMode?: boolean;
  formik?: any;
}

const DetailCard: React.FC<DetailCardProps> = ({
  title,
  data,
  editMode = false,
  formik,
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
