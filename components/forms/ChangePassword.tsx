import Image from "next/image";
import React, { useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";

const ChangePassword = () => {
  const [toggleHideOldPassword, setToggleHideOldPassword] = useState(true);
  const [toggleHideNewPassword, setToggleHideNewPassword] = useState(true);
  const [toggleHideConfirmNewPassword, setToggleHideConfirmNewPassword] =
    useState(true);

  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              placeholder="old password"
              autoComplete="current-password"
              type={toggleHideOldPassword ? "password" : "text"}
              className="p-2 rounded-lg border-2 border-neutral-300 focus:border-neutral-600 text-neutral-500 text-sm hover:bg-neutral-50 outline-none outline-offset-2 focus:ring-neutral-600 focus:outline-neutral-500 w-full"
            />
            <div
              onClick={() => setToggleHideOldPassword(!toggleHideOldPassword)}
            >
              <Image
                src={`/images/icon-${
                  toggleHideOldPassword ? "hide" : "show"
                }-password.svg`}
                width={0}
                height={0}
                alt="icon-hide-password"
                className="size-5 absolute right-4 top-[10px] cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              placeholder="new password"
              autoComplete="new-password"
              type={toggleHideNewPassword ? "password" : "text"}
              className="p-2 rounded-lg border-2 border-neutral-300 focus:border-neutral-600 text-neutral-500 text-sm hover:bg-neutral-50 outline-none outline-offset-2 focus:ring-neutral-600 focus:outline-neutral-500 w-full"
            />
            <div
              onClick={() => setToggleHideNewPassword(!toggleHideNewPassword)}
            >
              <Image
                src={`/images/icon-${
                  toggleHideNewPassword ? "hide" : "show"
                }-password.svg`}
                width={0}
                height={0}
                alt="icon-hide-password"
                className="size-5 absolute right-4 top-[10px] cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              autoComplete="new-password"
              placeholder="confirm new password"
              type={toggleHideConfirmNewPassword ? "password" : "text"}
              className="p-2 rounded-lg border-2 border-neutral-300 focus:border-neutral-600 text-neutral-500 text-sm hover:bg-neutral-50 outline-none outline-offset-2 focus:ring-neutral-600 focus:outline-neutral-500 w-full"
            />
            <div
              onClick={() =>
                setToggleHideConfirmNewPassword(!toggleHideConfirmNewPassword)
              }
            >
              <Image
                src={`/images/icon-${
                  toggleHideConfirmNewPassword ? "hide" : "show"
                }-password.svg`}
                width={0}
                height={0}
                alt="icon-hide-password"
                className="size-5 absolute right-4 top-[10px] cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <PrimaryBtn
            text="Save Password"
            textColor={"text-white"}
            backgroundColor={"bg-blue-500"}
            padding={"px-4 py-3"}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
