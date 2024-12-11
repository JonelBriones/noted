"use client";
import React, { useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SidebarRight from "../SidebarActions";
import NoteCard from "./NoteCard";
import NoteCardSummary from "../NoteCardSidebar";
import { useParams, usePathname } from "next/navigation";

const NoteCardSummaryContainer = ({ notes }: any) => {
  const pathname = usePathname();
  const { tag } = useParams();

  const [viewToggledNote, setViewToggledNote] = useState(notes[0]);
  return (
    <div className="flex md:h-[90vh] gap-4">
      <div className="hidden md:flex flex-col overflow-auto gap-4">
        <PrimaryBtn
          text={"+ Create new Note"}
          backgroundColor={"bg-blue-500"}
        />
        {pathname == "/archived" && (
          <p className="text-sm  text-neutral-700">
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </p>
        )}
        {pathname.includes("/tag/") && (
          <p className="text-sm  text-neutral-700">
            All notes with the {tag} tag are shown here.
          </p>
        )}
        <>
          {notes?.map((note: any) => (
            <div onClick={() => setViewToggledNote(note)} key={note._id}>
              <NoteCardSummary note={note} viewToggledNote={viewToggledNote} />
            </div>
          ))}
        </>
      </div>
      <NoteCard note={viewToggledNote} />
      <SidebarRight />
    </div>
  );
};

export default NoteCardSummaryContainer;
