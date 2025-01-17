"use client";

import { Box, Button, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";

type ApprovalActionProps = React.PropsWithChildren<{
  onApprove: () => void;
  isApprovedLoading: boolean;
  onReject: () => void;
  isRejectLoading: boolean;
  isDisabled: boolean;
}>;

const ApprovalAction = (props: ApprovalActionProps) => {
  const {
    onApprove: handleApprove,
    isApprovedLoading = false,
    onReject: handleReject,
    isRejectLoading = false,
    isDisabled,
  } = props;
  const t = useTranslations("Page.Customer.Account.Slug");

  return (
    <Box display="flex" gap={1}>
      <Button
        color="success"
        onClick={handleApprove}
        sx={{ width: "100px" }}
        disabled={isDisabled}
        size="small"
        variant="contained"
      >
        {!isApprovedLoading ? (
          t("approve")
        ) : (
          <CircularProgress color="success" size={20} sx={{ margin: 0.1875 }} />
        )}
      </Button>
      <Button
        color="error"
        onClick={handleReject}
        sx={{ width: "100px" }}
        disabled={isDisabled}
        size="small"
        variant="contained"
      >
        {!isRejectLoading ? (
          t("reject")
        ) : (
          <CircularProgress color="error" size={20} sx={{ margin: 0.1875 }} />
        )}
      </Button>
    </Box>
  );
};

export default ApprovalAction;
