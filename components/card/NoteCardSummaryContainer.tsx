"use client";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SidebarRight from "../SidebarActions";
import NoteCard from "./NoteCard";
import NoteCardSummary from "../NoteCardSidebar";
import { useParams, usePathname } from "next/navigation";
import { Note, NoteList } from "@/app/types/types";

const NoteCardSummaryContainer = ({ apiNotes }: NoteList) => {
  const pathname = usePathname();
  const { tag } = useParams();

  // const [archivedNotes, setArchivedNotes] = useState([]);
  const notes = apiNotes.filter((note: any) => note.isArchived == false);
  const [viewToggledNote, setViewToggledNote] = useState(notes[0]);
  const archivedNotes =
    apiNotes.filter((note: any) => note.isArchived == true) || [];
  const [viewToggledArchivedNote, setViewToggledArchivedNote] = useState(
    archivedNotes[0]
  );

  const renderNoteCardSummary = () => {
    let selectNotes = pathname == "/" ? notes : archivedNotes;
    return selectNotes?.map((note: any) => (
      <div
        onClick={() => {
          pathname == "/"
            ? setViewToggledNote(note)
            : setViewToggledArchivedNote(note);
        }}
        key={note._id}
      >
        <NoteCardSummary
          note={note}
          viewToggledNote={
            pathname == "/" ? viewToggledNote : viewToggledArchivedNote
          }
        />
      </div>
    ));
  };
  return (
    <div className="flex md:h-[90vh] gap-4 pl-6">
      <div className="hidden w-[290px] md:flex flex-col flex-none text-wrap overflow-auto gap-2 py-4">
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
            {!archivedNotes.length && (
              <p className="text-sm text-neutral-700 bg-neutral-100 rounded-lg p-2">
                No notes have been archived yet. Move notes here for
                safekeeping, or{" "}
                <span className="underline">create a new note.</span>
              </p>
            )}
          </>
        )}
        {pathname.includes("/tag/") && (
          <p className="text-sm  text-neutral-700">
            All notes with the {tag} tag are shown here.
          </p>
        )}

        {renderNoteCardSummary()}
      </div>
      <NoteCard
        note={pathname == "/" ? viewToggledNote : viewToggledArchivedNote}
      />
      <SidebarRight />
    </div>
  );
};

export default NoteCardSummaryContainer;
