"use client";

import { useState } from "react";
import { ApprovalAction } from "@/components";
import { useDepositPendingApproval } from "@/hooks/queries/backoffice/deposit/pending/approval";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { useRouter } from "next/navigation";
import { queryClient } from "@/hooks";
import { useDepositDetailPageContext } from "./DepositDetailPageContext";
import { Box, Select, MenuItem } from "@mui/material";

const DepositApprovalAction = () => {
  const { userSession } = useAppContext();
  const { depositid } = useDepositDetailPageContext();
  const [depositType, setDepositType] = useState<number>(2);

  const router = useRouter();

  const {
    isPending: isApprovedPending,
    mutate: doDepositPendingApprovalApproved,
  } = useDepositPendingApproval({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["deposit-pending"] });

      router.push("/transactions/deposit");
    },
  });

  const { isPending: isRejectPending, mutate: doDepositPendingApprovalReject } =
    useDepositPendingApproval({
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["deposit-pending"] });

        router.push("/transactions/deposit");
      },
    });

  const isDisabled =
    !Boolean(depositid) || isApprovedPending || isRejectPending;

  return (
    <>
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
          <MenuItem value={3}>Credit In</MenuItem>
        </Select>
      </Box>
    </>
  );
};

export default DepositApprovalAction;
