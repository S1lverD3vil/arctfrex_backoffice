"use client";

import { useState } from "react";
import { ApprovalAction } from "@/components";
import { useDepositPendingApproval } from "@/hooks/queries/backoffice/deposit/pending/approval";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { useRouter } from "next/navigation";
import { queryClient } from "@/hooks";
import { useDepositDetailPageContext } from "./DepositDetailPageContext";
import { Box, Select, MenuItem, Button, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useUpdateDepositCreditTypeMutation } from "@/hooks/queries/backoffice/deposit/[depositid]/credit-type";

type DepositApprovalActionProps = {
  depositId: string;
};

const DepositApprovalAction = ({ depositId }: DepositApprovalActionProps) => {
  const { userSession } = useAppContext();
  const { depositid } = useDepositDetailPageContext();

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
    !Boolean(depositid) ||
    isApprovedPending ||
    isRejectPending ||
    isUpdateDepositCreditTypePending;

  return (
    <>
      <Box display="flex" gap={1}>
        <ApprovalAction
          onApprove={() =>
            doDepositPendingApprovalApproved({
              decision: "approved",
              depositid: String(depositid),
              deposit_type: depositType,
              userlogin: userSession?.name,
            })
          }
          isApprovedLoading={isApprovedPending}
          onReject={() =>
            doDepositPendingApprovalReject({
              decision: "rejected",
              depositid: String(depositid),
              deposit_type: depositType,
              userlogin: userSession?.name,
            })
          }
          isRejectLoading={isRejectPending}
          isDisabled={isDisabled}
        />
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
            <CircularProgress color="error" size={20} sx={{ margin: 0.1875 }} />
          )}
        </Button>
      </Box>

      <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
        <Select
          value={depositType}
          onChange={(e) => setDepositType(Number(e.target.value))}
          size="small"
          sx={{ width: "200px" }}
          disabled={isDisabled}
        >
          <MenuItem value={1}>Initial Margin</MenuItem>
          <MenuItem value={2}>Normal Deposit</MenuItem>
        </Select>
      </Box>
    </>
  );
};

export default DepositApprovalAction;
