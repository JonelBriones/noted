"use client";
import React from "react";
import Topbar from "./Topbar";
import { usePathname } from "next/navigation";
import NoteCardSummaryContainer from "./card/NoteCardSummaryContainer";
import notes from "@/data.json";
const Dashboard = () => {
  // const pathname = usePathname()
  return (
    <div>
      <Topbar />
      <NoteCardSummaryContainer notes={notes} />
    </div>
  );
};

export default Dashboard;
