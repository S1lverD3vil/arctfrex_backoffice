import { Metadata } from "next";
import DepositSpaTable from "@/views/Table/DepositSpaTable";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  return <DepositSpaTable type="settlement" />;
}
