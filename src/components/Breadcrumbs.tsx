import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import NextLink from "next/link";

interface BreadcrumbItem {
  text: string;
  linkTo: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Link
            component={NextLink}
            key={item.linkTo}
            color="inherit"
            href={item.linkTo}
            sx={{
              cursor: "pointer",
              textDecoration: isLast ? "underline" : "none",
            }}
          >
            {item.text}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
