"use client";

import { useState } from "react";
import { useDepositPendingApproval } from "@/hooks/queries/backoffice/deposit/pending/approval";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { useRouter } from "next/navigation";
import { queryClient } from "@/hooks";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useUpdateDepositCreditTypeMutation } from "@/hooks/queries/backoffice/deposit/[depositid]/credit-type";
import { DepositTypeSelection } from "./DepositTypeSelection";

type DepositApprovalActionProps = {
  depositId: string;
  role?: "fin" | "sett";
  actions?: Array<"approve" | "reject" | "creditIn">;
};

export const DepositApprovalAction = ({
  depositId,
  role,
  actions = [],
}: DepositApprovalActionProps) => {
  const { userSession } = useAppContext();

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
      router.back();
    },
  });

  const isDisabled =
    !Boolean(depositId) ||
    isApprovedPending ||
    isRejectPending ||
    isUpdateDepositCreditTypePending;

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
            onClick={() => {
              doDepositPendingApprovalApproved({
                decision: "approved",
                depositid: String(depositId),
                deposit_type: depositType,
                userlogin: userSession?.name,
              });
            }}
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
            onClick={() => {
              doDepositPendingApprovalReject({
                decision: "rejected",
                depositid: String(depositId),
                deposit_type: depositType,
                userlogin: userSession?.name,
              });
            }}
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
            onClick={() => {
              doUpdateDepositCreditType({
                credit_type_locale_key: "CreditIn",
              });
            }}
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
    </>
  );
};
