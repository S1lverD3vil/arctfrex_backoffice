import { Metadata } from "next";
import { Table } from "@/components";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  const data: Array<any> = [];

  const columns: Array<string> = [
    "Login",
    "Password",
    "Tipe",
    "Amount",
    "Is Aktif ?",
  ];

  return <Table data={data} columns={columns} isTranslated={false} />;
}
