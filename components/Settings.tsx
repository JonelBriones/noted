import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Image from "next/image";
import Topbar from "./Topbar";
import Navigation from "./Navigation";

const Settings = ({ search }: any) => {
  const settings = ["Color Theme", "Font Theme", "Change Password", "Logout"];
  const [toggleSettingType, setToggleSettingType] = useState("Color Theme");
  const settingImg = {
    "Color Theme": "sun",
    "Font Theme": "font",
    "Change Password": "lock",
    Logout: "logout",
  } as const;

  return (
    <div className="flex flex-grow gap-4 pl-6 overflow-hidden">
      <div className="hidden w-[290px] md:flex flex-col flex-none text-wrap overflow-y-auto gap-2 py-4">
        <div className="flex flex-col">
          {settings.map((setting: any) => (
            <button
              key={setting}
              onClick={() => setToggleSettingType(setting)}
              className={`flex justify-between p-2 rounded-lg ${
                toggleSettingType == setting ? "bg-neutral-100" : ""
              }`}
            >
              <div className="flex gap-2 cursor-pointer">
                <Image
                  src={`/images/icon-${
                    settingImg[setting as keyof typeof settingImg]
                  }.svg`}
                  width={0}
                  height={0}
                  className="size-5"
                  alt={`icon-${setting}`}
                />
                {setting}
              </div>
              {toggleSettingType == setting && (
                <Image
                  src={"/images/icon-chevron-right.svg"}
                  width={20}
                  height={20}
                  alt="icon-chevron-right"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
