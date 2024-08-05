import AuthMiddleware from "@/utils/middleware/AuthMiddleware";
import OptionsPage from "./components/OptionsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose Candidate"
};

export default function Page() {
  return (
    <AuthMiddleware>
      <OptionsPage />
    </AuthMiddleware>
  )
}
