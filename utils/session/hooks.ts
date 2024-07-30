"use client"

import { useContext } from "react"
import { SessionData, SessionDataContext, SessionDispatchContext } from "./context"

interface Session {
  data: SessionData;
  set(key: string, value: any): void;
  get(key: string, defaultValue?: any): any;
  has(key: string): boolean;
  unset(key: string): void;
}

function useSession(): Session {
  const data = useContext(SessionDataContext);
  const dispatch = useContext(SessionDispatchContext);

  const set = (key: string, value: any): void => {
    dispatch((data) => {
      data = { ...data };
      data[key] = value;
      return data;
    });
  };

  const get = (key: string, defaultValue: any = null): any => {
    if (!has(key)) {
      return defaultValue;
    }
    return data[key];
  };

  const has = (key: string): boolean => {
    return data.hasOwnProperty(key);
  };

  const unset = (key: string): void => {
    if (has(key)) {
      dispatch((data) => {
        data = { ...data };
        delete data[key];
        return data;
      });
    }
  };

  return { data, set, get, has, unset };
}

export {
  useSession
}
