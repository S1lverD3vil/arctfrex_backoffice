import { Metadata } from "next";
import { Table } from "@/components";

export const metadata: Metadata = {
  title: "PaNen",
};

const DummyPage = () => {
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
};

export default DummyPage;
