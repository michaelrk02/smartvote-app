"use client"

import { useContext } from "react"
import { AgentData, AgentDataContext } from "./context"
import { AxiosInstance } from "axios";

interface Agent {
  data: AgentData;
  http: AxiosInstance | null;
}

function useAgent(): Agent {
  const data = useContext(AgentDataContext);

  const http = data.http;

  return { data, http };
}

export {
  useAgent
}
