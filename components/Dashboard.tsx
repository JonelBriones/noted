"use client";
import React, { useState } from "react";
import Topbar from "./Topbar";
import { useParams, usePathname } from "next/navigation";
import NoteCardSummaryContainer from "./card/NoteCardSummaryContainer";
import notes from "@/data.json";
import Navigation from "./Navigation";
import { Note } from "@/app/_types/types";

const Dashboard = () => {
  const { tag } = useParams() as { tag: string };
  const pathname = usePathname();

  const viewByTag = notes.filter((note: Note) =>
    note.tags.includes(tag?.charAt(0).toUpperCase() + tag?.slice(1))
  );
  const [search, setSearch] = useState("");
  const openedNotes = notes.filter((note: Note) => note.isArchived == false);
  const archivedNotes = notes.filter((note: Note) => note.isArchived == true);

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex flex-col md:flex-row h-screen">
        <Navigation />
        <div className="flex flex-col flex-grow">
          <Topbar search={search} setSearch={setSearch} />
          <NoteCardSummaryContainer
            apiNotes={
              tag ? viewByTag : pathname == "/" ? openedNotes : archivedNotes
            }
            search={search}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
