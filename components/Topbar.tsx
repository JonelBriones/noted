"use client";
import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Params {
  text?: string;
  tag?: string;
}
const Topbar = ({ search, setSearch }: any) => {
  const pathname = usePathname();
  const tag = useParams().tag as string;

  const { data: session } = useSession();

  return (
    <div className="flex place-items-center justify-between md:border-b p-6 w-full">
      {search ? (
        <h1 className="font-bold text-2xl">Showing results for: {search}</h1>
      ) : (
        <h1 className="font-bold text-2xl">
          {pathname == "/" && "All Notes"}
          {pathname == "/archived" && "Archived Notes"}
          {pathname.includes("/tag/") &&
            `Notes Tagged: ${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
          {pathname == "/settings" && "Settings"}
        </h1>
      )}
      <div className="hidden md:flex gap-4 place-items-center">
        <Searchbar search={search} setSearch={setSearch} />

        <Link href={"/settings"}>
          <Image
            src={"/images/icon-settings.svg"}
            height={0}
            width={0}
            sizes="100vw"
            className="size-5 rounded-full"
            alt="icon-tag"
          />
        </Link>
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
