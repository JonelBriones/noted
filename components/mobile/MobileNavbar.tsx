"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useAppContext } from "../Providers";

const MobileNavbar = () => {
  const pathname = usePathname();
  const { showMobileSearch, setShowMobileSearch } = useAppContext();
  const toggleMobileSearch = () => {
    setShowMobileSearch(true);
  };
  return (
    <div className="md:hidden flex flex-none justify-between p-4">
      <Link
        href={"/"}
        className={`p-1 px-4 rounded-lg ${pathname == "/" ? "bg-blue-50" : ""}`}
      >
        <Image
          src={"/images/icon-home.svg"}
          width={24}
          height={24}
          alt="icon-home"
        />
      </Link>
      <button onClick={toggleMobileSearch} className="rounded-lg">
        <Image
          src={"/images/icon-search.svg"}
          width={24}
          height={24}
          alt="icon-search"
        />
      </button>
      <Link
        href={"/archived"}
        className={`p-1 px-4 rounded-lg ${
          pathname == "/archived" ? "bg-blue-50" : ""
        }`}
      >
        <Image
          src={"/images/icon-archive.svg"}
          width={24}
          height={24}
          alt="icon-archive"
        />
      </Link>
      <Link
        href={"/tag"}
        className={`p-1 px-4 rounded-lg ${
          pathname == "/tag" ? "bg-blue-50" : ""
        }`}
      >
        <Image
          src={"/images/icon-tag.svg"}
          width={24}
          height={24}
          alt="icon-tag"
        />
      </Link>
      <Link
        href={"/settings"}
        className={`p-1 px-4 rounded-lg ${
          pathname == "/settings" ? "bg-blue-50" : ""
        }`}
      >
        <Image
          src={"/images/icon-settings.svg"}
          width={24}
          height={24}
          alt="icon-settings"
        />
      </Link>
    </div>
  );
};

export default MobileNavbar;
