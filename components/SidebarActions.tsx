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
const SidebarRight = ({ note, notes }: Params) => {
  if (!note) return;
  const { isArchived } = note;
  const [type, setType] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  let params = {
    img: isArchived ? "archived" : "delete",
    backgroundColor: type == "Archive" ? "bg-blue-500" : "bg-red-500",
  };
  const { img, backgroundColor } = params;

  useEffect(() => {}, [note]);

  let currentViewNoteIdx = (): number => {
    if (notes) {
      for (let [idx, n] of notes?.entries()) {
        if (n._id == note?._id) {
          return idx;
        }
      }
    }
    return 0;
  };
  let changeNote = notes && notes[currentViewNoteIdx()];
  console.log("idx:", currentViewNoteIdx());
  console.log("note:", changeNote);

  useEffect(() => {
    console.log("note", note);
  }, [note]);

  return (
    <div className="hidden md:flex flex-col w-[242px] flex-none gap-4 p-4">
      <div className="flex flex-col gap-3 text-sm">
        <button
          className="flex gap-2 border rounded-lg p-3"
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
          />
          {isArchived ? "Restore" : "Archive"} Note
        </button>
        <button
          className="flex gap-2 border rounded-lg p-3"
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
          />
          Delete Note
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
