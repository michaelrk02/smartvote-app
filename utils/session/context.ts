"use client"

import { createContext, Dispatch } from "react";
import { Action } from "../reducer";

type SessionValues = { [key: string]: any };

interface SessionData {
  initialized: boolean;
  values: SessionValues;
}

const sessionInitialData: SessionData = {
  initialized: false,
  values: {}
};

function sessionReducer(data: SessionData, action: Action<SessionData>) {
  data = action(data);
  localStorage.setItem("_session", JSON.stringify(data.values));
  return data;
}

const SessionDataContext = createContext<SessionData>(sessionInitialData);
const SessionDispatchContext = createContext<Dispatch<Action<SessionData>>>(() => {});

export type {
  SessionData
}

export {
  sessionInitialData,
  sessionReducer,
  SessionDataContext,
  SessionDispatchContext
}
