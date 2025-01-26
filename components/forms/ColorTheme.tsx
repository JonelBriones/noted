"use client";
import { updateSettings } from "@/app/_actions/updateSettings";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppContext } from "../Providers";

const ColorTheme = () => {
  const { settings, darkMode } = useAppContext();
  const { colorTheme } = settings || {};
  const colorThemeOptions = ["Light Mode", "Dark Mode", "System"];
  const colorThemeImage = {
    "Light Mode": "sun",
    "Dark Mode": "moon",
    System: "system-theme",
  } as const;

  return (
    <div>
      <h1>Choose your color theme</h1>
      <div className="flex flex-col gap-4 mt-6">
        {colorThemeOptions.map((theme) => (
          <button
            key={theme}
            className={twMerge(
              "flex gap-4 border border-neutral-200 p-4 rounded-xl place-items-center dark:border-none transition duration-200",
              colorTheme == theme && "dark:bg-neutral-800"
            )}
            onClick={() => {
              updateSettings({ colorTheme: theme });
            }}
          >
            <div className="flex place-items-center justify-center rounded-xl border-2 border-neutral-200 h-[40px] w-[40px] bg-white dark:bg-neutral-800">
              <Image
                src={`/images/icon-${
                  colorThemeImage[theme as keyof typeof colorThemeImage]
                }.svg`}
                width={0}
                height={0}
                alt="icon-sans-serif"
                className="size-[24px]"
                style={{ filter: darkMode && "invert(100%)" }}
              />
            </div>
            <div
              className={
                "flex flex-col justify-center flex-1 place-items-start text-neutral-700"
              }
            >
              <h4
                className={twMerge(
                  "text-sm dark:text-neutral-100",
                  colorTheme == theme && "dark:text-neutral-100"
                )}
              >
                {theme}
              </h4>
              <p
                className={twMerge(
                  "text-sm text-neutral-500 dark:text-neutral-500",
                  colorTheme == theme && "dark:text-neutral-500"
                )}
              >
                Clean and modern, easy to read.
              </p>
            </div>
            <div
              className={twMerge(
                "size-[16px] rounded-full border border-neutral-300",
                colorTheme == theme
                  ? "border-blue-500 border-4 bg-neutral-100 dark:bg-neutral-800"
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
