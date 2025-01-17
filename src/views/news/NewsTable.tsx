"use client";

import { Table } from "@/components";
import { queryClient } from "@/hooks";
import {
  News,
  useDeactiveNewsMutation,
  useGetNews,
  useUpdateNewsMutation,
} from "@/hooks/queries/backoffice/news";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const NewsTable = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetNews<undefined>({});
  const { mutateAsync: deactiveNews } = useDeactiveNewsMutation({});
  const { mutateAsync: updateNews } = useUpdateNewsMutation({});

  const columnsToShow: Array<keyof News> = ["news_title", "CreatedBy"];

  const handleRowClick = (row: News) => {
    const url = encodeURIComponent(row.news_title);

    router.push("/news/" + url);
  };

  const handleRowEdit = (row: News) => {
    const title = encodeURIComponent(row.news_title);

    const params = new URLSearchParams();
    params.set("title", title);

    router.push("/news" + "?" + params.toString());
  };

  const handleRowDeactive = async (row: News) => {
    const isActive = row.is_active;

    if (isActive) {
      await deactiveNews({ title: row.news_title });
      await queryClient.invalidateQueries({ queryKey: ["news"] });
      return;
    }

    await updateNews({
      payload: { ...row, is_active: true },
      config: { params: { title: row.news_title } },
    });

    await queryClient.invalidateQueries({ queryKey: ["news"] });
  };

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

    return (
      <Table
        data={data?.data || []}
        columns={columnsToShow}
        onRowClick={handleRowClick}
        onEdit={(row) => handleRowEdit(row)}
        onDeactive={(row) => handleRowDeactive(row)}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, data?.data]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {renderByStatus}
    </Box>
  );
};

export default NewsTable;
