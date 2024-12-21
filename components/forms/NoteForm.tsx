import React, { useEffect, useRef, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import Image from "next/image";
import { useAppContext } from "../Providers";

const NoteForm = ({ toggleCreateNote, setToggleCreateNote }: any) => {
  const { note, setNote } = useAppContext();

  const [tag, setTag] = useState("");
  //   show converted tags on non edit page
  const convertedTags = tag?.split(",").map(
    (tagSplit: string, idx: number) =>
      tagSplit && (
        <span key={idx}>
          {tagSplit[0]?.toUpperCase() + tagSplit?.slice(1).trim()}
          {idx < tag?.length && ","}
        </span>
      )
  );
  const [error, setError] = useState(false);
  const onHanderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setNote({
      ...note,
      tags: tag,
    });
  };
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
          <input
            id="tag"
            type="text"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            className="w-full rounded-lg border border-neutral-700 p-1"
            value={note.tag}
            pattern="[a-zA-Z,]*"
            onChange={(e) => {
              if (e.target.value.includes(",,")) {
                setError(true);
              } else if (e.target.value !== "") {
                setTag(
                  e.target.value[0].toUpperCase() + e.target.value.slice(1)
                );
              }
            }}
          />
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
