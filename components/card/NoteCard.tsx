import Image from "next/image";
import React from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";

const NoteCard = ({ note }: any) => {
  const { _id, title, tags, content, lastEdited, isArchived } = note;

  const formatLastEdited = new Date(lastEdited).toLocaleString("en-us", {
    timezone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  } as any);

  // if want to format note with new lines add "\n" to content string
  let convert = content
    .split("\n")
    ?.map((line: string, index: number) => <div key={index}>{line}</div>);

  return (
    <div className="hidden md:flex flex-col flex-4 gap-4 p-4 border-l border-r text-sm">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex flex-col  ">
          <div className="flex place-items-center">
            <span className="flex gap-2 p-2 w-[150px]">
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
          <div className="flex place-items-center">
            <span className="flex gap-2 p-2 w-[150px]">
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
        <div className="w-full h-[1px] bg-neutral-200" />
      </div>
      <div className="flex flex-col gap-4 text-neutral-800 flex-1">
        {convert}
      </div>
      <div className="flex gap-4 w-fit">
        <PrimaryBtn text={"Save Note"} textColor={"bg-blue-500"} />
        <PrimaryBtn
          text={"Cancel"}
          textColor={"text-neutral-600"}
          backgroundColor={"bg-neutral-100"}
        />
      </div>
    </div>
  );
};

export default NoteCard;
