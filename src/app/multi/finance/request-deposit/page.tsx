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
    "Amount Deposit",
    "C.Meta",
    "Bank Nasabah",
    "Segre",
    "Tgl pengajuan",
    "Tipe",
    "Status",
  ];

  return <Table data={data} columns={columns} isTranslated={false} />;
};

export default DummyPage;
