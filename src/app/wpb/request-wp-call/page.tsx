import { Metadata } from "next";
import CustomerLeadTable from "@/views/customer/lead/CustomerLeadTable";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function RequestWPCallPage() {
  return <CustomerLeadTable />;
}
