"use client"

import { useEffect, useReducer } from "react"
import { SessionDataContext, SessionDispatchContext, sessionInitialData, sessionReducer } from "./context";

export default function SessionProvider({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  const [data, dispatch] = useReducer(sessionReducer, sessionInitialData);

  useEffect(() => {
    dispatch(() => {
      let values = {};

      const storage = localStorage.getItem("_session");
      if (storage) {
        values = JSON.parse(storage);
      }

      return { initialized: true, values };
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
