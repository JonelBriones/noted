"use client";
import React, { useEffect } from "react";
import Topbar from "./Topbar";
import { redirect, useParams, usePathname } from "next/navigation";
import NoteCardSummaryContainer from "./card/NoteCardSummaryContainer";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { useAppContext } from "./Providers";
import { useSession } from "next-auth/react";
import { Note } from "@/app/_types/types";
type NoteType = {
  notesApi: Note[];
};
const Dashboard = ({ notesApi }: NoteType) => {
  console.log(notesApi.reverse());
  let reverseOrder = notesApi?.reverse();
  const { tag } = useParams() as { tag: string };
  const pathname = usePathname();
  const { search, setSearch } = useAppContext();

  const openedNotes = reverseOrder?.filter(
    (note: Note) => note?.isArchived == false
  );
  const archivedNotes = notesApi?.filter(
    (note: Note) => note?.isArchived == true
  );
  const viewByTag = notesApi?.filter(
    (note: Note) => note.tags.includes(tag) && !note.isArchived
  );

  const notes =
    (pathname.includes("/tag") && viewByTag) ||
    (pathname == "/archived" && archivedNotes) ||
    openedNotes;

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>LOADING...</div>;
  }
  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex flex-col md:flex-row h-screen">
        <Navigation openedNotes={openedNotes} />
        <div className="flex flex-col flex-grow">
          <Topbar search={search} setSearch={setSearch} />
          {pathname == "/settings" ? (
            <Settings search={search} setSearch={setSearch} />
          ) : (
            <NoteCardSummaryContainer notes={notes} search={search} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
