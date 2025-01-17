import AppShell from "@/views/AppShell/AppShell";
import { AccountDetailPageContextProvider } from "@/views/account/[id]/AccountDetailPageContext";

export default function AccountDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    id: string;
  };
}>) {
  return (
    <AccountDetailPageContextProvider>
      {children}
    </AccountDetailPageContextProvider>
  );
}
