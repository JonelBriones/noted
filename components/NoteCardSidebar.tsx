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
      className={`flex flex-col cursor-pointer rounded-lg mb-2 ${
        _id == viewToggledNote?._id
          ? "bg-neutral-100 dark:bg-neutral-800"
          : "rounded-none border-b border-neutral-200 dark:border-neutral-700"
      }`}
    >
      <div className="flex flex-col gap-3 p-2">
        <h1 className="font-bold text-black dark:text-white">{title}</h1>
        {tags && (
          <div className="flex gap-2 text-neutral-950 text-xs">
            {tags?.map((tag: any) => (
              <span
                key={tag}
                className={`flex place-items-center bg-neutral-200 px-2 py-1 rounded-md dark:text-white dark:bg-neutral-600 ${
                  _id == viewToggledNote?._id ? "dark:text-neutral-800" : ""
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="text-neutral-700 text-xs dark:text-white">
          {formatLastEdited}
        </span>
      </div>
    </div>
  );
};

export default NoteCardSummary;
