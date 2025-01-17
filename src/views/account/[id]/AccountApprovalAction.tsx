"use client";

import { ApprovalAction } from "@/components";
import { useAccountPendingApproval } from "@/hooks/queries/backoffice/account/pending/approval";
import { useAppContext } from "@/contexts/AppContext/AppContext";
import { useRouter } from "next/navigation";
import { queryClient } from "@/hooks";
import { useAccountDetailPageContext } from "./AccountDetailPageContext";

const AccountApprovalAction = () => {
  const { userSession } = useAppContext();
  const { accountid } = useAccountDetailPageContext();

  const router = useRouter();

  const {
    isPending: isApprovedPending,
    mutate: doAccountPendingApprovalApproved,
  } = useAccountPendingApproval({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["account-pending"] });

      router.push("/customer/account");
    },
  });

  const { isPending: isRejectPending, mutate: doAccountPendingApprovalReject } =
    useAccountPendingApproval({
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["account-pending"] });

        router.push("/customer/account");
      },
    });

  const isDisabled =
    !Boolean(accountid) || isApprovedPending || isRejectPending;

  return (
    <ApprovalAction
      onApprove={() =>
        doAccountPendingApprovalApproved({
          decision: "approved",
          accountid: String(accountid),
          userlogin: userSession?.name,
        })
      }
      isApprovedLoading={isApprovedPending}
      onReject={() =>
        doAccountPendingApprovalReject({
          decision: "rejected",
          accountid: String(accountid),
          userlogin: userSession?.name,
        })
      }
      isRejectLoading={isRejectPending}
      isDisabled={isDisabled}
    />
  );
};

export default AccountApprovalAction;
