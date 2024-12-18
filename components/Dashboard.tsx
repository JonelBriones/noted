"use client";
import React from "react";
import Topbar from "./Topbar";
import { useParams, usePathname } from "next/navigation";
import NoteCardSummaryContainer from "./card/NoteCardSummaryContainer";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { useAppContext } from "./Providers";

const Dashboard = () => {
  const { tag } = useParams() as { tag: string };
  const pathname = usePathname();
  const {
    viewToggledNote,
    setViewToggledNote,
    search,
    setSearch,
    archivedNotes,
    viewByTag,
    openedNotes,
  } = useAppContext();
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex flex-col md:flex-row h-screen">
        <Navigation />
        <div className="flex flex-col flex-grow">
          <Topbar search={search} setSearch={setSearch} />
          {pathname == "/settings" && (
            <Settings search={search} setSearch={setSearch} />
          )}
          <NoteCardSummaryContainer
            apiNotes={
              (pathname == "/" && openedNotes) ||
              (pathname == "/archived" && archivedNotes) ||
              (pathname.includes(`/tag/${tag}`) && viewByTag)
            }
            search={search}
            viewToggledNote={viewToggledNote}
            setViewToggledNote={setViewToggledNote}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
