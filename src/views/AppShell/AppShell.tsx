"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  Menu,
  ExitToApp,
  Language,
  Dashboard,
} from "@mui/icons-material";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { AppBar, Drawer } from "@/components";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { AppShellContextProvider, useAppShellContext } from "./AppShellContext";
import { ROLE_ID } from "@/constants/roles";
import { ListMenu } from "./ListMenu";
import { useAdminMenus } from "./useAdminMenus";
import { useCrmMenus } from "./useCrmMenus";
import { usePathname, useRouter } from "next/navigation";
import LocaleSwitcher from "@/components/LocalSwitcher/LocaleSwitcher";
import { useTranslations } from "next-intl";

type AppShellProps = React.PropsWithChildren<{}>;

function findHref(menu: Array<any>, pathname: string): any {
  for (let item of menu) {
    // Check if the current item has the 'href' and matches the target href
    if (item.href === pathname) {
      return item; // Return the object if href is found
    }

    // If 'menus' is present, perform a recursive search
    if (item.menus) {
      const found = findHref(item.menus, pathname);
      if (found) {
        return found; // Return if found in nested menus
      }
    }
  }

  // Return null if not found
  return null;
}

const AppShellWrappedContext = (props: AppShellProps) => {
  const { children } = props;

  const router = useRouter();
  const { userSession, clearUserSession: handleLogout } = useAppContext();
  const { title, setActiveMenu, setAppBarTitle } = useAppShellContext();
  const { menu: adminMenu } = useAdminMenus();
  const { menu: crmMenu } = useCrmMenus();
  const pathname = usePathname();
  const t = useTranslations("AppShell");

  const [open, setOpen] = useState<boolean>(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // render sidebar list menu, based on user role
  const listMenu = () => {
    // AdminBackoffice
    if (userSession.role_id === ROLE_ID.AdminBackoffice) {
      return <ListMenu menu={adminMenu} />;
    }

    // AdminCRM
    if (userSession.role_id === ROLE_ID.AdminCRM) {
      return <ListMenu menu={crmMenu} />;
    }

    // default menu for user
    return (
      <ListMenu
        menu={[
          {
            title: t("menu.dashboard"),
            href: "/dashboard",
            icon: <Dashboard />,
            onClick: () => router.push("/dashboard"),
          },
        ]}
      />
    );
  };

  useEffect(() => {
    const activeMenu = findHref([...adminMenu, ...crmMenu], pathname);
    if (!activeMenu) {
      return;
    }
    setActiveMenu(activeMenu);
    if (!Array.isArray(activeMenu)) setAppBarTitle(activeMenu?.title);
  }, [pathname]);

  // render without app shell
  const isHomePage = pathname === "/";
  const isUserPage = pathname.startsWith("/user");

  if (isHomePage || isUserPage) return children;

  // if user is not logged in, render children without app shell
  if (!userSession.role_id) return null;

  // if user is logged in, render children with app shell
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            px: [1.5],
            gap: 2.5,
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
          <Box width={120} height={60} position="relative">
            <Image src="/assets/images/logo.jpeg" alt="Logo" fill />
          </Box>
        </Toolbar>
        <Divider />
        <List component="nav" sx={{ flex: 1 }}>
          {listMenu()}
        </List>
        <Box
          sx={{
            display: "flex",
            px: 2,
            py: 1,
          }}
        >
          <LocaleSwitcher />
        </Box>
        <ListItemButton sx={{ flex: 0 }} onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={t("logout")} />
        </ListItemButton>
      </Drawer>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

const AppShell = (props: AppShellProps) => {
  const { children, ...restProps } = props;

  return (
    <AppShellContextProvider>
      <AppShellWrappedContext {...restProps}>{children}</AppShellWrappedContext>
    </AppShellContextProvider>
  );
};

export default AppShell;
