"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Note } from "@/app/_types/types";
import { editNote } from "@/app/_actions/editNote";
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
  const bindedAction = editNote.bind(null, _id);
  const [inputTag, setTag] = useState(tags.join(","));
  const pattern = /^(?!.*,,).*$/;

  const [defaultNote, setDefaultNote] = useState({
    title: title || "",
    tags: tags.join(",") || "",
    content: content || "",
    isArchived: isArchived,
  });
  console.log(isArchived);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name == "tags") {
      if (e.target.value.length == 0) {
        setTag("");
      }

      if (pattern.test(e.target.value)) {
        console.log("trimming value");
        setTag(e.target.value.trim());
      }
    }
    setDefaultNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const timestamp = lastEdited;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "short", // Full weekday name
    year: "numeric", // Full year
    month: "short", // Full month name
    day: "numeric", // Day of the month
    hour: "numeric", // Hour
    minute: "numeric", // Minutes
    second: "numeric", // Seconds
  });

  const renderTagInput = (
    <input
      id="tag"
      type="text"
      placeholder="Add tags separated by commas (e.g. Work, Planning)"
      className="w-full rounded-lg p-1 outline-none"
      pattern="^[a-zA-Z]+(,[a-zA-Z]+)*$"
      value={defaultNote.tags}
      title="Example: gym,health,personal"
      name="tags"
      onChange={(e) => {
        if (e.target.value.length == 0) {
          setDefaultNote({ ...defaultNote, tags: "" });
        }

        if (pattern.test(e.target.value)) {
          setDefaultNote({ ...defaultNote, tags: e.target.value.trim() });
        }
      }}
    />
  );
  useEffect(() => {
    setDefaultNote({
      title: title || "",
      tags: tags.join(",") || "",
      content: content || "",
      isArchived: isArchived,
    });
  }, [note]);

  return (
    <>
      <form
        action={bindedAction}
        autoComplete="off"
        className="hidden md:flex flex-col flex-1 border-l border-r text-sm overflow-auto min-w-[588px]"
      >
        <div className="flex flex-col gap-3 p-4">
          <input
            value={defaultNote.title}
            onChange={onChangeHandler}
            name="title"
            className="text-2xl font-bold outline-none flex-1"
          />
          {!defaultNote.title && <span>Title is required.</span>}
          <div className="flex flex-col gap-3">
            <div className="flex place-items-center">
              <span className="flex place-items-center gap-2 w-[150px]">
                <Image
                  src={"/images/icon-tag.svg"}
                  width={0}
                  height={0}
                  className="size-4"
                  alt="icon-tag"
                />
                Tags
              </span>
              <div>{renderTagInput}</div>
              <input
                type="checkbox"
                name="isArchived"
                checked={isArchived}
                readOnly
                hidden
              />
              <input
                type="text"
                name="tags"
                defaultValue={inputTag ? inputTag : tags.join(",")}
                hidden
              />
            </div>

            {isArchived && (
              <div className="flex place-items-center">
                <span className="flex place-items-center gap-2 w-[150px]">
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
              <span className="flex place-items-center gap-2 w-[150px]">
                <Image
                  src={"/images/icon-clock.svg"}
                  width={0}
                  height={0}
                  className="size-4"
                  alt="icon-clock"
                />
                Last edited
              </span>
              <div>{formattedDate}</div>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-neutral-200" />
        <div className="flex flex-col gap-4 text-neutral-800 flex-1 p-4">
          <textarea
            value={defaultNote.content}
            name="content"
            onChange={onChangeHandler}
            className="outline-none h-full"
          />
        </div>
        <div className="w-full h-[1px] bg-neutral-200" />
        <div className="flex gap-4 w-fit p-4">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-3 px-4 font-bold"
          >
            Save
          </button>
          <button
            type="reset"
            className="bg-neutral-100 text-neutral-600 rounded-lg py-3 px-4 font-bold"
            onClick={() => {
              setDefaultNote({
                title: title,
                tags: tags.join(","),
                content: content,
                isArchived: isArchived,
              });
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default NoteCard;
