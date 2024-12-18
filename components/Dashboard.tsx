"use client";
import React, { useState } from "react";
import Topbar from "./Topbar";
import { useParams, usePathname } from "next/navigation";
import NoteCardSummaryContainer from "./card/NoteCardSummaryContainer";
import notes from "@/data.json";
import Navigation from "./Navigation";
import { Note } from "@/app/_types/types";
import Settings from "./Settings";

const Dashboard = () => {
  const { tag } = useParams() as { tag: string };
  const pathname = usePathname();

  const viewByTag = notes.filter((note: Note) =>
    note.tags.includes(tag?.charAt(0).toUpperCase() + tag?.slice(1))
  );

  const openedNotes = notes.filter((note: Note) => note.isArchived == false);
  const archivedNotes = notes.filter((note: Note) => note.isArchived == true);
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex flex-col md:flex-row h-screen">
        <Navigation />
        <div className="flex flex-col flex-grow">
          <Topbar search={search} setSearch={setSearch} />
          {pathname == "/settings" && (
            <Settings search={search} setSearch={setSearch} />
          )}
          {pathname == "/archived" && (
            <NoteCardSummaryContainer
              apiNotes={archivedNotes}
              search={search}
            />
          )}
          {pathname.includes("tag") && (
            <NoteCardSummaryContainer apiNotes={viewByTag} search={search} />
          )}
          {pathname == "/" && (
            <NoteCardSummaryContainer apiNotes={openedNotes} search={search} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
