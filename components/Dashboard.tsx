"use client";
import React, { useEffect } from "react";
import Topbar from "./Topbar";
import { redirect, useParams, usePathname } from "next/navigation";
import NoteCardSummaryContainer from "./card/NoteCardSummaryContainer";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { useAppContext } from "./Providers";
import { useSession } from "next-auth/react";

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
    toggleCreateNote,
    setToggleCreateNote,
  } = useAppContext();

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
        <Navigation />
        <div className="flex flex-col flex-grow">
          <Topbar search={search} setSearch={setSearch} />
          {pathname == "/settings" ? (
            <Settings search={search} setSearch={setSearch} />
          ) : (
            <NoteCardSummaryContainer
              apiNotes={
                (pathname == "/" && openedNotes) ||
                (pathname == "/archived" && archivedNotes) ||
                (pathname.includes(`/tag/${tag}`) && viewByTag)
              }
              search={search}
              viewToggledNote={viewToggledNote}
              setViewToggledNote={setViewToggledNote}
              toggleCreateNote={toggleCreateNote}
              setToggleCreateNote={setToggleCreateNote}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
