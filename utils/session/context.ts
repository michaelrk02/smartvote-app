"use client"

import { createContext, Dispatch } from "react";
import { Action } from "../reducer";

type SessionData = { [key: string]: Object };

const sessionInitialData: SessionData = {};

function sessionReducer(data: SessionData, action: Action<SessionData>) {
  data = action(data);
  localStorage.setItem("_session", JSON.stringify(data));
  return data;
}

const SessionDataContext = createContext<SessionData>({});
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
