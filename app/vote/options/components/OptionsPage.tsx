"use client"

import Candidate from "@/models/Candidate";
import ValueResponse from "@/models/ValueResponse";
import VoteRequest from "@/models/VoteRequest";
import { useAgent } from "@/utils/agent";
import { useHeader } from "@/utils/header";
import { useSession } from "@/utils/session";
import { useToast } from "@/utils/toast";
import { Check, Person } from "@mui/icons-material";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, Radio, RadioGroup } from "@mui/material";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OptionsPage() {
  const { setTitle, setPrevPage } = useHeader();
  const { http } = useAgent();
  const session = useSession();
  const toast = useToast();
  const router = useRouter();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [option, setOption] = useState<number | null>(null);

  useEffect(() => {
    setTitle("Choose Candidate");
    setPrevPage("/vote");
  }, []);

  useEffect(() => {
    http?.get<ValueResponse<Candidate[]>>(`/voting/candidates`).then(res => {
      setCandidates(res.data.value);
    });
  }, [http]);

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(Number((e.target as HTMLInputElement).value));
  };

  const handleSubmit = () => {
    if (confirm("Are you sure?")) {
      const token = session.get<number>("token")!;
      const candidateId = option!;

      http?.post<void, AxiosResponse<void>, VoteRequest>(`/voting/vote`, { token, candidateId }).then(res => {
        toast.show("success", "Vote has been casted. Thank you for your participation!");
        session.unset("token");
        router.replace("/");
      });
    }
  };

  return (
    <Box>
      <Box mb={2}>
        <RadioGroup value={option} onChange={handleChangeOption}>
          <List>
            { ...candidates.map(c => (
              <ListItem
                key={c.id}
                secondaryAction={<Radio value={c.id} />}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={c.name} secondary={`ID: ${c.id}`} />
              </ListItem>
            )) }
          </List>
        </RadioGroup>
      </Box>
      <Box display="flex" justifyContent="end">
        <Button variant="contained" color="success" startIcon={<Check />} disabled={option === null} onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
}
