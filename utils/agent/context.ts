"use client"

import { createContext, Dispatch } from "react";
import { Action } from "../reducer";
import { AxiosInstance } from "axios";

interface AgentData {
  http: AxiosInstance | null
}

const agentInitialData: AgentData = {
  http: null
}

function agentReducer(data: AgentData, action: Action<AgentData>) {
  return action(data);
}

const AgentDataContext = createContext<AgentData>(agentInitialData);
const AgentDispatchContext = createContext<Dispatch<Action<AgentData>>>(() => {});

export type {
  AgentData
}

export {
  agentInitialData,
  agentReducer,
  AgentDataContext,
  AgentDispatchContext
}
