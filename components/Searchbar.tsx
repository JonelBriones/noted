"use client";
import Image from "next/image";
import React, { useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="w-[300px] flex gap-4 border rounded-lg p-2 text-neutral-500 text-sm">
      <Image
        src={"/images/icon-search.svg"}
        width={20}
        height={20}
        alt="icon-tag"
      />
      <input
        type="text"
        placeholder="Search by title, content, or tags..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="flex-grow outline-none w-full"
      />
    </div>
  );
};

export default Searchbar;
