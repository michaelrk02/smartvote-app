import AuthMiddleware from "@/utils/middleware/AuthMiddleware";
import VotePage from "./components/VotePage";

export default function Page() {
  return (
    <AuthMiddleware>
      <VotePage />
    </AuthMiddleware>
  )
}
