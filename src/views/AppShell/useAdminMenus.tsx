"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dashboard,
  Person,
  Paid,
  Chat,
  Newspaper,
  Settings,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";

export const useAdminMenus = () => {
  const router = useRouter();
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openTransactions, setOpenTransactions] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const t = useTranslations("AppShell.menu");

  const menu = [
    {
      title: t("dashboard"),
      href: "/dashboard",
      icon: <Dashboard />,
      onClick: () => router.push("/dashboard"),
    },
    {
      title: t("customers"),
      onClick: () => setOpenCustomer(!openCustomer),
      icon: <Person />,
      toggle: openCustomer,
      menus: [
        {
          title: t("lead"),
          href: "/customer/lead",
          onClick: () => router.push("/customer/lead"),
        },
        {
          title: t("all"),
          href: "/customer/all",
          onClick: () => router.push("/customer/all"),
        },
        {
          title: t("accounts"),
          href: "/customer/account",
          onClick: () => router.push("/customer/account"),
        },
        {
          title: t("register"),
          href: "/customer/register",
          icon: undefined,
          onClick: () => router.push("/customer/register"),
        },
        {
          title: t("pin"),
          href: "/customer/pin",
          icon: undefined,
          onClick: () => router.push("/customer/pin"),
        },
      ],
    },
    {
      title: t("news"),
      icon: <Newspaper />,
      href: "/news",
      onClick: () => router.push("/news"),
    },
    {
      title: t("transactions"),
      onClick: () => setOpenReport(!openReport),
      icon: <Paid />,
      toggle: openReport,
      menus: [
        {
          title: t("deposit"),
          href: "/transactions/deposit",
          icon: undefined,
          onClick: () => router.push("/transactions/deposit"),
        },
        {
          title: t("withdraw"),
          href: "/transactions/withdrawal",
          icon: undefined,
          onClick: () => router.push("/transactions/withdrawal"),
        },
      ],
    },
    {
      title: t("report"),
      onClick: () => setOpenTransactions(!openTransactions),
      icon: <Paid />,
      toggle: openTransactions,
      menus: [
        {
          title: t("all"),
          href: "/report/all",
          icon: undefined,
          onClick: () => router.push("/report/all"),
        },
      ],
    },
    {
      title: t("setting"),
      onClick: () => setOpenSetting(!openSetting),
      icon: <Settings />,
      toggle: openSetting,
      menus: [
        {
          title: t("user"),
          href: "/setting/user",
          icon: undefined,
          onClick: () => router.push("/setting/user"),
        },
      ],
    },
    {
      title: t("live_chat"),
      icon: <Chat />,
      href: "/live-chat",
      onClick: () => router.push("/live-chat"),
    },
  ];

  return { menu };
};
