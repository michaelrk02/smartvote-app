import GuestMiddleware from "@/utils/middleware/GuestMiddleware";
import { Metadata } from "next";
import LoginPage from "./components/LoginPage";

export const metadata: Metadata = {
  title: "Login"
};

export default function Page() {
  return (
    <GuestMiddleware>
      <LoginPage />
    </GuestMiddleware>
  )
}
