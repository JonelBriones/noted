"use client";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SidebarRight from "../SidebarActions";
import NoteCard from "./NoteCard";
import NoteCardSummary from "../NoteCardSidebar";
import { useParams, usePathname } from "next/navigation";
import { Note } from "@/app/_types/types";
import { useAppContext } from "../Providers";

interface Params {
  apiNotes: Note[];
  search: string;
  viewToggledNote?: Note;
  setViewToggledNote: (note: Note) => {};
}

const NoteCardSummaryContainer = ({
  search,
  apiNotes,
  viewToggledNote,
  setViewToggledNote,
}: Params) => {
  const pathname = usePathname();
  const { tag } = useParams() as { tag: string };

  let formattedSearch = search?.toLowerCase();

  const searchNotes = apiNotes.filter(
    (notes: any) =>
      notes.tags.find((tag: string) =>
        tag.toLocaleLowerCase().includes(formattedSearch)
      ) ||
      notes.title.toLocaleLowerCase().includes(formattedSearch) ||
      notes.content.toLocaleLowerCase().includes(formattedSearch)
  );

  const renderNoteCardSummary = () => {
    if (search) {
      return searchNotes?.map((note: Note) => (
        <div onClick={() => setViewToggledNote(note)} key={note._id}>
          <NoteCardSummary note={note} viewToggledNote={viewToggledNote} />
        </div>
      ));
    } else
      return apiNotes?.map((note: any) => (
        <div onClick={() => setViewToggledNote(note)} key={note._id}>
          <NoteCardSummary note={note} viewToggledNote={viewToggledNote} />
        </div>
      ));
  };

  return (
    <div className="flex flex-grow gap-4 pl-6 overflow-hidden">
      <div className="hidden w-[290px] md:flex flex-col flex-none text-wrap overflow-y-auto gap-2 py-4">
        <PrimaryBtn
          text={"+ Create new Note"}
          backgroundColor={"bg-blue-500"}
          textColor="text-white"
        />
        {pathname == "/archived" && (
          <>
            <p className="text-sm  text-neutral-700">
              All your archived notes are stored here. You can restore or delete
              them anytime.
            </p>
            {!apiNotes.length && (
              <p className="text-sm text-neutral-700 bg-neutral-100 rounded-lg p-2">
                No notes have been archived yet. Move notes here for
                safekeeping, or{" "}
                <span className="underline">create a new note.</span>
              </p>
            )}
          </>
        )}
        {pathname == "/" && apiNotes.length == 0 && (
          <>
            <p className="text-sm  text-neutral-700">
              You don’t have any notes yet. Start a new note to capture your
              thoughts and ideas.
            </p>
          </>
        )}
        {pathname.includes("/tag/") && (
          <p className="text-sm  text-neutral-700">
            All notes with the {tag} tag are shown here.
          </p>
        )}
        {renderNoteCardSummary()}
      </div>
      {apiNotes.find((note) => note._id == viewToggledNote?._id) && (
        <>
          <NoteCard note={viewToggledNote} />
          <SidebarRight note={viewToggledNote} />
        </>
      )}
    </div>
  );
};

export default NoteCardSummaryContainer;
