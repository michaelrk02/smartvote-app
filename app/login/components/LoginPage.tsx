"use client"

import LoginRequest from "@/models/LoginRequest";
import ValueResponse from "@/models/ValueResponse";
import { useAgent } from "@/utils/agent";
import { useHeader } from "@/utils/header";
import { useSession } from "@/utils/session";
import { useToast } from "@/utils/toast";
import { Login } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { createRef, useEffect } from "react";

export default function LoginPage() {
  const { setTitle, setPrevPage } = useHeader();
  const { http } = useAgent();
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
      const tokenStr = tokenRef.current.value;
      if (!tokenStr) {
        toast.show("error", "Token cannot be empty");
        return;
      }

      if (!tokenStr.match(/^[0-9]+$/)) {
        toast.show("error", "Token must be a number");
        return;
      }

      const token = Number(tokenStr);

      http?.post<ValueResponse<boolean>, AxiosResponse<ValueResponse<boolean>>, LoginRequest>(`/voting/login`, { token }).then(res => {
        if (res.data.value) {
          session.set("token", token);
          toast.show("success", "Logged in successfully");
          router.replace("/vote");
        } else {
          toast.show("error", "Invalid login credentials");
        }
      });
    }
  };

  return (
    <Box>
      <TextField inputRef={tokenRef} required fullWidth label="Token" type="password" sx={{ mb: 2 }} />
      <Box>
        <Button variant="contained" color="success" startIcon={<Login />} onClick={handleLogin}>Login</Button>
      </Box>
    </Box>
  );
}
