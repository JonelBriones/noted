"use client";
import { updateSettings } from "@/app/_actions/updateSettings";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppContext } from "../Providers";

const FontTheme = () => {
  const { settings, darkMode } = useAppContext();
  const [toggleFontTheme, setToggleFontTheme] = useState(settings.fontTheme);
  const fontTheme = ["sans-serif", "serif", "monospace"];

  return (
    <div>
      <h1 className="hidden md:block">Choose your font theme:</h1>
      <div className="flex flex-col gap-4 mt-6">
        {fontTheme.map((font) => (
          <button
            key={font}
            className={twMerge(
              "flex gap-4 border border-neutral-200 p-4 rounded-xl place-items-center dark:border-none transition duration-200 text-left",
              toggleFontTheme == font && "dark:bg-neutral-800",
              font == "serif" && "serif",
              font == "sans-serif" && "sans-serif",
              font == "monospace" && "monospace"
            )}
            onClick={() => {
              setToggleFontTheme(font), updateSettings({ fontTheme: font });
            }}
          >
            <div className="flex place-items-center justify-center rounded-xl border-2 border-neutral-200 h-[40px] w-[40px] bg-white dark:bg-neutral-800">
              <Image
                src={`/images/icon-font-${font}.svg`}
                width={0}
                height={0}
                alt={`icon-${font}`}
                className="size-[24px]"
                style={{ filter: darkMode && "invert(100%)" }}
              />
            </div>
            <div className="flex flex-col justify-center flex-1 place-items-start text-neutral-700">
              <h4
                className={twMerge(
                  "text-sm dark:text-neutral-100",
                  toggleFontTheme == font && "dark:text-neutral-100"
                )}
              >
                {font.charAt(0).toUpperCase() + font.slice(1)}
              </h4>
              <p
                className={twMerge(
                  "text-sm text-neutral-500 dark:text-neutral-500",
                  toggleFontTheme == font && "dark:text-neutral-500"
                )}
              >
                Clean and modern, easy to read.
              </p>
            </div>
            <div
              className={twMerge(
                "size-[16px] rounded-full border border-neutral-300",
                font == toggleFontTheme
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

export default FontTheme;
