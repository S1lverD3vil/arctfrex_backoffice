"use client";

import React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import { Collapse } from "@mui/material";
import { useAdminMenus } from "./useAdminMenus";
import { useAppShellContext } from "./AppShellContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

type ListMenuByRolesProps = Partial<ReturnType<typeof useAdminMenus>>;

export const ListMenu = (props: ListMenuByRolesProps) => {
  const { menu } = props;
  const { setAppBarTitle } = useAppShellContext();

  return (
    <React.Fragment>
      {menu?.map((menuItem) => (
        <React.Fragment key={menuItem.title}>
          <ListItemButton
            key={menuItem.title}
            onClick={() => {
              menuItem.onClick();
              menuItem?.href && setAppBarTitle(menuItem.title);
            }}
          >
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.title} />
            {menuItem?.menus && menuItem.menus.length ? (
              menuItem?.toggle ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItemButton>
          {menuItem?.menus && menuItem.menus.length && (
            <Collapse in={menuItem?.toggle} unmountOnExit>
              {menuItem.menus?.map((menuItemItem) => (
                <List component="div" disablePadding key={menuItemItem.title}>
                  <ListItemButton
                    sx={{ pl: 9 }}
                    onClick={() => {
                      menuItemItem.onClick();
                      menuItemItem?.href && setAppBarTitle(menuItemItem.title);
                    }}
                  >
                    {menuItemItem?.icon && (
                      <ListItemIcon>{menuItemItem?.icon}</ListItemIcon>
                    )}
                    <ListItemText primary={menuItemItem.title} />
                  </ListItemButton>
                </List>
              ))}
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
