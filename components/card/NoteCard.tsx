"use client";
import Image from "next/image";
import React from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import { Note } from "@/app/_types/types";
interface Params {
  note?: Note;
}
const NoteCard = ({ note }: Params) => {
  if (!note) {
    return (
      <div className="hidden md:flex  flex-col flex-1 gap-4 p-4 border-l border-r text-sm"></div>
    );
  }
  const { _id, title, tags, content, lastEdited, isArchived } = note;

  const formatLastEdited = new Date(lastEdited).toLocaleString("en-us", {
    timezone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  } as any);

  // if want to format note with new lines add "\n" to content string
  let convert = content
    ?.split("\n")
    ?.map((line: string, index: number) => <div key={index}>{line}</div>);

  return (
    <div className="hidden md:flex flex-col flex-1 border-l border-r text-sm overflow-auto min-w-[588px]">
      <div className="flex flex-col gap-3 p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex flex-col gap-3">
          <div className="flex place-items-center">
            <span className="flex basis-1/3 place-items-center gap-2 w-[115px]">
              <Image
                src={"/images/icon-tag.svg"}
                width={0}
                height={0}
                className="size-4"
                alt="icon-tag"
              />
              Tags
            </span>
            <div className="flex gap-1">
              {tags?.map((tag: any, idx: number) => (
                <span key={idx}>
                  {tag}
                  {idx < tags.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>

          {isArchived && (
            <div className="flex place-items-center">
              <span className="flex basis-1/3 place-items-center gap-2 w-[115px]">
                <Image
                  src={"/images/icon-status.svg"}
                  width={0}
                  height={0}
                  className="size-4"
                  alt="icon-status"
                />
                Status
              </span>
              <span>Archived</span>
            </div>
          )}
          <div className="flex place-items-center">
            <span className="flex basis-1/3 place-items-center gap-2 w-[115px]">
              <Image
                src={"/images/icon-clock.svg"}
                width={0}
                height={0}
                className="size-4"
                alt="icon-clock"
              />
              Last edited
            </span>
            <span>{formatLastEdited}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-neutral-200" />
      <div className="flex flex-col gap-4 text-neutral-800 flex-1 p-4">
        {convert}
      </div>
      <div className="w-full h-[1px] bg-neutral-200" />
      <div className="flex gap-4 w-fit p-4">
        <PrimaryBtn
          text={"Save Note"}
          textColor={"text-white"}
          backgroundColor={"bg-blue-500"}
        />
        <PrimaryBtn
          text={"Cancel"}
          textColor={"text-neutral-800"}
          backgroundColor={"bg-neutral-100"}
        />
      </div>
    </div>
  );
};

export default NoteCard;
