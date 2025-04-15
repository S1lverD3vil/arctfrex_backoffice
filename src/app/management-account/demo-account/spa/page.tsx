import { Metadata } from "next";
import { Table } from "@/components";

export const metadata: Metadata = {
  title: "PaNen",
};

const DummyPage = () => {
  const data: Array<any> = [];

  const columns: Array<string> = [
    "Nama",
    "Login",
    "Password",
    "Tipe",
    "Amount",
    "Is Aktif ?",
  ];

  return <Table data={data} columns={columns} isTranslated={false} />;
};

export default DummyPage;
