import { Metadata } from "next";
import CreditMultiTable from "@/views/Table/CreditMultiTable";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  return <CreditMultiTable type="settlement" menutype="credit-out" />;
}
