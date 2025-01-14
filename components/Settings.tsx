import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Image from "next/image";
import Topbar from "./Topbar";
import Navigation from "./Navigation";
import PrimaryBtn from "./buttons/PrimaryBtn";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Settings = ({ search }: any) => {
  const settings = ["Color Theme", "Font Theme", "Change Password"];
  const [colorTheme, setColorTheme] = useState([
    "Light Mode",
    "Dark Mode",
    "System",
  ]);
  const colorThemeImage = {
    "Light Mode": "sun",
    "Dark Mode": "moon",
    System: "system-theme",
  } as const;
  const [toggleSettingType, setToggleSettingType] = useState("Color Theme");
  const settingImg = {
    "Color Theme": "sun",
    "Font Theme": "font",
    "Change Password": "lock",
  } as const;

  const [toggleHideOldPassword, setToggleHideOldPassword] = useState(true);
  const [toggleHideNewPassword, setToggleHideNewPassword] = useState(true);
  const [toggleHideConfirmNewPassword, setToggleHideConfirmNewPassword] =
    useState(true);

  const [fontTheme, setFontTheme] = useState("sans-serif");
  const [toggleColorTheme, setToggleColorTheme] = useState("Light Mode");

  // const { data: session } = useSession();

  // if (!session?.user) {
  //   redirect("/login");
  // }

  return (
    <div className="flex flex-grow gap-4 px-2 md:pl-6 overflow-hidden">
      <div className="hidden w-[258px] md:flex flex-col flex-none text-wrap overflow-y-auto gap-2 py-4 border-r pr-4">
        <div className="flex flex-col">
          {settings.map((setting: any) => (
            <div
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
            </div>
          ))}
          <div className="border-b my-1"></div>
          <div className="flex justify-between p-2 rounded-lg">
            <button
              className="flex gap-2 cursor-pointer"
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
              />
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="md:pl-2 py-6 w-[562px]">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="font-bold">{toggleSettingType}</h1>
          {toggleSettingType == "Color Theme" && (
            <div>
              <h1>Choose your color theme:</h1>
              <div className="flex flex-col gap-4 mt-6">
                {colorTheme.map((theme) => (
                  <button
                    key={theme}
                    className={`flex gap-4 border border-neutral-200 p-4 rounded-xl place-items-center ${
                      toggleColorTheme == theme ? "bg-neutral-100" : ""
                    }`}
                    onClick={() => setToggleColorTheme(theme)}
                  >
                    <div className="flex place-items-center justify-center rounded-xl border-2 border-neutral-200 h-[40px] w-[40px] bg-white">
                      <Image
                        src={`/images/icon-${
                          colorThemeImage[theme as keyof typeof colorThemeImage]
                        }.svg`}
                        width={0}
                        height={0}
                        alt="icon-sans-serif"
                        className="size-[24px]"
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1 place-items-start">
                      <h4 className="text-sm">{theme}</h4>
                      <p className="text-xs text-neutral-700">
                        Clean and modern, easy to read.
                      </p>
                    </div>
                    <div
                      className={`size-[16px] rounded-full border border-neutral-300 ${
                        toggleColorTheme == theme
                          ? "border-blue-500 border-4 bg-white"
                          : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          {toggleSettingType == "Font Theme" && (
            <div>
              <h1>Choose your font theme:</h1>
              <div className="flex flex-col gap-4 mt-6">
                <button
                  className={`flex gap-4 border border-neutral-200 p-4 rounded-xl place-items-center ${
                    fontTheme == "sans-serif" ? "bg-neutral-100" : ""
                  }`}
                  onClick={() => setFontTheme("sans-serif")}
                >
                  <div className="flex place-items-center justify-center rounded-xl border-2 border-neutral-200 h-[40px] w-[40px] bg-white">
                    <Image
                      src={"/images/icon-font-sans-serif.svg"}
                      width={0}
                      height={0}
                      alt="icon-sans-serif"
                      className="size-[24px]"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1 place-items-start">
                    <h4 className="text-sm">Sans-serif</h4>
                    <p className="text-xs text-neutral-700">
                      Clean and modern, easy to read.
                    </p>
                  </div>
                  <div
                    className={`size-[16px] rounded-full border border-neutral-300 ${
                      fontTheme == "sans-serif"
                        ? "border-blue-500 border-4 bg-white"
                        : ""
                    }`}
                  />
                </button>
                <button
                  className={`flex gap-4 border border-neutral-200 p-4 rounded-xl place-items-center ${
                    fontTheme == "serif" ? "bg-neutral-100" : ""
                  }`}
                  onClick={() => setFontTheme("serif")}
                >
                  <div className="flex place-items-center justify-center rounded-xl border-2 border-neutral-200 h-[40px] w-[40px] bg-white">
                    <Image
                      src={"/images/icon-font-serif.svg"}
                      width={0}
                      height={0}
                      alt="icon-serif"
                      className="size-[24px] "
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1 place-items-start">
                    <h4 className="text-sm">Serif</h4>
                    <p className="text-xs text-neutral-700">
                      Classic and melegant for a timeless feel.
                    </p>
                  </div>
                  <div
                    className={`size-[16px] rounded-full border border-neutral-300 ${
                      fontTheme == "serif"
                        ? "border-blue-500 border-4 bg-white"
                        : ""
                    }`}
                  />
                </button>

                <button
                  className={`flex gap-4 border border-neutral-200 p-4 rounded-xl place-items-center ${
                    fontTheme == "monospace" ? "bg-neutral-100" : ""
                  }`}
                  onClick={() => setFontTheme("monospace")}
                >
                  <div className="flex place-items-center justify-center rounded-xl border-2 border-neutral-200 h-[40px] w-[40px] bg-white">
                    <Image
                      src={"/images/icon-font-monospace.svg"}
                      width={0}
                      height={0}
                      alt="icon-monospace"
                      className="size-[24px] "
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1 place-items-start">
                    <h4 className="text-sm">Monospace</h4>
                    <p className="text-xs text-neutral-700">
                      Code-like, great for a technical vibe.
                    </p>
                  </div>
                  <div
                    className={`size-[16px] rounded-full border border-neutral-300 ${
                      fontTheme == "monospace"
                        ? "border-blue-500 border-4 bg-white"
                        : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
        {toggleSettingType == "Change Password" && (
          <div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="">Old Password</label>
                <div className="relative">
                  <input
                    type={toggleHideOldPassword ? "password" : "text"}
                    className="p-2 rounded-lg border-2 border-neutral-300 focus:border-neutral-600 text-neutral-500 text-sm hover:bg-neutral-50 outline-none outline-offset-2 focus:ring-neutral-600 focus:outline-neutral-500 w-full"
                  />
                  <div
                    onClick={() =>
                      setToggleHideOldPassword(!toggleHideOldPassword)
                    }
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
                <label htmlFor="">New Password</label>
                <div className="relative">
                  <input
                    type={toggleHideNewPassword ? "password" : "text"}
                    className="p-2 rounded-lg border-2 border-neutral-300 focus:border-neutral-600 text-neutral-500 text-sm hover:bg-neutral-50 outline-none outline-offset-2 focus:ring-neutral-600 focus:outline-neutral-500 w-full"
                  />
                  <div
                    onClick={() =>
                      setToggleHideNewPassword(!toggleHideNewPassword)
                    }
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
                <label htmlFor="">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={toggleHideConfirmNewPassword ? "password" : "text"}
                    className="p-2 rounded-lg border-2 border-neutral-300 focus:border-neutral-600 text-neutral-500 text-sm hover:bg-neutral-50 outline-none outline-offset-2 focus:ring-neutral-600 focus:outline-neutral-500 w-full"
                  />
                  <div
                    onClick={() =>
                      setToggleHideConfirmNewPassword(
                        !toggleHideConfirmNewPassword
                      )
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
        )}
      </div>
    </div>
  );
};

export default Settings;
