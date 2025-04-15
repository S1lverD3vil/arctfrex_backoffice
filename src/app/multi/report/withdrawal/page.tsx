import { Metadata } from "next";
import { Table } from "@/components";

export const metadata: Metadata = {
  title: "PaNen",
};

const DummyPage = () => {
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
};

export default DummyPage;
