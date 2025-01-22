"use client";
import Image from "next/image";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { Note } from "@/app/_types/types";
import { editNote } from "@/app/_actions/editNote";
import { noteSchema } from "@/app/_schemas/noteSchema";
import { z } from "zod";
interface Params {
  note?: Note;
  notes?: Note[];
  setViewToggledNote: () => {};
}

const NoteCard = ({ note, notes, setViewToggledNote }: Params) => {
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

  let currentViewNoteIdx = () => {
    for (let [idx, n] of notes?.entries()) {
      if (n._id == note?._id) {
        return idx;
      }
    }
  };

  const onChangeHandler = (
    e: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
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
            className="text-2xl font-bold outline-none"
          />
          {!defaultNote.title && <span>Title is required.</span>}
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
              {renderTagInput}
              <input
                type="text"
                name="tags"
                defaultValue={inputTag ? inputTag : tags.join(",")}
                hidden
              />
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
          <textarea
            value={defaultNote.content}
            name="content"
            onChange={onChangeHandler}
            className="outline-none h-full"
          />
        </div>
        <div className="w-full h-[1px] bg-neutral-200" />
        <div className="flex gap-4 w-fit p-4">
          <button type="submit">Save</button>
          <button
            onClick={() => {
              setDefaultNote({
                title: title || "",
                tags: tags.join(",") || "",
                content: content || "",
                isArchived: isArchived,
              });
              setViewToggledNote(notes[currentViewNoteIdx]);
            }}
          >
            reset
          </button>
        </div>
      </form>
    </>
  );
};

export default NoteCard;
