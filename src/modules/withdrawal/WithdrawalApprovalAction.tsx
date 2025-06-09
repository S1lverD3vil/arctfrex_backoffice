"use client";

import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { useRouter } from "next/navigation";
import { queryClient } from "@/hooks";
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { useTranslations } from "next-intl";
import { useWorkflowApproverApproveRejectMutation } from "@/hooks/queries/backoffice/workflow-approver/approve-reject";

type WithdrawalApprovalActionProps = {
  withdrawalId: string;
  redirectTo?: string;
  showDepositType?: boolean;
  actions?: Array<"approve" | "reject">;
  role?: "fin" | "sett";
  level?: number;
};

export const WithdrawalApprovalAction = ({
  withdrawalId,
  redirectTo,
  actions = [],
  role,
  level,
}: WithdrawalApprovalActionProps) => {
  const { userSession } = useAppContext();

  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const t = useTranslations("Data");

  const router = useRouter();

  const {
    isPending: isWorkflowApproverApproveRejectPending,
    mutate: doWorkflowApproverApproveReject,
  } = useWorkflowApproverApproveRejectMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "/backoffice/deposit/pending/spa",
          "/backoffice/deposit/pending/multi",
        ],
      });

      if (redirectTo) {
        router.push(redirectTo);
        return;
      }

      router.back();
    },
  });

  const isDisabled =
    !Boolean(withdrawalId) || isWorkflowApproverApproveRejectPending;

  const handleConfirm = () => {
    if (!actionType) return;
    if (!level) return;

    if (actionType === "approve") {
      doWorkflowApproverApproveReject({
        document_id: withdrawalId,
        level,
        status: "approve",
        workflow_type: "withdrawal-approver",
      });
    } else if (actionType === "reject") {
      doWorkflowApproverApproveReject({
        document_id: withdrawalId,
        level,
        status: "reject",
        workflow_type: "withdrawal-approver",
      });
    }

    setModalOpen(false);
    setActionType(null);
  };

  const handleOpenModal = (type: "approve" | "reject") => {
    setActionType(type);
    setModalOpen(true);
  };

  return (
    <>
      <Box display="flex" gap={1}>
        {/* Approve */}
        {actions.includes("approve") && (
          <Button
            color="success"
            sx={{ minWidth: "100px" }}
            size="small"
            variant="contained"
            onClick={() => handleOpenModal("approve")}
            disabled={isDisabled}
          >
            {!isWorkflowApproverApproveRejectPending ? (
              t("approve")
            ) : (
              <CircularProgress
                color="error"
                size={20}
                sx={{ margin: 0.1875 }}
              />
            )}
          </Button>
        )}

        {/* Reject */}
        {actions.includes("reject") && (
          <Button
            color="error"
            sx={{ minWidth: "100px" }}
            size="small"
            variant="contained"
            onClick={() => handleOpenModal("reject")}
            disabled={isDisabled}
          >
            {!isWorkflowApproverApproveRejectPending ? (
              t("reject")
            ) : (
              <CircularProgress
                color="error"
                size={20}
                sx={{ margin: 0.1875 }}
              />
            )}
          </Button>
        )}
      </Box>

      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            maxWidth: 400,
            mx: "auto",
            mt: "20vh",
          }}
        >
          <Box mb={2}>
            <strong>{t("confirm_action")}</strong>
            <Box mt={1}>{t("are_you_sure_to", { to: actionType })}</Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              {t("cancel")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              disabled={isDisabled}
            >
              {t("confirm")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
