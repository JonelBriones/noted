"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navigation = () => {
  const [tags, setTags] = useState([
    "Cooking",
    "Dev",
    "Fitness",
    "Health",
    "Personal",
    "React",
    "Recipes",
    "Travel",
    "Typescript",
  ]);

  const pathname = usePathname();

  const toggleChevron = (
    <Image
      src={"/images/icon-chevron-right.svg"}
      width={20}
      height={20}
      alt="icon-chevron-right"
    />
  );

  return (
    <div className="hidden w-[266px] md:flex flex-col flex-none gap-6 border-r  p-4">
      <Image src={"/images/logo.svg"} width={95} height={28} alt="logo" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Link
            href={"/"}
            className={`flex justify-between p-2 rounded-lg ${
              pathname == `/` ? "bg-neutral-100" : ""
            }`}
          >
            <div className="flex gap-2 cursor-pointer">
              <Image
                src={"/images/icon-home.svg"}
                width={0}
                height={0}
                className="size-5"
                alt="icon-home"
              />
              All Notes
            </div>
            {pathname == "/" && toggleChevron}
          </Link>
          <Link
            href={"/archived"}
            className={`flex justify-between p-2 rounded-lg ${
              pathname == `/archived` ? "bg-neutral-100" : ""
            }`}
          >
            <div className="flex gap-2 cursor-pointer">
              <Image
                src={"/images/icon-archive.svg"}
                width={0}
                height={0}
                className="size-5"
                alt="icon-archive"
              />
              Archived Notes
            </div>
            {pathname == "/archived" && toggleChevron}
          </Link>
        </div>
        <div className="w-full h-[1px] bg-neutral-200" />
        <div className="flex flex-col gap-2">
          <span className="text-neutral-500 text-sm pl-2">Tags</span>
          <div className="flex flex-col">
            {tags.map((tag) => (
              <Link
                href={`/tag/${tag.toLowerCase()}`}
                key={tag}
                className={`flex justify-between cursor-pointer p-2 rounded-lg ${
                  pathname == `/tag/${tag.toLowerCase()}`
                    ? "bg-neutral-100"
                    : ""
                }`}
              >
                <div className="flex gap-2">
                  <Image
                    src={"/images/icon-tag.svg"}
                    width={0}
                    height={0}
                    className="size-5"
                    alt="icon-tag"
                  />
                  <span className="text-neutral-700 text-sm">{tag}</span>
                </div>
                {pathname == `/tag/${tag.toLowerCase()}` && toggleChevron}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
