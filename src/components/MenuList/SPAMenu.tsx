"use client";

import React, { useState } from "react";
import { ListItemButton, ListItemText, List } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppShellContext } from "@/views/AppShell/AppShellContext";

const SPAMenu = () => {
  const router = useRouter();
  const { pathname, setAppBarTitle } = useAppShellContext();

  const [items, setItems] = useState([
    {
      title: "SPA",
      icon: <DashboardIcon />,
      toggle: false,
      items: [
        {
          title: "Settlement",
          toggle: false,
          items: [
            {
              title: "Request Deposit",
              href: "/spa/settlement/request-deposit",
              color: "orange",
            },
            {
              title: "Request Withdrawal",
              href: "/spa/settlement/request-withdrawal",
              color: "blue",
            },
            {
              title: "Credit Out",
              href: "/spa/settlement/credit-out",
              color: "red",
            },
          ],
        },
        {
          title: "Finance",
          items: [
            {
              title: "Request Deposit",
              href: "/spa/finance/request-deposit",
              color: "orange",
            },
            {
              title: "Request Withdrawal",
              href: "/spa/finance/request-withdrawal",
              color: "blue",
            },
            {
              title: "Credit In",
              href: "/spa/finance/credit-in",
              color: "red",
            },
          ],
        },
        {
          title: "Report",
          items: [
            { title: "Deposit", href: "/spa/report/deposit", color: "orange" },
            {
              title: "Withdrawal",
              href: "/spa/report/withdrawal",
              color: "blue",
            },
          ],
        },
      ],
    },
  ]);

  const toggleMenu = (menuItems: any[], title: string): any[] => {
    return menuItems.map((item) => {
      if (item.title === title) {
        return { ...item, toggle: !item.toggle }; // Toggle the current item
      } else if (item.items) {
        return { ...item, items: toggleMenu(item.items, title) }; // Recursively update children
      }
      return item;
    });
  };

  const handleClick = (item: any) => {
    if (item.href) {
      setAppBarTitle(item.title);
      router.push(item.href);
      return;
    }

    setItems((prevItems) => toggleMenu(prevItems, item.title));
  };

  const renderItems = (item: any, level: number) => {
    if (!item.items) return null;

    const newLevel = level + 1;

    return (
      <Collapse in={item.toggle} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.items.map((subItem: any) => (
            <React.Fragment key={subItem.title}>
              <ListItemButton
                onClick={() => handleClick(subItem)}
                sx={{ pl: newLevel * 2 }}
                selected={pathname === subItem.href}
              >
                <ListItemText primary={subItem.title} />
                {subItem.items ? (
                  subItem.toggle ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )
                ) : null}
              </ListItemButton>
              {renderItems(subItem, newLevel)}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    );
  };

  return (
    <List>
      {items.map((item) => (
        <React.Fragment key={item.title}>
          <ListItemButton onClick={() => handleClick(item)} sx={{ pl: 2 }}>
            <ListItemText primary={item.title} />
            {item.items ? (
              item.toggle ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )
            ) : null}
          </ListItemButton>
          {renderItems(item, 1)}
        </React.Fragment>
      ))}
    </List>
  );
};

export default SPAMenu;
