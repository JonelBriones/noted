"use client";
import React from "react";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex place-items-center justify-between p-6 py-4 border-b">
      <h1 className="font-bold text-2xl">
        {pathname == "/" ? "All" : "Archived"} Notes
      </h1>
      <div className="flex gap-4">
        <Searchbar />
        <Image
          src={"/images/icon-settings.svg"}
          width={20}
          height={20}
          alt="icon-tag"
        />
      </div>
    </div>
  );
};

export default Topbar;
