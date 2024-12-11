import React from "react";

import NoteCard from "../card/NoteCard";
import Sidebar from "../NoteCardSidebar";
import Navigation from "../Navigation";
import Topbar from "../Topbar";
import SidebarRight from "../SidebarActions";
import MobileNavbar from "../mobile/MobileNavbar";

const Archived = () => {
  return (
    <div>
      <div className="container hidden md:flex h-screen mx-4">
        <Navigation />
        <div className="flex flex-col border-l w-full">
          <Topbar />
          <div className="flex">
            <Sidebar
              text={
                "All your archived notes are stored here. You can restore or delete them anytime."
              }
            />
            <NoteCard />
            <SidebarRight />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden w-full h-screen justify-between mx-4">
        <Topbar />
        <div className="flex-1">
          <div className="flex">
            <Sidebar />
            <NoteCard />
            <SidebarRight />
          </div>
        </div>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Archived;
