"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
  Dashboard as DashboardIcon,
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
  styled,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Drawer,
  useTheme,
} from "@mui/material";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { AppShellContextProvider, useAppShellContext } from "./AppShellContext";
import { GROUP_ROLES } from "@/constants/roles";
import { ListMenu } from "./ListMenu";
import { useAdminMenus } from "./useAdminMenus";
import { useCrmMenus } from "./useCrmMenus";
import { usePathname, useRouter } from "next/navigation";
import LocaleSwitcher from "@/components/LocalSwitcher/LocaleSwitcher";
import { useTranslations } from "next-intl";
import {
  APUPPTMenu,
  CRMMenu,
  CustomerServiceMenu,
  ManagementAccountMenu,
  MultiMenu,
  SPAMenu,
  WPBMenu,
} from "@/components/MenuList";

type AppShellProps = React.PropsWithChildren<{}>;

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const AppShellWrappedContext = (props: AppShellProps) => {
  const { children } = props;

  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const t = useTranslations("AppShell");
  const { userSession, clearUserSession: handleLogout } = useAppContext();
  const { appBarTitle, setActiveMenu, setAppBarTitle } = useAppShellContext();
  const { menu: adminMenu } = useAdminMenus();
  const { menu: crmMenu } = useCrmMenus();

  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    const activeMenu = findHref([...adminMenu, ...crmMenu], pathname);
    if (!activeMenu) {
      return;
    }
    setActiveMenu(activeMenu);
    if (!Array.isArray(activeMenu)) setAppBarTitle(activeMenu?.title);
  }, [pathname]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // render sidebar list menu, based on user role
  // const listMenu = () => {
  //   // AdminBackoffice
  //   if (userSession.role_id === GROUP_ROLES.AdminBackoffice) {
  //     return <ListMenu menu={adminMenu} />;
  //   }

  //   // default menu for user
  //   return (
  //     <ListMenu
  //       menu={[
  //         {
  //           title: t("menu.dashboard"),
  //           href: "/dashboard",
  //           icon: <DashboardIcon />,
  //           onClick: () => router.push("/dashboard"),
  //         },
  //       ]}
  //     />
  //   );
  // };

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
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {appBarTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box width={120} height={60} position="relative">
            <Image src="/assets/images/logo.jpeg" alt="Logo" fill />
          </Box>

          <IconButton onClick={toggleDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List component="nav" sx={{ flex: 1 }}>
          <SPAMenu />
          <Divider />
          <MultiMenu />
          <Divider />
          <ManagementAccountMenu />
          <Divider />
          <WPBMenu />
          <Divider />
          <APUPPTMenu />
          <Divider />
          <CustomerServiceMenu />
          <Divider />
          <CRMMenu />
          {/* {listMenu()} */}
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
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={t("logout")} />
        </ListItemButton>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
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
