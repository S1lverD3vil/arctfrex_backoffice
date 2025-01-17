"use client";

import React, { useMemo } from "react";
import _ from "lodash";
import { Typography, CircularProgress, Box } from "@mui/material";
import DetailCard, { DetailCardData } from "@/components/DetailCard";
import { useGetNews } from "@/hooks/queries/backoffice/news";
import { cleanObject } from "@/utils/objects";

type NewsDetailProps = React.PropsWithChildren<{
  title: string;
}>;

const NewsDetail = (props: NewsDetailProps) => {
  const { title } = props;

  const { data, isLoading, isError } = useGetNews({
    params: { title: decodeURIComponent(title) },
    enabled: !!title,
  });

  const detailData = useMemo(
    () => ({
      ...cleanObject(data?.data),
    }),
    [data]
  );

  const renderByStatus = useMemo(() => {
    if (isLoading)
      return (
        <Box
          sx={{
            minHeight: "calc(100vh - 100px);",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );

    if (isError) return <Typography>Error loading data</Typography>;

    if (detailData)
      return (
        <DetailCard
          title="News"
          data={detailData as unknown as DetailCardData}
        />
      );

    return <Typography>No data found</Typography>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  return <>{renderByStatus}</>;
};

export default NewsDetail;
