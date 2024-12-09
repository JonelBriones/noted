import Image from "next/image";
import React from "react";

const SidebarRight = () => {
  return (
    <div className="flex flex-col w-[242px] gap-4 p-4">
      <div className="flex flex-col gap-3 text-sm">
        <span className="flex gap-2 border rounded-lg p-3">
          <Image
            src={"/images/icon-archive.svg"}
            width={20}
            height={20}
            alt="icon-tag"
          />
          Archive Note
        </span>
        <span className="flex gap-2 border rounded-lg p-3">
          <Image
            src={"/images/icon-delete.svg"}
            width={20}
            height={20}
            alt="icon-tag"
          />
          Delete Note
        </span>
      </div>
    </div>
  );
};

export default SidebarRight;
