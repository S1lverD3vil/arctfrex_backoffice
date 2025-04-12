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

const WPBMenu = () => {
  const router = useRouter();
  const { setAppBarTitle } = useAppShellContext();

  const [items, setItems] = useState([
    {
      title: "WPB",
      icon: <DashboardIcon />,
      toggle: false,
      items: [
        {
          title: "Request WP Call",
          href: "/wpb/request-wp-call",
        },
        {
          title: "List WP Call",
          href: "/wpb/list-wp-call",
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

export default WPBMenu;
