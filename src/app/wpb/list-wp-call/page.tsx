import { Metadata } from "next";
import WPBListWPCallTable from "@/views/wpb/list-wp-call/WPBListWPCallTable";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function ListWPCallPage() {
  return <WPBListWPCallTable />;
}
