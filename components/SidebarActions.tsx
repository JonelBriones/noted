"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Modal from "./modals/Modal";
import { Note } from "@/app/_types/types";
import { useAppContext } from "./Providers";
import { deleteNote } from "@/app/_actions/deleteNote";

interface Params {
  note?: Note;
}
const SidebarRight = ({ note }: Params) => {
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

  const archiveNote = (id: string, isArchived: boolean) => {
    console.log("archived button");
    // const isNoteExist = apiNotes.find((note) => note._id == id);
    // if (!isNoteExist) return;
    // let updatedNotes;
    // if (isArchived) {
    //   updatedNotes = apiNotes.map((note) =>
    //     note._id == id ? { ...note, isArchived: false } : note
    //   );
    //   //   // change isArchive to true
    // } else {
    //   // change isArchive to false
    //   updatedNotes = apiNotes.map((note) =>
    //     note._id == id ? { ...note, isArchived: true } : note
    //   );
    // }
    // setApiNotes(updatedNotes);
    // setViewToggledNote(updatedNotes[0]);
    // console.log("updated", updatedNotes);
  };
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
