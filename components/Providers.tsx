"use client";
import { redirect, useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Note as NoteType } from "@/app/_types/types";
const ThemeContext = createContext<any>(undefined);

interface Context {
  children: React.ReactNode;
  notesAPI: NoteType[];
}

const ContextWrapper = ({ children, notesAPI }: Context) => {
  const { tag } = useParams() as { tag: string };
  const [apiNotes, setApiNotes] = useState<NoteType[]>(notesAPI);
  const openedNotes = apiNotes?.filter(
    (note: NoteType) => note?.isArchived == false
  );
  const archivedNotes = apiNotes?.filter(
    (note: NoteType) => note?.isArchived == true
  );
  const [viewByTag, setViewByTag] = useState(
    apiNotes?.filter(
      (note: NoteType) =>
        note.tags.includes(tag?.charAt(0).toUpperCase() + tag?.slice(1)) &&
        !note.isArchived
    )
  );
  const [search, setSearch] = useState("");

  const [viewToggledNote, setViewToggledNote] = useState<NoteType>(apiNotes[0]);

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
        (note: NoteType) =>
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
  const [toggleCreateNote, setToggleCreateNote] = useState(false);
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
    let newNoteObj: NoteType = {
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
    setViewToggledNote(updatedNotes[updatedNotes.length - 1]);
    setToggleCreateNote(false);
    redirect("/");
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
        tagsFormattedValidation,
        toggleCreateNote,
        setToggleCreateNote,
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
