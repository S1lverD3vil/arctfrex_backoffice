"use client";

import { useState } from "react";
import { useDepositPendingApproval } from "@/hooks/queries/backoffice/deposit/pending/approval";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { useRouter } from "next/navigation";
import { queryClient } from "@/hooks";
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { useTranslations } from "next-intl";
import { useUpdateDepositCreditTypeMutation } from "@/hooks/queries/backoffice/deposit/[depositid]/credit-type";
import { DepositTypeSelection } from "./DepositTypeSelection";

type DepositApprovalActionProps = {
  depositId: string;
  redirectTo?: string;
  role?: "fin" | "sett";
  actions?: Array<"approve" | "reject" | "creditIn">;
};

export const DepositApprovalAction = ({
  depositId,
  redirectTo,
  role,
  actions = [],
}: DepositApprovalActionProps) => {
  const { userSession } = useAppContext();

  const [actionType, setActionType] = useState<
    "approve" | "reject" | "creditIn" | null
  >(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [depositType, setDepositType] = useState<number>(2);
  const t = useTranslations("Data");

  const router = useRouter();

  const {
    isPending: isApprovedPending,
    mutate: doDepositPendingApprovalApproved,
  } = useDepositPendingApproval({
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

  const { isPending: isRejectPending, mutate: doDepositPendingApprovalReject } =
    useDepositPendingApproval({
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

  const isDisabled =
    !Boolean(depositId) ||
    isApprovedPending ||
    isRejectPending ||
    isUpdateDepositCreditTypePending;

  const handleConfirm = () => {
    if (!actionType) return;

    if (actionType === "approve") {
      doDepositPendingApprovalApproved({
        decision: "approved",
        depositid: String(depositId),
        deposit_type: depositType,
        userlogin: userSession?.name,
      });
    } else if (actionType === "reject") {
      doDepositPendingApprovalReject({
        decision: "rejected",
        depositid: String(depositId),
        deposit_type: depositType,
        userlogin: userSession?.name,
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
            // onClick={() => {

            //   doDepositPendingApprovalApproved({
            //     decision: "approved",
            //     depositid: String(depositId),
            //     deposit_type: depositType,
            //     userlogin: userSession?.name,
            //   });
            // }}
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
            // onClick={() => {
            //   doDepositPendingApprovalReject({
            //     decision: "rejected",
            //     depositid: String(depositId),
            //     deposit_type: depositType,
            //     userlogin: userSession?.name,
            //   });
            // }}
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

        {/* Credit In / Out */}
        {actions.includes("creditIn") && (
          <Button
            color="info"
            sx={{ minWidth: "100px" }}
            size="small"
            variant="contained"
            onClick={() => handleOpenModal("creditIn")}
            // onClick={() => {
            //   doUpdateDepositCreditType({
            //     credit_type_locale_key: "CreditIn",
            //   });
            // }}
            disabled={isDisabled}
          >
            {!isApprovedPending || isRejectPending ? (
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

      <DepositTypeSelection
        depositType={depositType}
        setDepositType={setDepositType}
        isDisabled={isDisabled}
      />

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
