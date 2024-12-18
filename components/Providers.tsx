"use client";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import apiNotes from "@/data.json";
import { Note } from "@/app/_types/types";

const ThemeContext = createContext<any>(undefined);

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const { tag } = useParams() as { tag: string };

  const openedNotes = apiNotes.filter((note: Note) => note.isArchived == false);
  const archivedNotes = apiNotes.filter(
    (note: Note) => note.isArchived == true
  );
  const viewByTag = apiNotes.filter((note: Note) =>
    note.tags.includes(tag?.charAt(0).toUpperCase() + tag?.slice(1))
  );
  const [search, setSearch] = useState("");

  const [viewToggledNote, setViewToggledNote] = useState<Note>(apiNotes[0]);

  return (
    <ThemeContext.Provider
      value={{
        viewToggledNote,
        setViewToggledNote,
        search,
        setSearch,
        apiNotes,
        archivedNotes,
        viewByTag,
        openedNotes,
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
