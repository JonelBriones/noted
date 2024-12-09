import React from "react";

import NoteCard from "../card/NoteCard";
import Sidebar from "../sidebar/Sidebar";

const Archived = () => {
  return (
    <div className="flex">
      <Sidebar />
      <NoteCard />
    </div>
  );
};

export default Archived;
