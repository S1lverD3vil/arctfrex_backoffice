import { DepositDetailPageContextProvider } from "@/views/transactions/deposit/[depositid]/DepositDetailPageContext";

export default function DepositDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: {
    id: string;
  };
}>) {
  return (
    <DepositDetailPageContextProvider>
      {children}
    </DepositDetailPageContextProvider>
  );
}
