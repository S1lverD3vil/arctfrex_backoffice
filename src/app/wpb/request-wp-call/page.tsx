import { Metadata } from "next";
import { TableRequestWPCall } from "@/modules/wpb";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function RequestWPCallPage() {
  return <TableRequestWPCall />;
}
