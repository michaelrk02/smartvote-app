import AuthMiddleware from "@/utils/middleware/AuthMiddleware";
import VotePage from "./components/VotePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voter Dashboard"
};

export default function Page() {
  return (
    <AuthMiddleware>
      <VotePage />
    </AuthMiddleware>
  )
}
