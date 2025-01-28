"use client";
import React, { useState } from "react";
import SidebarRight from "../SidebarActions";
import NoteCard from "./NoteCard";
import NoteCardSummary from "../NoteCardSidebar";
import { Note } from "@/app/_types/types";
import NoteForm from "../forms/NoteForm";
import { useAppContext } from "../Providers";
import Image from "next/image";

interface Params {
  notes?: Note[];
  search: string;
  setView: (view: string) => void;
  view?: string;
  toggleTag?: string;
  toggleTagView?: boolean;
  setTag?: (view: string) => void;
  setToggleTagView?: (boolean: boolean) => void;
}

const NoteCardSummaryContainer = ({
  notes,
  search,
  setView,
  view,
  toggleTag,
  toggleTagView,
  setToggleTagView,
  setTag,
}: Params) => {
  const {
    viewToggledNote,
    setViewToggledNote,
    toggleCreateNote,
    setToggleCreateNote,
  } = useAppContext();
  let oldestToLatestUpdated = notes?.sort(
    (a: any, b: any) => b.lastEdited - a.lastEdited
  );

  let formattedSearch = search?.toLowerCase();

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

          {view == "archive" && (
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
          {view == "home" && notes?.length == 0 && (
            <>
              <p className="text-sm  text-neutral-700 mt-3 dark:text-white">
                You don’t have any notes yet. Start a new note to capture your
                thoughts and ideas.
              </p>
            </>
          )}
          {view == "tag" && (
            <p className="text-sm  text-neutral-700 mt-3 dark:text-white">
              All notes with the {toggleTag} tag are shown here.
            </p>
          )}

          <div className="flex flex-col mt-3 overflow-y-auto w-[270px]">
            {renderNoteCardSummary()}
          </div>
        </div>

        <div className="flex w-full">
          {toggleCreateNote ? (
            <NoteForm
              setToggleCreateNote={setToggleCreateNote}
              setViewToggledNote={setViewToggledNote}
              notes={notes || []}
            />
          ) : (
            notes?.find((note: Note) => note._id == viewToggledNote?._id) && (
              <>
                <NoteCard note={viewToggledNote} />
                <SidebarRight
                  note={viewToggledNote}
                  notes={notes}
                  setView={setView}
                />
              </>
            )
          )}
        </div>
      </div>

      {/*   MOBILE */}

      <div className="md:hidden flex w-full">
        {viewToggledNote ? (
          <>
            {toggleCreateNote ? (
              <NoteForm
                setToggleCreateNote={setToggleCreateNote}
                setViewToggledNote={setViewToggledNote}
                notes={notes || []}
                setView={setView}
              />
            ) : (
              notes?.find((note: Note) => note._id == viewToggledNote?._id) && (
                <>
                  <NoteCard
                    note={viewToggledNote}
                    setToggleCreateNote={setToggleCreateNote}
                    setView={setView}
                  />
                </>
              )
            )}
          </>
        ) : (
          <>
            <div className="flex flex-grow flex-col mt-3 overflow-y-auto">
              {renderNoteCardSummary()}
            </div>
            {/* <div className="md:hidden absolute bottom-[100px]  right-[20px] flex flex-col gap-4">
              <button
                onClick={() => {
                  // setViewToggledNote(undefined),
                  setToggleTagView?.(!toggleTagView);
                }}
                className=" bg-blue-500 rounded-full size-12 flex place-items-center justify-center cursor-pointer z-10"
              >
                <Image
                  src={"/images/icon-tag.svg"}
                  width={0}
                  height={0}
                  className="size-5"
                  alt="icon-tag"
                  style={{ filter: "invert(100%)" }}
                />
              </button>
              {toggleTagView && !search ? (
                <button
                  onClick={() => {
                    setViewToggledNote(undefined), setToggleTagView?.(false);
                    setView("home"), setTag?.("");
                  }}
                  className=" bg-red-500 rounded-full size-12 flex place-items-center justify-center cursor-pointer z-10"
                >
                  <Image
                    src={"/images/icon-tag.svg"}
                    width={0}
                    height={0}
                    className="size-5"
                    alt="icon-tag"
                    style={{ filter: "invert(100%)" }}
                  />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setToggleCreateNote(true),
                      setViewToggledNote(undefined),
                      setView("create");
                  }}
                  className=" bg-blue-500 rounded-full size-12 flex place-items-center justify-center cursor-pointer"
                >
                  <Image
                    src={"/images/icon-plus.svg"}
                    width={32}
                    height={32}
                    alt="icon-plus"
                    style={{ filter: "invert(100%)" }}
                  />
                </button>
              )}
            </div> */}
          </>
        )}
      </div>
    </>
  );
};

export default NoteCardSummaryContainer;
