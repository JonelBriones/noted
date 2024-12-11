"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="md:hidden flex justify-between p-4">
      <Link
        href={"/"}
        className={`p-1 px-4 ${pathname == "/" ? "bg-blue-50" : ""}`}
      >
        <Image
          src={"/images/icon-home.svg"}
          width={24}
          height={24}
          alt="icon-home"
        />
      </Link>
      <Link
        href={"/search"}
        className={`p-1 px-4 ${pathname == "/search" ? "bg-blue-50" : ""}`}
      >
        <Image
          src={"/images/icon-search.svg"}
          width={24}
          height={24}
          alt="icon-search"
        />
      </Link>
      <Link
        href={"/archived"}
        className={`p-1 px-4 ${pathname == "/archived" ? "bg-blue-50" : ""}`}
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
        className={`p-1 px-4 ${pathname == "/tag" ? "bg-blue-50" : ""}`}
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
        className={`p-1 px-4 ${pathname == "/settings" ? "bg-blue-50" : ""}`}
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
