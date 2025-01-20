"use client";
import React, { useEffect, useState } from "react";
import SidebarRight from "../SidebarActions";
import NoteCard from "./NoteCard";
import NoteCardSummary from "../NoteCardSidebar";
import { useParams, usePathname } from "next/navigation";
import { Note } from "@/app/_types/types";
import NoteForm from "../forms/NoteForm";

interface Params {
  notes: any;
  search: string;
}

const NoteCardSummaryContainer = ({ notes, search }: Params) => {
  const [viewToggledNote, setViewToggledNote] = useState<Note | undefined>(
    notes[0]
  );
  const pathname = usePathname();
  const { tag } = useParams() as { tag: string };

  let formattedSearch = search?.toLowerCase();
  const [toggleCreateNote, setToggleCreateNote] = useState(false);

  const searchNotes = notes?.filter(
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
        <div
          onClick={() => {
            setViewToggledNote(note), setToggleCreateNote(false);
          }}
          key={note._id}
        >
          <NoteCardSummary note={note} viewToggledNote={viewToggledNote} />
        </div>
      ));
    } else
      return notes?.map((note: any) => (
        <div
          onClick={() => {
            setViewToggledNote(note), setToggleCreateNote(false);
          }}
          key={note._id}
        >
          <NoteCardSummary note={note} viewToggledNote={viewToggledNote} />
        </div>
      ));
  };

  return (
    <div className="flex flex-grow gap-4 pl-6 overflow-hidden">
      <div className="hidden w-[290px] md:flex flex-col flex-none text-wrap overflow-y-auto gap-2 py-4">
        <button
          onClick={() => {
            setToggleCreateNote(true), setViewToggledNote(undefined);
          }}
          className={`block text-center p-2 text-white bg-blue-500 rounded-lg text-sm font-medium cursor-pointer px-3 py-2`}
        >
          + Create new note
        </button>
        {pathname == "/archived" && (
          <>
            <p className="text-sm  text-neutral-700">
              All your archived notes are stored here. You can restore or delete
              them anytime.
            </p>
            {!notes?.length && (
              <p className="text-sm text-neutral-700 bg-neutral-100 rounded-lg p-2">
                No notes have been archived yet. Move notes here for
                safekeeping, or{" "}
                <span className="underline">create a new note.</span>
              </p>
            )}
          </>
        )}
        {pathname == "/" && notes?.length == 0 && (
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
      {toggleCreateNote ? (
        <NoteForm
          toggleCreateNote={toggleCreateNote}
          setToggleCreateNote={setToggleCreateNote}
          setViewToggledNote={setViewToggledNote}
          notes={notes}
        />
      ) : (
        notes?.find((note: Note) => note._id == viewToggledNote?._id) && (
          <>
            <NoteCard note={viewToggledNote} />
            <SidebarRight note={viewToggledNote} />
          </>
        )
      )}
    </div>
  );
};

export default NoteCardSummaryContainer;
