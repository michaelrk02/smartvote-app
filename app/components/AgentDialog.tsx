"use client"

import { useSession } from "@/utils/session";
import { useToast } from "@/utils/toast";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import { createRef } from "react";

interface AgentDialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  setAgent: (agent: string) => void;
};

export default function AgentDialog(props: AgentDialogProps) {
  const session = useSession();
  const toast = useToast();

  const agentRef = createRef<HTMLInputElement>();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChange = () => {
    if (agentRef.current) {
      props.setAgent(agentRef.current.value);
    }
    props.setOpen(false);
    toast.show("success", "Agent has been changed");
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
    >
      <DialogTitle>Change Agent</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>Specify agent server below in <code>HOSTNAME[:PORT]</code> format e.g. <strong>localhost:8080</strong></DialogContentText>
        <TextField
          inputRef={agentRef}
          defaultValue={session.get("agent")}
          autoFocus
          required
          label="Agent Server"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="success" onClick={handleChange}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
