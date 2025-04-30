import TableAccountPending from "@/views/TableAccountPending";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function RequestWPCallPage() {
  return <TableAccountPending />;
}
