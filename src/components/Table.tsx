"use client";

import React from "react";
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
} from "@mui/material";
import { convertKeyToSpaceSeparated, renderCell } from "@/utils/strings";
import { Edit } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import _ from "lodash";

interface TableProps<T> {
  data: T[];
  columns: Array<keyof T>;
  onRowClick?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDeactive?: (row: T) => void;
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
                {convertKeyToSpaceSeparated(String(t(column)))}
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
          {data.map((row, rowIndex) => (
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
                    {renderCell(row[column])}
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
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
