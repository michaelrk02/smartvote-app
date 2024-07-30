"use client"

import { useContext } from "react"
import { HeaderData, HeaderDataContext, HeaderDispatchContext } from "./context"

interface Header {
  data: HeaderData;
  setTitle(title: string): void;
  setPrevPage(prevPage: string | null): void;
}

function useHeader(): Header {
  const data = useContext(HeaderDataContext);
  const dispatch = useContext(HeaderDispatchContext);

  const setTitle = (title: string): void => {
    dispatch((data) => {
      return { ...data, title };
    });
  };

  const setPrevPage = (prevPage: string | null): void => {
    dispatch((data) => {
      return { ...data, prevPage };
    });
  };

  return { data, setTitle, setPrevPage };
}

export {
  useHeader
}
