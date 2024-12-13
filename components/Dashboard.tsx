"use client";
import React, { useState } from "react";
import Topbar from "./Topbar";
import { useParams, usePathname } from "next/navigation";
import NoteCardSummaryContainer from "./card/NoteCardSummaryContainer";
import notes from "@/data.json";
import Navigation from "./Navigation";
const Dashboard = () => {
  const { tag } = useParams();
  const [includeTag, setIncludeTag] = useState(
    notes.filter((note) =>
      note.tags.includes(tag?.charAt(0).toUpperCase() + tag?.slice(1))
    )
  );
  console.log(includeTag);
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-blue-50">
      <Navigation />
      <div>
        <Topbar />
        <NoteCardSummaryContainer notes={includeTag || notes} />
      </div>
    </div>
  );
};

export default Dashboard;
