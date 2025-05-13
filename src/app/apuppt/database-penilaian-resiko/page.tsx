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
    "No Akun",
    "Penilaian Produk",
    "Penilaian Profie",
    "Penilaian Wilayah",
    "Tingkat Resiko Client",
    "Actions",
  ];

  return <Table data={data} columns={columns} isTranslated={false} />;
}
