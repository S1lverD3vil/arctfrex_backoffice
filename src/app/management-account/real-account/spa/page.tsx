import { Metadata } from "next";
import { Table } from "@/components";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  const data: Array<any> = [];

  const columns: Array<string> = [
    "No Agrement",
    "Nama Lengkap",
    "Login",
    "Email",
    "Tgl Aprove",
    "Wakil Pialang",
    "IP address",
  ];

  return <Table data={data} columns={columns} isTranslated={false} />;
}
