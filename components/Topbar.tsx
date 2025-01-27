"use client";
import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { redirect, useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAppContext } from "./Providers";

interface Params {
  text?: string;
  tag?: string;
  toggleTag?: string;
  setToggleTag: () => void;
  setView: () => void;
}
const Topbar = ({
  search,
  setSearch,
  toggleTag,
  setToggleTag,
  setView,
}: any) => {
  const pathname = usePathname();
  const tag = useParams().tag as string;

  const { data: session } = useSession();
  const { darkMode } = useAppContext();

  return (
    <div className=" hidden md:flex w-full place-items-center justify-between md:border-b p-6 dark:border-neutral-700">
      {search ? (
        <h1 className="font-bold text-2xl">Showing results for: {search}</h1>
      ) : (
        <h1 className="font-bold text-2xl dark:text-white">
          {pathname == "/" && "All Notes"}
          {pathname == "/archived" && "Archived Notes"}
          {pathname.includes("/tag/") &&
            `Notes Tagged: ${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
          {pathname == "/settings" && "Settings"}
        </h1>
      )}
      <div className="hidden md:flex gap-4 place-items-center">
        <Searchbar search={search} setSearch={setSearch} />

        <button
          onClick={() => {
            setToggleTag(""), setView("settings");
          }}
        >
          <Image
            src={"/images/icon-settings.svg"}
            height={0}
            width={0}
            sizes="100vw"
            className="size-5 rounded-full"
            alt="icon-tag"
            style={{ filter: darkMode && "invert(100%)" }}
          />
        </button>
        {session?.user && (
          <div>
            <Image
              src={session.user.image || "/"}
              height={0}
              width={0}
              sizes="100vw"
              className="size-10 rounded-full"
              alt="session-user-profile"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
