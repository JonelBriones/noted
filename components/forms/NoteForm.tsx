"use client";
import React, { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAppContext } from "../Providers";
import { createNote } from "@/app/_actions/createNote";
import { redirect, useParams } from "next/navigation";
import { Note } from "@/app/_types/types";
interface Params {
  setToggleCreateNote: (boolean: boolean) => void;
  setViewToggledNote: (note: Note) => void;
  notes: Note[];
  setView?: (view: string) => void;
}

const NoteForm = ({
  setToggleCreateNote,
  setViewToggledNote,
  notes,
  setView,
}: Params) => {
  const intialState = {
    zodErrors: "",
    mongooseErrors: "",
    title: "",
    tags: [],
    content: "",
    successMsg: "",
  };
  const [state, formAction, pending] = useActionState(createNote, intialState);
  const { darkMode } = useAppContext();
  const { title, tags, content } = state?.data || {};
  const [tagInput, setTagInput] = useState(true);
  const [inputTag, setTag] = useState("");
  const pattern2 = /^[a-zA-Z]+(,[a-zA-Z]+)*$/;

  const [error, setError] = useState(pattern2.test(inputTag));
  const titleRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const pattern = /^(?!.*,,).*$/;

  useEffect(() => {
    if (state.successMsg) {
      setTagInput(true);
    }
  }, [state.successMsg]);

  const renderTagInput = (
    <input
      ref={tagRef}
      id="tag"
      type="text"
      placeholder="Add tags separated by commas (e.g. Work, Planning)"
      className="w-full rounded-lg p-1 outline-none dark:bg-stone-900 dark:text-white"
      pattern="^[a-zA-Z]+(,[a-zA-Z]+)*$"
      title="Only letters and words followed by ',' is allowed."
      value={inputTag}
      name="tags"
      onChange={(e) => {
        if (e.target.value.length == 0) {
          setTag("");
        }

        if (pattern.test(e.target.value)) {
          setTag(e.target.value.trim());
        }
      }}
      onBlur={() => setTagInput(tagInput ? false : true)}
    />
  );

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
    if (tagRef.current && tagInput && titleRef?.current?.value !== "") {
      tagRef.current.focus();
    }
  }, []);

  return (
    <form
      className="flex flex-col border-l border-r text-sm overflow-auto p-4 min-w-[588px] justify-between dark:border-neutral-700"
      action={formAction}
      autoComplete="off"
    >
      <div className="flex flex-col gap-3">
        <input
          ref={titleRef}
          type="text"
          placeholder="Enter a title..."
          className="text-2xl font-bold outline-none dark:bg-stone-900 dark:text-white"
          name="title"
          defaultValue={title}
        />
        {state.zodErrors?.title && <span>{state.zodErrors?.title}</span>}
        <input type="text" name="tags" defaultValue={inputTag} hidden />
        <div className="flex place-items-center">
          <span className="flex basis-1/3 place-items-center gap-2 w-[115px]">
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
          {renderTagInput}
        </div>
        <div className="flex place-items-center">
          <span className="flex basis-1/3 place-items-center gap-2 w-[115px]">
            <Image
              src={"/images/icon-clock.svg"}
              width={0}
              height={0}
              className="size-4"
              alt="icon-clock"
              style={{ filter: darkMode && "invert(100%)" }}
            />
            Last edited
          </span>
          <span className="w-full text-neutral-400">Not yet saved</span>
        </div>
        <span className="text-red-500 text-xs">
          {error && "Add tags separated by commas (e.g. Work, Planning)"}
        </span>
        <div className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-700" />
        <textarea
          placeholder="Start typing your note here..."
          name="content"
          defaultValue={content}
          className="outline-none h-full dark:bg-stone-900 dark:text-white"
        />
      </div>
      <div className="flex gap-4 w-fit p-4 bg-blue absolute md:static bottom-[100px] right-[20px]">
        <button
          className="bg-blue-500 text-white rounded-lg py-3 px-4 font-bold"
          type="submit"
          disabled={pending}
        >
          Save
        </button>
        <button
          onClick={() => {
            setToggleCreateNote(false);
          }}
          className="bg-neutral-100 text-neutral-600 rounded-lg py-3 px-4 font-bold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
