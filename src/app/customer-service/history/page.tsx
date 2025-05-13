import { Metadata } from "next";
import { Table } from "@/components";

export const metadata: Metadata = {
  title: "PaNen",
};

export default function Page() {
  const data: Array<any> = [];

  const columns: Array<string> = [
    "ID",
    "Subject & Requestor",
    "Assigned to",
    "Reply Status",
    "Status",
    "Updated",
    "Created",
    "Actions",
  ];

  return <Table data={data} columns={columns} isTranslated={false} />;
}
