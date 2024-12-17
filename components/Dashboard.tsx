"use client";
import React, { useState } from "react";
import Topbar from "./Topbar";
import { useParams } from "next/navigation";
import NoteCardSummaryContainer from "./card/NoteCardSummaryContainer";
import notes from "@/data.json";
import Navigation from "./Navigation";

const Dashboard = () => {
  const { tag } = useParams() as { tag: string };
  const [includeTag, setIncludeTag] = useState(
    notes.filter((note) =>
      note.tags.includes(tag?.charAt(0).toUpperCase() + tag?.slice(1))
    ) || notes
  );
  console.log(includeTag);
  return (
    <div className="flex flex-col md:flex-row">
      <Navigation />
      <div className="flex flex-col flex-grow">
        <Topbar />
        <NoteCardSummaryContainer apiNotes={notes} />
      </div>
    </div>
  );
};

export default Dashboard;
