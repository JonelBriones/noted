"use client";
import React from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import NoteSummaryCard from "../card/NoteSummaryCard";
import { usePathname } from "next/navigation";

interface Text {
  text?: string;
}

const Sidebar = ({ text }: Text) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-[242px] gap-4 p-4 pl-6">
      <PrimaryBtn text={"+ Create new Note"} />
      {pathname == "/archived" && (
        <p className="text-sm  text-neutral-700">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      )}
      <NoteSummaryCard />
    </div>
  );
};

export default Sidebar;
