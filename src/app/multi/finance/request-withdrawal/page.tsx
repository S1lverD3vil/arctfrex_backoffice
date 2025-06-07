import { Metadata } from "next";
import WithdrawalMultiTable from "@/views/Table/WithdrawalMultiTable";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  return <WithdrawalMultiTable type="finance" menutype="finance" />;
}
