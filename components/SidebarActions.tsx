"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Modal from "./modals/Modal";
import { Note } from "@/app/_types/types";
import { useAppContext } from "./Providers";
import { deleteNote } from "@/app/_actions/deleteNote";
import { archiveNote } from "@/app/_actions/archiveNote";

interface Params {
  note?: Note;
  notes?: Note[];
}
const SidebarRight = ({ note }: Params) => {
  if (!note) return;
  const { isArchived } = note;
  const { darkMode } = useAppContext();
  const [type, setType] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  let params = {
    img: isArchived ? "archived" : "delete",
    backgroundColor: type == "Archive" ? "bg-blue-500" : "bg-red-500",
  };
  const { img, backgroundColor } = params;

  return (
    <div className="flex md:flex-col md:w-[242px] flex-none gap-4 p-4">
      <div className="flex md:flex-col gap-3 text-sm">
        <button
          className="flex gap-2 md:border rounded-lg p-3 dark:border-neutral-700"
          onClick={() => {
            {
              isArchived
                ? archiveNote(note._id, isArchived)
                : setToggleModal(true),
                setType("Archive");
            }
          }}
        >
          <Image
            src={"/images/icon-archive.svg"}
            width={0}
            height={0}
            className="size-5"
            alt="icon-tag"
            style={{ filter: darkMode && "invert(100%)" }}
          />
          <span className="hidden md:block">
            {isArchived ? "Restore" : "Archive"} Note
          </span>
        </button>
        <button
          className="flex gap-2 md:border rounded-lg p-3 dark:border-neutral-700"
          onClick={() => {
            setToggleModal(true), setType("Delete");
          }}
        >
          <Image
            src={"/images/icon-delete.svg"}
            width={0}
            height={0}
            className="size-5"
            alt="icon-delete"
            style={{ filter: darkMode && "invert(100%)" }}
          />
          <span className="hidden md:block">Delete Note</span>
        </button>
      </div>
      {toggleModal && (
        <Modal
          id={note._id}
          isArchived={isArchived}
          img={img}
          type={type}
          textColor={"text-white"}
          backgroundColor={backgroundColor}
          setToggleModal={setToggleModal}
          deleteNote={deleteNote}
          archiveNote={archiveNote}
        />
      )}
    </div>
  );
};

export default SidebarRight;
