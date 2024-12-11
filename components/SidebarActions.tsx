"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarRight = () => {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex flex-col w-[242px] gap-4 p-4">
      <div className="flex flex-col gap-3 text-sm">
        <button className="flex gap-2 border rounded-lg p-3">
          <Image
            src={"/images/icon-archive.svg"}
            width={20}
            height={20}
            alt="icon-tag"
          />
          {pathname == "/" ? "Restore" : "Archive"} Note
        </button>
        <button className="flex gap-2 border rounded-lg p-3">
          <Image
            src={"/images/icon-delete.svg"}
            width={20}
            height={20}
            alt="icon-tag"
          />
          Delete Note
        </button>
      </div>
    </div>
  );
};

export default SidebarRight;
