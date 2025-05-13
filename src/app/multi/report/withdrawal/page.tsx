import { Metadata } from "next";
import { Table } from "@/components";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  const data: Array<any> = [];

  const columns: Array<string> = [
    "No Transaksi",
    "Nama Lengkap",
    "Login",
    "Amount Wd",
    "C. Meta",
    "Bank",
    "Tgl pengajuan",
    "Status",
    "Finance By",
    "Dealing By",
    "Status",
  ];

  return <Table data={data} columns={columns} isTranslated={false} />;
}
