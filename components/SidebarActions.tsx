"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Modal from "./modals/Modal";
import { Note } from "@/app/_types/types";
interface Params {
  note: Note;
}
const SidebarRight = ({ note }: Params) => {
  const pathname = usePathname();
  const { isArchived } = note;
  const [type, setType] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  let params = {
    img: isArchived ? "archived" : "delete",
    backgroundColor: type == "Archive" ? "bg-blue-500" : "bg-red-500",
  };
  const { img, backgroundColor } = params;

  return (
    <div className="hidden md:flex flex-col w-[242px] flex-none gap-4 p-4">
      <div className="flex flex-col gap-3 text-sm">
        <button
          className="flex gap-2 border rounded-lg p-3"
          onClick={() => {
            setToggleModal(true), setType("Archive");
          }}
        >
          <Image
            src={"/images/icon-archive.svg"}
            width={0}
            height={0}
            className="size-5"
            alt="icon-tag"
          />
          {pathname == "/" ? "Restore" : "Archive"} Note
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
          img={img}
          type={type}
          textColor={"text-white"}
          backgroundColor={backgroundColor}
          padding={"py-2 px-4"}
          setToggleModal={setToggleModal}
        />
      )}
    </div>
  );
};

export default SidebarRight;
