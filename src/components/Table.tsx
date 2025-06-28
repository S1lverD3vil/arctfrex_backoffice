"use client";

import React from "react";
import _ from "lodash";
import { useTranslations } from "next-intl";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  tableCellClasses,
  Button,
  Switch,
  Box,
  Chip,
} from "@mui/material";
import { convertKeyToSpaceSeparated } from "@/utils/strings";

interface TableProps<T> {
  data: T[];
  columns: Array<keyof T>;
  onRowClick?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDeactive?: (row: T) => void;
  isTranslated?: boolean;
}

// custom styles for table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Table = <T extends Record<string, any>>({
  data,
  columns,
  onRowClick: handleRowClick,
  onEdit,
  onDeactive,
  isTranslated = true,
}: TableProps<T>) => {
  const isEditable = Boolean(onEdit);
  const isDeactiveable = Boolean(onDeactive);
  const t = useTranslations("Data");

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: T
  ) => {
    if (!onEdit) {
      return;
    }

    e.stopPropagation();
    onEdit(row);
  };

  const handleDeactive = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: T
  ) => {
    if (!onDeactive) {
      return;
    }

    e.stopPropagation();
    onDeactive(row);
  };

  const renderCell = (row: any, column: any) => {
    const value = row[column];

    if (column === "actions") {
      return value;
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "string") {
      if (column === "approval_status") {
        return (
          <Chip
            label={value}
            {...(value.toLowerCase() === "approved" && { color: "success" })}
            {...(value.toLowerCase() === "rejected" && { color: "error" })}
            {...(value.toLowerCase() === "pending" && { color: "warning" })}
          />
        );
      }

      return String(value);
    }

    if (typeof value === "function") {
      return value();
    }

    if (typeof value === "object") {
      return value?.value || "";
    }

    return value;
  };

  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={String(column)}
                style={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                {isTranslated
                  ? convertKeyToSpaceSeparated(String(t(column)))
                  : String(column)}
              </StyledTableCell>
            ))}
            {isEditable && (
              <StyledTableCell
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  zIndex: 1,
                }}
              >
                Edit
              </StyledTableCell>
            )}
            {isDeactiveable && (
              <StyledTableCell
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  zIndex: 1,
                }}
              >
                Enabled
              </StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!data.length ? (
            <Box component="p" px={2} sx={{ fontSize: "0.875rem" }}>
              No Records Found.
            </Box>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover
                style={{ cursor: "pointer" }}
                {...(handleRowClick && { onClick: () => handleRowClick(row) })}
              >
                {columns.map((column) => {
                  const isObject = _.isObject(row[column]);
                  const color = row[column]?.color;

                  return (
                    <StyledTableCell
                      key={String(column)}
                      {...(isObject && { color })}
                    >
                      {renderCell(row, column)}
                    </StyledTableCell>
                  );
                })}
                {isEditable && (
                  <StyledTableCell style={{ zIndex: 1, cursor: "pointer" }}>
                    <Button variant="text" onClick={(e) => handleEdit(e, row)}>
                      Edit
                    </Button>
                  </StyledTableCell>
                )}
                {isDeactiveable && (
                  <StyledTableCell style={{ zIndex: 1, cursor: "pointer" }}>
                    <Switch
                      checked={row.is_active}
                      onClick={(e) => handleDeactive(e, row)}
                    />
                  </StyledTableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
