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
    "TypeScript",
  ]);

  const pathname = usePathname();

  return (
    <div className=" w-[266px] flex flex-col gap-6  p-4">
      <Image src={"/images/logo.svg"} width={95} height={28} alt="icon-tag" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Link href={"/"} className="flex justify-between">
            <div className="flex gap-2 cursor-pointer">
              <Image
                src={"/images/icon-home.svg"}
                width={20}
                height={20}
                alt="icon-tag"
              />
              All Notes
            </div>
            {pathname == "/" && (
              <Image
                src={"/images/icon-chevron-right.svg"}
                width={20}
                height={20}
                alt="icon-tag"
              />
            )}
          </Link>
          <Link href={"/archived"} className="flex justify-between">
            <div className="flex gap-2 cursor-pointer">
              <Image
                src={"/images/icon-archive.svg"}
                width={20}
                height={20}
                alt="icon-tag"
              />
              Archived Notes
            </div>
            {pathname == "/archived" && (
              <Image
                src={"/images/icon-chevron-right.svg"}
                width={20}
                height={20}
                alt="icon-tag"
              />
            )}
          </Link>
        </div>
        <div className="w-full h-[1px] bg-neutral-200" />
        <div className="flex flex-col gap-2">
          <span className="text-neutral-500 text-sm">Tags</span>
          <div className="flex flex-col gap-4">
            {tags.map((tag) => (
              <div key={tag} className="flex gap-2 cursor-pointer">
                <Image
                  src={"/images/icon-tag.svg"}
                  width={20}
                  height={20}
                  alt="icon-tag"
                />
                <span className="text-neutral-700 text-sm">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
