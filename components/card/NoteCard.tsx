"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Note } from "@/app/_types/types";
import { editNote } from "@/app/_actions/editNote";
import { useAppContext } from "../Providers";
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
  const { darkMode, setViewToggledNote } = useAppContext();
  const bindedAction = editNote.bind(null, _id);
  const [inputTag, setTag] = useState(tags.join(","));
  const pattern = /^(?!.*,,).*$/;

  const [defaultNote, setDefaultNote] = useState({
    title: title || "",
    tags: tags.join(",") || "",
    content: content || "",
    isArchived: isArchived,
  });

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
  const day = date.getDate();
  const month = date.toLocaleString("en-US", {
    month: "long", // Full month name
  });
  const time = date.toLocaleString("en-US", {
    hour: "numeric", // Hour
    minute: "numeric", // Minutes
  });
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year} at ${time}`;

  const renderTagInput = (
    <input
      id="tag"
      type="text"
      placeholder="Add tags separated by commas (e.g. Work, Planning)"
      className="w-full rounded-lg p-1 outline-none dark:bg-stone-900 dark:text-white"
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
        className="flex flex-col flex-1 md:border-l md:border-r border-t md:border-t-0 text-sm overflow-auto dark:border-neutral-700"
        spellCheck="false"
      >
        <div className="flex flex-col gap-3 p-4">
          <input
            value={defaultNote.title}
            onChange={onChangeHandler}
            name="title"
            className="text-2xl font-bold outline-none flex-1 dark:bg-stone-900 dark:text-white"
          />
          {!defaultNote.title && <span>Title is required.</span>}
          <div className="flex flex-col gap-3">
            <div className="flex place-items-center gap-4">
              <span className="flex place-items-center gap-4 md:w-[150px]">
                <Image
                  src={"/images/icon-tag.svg"}
                  width={0}
                  height={0}
                  className="size-4"
                  alt="icon-tag"
                  style={{ filter: darkMode && "invert(100%)" }}
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
              <div className="flex place-items-center gap-4">
                <span className="flex place-items-center gap-2 md:w-[150px]">
                  <Image
                    src={"/images/icon-status.svg"}
                    width={0}
                    height={0}
                    className="size-4"
                    alt="icon-status"
                    style={{ filter: darkMode && "invert(100%)" }}
                  />
                  Status
                </span>
                <span className="hidden md:block">Archived</span>
              </div>
            )}
            <div className="flex place-items-center gap-4">
              <span className="flex place-items-center gap-2 md:w-[150px]">
                <Image
                  src={"/images/icon-clock.svg"}
                  width={0}
                  height={0}
                  className="size-4"
                  alt="icon-clock"
                  style={{ filter: darkMode && "invert(100%)" }}
                />
                <span className="hidden md:block">Last edited</span>
              </span>
              <div>{formattedDate}</div>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-700" />
        <div className="flex flex-col gap-4 text-neutral-900 flex-1 p-4">
          <textarea
            value={defaultNote.content}
            name="content"
            onChange={onChangeHandler}
            className="outline-none h-full dark:bg-stone-900 dark:text-white"
          />
        </div>
        <div className="flex gap-4 w-fit p-4 bg-blue absolute md:static bottom-[100px] right-[20px]">
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
