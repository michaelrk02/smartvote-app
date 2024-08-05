"use client"

import { useSession } from "@/utils/session";
import { useToast } from "@/utils/toast";
import { Logout } from "@mui/icons-material"
import { Button, Stack } from "@mui/material"
import { useRouter } from "next/navigation";

export default function ActionButtons() {
  const session = useSession();
  const router = useRouter();
  const toast = useToast();

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      session.unset("token");
      router.replace("/login");
      toast.show("success", "Log out successful");
    }
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
      {session.has("token") && (<Button color="error" startIcon={<Logout />} onClick={handleLogout}>Logout</Button>)}
    </Stack>
  );
}
