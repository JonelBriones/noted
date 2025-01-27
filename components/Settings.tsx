import React, { useState } from "react";
import Image from "next/image";
import PrimaryBtn from "./buttons/PrimaryBtn";
import { signOut } from "next-auth/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ColorTheme from "./forms/ColorTheme";
import FontTheme from "./forms/FontTheme";
import ChangePassword from "./forms/ChangePassword";
import { useAppContext } from "./Providers";
const Settings = ({ search }: any) => {
  const { darkMode } = useAppContext();
  const settings = ["Color Theme", "Font Theme"];
  // const settings = ["Color Theme", "Font Theme", "Change Password"];

  const [toggleSettingType, setToggleSettingType] = useState("Color Theme");
  const settingImg = {
    "Color Theme": "sun",
    "Font Theme": "font",
    "Change Password": "lock",
  } as const;

  return (
    <div className="flex flex-grow gap-4 px-2 md:pl-6 overflow-hidden ">
      <div className="hidden w-[258px] md:flex flex-col flex-none text-wrap overflow-y-auto gap-2 py-4 border-r pr-4 dark:border-neutral-700">
        <div className="flex flex-col">
          {settings.map((setting: any) => (
            <button
              key={setting}
              onClick={() => setToggleSettingType(setting)}
              className={`flex justify-between p-2 rounded-lg place-items-center ${
                toggleSettingType == setting
                  ? "bg-neutral-100 dark:bg-neutral-800"
                  : ""
              }`}
            >
              <div className="flex gap-2 cursor-pointer place-items-center">
                <Image
                  src={`/images/icon-${
                    settingImg[setting as keyof typeof settingImg]
                  }.svg`}
                  width={0}
                  height={0}
                  className="size-5"
                  alt={`icon-${setting}`}
                  style={{ filter: darkMode && "invert(100%)" }}
                />
                {setting}
              </div>
              {toggleSettingType == setting && (
                <Image
                  src={"/images/icon-chevron-right.svg"}
                  width={20}
                  height={20}
                  alt="icon-chevron-right"
                  style={{ filter: darkMode && "invert(100%)" }}
                />
              )}
            </button>
          ))}
          <div className="border-b my-1 dark:border-neutral-700" />

          <button
            className="flex justify-start place-items-center p-2 rounded-lg gap-2 cursor-pointer "
            onClick={() => {
              signOut();
            }}
          >
            <Image
              src={`/images/icon-logout.svg`}
              width={0}
              height={0}
              className="size-5"
              alt={`icon-logout`}
              style={{ filter: darkMode && "invert(100%)" }}
            />
            Logout
          </button>
        </div>
      </div>
      <div className="md:pl-2 py-6 w-[562px]">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="font-bold">{toggleSettingType}</h1>
          {toggleSettingType == "Color Theme" && <ColorTheme />}
          {toggleSettingType == "Font Theme" && <FontTheme />}
          {toggleSettingType == "Change Password" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
