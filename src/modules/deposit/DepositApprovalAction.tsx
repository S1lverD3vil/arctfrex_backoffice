"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { queryClient } from "@/hooks";
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { useTranslations } from "next-intl";
import { useUpdateDepositCreditTypeMutation } from "@/hooks/queries/backoffice/deposit/[depositid]/credit-type";
import { DepositTypeSelection } from "./DepositTypeSelection";
import { useDepositPendingDetail } from "@/hooks/queries/backoffice/deposit/pending/detail";
import {
  useWorkflowApproverApproveRejectMutation,
  WorkflowDepositType,
} from "@/hooks/queries/backoffice/workflow-approver/approve-reject";

type DepositApprovalActionProps = {
  depositId: string;
  redirectTo?: string;
  showDepositType?: boolean;
  actions?: Array<"approve" | "reject" | "creditIn">;
  role?: "fin" | "sett";
  level?: number;
};

export const DepositApprovalAction = ({
  depositId,
  redirectTo,
  showDepositType = false,
  actions = [],
  role,
  level,
}: DepositApprovalActionProps) => {
  const router = useRouter();
  const [actionType, setActionType] = useState<
    "approve" | "reject" | "creditIn" | null
  >(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [depositType, setDepositType] =
    useState<WorkflowDepositType>("normal-deposit");
  const t = useTranslations("Data");

  const { data } = useDepositPendingDetail({
    depositid: depositId,
  });

  const {
    isPending: isUpdateDepositCreditTypePending,
    mutate: doUpdateDepositCreditType,
  } = useUpdateDepositCreditTypeMutation({
    depositId,
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
    !Boolean(depositId) ||
    isWorkflowApproverApproveRejectPending ||
    isUpdateDepositCreditTypePending;

  const handleConfirm = () => {
    if (!actionType) return;
    if (!level) return;

    if (actionType === "approve") {
      doWorkflowApproverApproveReject({
        document_id: depositId,
        level,
        status: "approve",
        workflow_type: "deposit-approver",
        deposit_type: depositType,
      });
    } else if (actionType === "reject") {
      doWorkflowApproverApproveReject({
        document_id: depositId,
        level,
        status: "reject",
        workflow_type: "deposit-approver",
        deposit_type: depositType,
      });
    } else if (actionType === "creditIn") {
      doUpdateDepositCreditType({
        credit_type_locale_key: "CreditIn",
      });
    }

    setModalOpen(false);
    setActionType(null);
  };

  const handleOpenModal = (type: "approve" | "reject" | "creditIn") => {
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

        {/* Credit In / Out */}
        {actions.includes("creditIn") && (
          <Button
            color="info"
            sx={{ minWidth: "100px" }}
            size="small"
            variant="contained"
            onClick={() => handleOpenModal("creditIn")}
            disabled={isDisabled}
          >
            {!isWorkflowApproverApproveRejectPending ? (
              t("credit_in")
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

      {showDepositType && (
        <DepositTypeSelection
          depositType={depositType}
          setDepositType={setDepositType}
          isDisabled={isDisabled}
        />
      )}

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
