"use client";
import { redirect, useParams, usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import fakeNotes from "@/data.json";
import { Note } from "@/app/_types/types";

const ThemeContext = createContext<any>(undefined);

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
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

  // NOTE FORM
  const defaultNote = {
    content: "",
    isArchived: false,
    lastEdited: "",
    tags: [],
    title: "",
    _id: "",
  };
  const [note, setNote] = useState(defaultNote);
  const [tagInput, setTagInput] = useState(true);
  const [inputTag, setTag] = useState("");
  const pattern2 = /^[a-zA-Z]+(,[a-zA-Z]+)*$/;
  const tagsFormattedValidation = inputTag
    .split(",")
    .filter((valid) => valid !== "")
    .map((tag) => tag[0].toUpperCase() + tag?.slice(1));
  const [error, setError] = useState(pattern2.test(inputTag));
  const onHandlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    let newNoteObj: Note = {
      content: note.content,
      isArchived: false,
      lastEdited: new Date().toDateString(),
      tags: tagsFormattedValidation,
      title: note.title,
      _id: Math.floor(Math.random() * 1000).toString(),
    };
    let updatedNotes = [...apiNotes, newNoteObj];
    setApiNotes(updatedNotes);
    setNote(defaultNote);
    setTag("");
    setTagInput(true);
  };

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
        note,
        setNote,
        setApiNotes,
        onHandlerSubmit,
        error,
        setError,
        tagInput,
        setTagInput,
        inputTag,
        setTag,
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
