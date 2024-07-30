"use client"

import { createContext, Dispatch } from "react";
import { Action } from "../reducer";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastData {
  isOpen: boolean;
  type: ToastType;
  message: string;
}

const toastInitialData: ToastData = {
  isOpen: false,
  type: "success",
  message: ""
}

function toastReducer(data: ToastData, action: Action<ToastData>) {
  return action(data);
}

const ToastDataContext = createContext<ToastData>(toastInitialData);
const ToastDispatchContext = createContext<Dispatch<Action<ToastData>>>(() => {});

export type {
  ToastType,
  ToastData
}

export {
  toastInitialData,
  toastReducer,
  ToastDataContext,
  ToastDispatchContext
}
