"use client";

import { useState } from "react";
import { useWithdrawalPendingApproval } from "@/hooks/queries/backoffice/withdrawal/pending/approval";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { useRouter } from "next/navigation";
import { queryClient } from "@/hooks";
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { useTranslations } from "next-intl";

type WithdrawalApprovalActionProps = {
  withdrawalId: string;
  redirectTo?: string;
  role?: "fin" | "sett";
  actions?: Array<"approve" | "reject" | "creditIn">;
};

export const WithdrawalApprovalAction = ({
  withdrawalId,
  redirectTo,
  role,
  actions = [],
}: WithdrawalApprovalActionProps) => {
  const { userSession } = useAppContext();

  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const t = useTranslations("Data");

  const router = useRouter();

  const {
    isPending: isApprovedPending,
    mutate: doWithdrawalPendingApprovalApproved,
  } = useWithdrawalPendingApproval({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "/backoffice/withdrawal/pending/spa",
          "/backoffice/withdrawal/pending/multi",
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
    isPending: isRejectPending,
    mutate: doWithdrawalPendingApprovalReject,
  } = useWithdrawalPendingApproval({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "/backoffice/withdrawal/pending/spa",
          "/backoffice/withdrawal/pending/multi",
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
    !Boolean(withdrawalId) || isApprovedPending || isRejectPending;

  const handleConfirm = () => {
    if (!actionType) return;

    if (actionType === "approve") {
      doWithdrawalPendingApprovalApproved({
        decision: "approved",
        withdrawalid: String(withdrawalId),
        userlogin: userSession?.name,
      });
    } else if (actionType === "reject") {
      doWithdrawalPendingApprovalReject({
        decision: "rejected",
        withdrawalid: String(withdrawalId),
        userlogin: userSession?.name,
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
            {!isApprovedPending || isRejectPending ? (
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
            {!isApprovedPending || isRejectPending ? (
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
