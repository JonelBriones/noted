"use client";
import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import Image from "next/image";
import {
  redirect,
  RedirectType,
  useParams,
  usePathname,
} from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAppContext } from "./Providers";
import { FaRegUserCircle } from "react-icons/fa";
import Login from "./forms/Login";

interface Params {
  text?: string;
  tag?: string;
  toggleTag?: string;
  setToggleTag: (tag: string) => void;
  setView: (view: string) => void;
  view: string;
  search: string;
  setSearch: (search: string) => void;
}
const Topbar = ({
  search,
  setSearch,
  toggleTag,
  setToggleTag,
  setView,
  view,
}: Params) => {
  const { darkMode } = useAppContext();
  const { data: session } = useSession();
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     return <Login />;
  //   },
  // });
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     setLoading(false);
  //   }
  // }, [status, session]);

  return (
    <div className=" hidden md:flex w-full place-items-center justify-between md:border-b p-6 dark:border-neutral-700">
      {search ? (
        <h1 className="font-bold text-2xl">Showing results for: {search}</h1>
      ) : (
        <h1 className="font-bold text-2xl dark:text-white">
          {view == "home" && "All Notes"}
          {view == "archived" && "Archived Notes"}
          {view == "tag" && `Notes Tagged:${toggleTag}`}
          {view == "settings" && "Settings"}
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
        {session?.user?.image ? (
          <div>
            <Image
              src={session?.user?.image}
              height={0}
              width={0}
              sizes="100vw"
              className="size-10 rounded-full"
              alt="session-user-profile"
            />
          </div>
        ) : (
          <FaRegUserCircle size={"40px"} />
        )}
      </div>
    </div>
  );
};

export default Topbar;
