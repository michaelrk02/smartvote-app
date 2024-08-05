"use client"

import { useContext, useEffect } from "react"
import { SessionData, SessionDataContext, SessionDispatchContext } from "./context"

interface Session {
  data: SessionData;
  set<T>(key: string, value: T): void;
  get<T>(key: string, defaultValue?: T | null): T | null;
  has(key: string): boolean;
  unset(key: string): void;
}

function useSession(): Session {
  const data = useContext(SessionDataContext);
  const dispatch = useContext(SessionDispatchContext);

  const set = <T>(key: string, value: T): void => {
    dispatch((data) => {
      data = { ...data };
      data.values[key] = value;
      return data;
    });
  };

  const get = <T>(key: string, defaultValue: T | null = null): T | null => {
    if (!has(key)) {
      return defaultValue;
    }
    return data.values[key];
  };

  const has = (key: string): boolean => {
    return key in data.values;
  };

  const unset = (key: string): void => {
    if (has(key)) {
      dispatch((data) => {
        data = { ...data };
        delete data.values[key];
        return data;
      });
    }
  };

  return { data, set, get, has, unset };
}

export {
  useSession
}
