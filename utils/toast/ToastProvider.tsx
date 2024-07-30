"use client"

import { useReducer } from "react"
import { ToastDataContext, ToastDispatchContext, toastInitialData, toastReducer } from "./context";
import { Alert, Snackbar } from "@mui/material";

export default function ToastProvider({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  const [data, dispatch] = useReducer(toastReducer, toastInitialData);

  const handleClose = () => {
    dispatch((data) => {
      return { ...data, isOpen: false };
    });
  };

  return (
    <ToastDataContext.Provider value={data}>
      <ToastDispatchContext.Provider value={dispatch}>
        <Snackbar
          open={data.isOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Alert
            onClose={handleClose}
            severity={data.type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {data.message}
          </Alert>
        </Snackbar>
        {children}
      </ToastDispatchContext.Provider>
    </ToastDataContext.Provider>
  );
}
