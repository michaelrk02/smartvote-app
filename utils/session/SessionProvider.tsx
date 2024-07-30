"use client"

import { useEffect, useReducer } from "react"
import { SessionData, SessionDataContext, SessionDispatchContext, sessionInitialData, sessionReducer } from "./context";

export default function SessionProvider({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  const [data, dispatch] = useReducer(sessionReducer, sessionInitialData);

  useEffect(() => {
    dispatch((data) => {
      const storage = localStorage.getItem("_session");
      if (storage) {
        data = JSON.parse(storage);
      }
      return data;
    });
  }, []);

  return (
    <SessionDataContext.Provider value={data}>
      <SessionDispatchContext.Provider value={dispatch}>
        {children}
      </SessionDispatchContext.Provider>
    </SessionDataContext.Provider>
  );
}
