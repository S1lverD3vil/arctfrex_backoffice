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
    "Amount Deposit",
    "C.Meta",
    "Bank Nasabah",
    "Segre",
    "Tgl pengajuan",
    "Status",
    "Tipe",
    "Finance By",
    "Dealing By",
  ];

  return <Table data={data} columns={columns} isTranslated={false} />;
}
