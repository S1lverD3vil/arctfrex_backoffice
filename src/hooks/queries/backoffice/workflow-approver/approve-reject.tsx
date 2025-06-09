import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "@/libs/axios";
import { useAppContext } from "@/contexts/AppContext/AppContext";

const ENDPOINT = "/backoffice/workflow-approver/approve-reject";

type WorkflowType = "withdrawal-approver" | "deposit-approver";
type WorkflowStatus = "approve" | "reject" | "pending";
export type WorkflowDepositType = "initial-margin" | "normal-deposit";

const WorkflowStatusMap: Record<WorkflowStatus, number> = {
  approve: 1,
  reject: 2,
  pending: 3,
};

export const WorkflowDepositTypeMap: Record<WorkflowDepositType, number> = {
  "initial-margin": 1,
  "normal-deposit": 2,
};

interface BaseWorkflowApproverRequest {
  document_id: string;
  level: number;
  status: WorkflowStatus;
}

export type WorkflowApproverApproveRejectRequest =
  | (BaseWorkflowApproverRequest & {
      workflow_type: "deposit-approver";
      deposit_type: WorkflowDepositType;
    })
  | (BaseWorkflowApproverRequest & {
      workflow_type: "withdrawal-approver";
    });

export interface WorkflowApproverApproveRejectResponse {
  message: string;
  data: WorkflowApproverApproveRejectResponseData;
  time: string;
}

interface WorkflowApproverApproveRejectResponseData {
  document_id: string;
  approve_status: string;
}

// https://arctfrex.apidog.io/api-16761561
export const useWorkflowApproverApproveRejectMutation = (
  options: UseMutationOptions<
    WorkflowApproverApproveRejectResponse,
    Error,
    WorkflowApproverApproveRejectRequest
  >
) => {
  const { userSession } = useAppContext();

  return useMutation({
    mutationFn: async (payload) => {
      const isWorkflowDepositApprover =
        payload.workflow_type === "deposit-approver";

      const { data } = await axios.post<WorkflowApproverApproveRejectResponse>(
        ENDPOINT,
        {
          ...payload,
          status: WorkflowStatusMap[payload.status],
          ...{
            deposit_type: isWorkflowDepositApprover
              ? WorkflowDepositTypeMap[payload.deposit_type]
              : undefined,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userSession?.access_token}`,
          },
        }
      );

      return data;
    },
    ...options,
  });
};
