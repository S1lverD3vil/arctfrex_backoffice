"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard, Person, Paid } from "@mui/icons-material";
import { useTranslations } from "next-intl";

export const useCrmMenus = () => {
  const router = useRouter();
  const [openAccount, setOpenAccount] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const t = useTranslations("AppShell");

  const menu = [
    {
      title: t("menu.dashboard"), // Use translation
      href: "/dashboard",
      icon: <Dashboard />,
      onClick: () => router.push("/dashboard"),
    },
    {
      title: t("menu.setting_account"), // Use translation
      icon: <Person />,
      onClick: () => setOpenAccount(!openAccount),
      toggle: openAccount,
      menus: [
        {
          title: t("menu.manager"), // Use translation
          href: "/setting-account/manager",
          icon: undefined,
          onClick: () => router.push("/setting-account/manager"),
        },
        {
          title: t("menu.supervisor"), // Use translation
          href: "/setting-account/supervisor",
          icon: undefined,
          onClick: () => router.push("/setting-account/supervisor"),
        },
        {
          title: t("menu.market"), // Use translation
          href: "/setting-account/marketing",
          icon: undefined,
          onClick: () => router.push("/setting-account/marketing"),
        },
        {
          title: t("menu.referral"), // Use translation
          href: "/setting-account/referral",
          icon: undefined,
          onClick: () => router.push("/setting-account/referral"),
        },
      ],
    },
    {
      title: t("menu.setting_marketing"), // Use translation
      href: "/setting-marketing",
      icon: <Paid />,
      onClick: () => router.push("/setting-marketing"),
    },
    {
      title: t("menu.calculator"), // Use translation
      href: "/calculator",
      icon: <Paid />,
      onClick: () => router.push("/calculator"),
    },
    {
      title: t("menu.report"), // Use translation
      onClick: () => setOpenReport(!openReport),
      icon: <Paid />,
      toggle: openReport,
      menus: [
        {
          title: t("menu.manager"), // Use translation
          href: "/report/manager",
          icon: undefined,
          onClick: () => router.push("/report/manager"),
        },
        {
          title: t("menu.supervisor"), // Use translation
          href: "/report/supervisor",
          icon: undefined,
          onClick: () => router.push("/report/supervisor"),
        },
        {
          title: t("menu.market"), // Use translation
          href: "/report/market",
          icon: undefined,
          onClick: () => router.push("/report/market"),
        },
        {
          title: t("menu.referral"), // Use translation
          href: "/report/referral",
          icon: undefined,
          onClick: () => router.push("/report/referral"),
        },
      ],
    },
  ];

  return { menu };
};
