"use client";
import { redirect, useParams, usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Note as NoteType } from "@/app/_types/types";
const ThemeContext = createContext<any>(undefined);

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");

  return (
    <ThemeContext.Provider
      value={{
        search,
        setSearch,
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
