import { Metadata } from "next";
import DepositMultiTable from "@/views/Table/DepositMultiTable";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  return <DepositMultiTable type="settlement" />;
}
