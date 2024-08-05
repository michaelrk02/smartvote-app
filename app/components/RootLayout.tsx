"use client"

import { useHeader } from "@/utils/header";
import { Box, Paper, Stack, Typography, Divider, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import ActionButtons from "./ActionButtons";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";

export default function Layout({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  const header = useHeader();

  return (
    <Box
      bgcolor={grey[200]}
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Stack spacing={2} width="100%">
          <Typography variant="h3" textAlign="center" paddingX={1} paddingTop={3}>SmartVote</Typography>
          <Typography variant="h5" textAlign="center" padding={1} color={grey[700]}>{header.data.title}</Typography>
          {header.data.prevPage && (
            <Box display="flex" justifyContent="center">
              <Button LinkComponent={Link} href={header.data.prevPage} sx={{ width: "fit-content" }} startIcon={<ArrowBack />}>Back</Button>
            </Box>
          )}
          <Divider />
          <Box padding={2}>
            {children}
          </Box>
          <Divider />
          <Box padding={2}>
            <ActionButtons />
            <Typography textAlign="center" color={grey[700]}>Copyright &copy; Michael R. Krisnadhi</Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
