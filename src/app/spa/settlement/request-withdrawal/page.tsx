import { Metadata } from "next";
import WithdrawalSpaTable from "@/views/Table/WithdrawalSpaTable";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  return <WithdrawalSpaTable type="settlement" />;
}
