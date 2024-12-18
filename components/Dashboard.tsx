"use client";
import React, { useState } from "react";
import Topbar from "./Topbar";
import { useParams } from "next/navigation";
import NoteCardSummaryContainer from "./card/NoteCardSummaryContainer";
import notes from "@/data.json";
import Navigation from "./Navigation";
import { Note } from "@/app/_types/types";

const Dashboard = () => {
  const { tag } = useParams() as { tag: string };
  const [viewByTag, setViewByTag] = useState(
    notes.filter((note: Note) =>
      note.tags.includes(tag?.charAt(0).toUpperCase() + tag?.slice(1))
    )
  );
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex flex-col md:flex-row h-screen">
        <Navigation />
        <div className="flex flex-col flex-grow">
          <Topbar />
          <NoteCardSummaryContainer apiNotes={tag ? viewByTag : notes} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
