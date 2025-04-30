import { AccountDetailPageContextProvider } from "@/views/account/[id]/AccountDetailPageContext";

export default function RequestWPCallLayout({
  children,
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
