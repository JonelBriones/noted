"use client";
import { Note } from "@/app/_types/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>(undefined);

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [viewToggledNote, setViewToggledNote] = useState<Note | undefined>(
    undefined
  );

  return (
    <ThemeContext.Provider
      value={{
        search,
        setSearch,
        viewToggledNote,
        setViewToggledNote,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextWrapper;

export function useAppContext() {
  return useContext(ThemeContext);
}
