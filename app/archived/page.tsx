"use server";
import NoteCard from "@/components/card/NoteCard";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar
        text={
          "All your archived notes are stored here. You can restore or delete them anytime."
        }
      />
      <NoteCard />
    </div>
  );
};

export default page;
