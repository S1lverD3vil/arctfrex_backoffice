import { Metadata } from "next";
import { Table } from "@/components";

export const metadata: Metadata = {
  title: "PaNen",
};

const DummyPage = () => {
  const data: Array<any> = [];

  const columns: Array<string> = [
    "No Agrement",
    "Nama Lengkap",
    "No Telp",
    "Email",
    "Pengajuan Wp",
    "Status Wp",
    "Actions",
  ];

  return <Table data={data} columns={columns} isTranslated={false} />;
};

export default DummyPage;
