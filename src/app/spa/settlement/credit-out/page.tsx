import { Metadata } from "next";
import CreditSpaTable from "@/views/Table/CreditSpaTable";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  return <CreditSpaTable type="settlement" menutype="credit-out" />;
}
