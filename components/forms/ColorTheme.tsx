"use client";
import { updateSettings } from "@/app/_actions/updateSettings";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppContext } from "../Providers";

const ColorTheme = () => {
  const { settings } = useAppContext();
  const colorTheme = ["Light Mode", "Dark Mode", "System"];
  const colorThemeImage = {
    "Light Mode": "sun",
    "Dark Mode": "moon",
    System: "system-theme",
  } as const;

  const [toggleColorTheme, setToggleColorTheme] = useState(settings.colorTheme);
  console.log(toggleColorTheme);

  return (
    <div>
      <h1>Choose your color theme:</h1>
      <div className="flex flex-col gap-4 mt-6">
        {colorTheme.map((theme) => (
          <button
            key={theme}
            className={`flex gap-4 border border-neutral-200 p-4 rounded-xl place-items-center ${
              toggleColorTheme == theme ? "bg-neutral-100" : ""
            }`}
            onClick={() => {
              setToggleColorTheme(theme), updateSettings({ colorTheme: theme });
            }}
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
              className={twMerge(
                "size-[16px] rounded-full border border-neutral-300",
                toggleColorTheme == theme
                  ? "border-blue-500 border-4 bg-white"
                  : "border-neutral-300"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorTheme;
