"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useAppContext } from "./Providers";

const Searchbar = ({ search, setSearch }: any) => {
  const { darkMode } = useAppContext();
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-[300px] flex gap-4 border rounded-lg p-2 text-neutral-500 text-sm dark:bg-stone-900 dark:border-neutral-700 cursor-pointer">
      <button onClick={() => searchRef?.current?.focus()}>
        <Image
          src={"/images/icon-search.svg"}
          width={20}
          height={20}
          alt="icon-tag"
          style={{ filter: darkMode && "invert(100%)" }}
        />
      </button>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search by title, content, or tags..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="flex-grow outline-none w-full dark:bg-stone-900 dark:text-white"
      />
    </div>
  );
};

export default Searchbar;
