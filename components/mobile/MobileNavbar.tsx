"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useAppContext } from "../Providers";
interface Params {
  setToggleTag: (tag: string) => void;
  setView: (tag: string) => void;
  view: string;
}
const MobileNavbar = ({ setView, setToggleTag, view }: Params) => {
  const { setViewToggledNote, darkMode } = useAppContext();

  const routes = ["home", "archive"];

  return (
    <div className="md:hidden flex flex-none justify-between p-4 dark:bg-stone-900">
      {routes.map((route) => (
        <button
          key={route}
          onClick={() => {
            setView(route), setToggleTag(""), setViewToggledNote(undefined);
          }}
          className={`p-1 px-4 rounded-lg  ${
            route == view ? "bg-neutral-200 dark:bg-neutral-100" : ""
          }`}
        >
          <Image
            src={`/images/icon-${route}.svg`}
            width={24}
            height={24}
            alt={`icon-home-${route}`}
            style={{ filter: darkMode && route != view && "invert(100%)" }}
          />
        </button>
      ))}
      <button
        onClick={() => {
          setView("search"), setToggleTag("");
        }}
        className={`p-1 px-4 rounded-lg ${
          "search" == view ? "bg-neutral-200 dark:bg-neutral-100" : ""
        }`}
      >
        <Image
          src={`/images/icon-${"search"}.svg`}
          width={24}
          height={24}
          alt={`icon-home-${"search"}`}
          style={{ filter: darkMode && "search" != view && "invert(100%)" }}
        />
      </button>
      <button
        onClick={() => {
          setView("settings"), setToggleTag("");
        }}
        className={`p-1 px-4 rounded-lg ${
          "settings" == view ? "bg-neutral-200 dark:bg-neutral-100" : ""
        }`}
      >
        <Image
          src={`/images/icon-${"settings"}.svg`}
          width={24}
          height={24}
          alt={`icon-home-${"settings"}`}
          style={{ filter: darkMode && "settings" != view && "invert(100%)" }}
        />
      </button>
    </div>
  );
};

export default MobileNavbar;
