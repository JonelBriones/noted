"use client";
import React from "react";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

interface Params {
  text?: string;
  tag?: string;
}
const Topbar = () => {
  const pathname = usePathname();
  const tag = useParams().tag as string;

  return (
    <div className="flex place-items-center justify-between md:border-b md:h-[10vh]">
      <h1 className="font-bold text-2xl">
        {pathname == "/" && "All Notes"}
        {pathname == "/archived" && "Archived Notes"}
        {pathname.includes("/tag/") &&
          `Notes Tagged: ${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
      </h1>
      <div className="hidden md:flex gap-4">
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
