"use client"

import { useContext } from "react"
import { ToastData, ToastDataContext, ToastDispatchContext, ToastType } from "./context"

interface Toast {
  data: ToastData;
  show(type: ToastType, message: string): void;
}

function useToast(): Toast {
  const data = useContext(ToastDataContext);
  const dispatch = useContext(ToastDispatchContext);

  const show = (type: ToastType, message: string): void => {
    dispatch((data) => {
      return { isOpen: true, type, message };
    });
  };

  return { data, show };
}

export {
  useToast
}
