import { Metadata } from "next";
import { TableListWPCall } from "@/modules/wpb/TableListWPCall";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function ListWPCallPage() {
  return <TableListWPCall />;
}
