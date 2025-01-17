"use client";

import React, { useState } from "react";
import { Box, Drawer, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { ConversationAvailable, ConversationDetail } from ".";
import { useConversationContext } from "./ConversationContext";
import ConversationActive from "./ConversationActive";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      flex={1}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </Box>
  );
}

const ConversationLayout = () => {
  const { session_id: sessionId, setSessionId } = useConversationContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSessionId("");
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Conversation Available" {...a11yProps(0)} />
          <Tab label="Conversation Active" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 114px)",
        }}
      >
        <CustomTabPanel value={value} index={0}>
          <ConversationAvailable setSessionId={setSessionId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ConversationActive setSessionId={setSessionId} />
        </CustomTabPanel>

        {/* Right Side: Conversation Detail */}
        {!isMobile ? (
          // Sidebar for larger screens
          sessionId && (
            <Box
              sx={{
                width: "30%",
                flex: 1,
                bgcolor: "#fff",
                overflowY: "auto",
                borderLeft: "1px solid #ddd",
              }}
            >
              <ConversationDetail
                sessionId={sessionId}
                setSessionId={setSessionId}
              />
            </Box>
          )
        ) : (
          // Drawer for smaller screens
          <Drawer
            anchor="right"
            open={!!sessionId}
            onClose={() => setSessionId("")}
            PaperProps={{
              sx: {
                width: "100%",
                maxWidth: "400px",
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              {sessionId ? (
                <ConversationDetail
                  sessionId={sessionId}
                  setSessionId={setSessionId}
                />
              ) : (
                <em>Select a conversation to view details</em>
              )}
            </Box>
          </Drawer>
        )}
      </Box>
    </Box>
  );
};

export default ConversationLayout;
