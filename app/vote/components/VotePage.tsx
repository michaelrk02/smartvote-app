"use client"

import ValueResponse from "@/models/ValueResponse";
import { useAgent } from "@/utils/agent";
import { useHeader } from "@/utils/header";
import { useSession } from "@/utils/session";
import { HowToVote, Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VotePage() {
  const { setTitle, setPrevPage } = useHeader();
  const session = useSession();
  const { http } = useAgent();

  const [revealToken, setRevealToken] = useState(false);
  const [eligible, setEligible] = useState<boolean | null>(null);

  const token = session.get<number>("token");

  useEffect(() => {
    setTitle("Vote");
    setPrevPage("/");
  }, []);

  useEffect(() => {
    if (token !== null) {
      http?.get<ValueResponse<boolean>>(`/voting/vote?token=${token}`).then((res) => {
        setEligible(!res.data.value);
      });
    }
  }, [token, http]);

  const toggleRevealTokenHandler = (revealToken: boolean) => {
    return () => {
      setRevealToken(revealToken);
    };
  };

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 2, alignItems: "center" }}>
        <Stack direction="row" alignItems="center" spacing={2} width="100%">
          <Typography>Token: <strong>{revealToken ? token : "******"}</strong></Typography>
          <IconButton color="primary" onClick={toggleRevealTokenHandler(!revealToken)}>
            {revealToken ? (<VisibilityOff />) : (<Visibility />)}
          </IconButton>
        </Stack>
      </Alert>
      {eligible !== null && (
        eligible ? (
          <Alert sx={{ mb: 2 }} severity="success">You are eligible to vote</Alert>
        ) : (
          <Alert sx={{ mb: 2 }} severity="error">You have already voted before</Alert>
        )
      )}
      {eligible && (
        <Box>
          <Button LinkComponent={Link} href="/vote/options" variant="contained" color="success" startIcon={<HowToVote />}>Vote Now</Button>
        </Box>
      )}
    </Box>
  );
}
