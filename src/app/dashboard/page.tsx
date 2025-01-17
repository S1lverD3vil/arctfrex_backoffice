import { Metadata } from "next";
import Dashboard from "@/views/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard | PaNen",
  description: "PaNen Dashboard",
};

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
