"use client"

import { useHeader } from "@/utils/header";
import { useSession } from "@/utils/session";
import { useToast } from "@/utils/toast";
import { Login } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { createRef, useEffect } from "react";

export default function LoginPage() {
  const { setTitle, setPrevPage } = useHeader();
  const toast = useToast();
  const session = useSession();
  const router = useRouter();

  const tokenRef = createRef<HTMLInputElement>();

  useEffect(() => {
    setTitle("Login");
    setPrevPage("/");
  }, []);

  const handleLogin = () => {
    if (tokenRef.current) {
      const token = tokenRef.current.value;
      if (!token) {
        toast.show("error", "Token cannot be empty");
        return;
      }
      session.set("token", token);
      toast.show("success", "Logged in successfully");
      router.replace("/vote");
    }
  };

  return (
    <Box>
      <TextField inputRef={tokenRef} required fullWidth label="Token" sx={{ mb: 2 }} />
      <Box>
        <Button variant="contained" color="success" startIcon={<Login />} onClick={handleLogin}>Login</Button>
      </Box>
    </Box>
  )
}
