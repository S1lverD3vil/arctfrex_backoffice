import { Metadata } from "next";
import SignIn from "@/views/SignIn";

export const metadata: Metadata = {
  title: "Sign In | PaNen",
  description: "PaNen Dashboard",
};

export default function SignInPage() {
  return <SignIn />;
}
