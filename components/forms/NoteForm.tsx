"use client";
import React, { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAppContext } from "../Providers";
import { createNote } from "@/app/_actions/createNote";
import { redirect } from "next/navigation";

const NoteForm = ({ setToggleCreateNote, setViewToggledNote, notes }: any) => {
  const intialState = {
    zodErrors: "",
    mongooseErrors: "",
    title: "",
    tags: [],
    content: "",
    successMsg: "",
  };
  const [state, formAction, pending] = useActionState(createNote, intialState);
  const { title, tags, content } = state?.data || {};
  const { successMsg } = state?.successMsg;

  const [tagInput, setTagInput] = useState(true);
  const [inputTag, setTag] = useState("");
  const pattern2 = /^[a-zA-Z]+(,[a-zA-Z]+)*$/;

  const tagsFormattedValidation = inputTag
    .split(",")
    .filter((valid) => valid !== "")
    .map((tag) => tag[0].toUpperCase() + tag?.slice(1));

  const [error, setError] = useState(pattern2.test(inputTag));
  const titleRef = useRef<HTMLInputElement>(null);
  const pattern = /^(?!.*,,).*$/;

  useEffect(() => {
    if (state.successMsg) {
      console.log("success add", state.successMsg);
      setTagInput(true);
      console.log("setting toggle create note to off");
      setToggleCreateNote(false);
      console.log(notes.length, notes.length - 1);
      setViewToggledNote(notes[notes.length - 1]);
      setTag("");
    }
  }, [state.successMsg]);

  const convertedTags = (
    <div
      onClick={() => {
        setTagInput(true);
      }}
      className="w-full text-left rounded-lg p-1"
    >
      <div className="inline cursor-pointer">
        {tagsFormattedValidation?.map(
          (tag: string, idx: number) =>
            tag && (
              <span key={idx}>
                {tag}
                {tagsFormattedValidation.length == 1 ||
                tagsFormattedValidation.length - 1 == idx
                  ? ""
                  : ","}
              </span>
            )
        )}
      </div>
    </div>
  );

  const renderTagInput = (
    <input
      id="tag"
      type="text"
      placeholder="Add tags separated by commas (e.g. Work, Planning)"
      className="w-full rounded-lg border border-neutral-700 p-1 outline-none"
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
    if (titleRef.current && tagInput) {
      titleRef.current.focus();
    }
  }, [tagInput]);

  return (
    <form
      className="hidden md:flex flex-col border-l border-r text-sm overflow-auto p-4 min-w-[588px] justify-between"
      action={formAction}
    >
      {state.successMsg}

      <div className="flex flex-col gap-3">
        <input
          ref={titleRef}
          type="text"
          placeholder="Enter a title..."
          className="text-2xl font-bold outline-none"
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
            />
            Tags
          </span>
          {(!inputTag && tagInput && renderTagInput) ||
            (inputTag && tagInput && renderTagInput) ||
            (inputTag && !tagInput && convertedTags)}
        </div>
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
          <span className="w-full text-neutral-400">Not yet saved</span>
        </div>
        <span className="text-red-500 text-xs">
          {error && "Add tags separated by commas (e.g. Work, Planning)"}
        </span>
        <div className="w-full h-[1px] bg-neutral-200" />
        <input
          type="text"
          placeholder="Start typing your note here..."
          className="text-sm text-neutral-700 outline-none"
          name="content"
          defaultValue={content}
        />
      </div>
      <div className="flex gap-4 w-fit">
        <button
          className="block text-center p-2 text-white bg-blue-500 rounded-lg text-sm font-medium cursor-pointer"
          type="submit"
          disabled={pending}
        >
          Save Note
        </button>
        <button
          onClick={() => setToggleCreateNote(false)}
          className="block text-center p-2 text-neutral-800 bg-neutral-100 rounded-lg text-sm font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
