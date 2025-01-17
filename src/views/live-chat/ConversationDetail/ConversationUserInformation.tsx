"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  Typography,
  AccordionActions,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ConversationSession } from "@/hooks/queries/backoffice/conversations/:sessionId";
import moment from "moment";
import { useConversationContext } from "../ConversationContext";
import { useAppContext } from "@/contexts/AppContext/AppContext";

interface ConversationUserInformationProps {
  session?: ConversationSession;
}

const ConversationUserInformation: React.FC<
  ConversationUserInformationProps
> = ({ session }) => {
  const { userSession } = useAppContext();
  const {
    session_id: sessionId,
    doConversationSessionIdEnd,
    doConversationSessionIdTake,
  } = useConversationContext();

  const accessToken = userSession.access_token;
  const backOfficeUserId = userSession?.userid;

  // Helper function to render user information rows
  const renderInfoRows = (info: { label: string; value?: string }[]) => {
    return info.map(({ label, value }, index) => (
      <Typography key={index} sx={{ fontSize: "14px", mb: 1 }}>
        <b>{label}:</b> {value || "N/A"}
      </Typography>
    ));
  };

  const leftColumnInfo = [
    { label: "Name", value: session?.user.customer_name },
    { label: "Email", value: session?.user.email },
    { label: "Phone", value: session?.user.mobilephone },
  ];

  const rightColumnInfo = [
    { label: "Device", value: session?.user.device },
    { label: "Device ID", value: session?.user.device_id },
    {
      label: "Session Expiration",
      value: moment(session?.user.session_expiration).format(
        "DD-MM-YYYY HH:mm:ss"
      ),
    },
  ];

  return (
    <Box position="relative">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="user-info-content"
          id="user-info-header"
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Typography>User Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              {renderInfoRows(leftColumnInfo)}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderInfoRows(rightColumnInfo)}
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              doConversationSessionIdEnd({ sessionId, accessToken })
            }
          >
            Close
          </Button>
          {backOfficeUserId !== String(session?.backoffice_user_id) && (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                doConversationSessionIdTake({ sessionId, accessToken })
              }
            >
              Take
            </Button>
          )}
        </AccordionActions>
      </Accordion>
    </Box>
  );
};

export default ConversationUserInformation;
