import ConversationContext, {
  ConversationContextProvider,
} from "@/views/live-chat/ConversationContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ConversationContextProvider>{children}</ConversationContextProvider>;
}
