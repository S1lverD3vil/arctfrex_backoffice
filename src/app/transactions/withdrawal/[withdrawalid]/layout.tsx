import { WithdrawalDetailPageContextProvider } from "@/views/transactions/withdrawal/[withdrawalid]/WithdrawalDetailPageContext";

export default function WithdrawalDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: {
    id: string;
  };
}>) {
  return (
    <WithdrawalDetailPageContextProvider>
      {children}
    </WithdrawalDetailPageContextProvider>
  );
}
