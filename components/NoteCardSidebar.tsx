"use client";
import React, { useState } from "react";

interface Params {
  text?: string;
  tag?: string;
  note?: any;
  viewToggledNote: any;
}

const NoteCardSummary = ({ note, viewToggledNote }: Params) => {
  const { _id, title, tags, lastEdited } = note;
  const formatLastEdited = new Date(lastEdited).toLocaleString("en-us", {
    timezone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  } as any);
  return (
    <div
      className={`flex flex-col cursor-pointer rounded-lg border-b ${
        _id == viewToggledNote?._id ? "md:bg-neutral-100 border-b-white" : ""
      }`}
    >
      <div className="flex flex-col gap-3 p-2 rounded-md border-b md:border-none">
        <h1 className="font-bold text-black">{title}</h1>
        <div className="flex gap-2 text-neutral-950 text-xs">
          {tags?.map((tag: any) => (
            <span
              key={tag}
              className="flex place-items-center bg-neutral-200 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-neutral-700 text-xs">{formatLastEdited}</span>
      </div>
    </div>
  );
};

export default NoteCardSummary;
