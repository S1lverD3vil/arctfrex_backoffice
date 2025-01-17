"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import CustomerProfile from "./CustomerProfile";
import CustomerAddress from "./CustomerAddress";
import CustomerEmployment from "./CustomerEmployment";
import CustomerFinance from "./CustomerFinance";
import CustomerEmergencyContact from "./CustomerEmergencyContact";
import { useTranslations } from "next-intl";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type AccountTabsProps = React.PropsWithChildren<{
  userId: string;
}>;

const AccountTabs = (props: AccountTabsProps) => {
  const { userId } = props;

  const [value, setValue] = useState(0);
  const t = useTranslations("Page.Customer.Account.Slug");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="account detail">
          <Tab label={t("profile")} {...a11yProps(0)} />
          <Tab label={t("address")} {...a11yProps(1)} />
          <Tab label={t("employment")} {...a11yProps(2)} />
          <Tab label={t("finance")} {...a11yProps(3)} />
          <Tab label={t("emergency_contact")} {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CustomerProfile userId={userId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CustomerAddress userId={userId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CustomerEmployment userId={userId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CustomerFinance userId={userId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <CustomerEmergencyContact userId={userId} />
      </CustomTabPanel>
    </Box>
  );
};

export default AccountTabs;
