"use client";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SidebarRight from "../SidebarActions";
import NoteCard from "./NoteCard";
import NoteCardSummary from "../NoteCardSidebar";
import { useParams, usePathname } from "next/navigation";
import { NoteList } from "@/app/_types/types";
import path from "path";

const NoteCardSummaryContainer = ({ apiNotes }: NoteList) => {
  const pathname = usePathname();
  const { tag } = useParams() as { tag: string };
  console.log("NOTES", apiNotes);

  // const notes = apiNotes.filter((note: any) => note.isArchived == false);
  const [viewToggledNote, setViewToggledNote] = useState(apiNotes[0]);

  const archivedNotes =
    apiNotes.filter((note: any) => note.isArchived == true) || [];

  const renderNoteCardSummary = () => {
    const openedNotes = apiNotes.filter(
      (note: any) => note.isArchived == false
    );
    const archivedNotes = apiNotes.filter(
      (note: any) => note.isArchived == true
    );
    let type =
      pathname == "/"
        ? openedNotes
        : pathname == "/archived"
        ? archivedNotes
        : apiNotes;

    return type?.map((note: any) => (
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

        <div className="">{renderNoteCardSummary()}</div>
      </div>

      <NoteCard note={viewToggledNote} />

      <SidebarRight />
    </div>
  );
};

export default NoteCardSummaryContainer;
