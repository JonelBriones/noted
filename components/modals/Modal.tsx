"use client";
import Image from "next/image";
import React from "react";
import { redirect } from "next/navigation";
import { useAppContext } from "../Providers";

const Modal = ({
  id,
  isArchived,
  img,
  type,
  textColor,
  backgroundColor,
  setToggleModal,
  deleteNote,
  archiveNote,
  setView,
}: any) => {
  const { darkMode, setToggleTag, setViewToggledNote } = useAppContext();
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 h-screen w-screen bg-neutral-950 opacity-50" />
      <div className="absolute top-0 bottom-0 left-0 right-0 md:h-screen md:w-screen flex justify-center place-items-center">
        <div className="w-[440px] h-[175px] z-10 p-4 rounded-lg bg-white flex flex-col justify-between dark:bg-neutral-800">
          <div className="flex place-items-start gap-4 relative">
            <div className="rounded-lg p-2 bg-neutral-100 flex-none  dark:bg-neutral-600">
              <Image
                src={`/images/icon-${
                  type == "Archive" ? "archive" : "delete"
                }.svg`}
                height={0}
                width={0}
                alt={`icon-${img}`}
                className="w-[24px] h-[25px]"
                style={{ filter: darkMode && "invert(100%)" }}
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[16px] text-neutral-950 dark:text-neutral-100 font-semibold">
                {type} Note
              </h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-100">
                {type == "Archive"
                  ? "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
                  : "Are you sure you want to permanently delete this note? This action cannot be undone."}
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setToggleModal(false)}
              className={`block text-center p-2 text-neutral-600 bg-neutral-100 rounded-lg text-sm font-medium cursor-pointer py-2 px-4 dark:bg-neutral-600 dark:text-neutral-100`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setToggleModal(false);
                if (type == "Delete") {
                  deleteNote(id),
                    setView("home"),
                    setViewToggledNote(undefined);
                } else {
                  archiveNote(id, isArchived),
                    setView("archive"),
                    setToggleTag("");
                }
              }}
              className={`block text-center p-2 ${textColor} ${backgroundColor} rounded-lg text-sm cursor-pointer py-2 px-4`}
            >
              {type} Note
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
