"use client";

import { ApprovalAction } from "@/components";
import { useWithdrawalPendingApproval } from "@/hooks/queries/backoffice/withdrawal/pending/approval";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { useRouter } from "next/navigation";
import { queryClient } from "@/hooks";
import { useWithdrawalDetailPageContext } from "./WithdrawalDetailPageContext";

const WithdrawalApprovalAction = () => {
  const { userSession } = useAppContext();
  const { withdrawalid } = useWithdrawalDetailPageContext();

  const router = useRouter();

  const {
    isPending: isApprovedPending,
    mutate: doWithdrawalPendingApprovalApproved,
  } = useWithdrawalPendingApproval({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["withdrawal-pending"] });

      router.push("/transactions/withdrawal");
    },
  });

  const {
    isPending: isRejectPending,
    mutate: doWithdrawalPendingApprovalReject,
  } = useWithdrawalPendingApproval({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["withdrawal-pending"] });

      router.push("/transactions/withdrawal");
    },
  });

  const isDisabled =
    !Boolean(withdrawalid) || isApprovedPending || isRejectPending;

  return (
    <ApprovalAction
      onApprove={() =>
        doWithdrawalPendingApprovalApproved({
          decision: "approved",
          withdrawalid: String(withdrawalid),
          userlogin: userSession?.name,
        })
      }
      isApprovedLoading={isApprovedPending}
      onReject={() =>
        doWithdrawalPendingApprovalReject({
          decision: "rejected",
          withdrawalid: String(withdrawalid),
          userlogin: userSession?.name,
        })
      }
      isRejectLoading={isRejectPending}
      isDisabled={isDisabled}
    />
  );
};

export default WithdrawalApprovalAction;
