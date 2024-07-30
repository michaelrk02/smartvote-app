"use client"

import { createContext, Dispatch } from "react";
import { Action } from "../reducer";

interface HeaderData {
  title: string;
  prevPage: string | null;
}

const headerInitialData: HeaderData = {
  title: "",
  prevPage: null
}

function headerReducer(data: HeaderData, action: Action<HeaderData>) {
  return action(data);
}

const HeaderDataContext = createContext<HeaderData>(headerInitialData);
const HeaderDispatchContext = createContext<Dispatch<Action<HeaderData>>>(() => {});

export type {
  HeaderData
}

export {
  headerInitialData,
  headerReducer,
  HeaderDataContext,
  HeaderDispatchContext
}
