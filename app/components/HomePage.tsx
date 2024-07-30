"use client"

import { useHeader } from "@/utils/header";
import { useSession } from "@/utils/session";
import { Login, Refresh } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AgentDialog from "./AgentDialog";
import Link from "next/link";

export default function HomePage() {
  const { setTitle, setPrevPage } = useHeader();
  const session = useSession();

  const [isAgentDialogOpen, setAgentDialogOpen] = useState(false);

  useEffect(() => {
    setTitle("Home");
    setPrevPage("/");

    if (!session.has("agent")) {
      session.set("agent", process.env.NEXT_PUBLIC_DEFAULT_AGENT);
    }
  }, []);

  const setAgent = (agent: string) => {
    session.set("agent", agent);
  };

  const handleAgentDialogOpen = () => {
    setAgentDialogOpen(true);
  };

  return (
    <>
      <Box>
        <Typography mb={2} fontWeight="bold">Welcome to SmartVote voting client</Typography>
        <Typography mb={2}>SmartVote is a replicated e-voting service built on top of BFT-SMaRt library implemented in Java language.</Typography>
        <Typography mb={2}>In order to proceed, please specify the agent server below.</Typography>
        <Stack mb={4} direction="row" spacing={1} alignItems="center">
          <Typography fontWeight="bold">Selected agent:</Typography>
          <Typography flexGrow={1}>{session.get("agent")}</Typography>
          <Button variant="contained" startIcon={<Refresh />} onClick={handleAgentDialogOpen}>Change</Button>
        </Stack>
        <Box>
          <Button component={Link} href="/login" variant="contained" color="success" startIcon={<Login />}>Login</Button>
        </Box>
      </Box>
      <AgentDialog
        isOpen={isAgentDialogOpen}
        setOpen={setAgentDialogOpen}
        setAgent={setAgent}
      />
    </>
  );
}
