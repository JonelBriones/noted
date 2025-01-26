"use client";
import React, { useState } from "react";
import SidebarRight from "../SidebarActions";
import NoteCard from "./NoteCard";
import NoteCardSummary from "../NoteCardSidebar";
import { useParams, usePathname } from "next/navigation";
import { Note } from "@/app/_types/types";
import NoteForm from "../forms/NoteForm";
import { useAppContext } from "../Providers";
import Image from "next/image";

interface Params {
  notes: any;
  search: string;
}

const NoteCardSummaryContainer = ({ notes, search }: Params) => {
  const { viewToggledNote, setViewToggledNote } = useAppContext();
  let oldestToLatestUpdated = notes.sort(
    (a: any, b: any) => b.lastEdited - a.lastEdited
  );

  const pathname = usePathname();
  const { tag } = useParams() as { tag: string };

  let formattedSearch = search?.toLowerCase();
  const [toggleCreateNote, setToggleCreateNote] = useState(false);

  const searchNotes = oldestToLatestUpdated?.filter(
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
      return oldestToLatestUpdated?.map((note: any) => (
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
    <>
      <div className="hidden md:flex w-full flex-1 gap-4 pl-6 overflow-hidden">
        <div className="w-[290px] flex flex-col gap-2 py-4">
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
              <p className="text-sm  text-neutral-700 dark:text-white">
                All your archived notes are stored here. You can restore or
                delete them anytime.
              </p>
              {!notes?.length && (
                <p className="text-sm text-neutral-700 bg-neutral-100 rounded-lg p-2 dark:text-white dark:bg-neutral-600">
                  No notes have been archived yet. Move notes here for
                  safekeeping, or{" "}
                  <span className="underline">create a new note.</span>
                </p>
              )}
            </>
          )}
          {pathname == "/" && notes?.length == 0 && (
            <>
              <p className="text-sm  text-neutral-700 mt-3 dark:text-white">
                You don’t have any notes yet. Start a new note to capture your
                thoughts and ideas.
              </p>
            </>
          )}
          {pathname.includes("/tag/") && (
            <p className="text-sm  text-neutral-700 mt-3 dark:text-white">
              All notes with the {tag} tag are shown here.
            </p>
          )}

          <div className="flex flex-col mt-3 overflow-y-auto w-[270px]">
            {renderNoteCardSummary()}
          </div>
        </div>

        <div className="flex w-full">
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
                <SidebarRight note={viewToggledNote} notes={notes} />
              </>
            )
          )}
        </div>
      </div>

      {/*   MOBILE */}

      <div className="md:hidden flex w-full">
        {viewToggledNote ? (
          <div className="flex w-full ">
            {toggleCreateNote ? (
              <NoteForm
                toggleCreateNote={toggleCreateNote}
                setToggleCreateNote={setToggleCreateNote}
                setViewToggledNote={setViewToggledNote}
                notes={notes}
              />
            ) : (
              notes?.find((note: Note) => note._id == viewToggledNote?._id) && (
                <NoteCard note={viewToggledNote} />
              )
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-grow flex-col mt-3 overflow-y-auto">
              {renderNoteCardSummary()}
            </div>
            <button
              onClick={() => {
                setToggleCreateNote(true), setViewToggledNote(undefined);
              }}
              className="md:hidden absolute bottom-[100px] right-[20px] bg-blue-500 rounded-full size-12 flex place-items-center justify-center cursor-pointer"
            >
              <Image
                src={"/images/icon-plus.svg"}
                width={32}
                height={32}
                alt="icon-plus"
                style={{ filter: "invert(100%)" }}
              />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default NoteCardSummaryContainer;
