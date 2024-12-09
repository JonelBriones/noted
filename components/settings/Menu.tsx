import Image from "next/image";
import React from "react";

const Menu = () => {
  return (
    <div className="flex flex-col gap-2 p-4 border-l border-r flex-1">
      <span className="flex gap-2 p-2">
        <Image
          src={"/images/icon-sun.svg"}
          width={20}
          height={20}
          alt="icon-tag"
        />
        Color Theme
      </span>
      <span className="flex gap-2 p-2">
        <Image
          src={"/images/icon-font.svg"}
          width={20}
          height={20}
          alt="icon-tag"
        />
        Front Theme
      </span>
      <span className="flex gap-2 p-2">
        <Image
          src={"/images/icon-lock.svg"}
          width={20}
          height={20}
          alt="icon-tag"
        />
        Change Password
      </span>
      <div className="w-full h-[1px] bg-neutral-200" />
      <span className="flex gap-2 p-2">
        <Image
          src={"/images/icon-logout.svg"}
          width={20}
          height={20}
          alt="icon-tag"
        />{" "}
        Logout
      </span>
    </div>
  );
};

export default Menu;
