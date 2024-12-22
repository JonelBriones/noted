import React, { useEffect, useRef, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import Image from "next/image";
import { useAppContext } from "../Providers";

const NoteForm = ({ setToggleCreateNote }: any) => {
  const { note, setNote } = useAppContext();
  const [tag, setTag] = useState("");
  const [tagInput, setTagInput] = useState(true);
  const tagRef = useRef(null);

  const tagsFormattedValidation = tag
    .split(",")
    .filter((valid) => valid !== "")
    .map((tag) => tag[0].toUpperCase() + tag?.slice(1));
  console.log(tagsFormattedValidation);
  const convertedTags = (
    <div
      onClick={() => {
        setTagInput(true);
      }}
      className="w-full text-left rounded-lg p-1"
    >
      <div className="inline cursor-pointer">
        {tagsFormattedValidation.map(
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

  const [error, setError] = useState(false);
  const onHanderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setNote({
      ...note,
      tags: tagsFormattedValidation.join(", "),
    });
    if (tag !== "") setTagInput(false);
  };

  useEffect(() => {
    if (tagRef.current && tagInput) {
      tagRef.current.focus();
    }
    console.log(note.tags);
  }, [tagInput]);
  const renderTagInput = (
    <input
      ref={tagRef}
      id="tag"
      type="text"
      placeholder="Add tags separated by commas (e.g. Work, Planning)"
      className="w-full rounded-lg border border-neutral-700 p-1 outline-none"
      value={tag}
      pattern="[a-zA-Z,]*"
      onChange={(e) => {
        if (e.target.value.includes(",,")) {
          setError(true);
          return;
        }
        if (e.target.value.length == 0) {
          setTag("");
        } else if (e.target.value !== "") {
          setTag(e.target.value.trim());
        }
      }}
      onBlur={() => setTagInput(tag ? false : true)}
    />
  );

  return (
    <form
      className="hidden md:flex flex-col border-l border-r text-sm overflow-auto p-4 min-w-[588px] justify-between"
      onSubmit={onHanderSubmit}
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Enter a title...</h1>
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
          {(!tag && tagInput && renderTagInput) ||
            (tag && tagInput && renderTagInput) ||
            (tag && !tagInput && convertedTags)}
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
          <input
            type="text"
            placeholder="Not yet saved"
            className="w-full outline-none"
          />
        </div>
        <span className="text-red-500 text-xs">
          {error && "Add tags separated by commas (e.g. Work, Planning)"}
        </span>
        <div className="w-full h-[1px] bg-neutral-200" />
        <input
          type="text"
          placeholder="Start typing your note here..."
          className="text-sm text-neutral-700 outline-none"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />
      </div>
      <div className="flex gap-4 w-fit">
        <button className="block text-center p-2 text-white bg-blue-500 rounded-lg text-sm font-medium cursor-pointer">
          Save Note
        </button>
        <button
          onClick={() => setToggleCreateNote(false)}
          type="submit"
          className="block text-center p-2 text-neutral-800 bg-neutral-100 rounded-lg text-sm font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
