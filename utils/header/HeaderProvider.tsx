"use client"

import { useReducer } from "react"
import { HeaderDataContext, HeaderDispatchContext, headerInitialData, headerReducer } from "./context";

export default function HeaderProvider({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  const [data, dispatch] = useReducer(headerReducer, headerInitialData);

  return (
    <HeaderDataContext.Provider value={data}>
      <HeaderDispatchContext.Provider value={dispatch}>
        {children}
      </HeaderDispatchContext.Provider>
    </HeaderDataContext.Provider>
  );
}
