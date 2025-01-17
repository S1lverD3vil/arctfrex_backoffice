import { Metadata } from "next";
import PlaceholderContent from "@/components/PlaceholderContent";

export const metadata: Metadata = {
  title: "Setting Account | PaNen",
  description: "PaNen Setting Account",
};

const SettingAccountPage = ({ params }: { params: { slug: string } }) => {
  return <PlaceholderContent text={`Setting ${params.slug} Page`} />;
};

export default SettingAccountPage;
