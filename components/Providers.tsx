"use client";
import { redirect, useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import fakeNotes from "@/data.json";
import { Note } from "@/app/_types/types";

const ThemeContext = createContext<any>(undefined);

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const { tag } = useParams() as { tag: string };
  const [apiNotes, setApiNotes] = useState<Note[]>(fakeNotes);
  const openedNotes = apiNotes.filter((note: Note) => note.isArchived == false);
  const archivedNotes = apiNotes.filter(
    (note: Note) => note.isArchived == true
  );
  const [viewByTag, setViewByTag] = useState(
    apiNotes.filter(
      (note: Note) =>
        note.tags.includes(tag?.charAt(0).toUpperCase() + tag?.slice(1)) &&
        !note.isArchived
    )
  );
  const [search, setSearch] = useState("");

  const [viewToggledNote, setViewToggledNote] = useState<Note>(apiNotes[0]);

  const deleteNote = (id: string) => {
    const isNoteExist = apiNotes.find((note) => note._id == id);

    if (isNoteExist) {
      let updatedNotes = apiNotes.filter((note) => note._id != id);
      //   console.log("deleting", isNoteExist);
      setApiNotes(apiNotes.filter((note) => note._id != id));
      setViewToggledNote(updatedNotes[0]);
    }
  };

  const archiveNote = (id: string, isArchived: boolean) => {
    console.log("old", apiNotes);
    const isNoteExist = apiNotes.find((note) => note._id == id);
    if (!isNoteExist) return;
    let updatedNotes;
    if (isArchived) {
      updatedNotes = apiNotes.map((note) =>
        note._id == id ? { ...note, isArchived: false } : note
      );
      //   // change isArchive to true
    } else {
      // change isArchive to false
      updatedNotes = apiNotes.map((note) =>
        note._id == id ? { ...note, isArchived: true } : note
      );
    }
    setApiNotes(updatedNotes);
    setViewToggledNote(updatedNotes[0]);
    console.log("updated", updatedNotes);
  };

  useEffect(() => {
    setViewByTag(
      apiNotes.filter(
        (note: Note) =>
          note.tags.includes(tag?.charAt(0).toUpperCase() + tag?.slice(1)) &&
          !note.isArchived
      )
    );
  }, [apiNotes, tag]);

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
        deleteNote,
        archiveNote,
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
