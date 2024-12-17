"use client"

import { useEffect, useReducer } from "react"
import { AgentDataContext, AgentDispatchContext, agentInitialData, agentReducer } from "./context";
import { useSession } from "../session";
import { useToast } from "../toast";
import axios, { AxiosError } from "axios";

import ErrorResponse from "@/models/ErrorResponse";

export default function AgentProvider({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  const [data, dispatch] = useReducer(agentReducer, agentInitialData);
  const session = useSession();
  const toast = useToast();

  useEffect(() => {
    if (session.data.initialized) {
      dispatch(() => {
        const http = axios.create({
          baseURL: "http://" + session.get<string>("agent")
        });
        http.interceptors.response.use((res) => {
          return res;
        }, (err: AxiosError) => {
          if (err.response) {
            toast.show("error", "Error (" + err.response.status + "): " + (err.response.data as ErrorResponse).message);
          }
          return Promise.reject();
        });
        return { http };
      });
    }
  }, [session.data]);

  return (
    <AgentDataContext.Provider value={data}>
      <AgentDispatchContext.Provider value={dispatch}>
        {children}
      </AgentDispatchContext.Provider>
    </AgentDataContext.Provider>
  );
}
