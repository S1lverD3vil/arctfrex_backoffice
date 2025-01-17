import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { convertKeyToSpaceSeparated } from "@/utils/strings";
import { useTranslations } from "next-intl";

export type DetailCardData = Record<
  string,
  string | number | boolean | null | undefined | Array<Record<string, any>>
>;

interface DetailCardProps {
  title: string;
  data: DetailCardData;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, data }) => {
  const t = useTranslations("Data");

  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Card key={index} variant="outlined" sx={{ marginBottom: 1 }}>
          <CardContent>
            {Object.entries(item).map(([subKey, subValue]) => (
              <Grid container key={subKey} marginBottom={1}>
                <Grid item xs={4} style={{ fontWeight: "bold" }}>
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
            ))}
          </CardContent>
        </Card>
      ));
    }

    return value;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} key={key}>
            <Grid container marginBottom={1}>
              <Grid item xs={4} style={{ fontWeight: "bold" }}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {convertKeyToSpaceSeparated(String(t(key)))}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography component="div" variant="body2">
                  {renderValue(value)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
};

export default DetailCard;
