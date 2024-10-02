"use client"

import { useEffect, useReducer } from "react"
import { AgentDataContext, AgentDispatchContext, agentInitialData, agentReducer } from "./context";
import { useSession } from "../session";
import axios from "axios";

export default function AgentProvider({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  const [data, dispatch] = useReducer(agentReducer, agentInitialData);
  const session = useSession();

  useEffect(() => {
    if (session.data.initialized) {
      dispatch(() => {
        return {
          http: axios.create({
            baseURL: "http://" + session.get<string>("agent")
          })
        };
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
