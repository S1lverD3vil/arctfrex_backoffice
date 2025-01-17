/** ENUM from ArctFrex Server
  Approved = 1
	Rejected = 2
	Pending = 3
	Cancelled = 4
 */
export enum ApprovalStatus {
  APPROVED = 1,
  REJECTED = 2,
  PENDING = 3,
  CANCELLED = 4,
}

export function approvalStatusToString(status: ApprovalStatus | string) {
  switch (status) {
    case ApprovalStatus.APPROVED:
      return "Approved";
    case ApprovalStatus.REJECTED:
      return "Rejected";
    case ApprovalStatus.PENDING:
      return "Pending";
    default:
      return "Unknown";
  }
}
